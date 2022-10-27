/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import logo from "../images/logotlu.jpg";


export default function Login(props) {


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/";

  const login = async (e) => {
    e.preventDefault();

    let check = false;
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;

    const response = await fetch(
      "https://6337ebfb5327df4c43d9f980.mockapi.io/account"
    );
    const data = await response.json();

    data.map((acc) => {
      if (acc.username === username && acc.password === password) {
        check = true;
        sessionStorage.setItem("accessToken", true);
        props.signIn();
        navigate(from, { replace: true });
        sessionStorage.setItem("rollName", acc.chucvu);
      }
      return acc;
    });
    if (!check) {
      console.log("failed to login");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <form onSubmit={login}>
            <span className="login-form-logo">
              <img src={logo} alt="logotlu" />
            </span>
            <span className="login-form-title">ĐĂNG NHẬP</span>
            <div className="wrap-input">
              <input
                name="username"
                type="text"
                className="input"
                placeholder="Tên đăng nhập"
              ></input>
              <span className="focus-input"></span>
            </div>
            <div className="wrap-input">
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Mật khẩu"
              ></input>
              <span className="focus-input"></span>
            </div>
            <input type="submit" value="Đăng nhập" className="btn-login" />
          </form>
        </div>
      </div>
    </>
  );
}
