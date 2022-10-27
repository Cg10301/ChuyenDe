import React from "react";
import "antd/dist/antd.css";
import "../App.css";
import Header from "../components/layouts/header";
import Sider from "../components/layouts/sider";
import Footer from "../components/layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;

export default function Dashboard(props) {
  return (
    <Layout hasSider>
      <Sider selectedKey="dashboard" signOut={props.signOut}/>
      <Layout className="site-layout">
        <Header  />
        <Content
          className="content"
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "550px",
          }}
        >
          <div className="site-layout-background">
            <h1>Dashboard</h1>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
