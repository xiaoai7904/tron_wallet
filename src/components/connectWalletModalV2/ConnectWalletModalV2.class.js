import React, { useMemo, useState } from 'react';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import {
  WalletActionButton,
  WalletConnectButton,
  WalletDisconnectButton,
  WalletModalProvider,
  WalletSelectButton,
} from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { Input } from 'antd';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Alert } from '@mui/material';
import { BitKeepAdapter, OkxWalletAdapter, TokenPocketAdapter, TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { tronWeb } from './tronweb';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';
import { Button } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';

const rows = [
  // { name: 'Connect Button', reactUI: WalletConnectButton },
  // { name: 'Disconnect Button', reactUI: WalletDisconnectButton },
  // { name: 'Select Wallet Button', reactUI: WalletSelectButton },
  { name: 'Multi Action Button', reactUI: WalletActionButton },
];
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
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }
  const adapters = useMemo(function () {
    const tronLinkAdapter = new TronLinkAdapter();
    const walletConnectAdapter = new WalletConnectAdapter({
      network: 'Nile',
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
          '--w3m-z-index': '1000',
        },
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
        <WalletActionButton />
      </WalletModalProvider>
    </WalletProvider>
  );
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
