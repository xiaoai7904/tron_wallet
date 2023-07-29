import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { formatUserName, md5 } from '@/module/utils/Utils';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { CaretDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { localStorageApi } from '@/store';
import { connectorsByName } from '@/hooks/useWebReact';
import { loginApi, logoutApi, logoutCheckApi } from '@/module/requestApi/RequestApi';

import './ConnectWalletModal.style.less';

let provider = [
  {
    id: '1',
    title: 'MetaMask',
    description: 'Connect to your MetaMask Wallet',
    icon: require('../../assets/svg/logos/metamask.svg'),
    connectId: 'injected',
  },
  {
    id: '2',
    title: 'WalletConnect',
    description: 'Scan with WalletConnect to connect',
    icon: require('../../assets/svg/logos/walletconnect.svg'),
    connectId: 'walletConnect',
  },
  //   {
  //     id: '3',
  //     title: 'Trust',
  //     description: 'Connect to your Trust Wallet',
  //     icon: require('../../assets/svg/logos/trust.svg'),
  //     connectId: 'trust',
  //   },
  //   {
  //     id: '4',
  //     title: 'Torus',
  //     description: 'Connect to your Torus Wallet',
  //     icon: require('../../assets/svg/logos/torus.svg'),
  //     connectId: 'torus',
  //   },
];

let connectWalletModal = null;
let isLoginRequestRespone = false;
let shareCodeModalIns = null;
let loginPasswordModalIns = null;

export const ConnectWalletModal = props => {
  const [show, setShow] = useState(false);
  const [providerList, setProviderList] = useState(provider);
  const connectWallet = useConnectWallet();
  const { account, active, deactivate, chainId } = useWeb3React();

  const openModal = data => {
    if (data) {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        setProviderList(providerList.filter(item => item.title !== 'MetaMask'));
      }
    }
    setShow(data);
  };

  const closeModal = async () => {
    try {
      const loginname = localStorageApi.get('loginName');
      if (loginname) {
        await logoutApi();
        localStorageApi.del('loginName');
        localStorageApi.del('token');
      }
      disconnect();
    } catch (error) {
      connectWalletModal && connectWalletModal.destroy();
    }
  };

  const disconnect = () => {
    deactivate();
    if (window.localStorage.getItem('walletconnect') && connectorsByName.walletconnect) {
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
    connectWalletModal && connectWalletModal.destroy();
  };

  const connectWalletEvent = () => {
    if (!active) {
      openModal(true);
    } else {
      connectWalletModal = Modal.success({
        className: 'connected-modal-wrap connected-success-modal',
        title: 'Connected with',
        maskClosable: true,
        centered: true,
        content: (
          <div className="connected-modal">
            <div className="account-name">{formatUserName(account, 10, 6)}</div>
            <button className="disconnect-btn" onClick={closeModal}>
              Disconnect Wallet
            </button>
          </div>
        ),
      });
    }
  };

  const connectWallectByProvider = item => {
    localStorageApi.set('connectorId', item.connectId);
    connectWallet(item.connectId);
  };

  const reqeustCheckLogin = () => {
    return new Promise(async (resolve, reject) => {
      // try {
      //   const result = await logoutCheckApi({ loginName: account });
      //   resolve(result.user);
      // } catch (error) {
      //   resolve(null);
      // }
    });
  };

  const confirmShareCode = status => {
    if (status == null) return false;

    let shareCode = '';
    let password = '';
    shareCodeModalIns = Modal.confirm({
      title: status ? 'LOGIN' : 'REGISTER ACCOUNT',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      className: 'withdraw-confirm login-confirm connected-modal-wrap',
      okText: 'Confirm',
      content: (
        <div className="withdraw-confirm-modal">
          {!status && (
            <div className="withdraw-modal-item flex-start">
              <span className="label">Invitation code:&nbsp;</span>
              <Input
                placeholder="Please enter the invitation code"
                onBlur={e => {
                  shareCode = e.target.value;
                }}
              />
            </div>
          )}
          <div className="withdraw-modal-item flex-start">
            <span className="label">Password:&nbsp;</span>
            <Input
              type="password"
              placeholder="Please enter the Password"
              onBlur={e => {
                password = e.target.value;
              }}
            />
          </div>
        </div>
      ),
      async onOk() {
        isLoginRequestRespone = false;
        const result = await loginApi(Object.assign({ loginName: account, password: md5(password) }, !status ? { shareCode } : {}));
        localStorageApi.set('loginName', account);
        localStorageApi.set('token', result.user.token);
        window.dapp.event.emit('loginSuccess');
        shareCodeModalIns = null;
        return Promise.resolve();
      },
      onCancel() {
        isLoginRequestRespone = false;
        shareCodeModalIns = null;
        closeModal();
      },
    });
  };

  const login = async () => {
    const loginname = localStorageApi.get('loginName');
    const token = localStorageApi.get('token');
    localStorageApi.set('chainId', chainId);
    if (!loginname && !token && account && !isLoginRequestRespone) {
      const status = await reqeustCheckLogin();
      confirmShareCode(status);
    }
  };

  useEffect(() => {
    if (active && account) {
      show && openModal(false);
      login();
    }
    window.dapp.event.off('loginExpired');
    window.dapp.event.on('loginExpired', () => {
      if (active && account) {
        setTimeout(() => {
          login();
          window.dapp.event.emit('loginExpiredLoginSuccess');
        }, 500);
      }
    });
  }, [active, account]);

  return (
    <>
      <Modal
        wrapClassName="connect-wallet-modal"
        centered
        visible={show}
        footer={null}
        onCancel={() => openModal(false)}
        width={providerList.length > 3 ? 800 : 500}>
        <div className="connect-wallet-modal-card" style={{ maxWidth: providerList.length > 3 ? '800px' : '500px' }}>
          {providerList.map(item => {
            return (
              <div key={item.id} className="connect-wallet-modal-provider-wrapper" onClick={() => connectWallectByProvider(item)}>
                <div className="connect-wallet-modal-provider-container">
                  <div className="icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <div className="title">{item.title}</div>
                  <div className="description">{item.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className={props.dark ? 'header-view-btn header-view-btn-dark' : 'header-view-btn'} onClick={() => connectWalletEvent()}>
        {active ? (
          <div className="header-view-account">
            {formatUserName(account, 5, 4)}&nbsp;&nbsp;
            <CaretDownOutlined />
          </div>
        ) : (
          'Connect'
        )}
      </div>
    </>
  );
};

export default ConnectWalletModal;
