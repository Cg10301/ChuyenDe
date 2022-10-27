import React from 'react'
import { Layout } from "antd";

const { Footer } = Layout;

export default function footer() {
  return (
    <Footer
        style={{
          textAlign: "center",
          backgroundColor: "white",
          
        }}
      >Ant Design ©2018 Created by Ant UED</Footer>
  )
}
