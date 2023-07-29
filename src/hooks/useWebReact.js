import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { bscRpc, bscTestRpc1, infuraId } from '@/config';

const POLLING_INTERVAL = 12000;

export const ChainId = {
  BSC: 56,
  BSC_TEST: 97,
};

const getRpcUrl = () => {
  if (process.env.REACT_APP_RELEASE_ENV === 'production') {
    return { [ChainId.BSC]: bscRpc };
  }
  return { [ChainId.BSC_TEST]: bscTestRpc1 };
};

export const getLibrary = provider => {
  const library = new Web3(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const injectedChainId = () => {
  if (process.env.REACT_APP_RELEASE_ENV === 'production') {
    return [ChainId.BSC];
  }
  return [ChainId.BSC_TEST];
};

export const injected = new InjectedConnector({
  supportedChainIds: injectedChainId(),
});

export const walletconnect = new WalletConnectConnector({
  rpc: getRpcUrl(),
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
  infuraId,
});

export const connectorsByName = {
  injected: injected,
  walletConnect: walletconnect,
};
