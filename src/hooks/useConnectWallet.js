import React, { useCallback, useMemo } from 'react';
import { notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { networkConf } from '@/config';
import { connectorsByName } from '@/hooks/useWebReact';
import { localStorageApi } from '@/store';

let showChangeNetworkModalCount = 0;

const NetWorkErrorTips1 = () => {
  notification.error({
    message: 'Unable to find connector',
    duration: null,
    description: `The connector config is wrong`,
  });
};

const NetWorkErrorTips2 = () => {
  notification.error({
    message: 'Provider Error',
    duration: null,
    description: `No provider was found`,
  });
};

const NetWorkErrorTips3 = () => {
  notification.error({
    message: 'Authorization Error',
    duration: null,
    description: `Please authorize to access your account`,
  });
};

const ChangeAccountTips = () => {
  notification.error({
    message: 'Account changes',
    duration: null,
    description: `Please login again`,
  });
};

const AccountLockTips = () => {
  notification.error({
    message: 'Account lockout',
    duration: null,
    description: `Please unlock account`,
  });
};

const changeNetworkModal = () => {
  return new Promise(reslove => {
    if (showChangeNetworkModalCount > 0) return;
    Modal.confirm({
      className: 'connected-modal-wrap network-modal login-confirm ',
      title: 'Current network is not supported.',
      icon: <ExclamationCircleOutlined />,
      maskClosable: true,
      centered: true,
      content: ' Change to supported network: "BSC Mainnet"',
      onOk() {
        reslove(process.env.REACT_APP_RELEASE_ENV === 'production' ? '0x38' : '0x61');
        showChangeNetworkModalCount = 0;
      },
      onCancel() {
        showChangeNetworkModalCount = 0;
      },
    });
    showChangeNetworkModalCount++;
  });
};

export const setupNetwork = chainId => {
  return new Promise((reslove, reject) => {
    const { ethereum } = window;
    const _chainId = chainId || window.ethereum.chainId;
    if (ethereum && ethereum.isMetaMask) {
      if (networkConf[_chainId]) {
        ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networkConf[_chainId],
              },
            ],
          })
          .then(() => {
            setTimeout(reslove, 500);
          });
      } else {
        changeNetworkModal().then(data => setupNetwork(data));
      }
    } else {
      reject();
    }
  });
};

export const useConnectWallet = () => {
  const { activate, deactivate, active } = useWeb3React();
  const connectWallet = useCallback(
    connectorID => {
      return new Promise((reslove, reject) => {
        if (!connectorID) {
          connectorID = localStorageApi.get('connectorId');
        }
        const connector = connectorsByName[connectorID];
        if (connector) {
          activate(connector, async error => {
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await setupNetwork();
              if (hasSetup) {
                activate(connector);
              }
            } else {
              window.localStorage.removeItem('connectorId');
              if (error.code === -32002) {
                AccountLockTips();
              } else if (error instanceof NoEthereumProviderError) {
                NetWorkErrorTips2();
              } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
                if (connector instanceof WalletConnectConnector) {
                  connector.walletConnectProvider = null;
                }
                NetWorkErrorTips3();
              } else {
                console.error(error);
                NetWorkErrorTips1();
              }
            }
          });
        } else {
          NetWorkErrorTips1();
        }
      });
    },
    [activate]
  );

  useMemo(() => {
    if (window.ethereum) {
      window.ethereum.on('connect', () => {
        console.log('connectSuccess');
        window.xa.$event.emit('connectSuccess');
      });

      window.ethereum.on('networkChanged', () => {
        // 切换网络后，尝试连接
        !active && connectWallet();
      });

      window.ethereum.on('accountsChanged', accounts => {
        const loginName = localStorageApi.get('loginName');
        if ((loginName && loginName !== accounts[0]) || !accounts[0]) {
          ChangeAccountTips();
          deactivate();
          localStorageApi.del('token');
          localStorageApi.del('loginName');
        }
      });

      window.ethereum.on('disconnect', () => {
        deactivate();
        localStorageApi.del('token');
        localStorageApi.del('loginName');
      });

      window.ethereum.on('close', () => {
        deactivate();
        localStorageApi.del('token');
        localStorageApi.del('loginName');
      });

      window.ethereum.on('message', message => {
        console.log('message', message);
      });

      // 初始化连接钱包
      const chainId = localStorageApi.get('chainId');
      const connectorId = localStorageApi.get('connectorId');
      connectorId && chainId && !active && connectWallet(connectorId);
    }
  }, []);

  return connectWallet;
};
