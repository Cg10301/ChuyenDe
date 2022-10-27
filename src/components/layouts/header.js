import React from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function header(props) {
  return (
    <Header className="header">
      {/* <h1>{props.title}</h1> */}
      <h1 style={{marginRight: "30px",  marginBottom: "0"}}>Hi, UserName</h1>
      <Avatar style={{ float: "right" }} icon={<UserOutlined />} />
    </Header>
  );
}
