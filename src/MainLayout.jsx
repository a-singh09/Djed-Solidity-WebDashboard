import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import MetamaskStatusButton, {
  DisconnectButton
} from "./components/molecules/MetamaskStatusButton/MetamaskStatusButton";

import { ReactComponent as Logo } from "./images/mdjed_testnet_white.svg";

import "antd/dist/antd.css";
import "./App.scss";
import { useAppProvider } from "./context/AppProvider";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function MainLayout() {
  const { isWalletConnected } = useAppProvider();
  const location = useLocation();

  return (
    <div>
      <Layout className="layout">
        <Header className="header-desktop">
          <div className="logo">
            <Logo />
          </div>
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/">
              <Link to="/">Protocol</Link>
            </Menu.Item>
            <Menu.Item key="/stabledjed">
              <Link to="/stabledjed">StableDjed</Link>
            </Menu.Item>
            <Menu.Item key="/reservedjed">
              <Link to="/reservedjed">ReserveDjed</Link>
            </Menu.Item>
            <Menu.Item key="/my-balance" disabled={!isWalletConnected}>
              <Link to="/my-balance">My Balance</Link>
            </Menu.Item>
          </Menu>
          <div className="WalletConfig">
            {isWalletConnected ? <DisconnectButton /> : null}
            <MetamaskStatusButton />
          </div>
        </Header>
        <HeaderMobileMenu isWalletConnected={isWalletConnected} />
        <Content>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

const HeaderMobileMenu = ({ isWalletConnected }) => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const MenuIcon = isMenuOpen ? CloseOutlined : MenuOutlined;
  const handleVisibleChange = (flag) => {
    setMenuOpen(flag);
  };

  return (
    <div className="header-mobile">
      <div className="logo">
        <Logo />
      </div>
      <Dropdown
        overlayClassName="menu-mobile-dropdown"
        visible={isMenuOpen}
        onVisibleChange={handleVisibleChange}
        overlay={
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            onClick={() => setMenuOpen(false)}
          >
            <Menu.Item key="/">
              <Link to="/">Protocol</Link>
            </Menu.Item>
            <Menu.Item key="/stabledjed">
              <Link to="/stabledjed">StableDjed</Link>
            </Menu.Item>
            <Menu.Item key="/reservedjed">
              <Link to="/reservedjed">ReserveDjed</Link>
            </Menu.Item>
            <Menu.Item key="/my-balance" disabled={!isWalletConnected}>
              <Link to="/my-balance">My Balance</Link>
            </Menu.Item>
            <div className="WalletConfig">
              {isWalletConnected ? <DisconnectButton /> : null}
              <MetamaskStatusButton />
            </div>
          </Menu>
        }
        placement="topLeft"
      >
        <MenuIcon
          style={{ fontSize: 22 }}
          className="menu-mobile-icon"
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </Dropdown>
    </div>
  );
};
