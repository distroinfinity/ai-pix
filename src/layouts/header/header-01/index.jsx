/* eslint-disable no-console */
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Web3 from "web3";
import Logo from "../../../components/logo";
import ColorSwitcher from "../../../components/color-switcher";
import Button from "./../../../components/ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "./../../../hooks";
import headerData from "../../../data/general/header-01.json";

const Header = ({ className }) => {
  const sticky = useSticky();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        const getEthBalance = await web3.eth.getBalance(account);
        setEthBalance(getEthBalance);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <header
        className={clsx(
          "rn-header haeder-default black-logo-version header--fixed header--sticky",
          sticky && "sticky",
          className
        )}
      >
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <Logo logo={headerData.logo} />
              <div className="mainmenu-wrapper">
                <nav
                  id="sideNav"
                  className="mainmenu-nav d-none d-xl-block"
                ></nav>
              </div>
            </div>
            <div className="header-right">
              {!isAuthenticated && (
                <div className="setting-option header-btn">
                  <div className="icon-box">
                    <Button
                      color="primary-alta"
                      className="connectBtn"
                      size="small"
                      onClick={onConnect}
                    >
                      Wallet connect
                    </Button>
                  </div>
                </div>
              )}

              <div id="my_switcher" className="setting-option my_switcher">
                <ColorSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
