import MD5 from 'js-md5';
// import { transferAddressMap, chianNameMap, contractAddressMap } from '@/config';
import { localStorageApi } from '@/store';

const transferAddressMap = {},
  chianNameMap = {},
  contractAddressMap = {};

export const md5 = word => MD5(word);
export const throttle = (fn, ms) => {
  let startTime = 0;

  return (...arg) => {
    if (Date.now() - startTime > ms) {
      fn(...arg);
      startTime = Date.now();
    }
  };
};
export const debounce = (fn, ms) => {
  let timer = null;

  return (...arg) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg);
    }, ms);
  };
};
export const isPc = () => {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return false;
  }
  return true;
};

export const getChianName = id => {
  if (!id) {
    id = localStorageApi.get('chainId');
  }
  return chianNameMap[id] || 'eth';
};

export const getContractAddress = id => {
  if (!id) {
    id = localStorageApi.get('chainId');
  }
  return contractAddressMap[id];
};

export const getContractAbi = (id, abiMap) => {
  const isPro = process.env.REACT_APP_RELEASE_ENV === 'production';
  const key = getChianName(id);
  return abiMap[`${key}${isPro ? '' : '_test'}`];
};

export const getTransferAddress = id => transferAddressMap[id];

export const formatUserName = (userName, start = 4, end = 4) => {
  if (!userName) return '';

  return `${userName.substring(0, start)}...${userName.substring(userName.length - end)}`;
};

export const copyText = text => {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
};

export const formatNumber = (data, precision = 2) => new Intl.NumberFormat('en-IN').format(Number(data?.toFixed(precision)));
