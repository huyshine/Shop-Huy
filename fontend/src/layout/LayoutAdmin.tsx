import React, { createContext, useState } from "react";
import {
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import Head from "../component/header";
import Footer from "../component/footer"
import { AiOutlineComment } from "react-icons/ai";
import { BsFileEarmarkPostFill } from "react-icons/bs";

const { Header, Content , Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
import { VscFeedback } from "react-icons/vsc";
import { AiFillBank, AiOutlineUserSwitch } from "react-icons/ai";
import { BsBuildingFillCheck } from "react-icons/bs";

export const LayoutContext = createContext("");

const LayoutAdmin = () => {
  const items: MenuItem[] = [
    getItem(
      "Thống kê",
      "1",
      <Link onClick={() => handleTitleChange("Thống kê")} to={`dashboard`}>
        <PieChartOutlined />
      </Link>
    ),
    getItem(
      "Đánh giá",
      "2",
      <Link onClick={() => handleTitleChange("Đánh giá")} to={`feedback`}>
        <VscFeedback />
      </Link>
    ),
    getItem(
      "Loại sản phẩm",
      "3",
      <Link onClick={() => handleTitleChange("Loại sản phẩm")} to={`category`}>
        <VscFeedback />
      </Link>
    ),
    getItem("Sản phẩm", "6", <Link onClick={() => handleTitleChange("Sản phẩm")} to={`product`}> <BsBuildingFillCheck /></Link>), 
    getItem("Bài viết", "7", <Link onClick={() => handleTitleChange("Bài viết")}  to={`post`}><BsFileEarmarkPostFill /></Link>), 
    getItem("Bình luận", "8", <Link onClick={() => handleTitleChange("Bình luận")}  to={`comment`}><AiOutlineComment /></Link>), 
    getItem("Đơn hàng", "9", <Link onClick={() => handleTitleChange("Đơn hàng")} to={`order`}><AiFillBank /></Link>), 
    getItem("Tài khoản", "10", <Link onClick={() => handleTitleChange("Tài khoản")} to={`auth`}><AiOutlineUserSwitch /></Link>), 
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const [title , setTitle] = useState("Dashboard");

  const handleTitleChange = (title : any) => {
    setTitle(title);
  }
  
  return (

  <LayoutContext.Provider value={title}>
      <Layout style={{ minHeight: "100vh"  }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <div className="demo-logo-vertical" /> */}
        {/* <img className="p-2" src="./public/image/logo.png" alt="" /> */}
        <Menu
          className="text-[#737b8b] "
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="p-6" style={{ padding: 0, background: colorBgContainer }}>
              <Head/>
        </Header>
        <Content style={{ margin: "16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* Bill is a cat. */}
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </LayoutContext.Provider>    

    
  );
};

export default LayoutAdmin;
