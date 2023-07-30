import React, { useState, useEffect } from 'react';
import PageHistory from '@/router/PageHistory';
// import { Drawer } from 'antd';
// import { HomeOutlined, MenuOutlined, AppstoreOutlined } from '@ant-design/icons';
import ConnectWalletModal from '@/components/connectWalletModalV2/ConnectWalletModalV2.class';
// import { logoIcon } from '@/assets';
import './Header.style.less';

let ticking = false;
export const AppHeaderView = props => {
  // const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const gotoView = path => {
    PageHistory.replace(path);
  };
  // const gotoHome = () => {
  //   PageHistory.replace('/home');
  // };
  // const onClose = () => {
  //   setVisible(false);
  // };

  const navList = [
    // {
    //   label: 'About',
    //   path: '/about',
    // },
    // {
    //   label: 'Store',
    //   path: '/store',
    // },
    // {
    //   label: 'Roadmap',
    //   path: '/aboutDetails',
    // },
    // {
    //   label: 'Blog Page',
    //   path: '/aboutPage',
    // },
    // {
    //   label: 'Details',
    //   path: '/about',
    // },
  ];

  const scrollEvent = e => {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        setTop(scrollY);
        ticking = false;
      });

      ticking = true;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <div className={top > 100 ? 'app-h5-header app-view-header' : 'app-view-header'}>
      <div className="app-view-header-wrap flex-between">
        {/* <img className="app-view-logo" src={logoIcon} alt="app" onClick={() => gotoHome()} /> */}
        <div className="app-view-nav-content flex-start">
          <ul className="app-view-nav flex-between">
            {navList.map((item, index) => (
              <li key={index} onClick={() => gotoView(item.path)}>
                {item.label}
              </li>
            ))}
          </ul>
          <ConnectWalletModal/>
        </div>
      </div>
      <div className="h5-header">
        <div className="flex-center">
          {/* <img className="app-view-logo" src={logoIcon} alt="app" onClick={() => gotoHome()} /> */}
        </div>
        <div className="h5-header-nav flex-end">
          {/* <MenuOutlined className="app-view-header-menu" style={{ fontSize: '24px', color: '#fff' }} onClick={() => setVisible(true)} /> */}
          <ConnectWalletModal/>
        </div>
      </div>
      {/* <Drawer placement="left" onClose={onClose} visible={visible} width={'50vw'} closable={false} className="mini-nav">
        <img className="app-view-logo" src={logoIcon} alt="app" onClick={() => gotoHome()} />
        <ul className="app-view-mini-nav">
          {navList.map((item, index) => (
            <li key={index} onClick={() => gotoView(item.path)}>
              {item.label}
            </li>
          ))}
        </ul>
      </Drawer> */}
    </div>
  );
};

export default AppHeaderView;
