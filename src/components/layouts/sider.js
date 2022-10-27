/* eslint-disable react-hooks/rules-of-hooks */
import { React, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Tooltip, Button } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import logo from "../../images/logo_TLU.png";
import "./layout.css";
import {
  UserOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const sider = (props) => {
  const navigate = useNavigate();

  function handleClickLogo(){
    navigate("/admin/");
  }

  return (
    <Sider className="Sider">
      <div className="logo-area" style={{cursor: "pointer"}} onClick={handleClickLogo }>
        <img src={logo} alt="logo" className="logo"  />
        
      </div>
      <div className="menu-area">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={props.selectedKey}
        >
          <Menu.Item key="dashboard">
            <DashboardOutlined />
            <span>Dashboard</span>
            <Link to="/admin/" />
          </Menu.Item>
          <Menu.Item key="taikhoan">
            <UserOutlined />
            <span>Quản lý tài khoản</span>
            <Link to="/admin/taikhoan" />
          </Menu.Item>  

          <SubMenu
            key="CTDT"
            title={
              <span>
                <UnorderedListOutlined />
                <span>Quản lý CTĐT</span>
              </span>
            }
          >
            <Menu.ItemGroup key="CTDT_itemGroup" title="">
              <Menu.Item key="khoa" style={{ paddingLeft: "24px" }}>
                <span>Quản lý khoa</span>
                <Link to="/admin/khoa" />
              </Menu.Item>
              <Menu.Item key="khoahoc" style={{ paddingLeft: "24px" }}>
                <span>Quản lý khóa học</span>
                <Link to="/admin/khoahoc" />
              </Menu.Item>
              <Menu.Item key="nganh" style={{ paddingLeft: "24px" }}>
                <span>Quản lý ngành</span>
                <Link to="/admin/nganh" />
              </Menu.Item>
              <Menu.Item key="mon" style={{ paddingLeft: "24px" }}>
                <span>Quản lý môn học</span>
                <Link to="/admin/mon" />
              </Menu.Item>
              <Menu.Item key="khoiKT" style={{ paddingLeft: "24px" }}>
                <span>Quản lý khối kiến thức</span>
                <Link to="/admin/khoiKT" />
              </Menu.Item>
              <Menu.Item key="dmCTDT" style={{ paddingLeft: "24px" }}>
                <span>Quản lý danh mục CTĐT</span>
                <Link to="/admin/dmCTDT" />
              </Menu.Item>
              <Menu.Item key="ndCTDT" style={{ paddingLeft: "24px" }}>
                <span>Quản lý nội dung CTĐT</span>
                <Link to="/admin/ndCTDT" />
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </div>
      <div className="btn-logout">
        <Tooltip title="logout">
          <Button
            style={{ backgroundColor: "#9f9e9e73" }}
            shape="circle"
            icon={<LogoutOutlined />}
            size="large"
            onClick={()=>props.signOut()}
          />
        </Tooltip>
      </div>
    </Sider>
  );
};
export default sider;
