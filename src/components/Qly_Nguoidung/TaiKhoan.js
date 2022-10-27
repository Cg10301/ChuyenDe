import React from 'react'
import Header from "../layouts/header";
import Sider from "../layouts/sider";
import Footer from "../layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;


export default function TaiKhoan(props) {
  return (
    <Layout hasSider>
      <Sider selectedKey="taikhoan" signOut={props.signOut}/>
      <Layout className="site-layout">
        <Header />
        <Content
          className="content"
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "550px",
          }}
        >
    <div className="site-layout-background">
        <h1>Quản lý tài khoản</h1>
    </div>
    </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}
