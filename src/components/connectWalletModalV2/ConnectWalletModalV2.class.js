/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect } from 'react';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletProvider, useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import {
  WalletActionButton,
  // WalletConnectButton,
  // WalletDisconnectButton,
  WalletModalProvider,
  // WalletSelectButton,
} from '@tronweb3/tronwallet-adapter-react-ui';
// import toast from 'react-hot-toast';
import { message } from 'antd';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Alert } from '@mui/material';
import { BitKeepAdapter, OkxWalletAdapter, TokenPocketAdapter, TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
// import { tronWeb } from './tronweb';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';
// import { Button } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import useStoreApi from '@/hooks/useStoreApi';
// const rows = [
//   // { name: 'Connect Button', reactUI: WalletConnectButton },
//   // { name: 'Disconnect Button', reactUI: WalletDisconnectButton },
//   // { name: 'Select Wallet Button', reactUI: WalletSelectButton },
//   { name: 'Multi Action Button', reactUI: WalletActionButton },
// ];
/**
 * wrap your app content with WalletProvider and WalletModalProvider
 * WalletProvider provide some useful properties and methods
 * WalletModalProvider provide a Modal in which you can select wallet you want use.
 *
 * Also you can provide a onError callback to process any error such as ConnectionError
 */
export default function HomeTestView() {
  function onError(e) {
    if (e instanceof WalletNotFoundError) {
      message.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      message.error(e.message);
    } else message.error(e.message);
  }

  const adapters = useMemo(function () {
    const tronLinkAdapter = new TronLinkAdapter();
    const walletConnectAdapter = new WalletConnectAdapter({
      // 'Mainnet' | 'Shasta' | 'Nile'
      // process.env.REACT_APP_RELEASE_ENV === 'production'
      network: window.xa_mainNetwork,
      options: {
        relayUrl: 'wss://relay.walletconnect.com',
        // example WC app project ID
        projectId: '60ead47bf2c67c959e241a66e0a02864',
        // metadata: {
        //   name: 'Test DApp',
        //   description: 'JustLend WalletConnect',
        //   url: 'https://your-dapp-url.org/',
        //   icons: ['https://your-dapp-url.org/mainLogo.svg'],
        // },
      },
      web3ModalConfig: {
        themeMode: 'dark',
        themeVariables: {
          // '--w3m-z-index': '1000',
        },
        explorerRecommendedWalletIds: [
          '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
          '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
          '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
          // "ef333840daf915aafdc4a004525502d6d49d77bd9c65e0642dbaefb3c2893bef",
          // "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66"
        ],
      },
    });
    const ledger = new LedgerAdapter({
      accountNumber: 2,
    });
    const bitKeepAdapter = new BitKeepAdapter();
    const tokenPocketAdapter = new TokenPocketAdapter();
    const okxwalletAdapter = new OkxWalletAdapter();
    return [tronLinkAdapter, bitKeepAdapter, tokenPocketAdapter, okxwalletAdapter, walletConnectAdapter, ledger];
  }, []);

  return (
    <WalletProvider onError={onError} autoConnect={true} disableAutoConnectOnLoad={true} adapters={adapters}>
      <WalletModalProvider>
        <WalletProviderChild>
          <WalletActionButton />
        </WalletProviderChild>
      </WalletModalProvider>
    </WalletProvider>
  );
}

function WalletProviderChild(props) {
  const { wallet } = useWallet();
  const { setAddress } = useStoreApi();
  useEffect(() => {
    if (wallet) {
      console.log(wallet);
      setAddress(wallet.adapter.address);
      setTronWeb();

      wallet.adapter.on('connect', address => {
        console.log(address);
        setAddress(address);
        setTronWeb();
      });

      wallet.adapter.on('stateChanged', state => {
        console.log(state);
      });

      wallet.adapter.on('accountsChanged', data => {
        console.log(data);
      });

      wallet.adapter.on('chainChanged', data => {
        console.log(data);
      });

      wallet.adapter.on('disconnect', () => {
        // message.error('disconnect');
        // when disconnect from wallet
      });
    }
    return () => {
      // remove all listeners when components is destroyed
      wallet && wallet.adapter.removeAllListeners();
    };
  }, [wallet]);

  const setTronWeb = () => {
    try {
      window.tronWebIns = wallet.adapter._wallet.tronWeb;
    } catch (error) {}
  };

  return props.children;
}
// function SignDemo() {
//   const { signMessage, signTransaction, address } = useWallet();
//   const [message, setMessage] = useState('');
//   const [signedMessage, setSignedMessage] = useState('');
//   const receiver = 'TMDKznuDWaZwfZHcM61FVFstyYNmK6Njk1';
//   const [open, setOpen] = useState(false);

//   async function onSignMessage() {
//     const res = await signMessage(message);
//     setSignedMessage(res);
//   }

//   async function onSignTransaction() {
//     const transaction = await tronWeb.transactionBuilder.sendTrx(receiver, tronWeb.toSun(0.001), address);

//     const signedTransaction = await signTransaction(transaction);
//     // const signedTransaction = await tronWeb.trx.sign(transaction);
//     await tronWeb.trx.sendRawTransaction(signedTransaction);
//     setOpen(true);
//   }
//   return (
//     <div style={{ marginBottom: 200 }}>
//       <h2>Sign a message</h2>
//       <p style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', wordBreak: 'break-all' }}>
//         You can sign a message by click the button.
//       </p>
//       <Button style={{ marginRight: '20px' }} onClick={onSignMessage}>
//         SignMessage
//       </Button>
//       <Input size="small" onChange={e => setMessage(e.target.value)} placeholder="input message to signed"></Input>
//       <p>Your sigedMessage is: {signedMessage}</p>
//       <h2>Sign a Transaction</h2>
//       <p style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', wordBreak: 'break-all' }}>
//         You can transfer 0.001 Trx to &nbsp;<i>{receiver}</i>&nbsp;by click the button.
//       </p>
//       <Button onClick={onSignTransaction}>Transfer</Button>
//       {/* {open && (
//                 <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', marginTop: 1 }}>
//                     Success! You can confirm your transfer on{' '}
//                     <a target="_blank" rel="noreferrer" href={`https://nile.tronscan.org/#/address/${address}`}>
//                         Tron Scan
//                     </a>
//                 </Alert>
//             )} */}
//     </div>
//   );
// }
