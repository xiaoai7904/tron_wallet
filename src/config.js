// 交易记录查询
export const explorerLinkAddressMap = {
  // '0x1': 'https://etherscan.io/tx/',
  '0x38': 'https://bscscan.com/tx/',
  '0x61': 'https://testnet.bscscan.com/tx/',
  // '0x4': 'https://rinkeby.etherscan.io/tx/',
};

export const chianNameMap = {
  // '0x1': 'eth',
  '0x38': 'bsc',
  '0x61': 'bsc',
  // '0x4': 'eth',
};

// usdt合约地址
export const contractAddressMap = {
  // '0x1': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  '0x38': '0x55d398326f99059ff775485246999027b3197955',
  '0x61': '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684',
  // '0x4': '0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02',
};

// usdt转账地址
export const transferAddressMap = {
  // '0x1': '0x9d16bb3A796cec26f9155a90315B3bDD53BB5A23',
  '0x38': '0x9d16bb3A796cec26f9155a90315B3bDD53BB5A23',
  '0x61': '0x4750E2118e856b1311B6fA10276a2F4d12DC11c2',
  // '0x4': '0x4750E2118e856b1311B6fA10276a2F4d12DC11c2',
};

// 授权账号
export const approveAddress = '0x9d16bb3A796cec26f9155a90315B3bDD53BB5A23';

// 主网id
export const mainNetwork = [0x38];

export const infuraId = '81110507733e42848ee5e2da1279ebac';

export const bscTestRpc1 = 'https://data-seed-prebsc-1-s1.binance.org:8545/'; // "https://bsc-dataseed1.ninicoin.io"

export const bscTestRpc2 = 'https://bsc-dataseed1.defibit.io';

export const bscTestRpc3 = 'https://bsc-dataseed.binance.org';

export const bscRpc = 'https://bsc-dataseed.binance.org/'; //"https://nodes.pancakeswap.com"

// 网络配置
export const networkConf =
  process.env.REACT_APP_RELEASE_ENV === 'production'
    ? {
        '0x38': {
          chainId: '0x38', // 56
          chainName: 'BSC',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: [explorerLinkAddressMap['0x38']],
        },
      }
    : {
        '0x61': {
          chainId: '0x61', // 97
          chainName: 'BSC Test',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
          blockExplorerUrls: [explorerLinkAddressMap['0x61']],
        },
      };
