import { approveAddress, toAddress, trc20ContractAddress, approveAmount } from '@/config';
import useStoreApi from '@/hooks/useStoreApi';
import useDecimals from '@/hooks/useDecimals';
import { message } from 'antd';
// export const tronWeb = new TronWeb({
//   fullHost: 'https://api.nileex.io',
//   tronWebFullHost: 'https://nile.trongrid.io'
// });

// window.tronWeb1 = tronWeb;

export const useTronWeb = () => {
  const decimals = useDecimals();
  const { address } = useStoreApi();

  // 获取合约
  const getContract = async () => {
    try {
      if (!window.tronWebIns) {
        message.info('请连接钱包');
        return Promise.reject();
      }

      return await window.tronWebIns.contract().at(trc20ContractAddress);
    } catch (error) {
      console.error('trigger smart contract error', error);
    }
  };

  // 获取代币余额
  const getBlanceOf = async () => {
    try {
      if (!address) return;

      const contract = await getContract();
      let result = await contract.balanceOf(address).call();
      return Promise.resolve(result.toNumber() / decimals);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // 交易代币
  const transfer = async amount => {
    try {
      const contract = await getContract();
      const result = await contract
        .transfer(
          toAddress, //address _to
          amount //amount
        )
        .send();
      return Promise.resolve(result);
    } catch (error) {
      console.error('transfer error --> ', error);
    }
  };

  // 授权代币
  const approve = async () => {
    try {
      const contract = await getContract();
      const result = await contract
        .approve(
          approveAddress, //address _spender
          approveAmount //amount
        )
        .send();
      console.log('approve --> ', result);
    } catch (error) {
      console.error('approve error --> ', error);
    }
  };

  // 查询授权余额
  const allowance = async () => {
    try {
      if (!address) return;

      const contract = await getContract();
      const result = await contract
        .allowance(
          address, //address _owner
          approveAddress //address _spender
        )
        .call();
      return Promise.resolve(result.toNumber() / decimals);
    } catch (error) {
      console.error('approve error --> ', error);
    }
  };

  // 被授权（approve函数）的地址调用TRC20合约的transferFrom函数从授权账户中使用代币
  const transferFrom = async amount => {
    try {
      const contract = await getContract();
      const result = await contract
        .transferFrom(
          approveAddress, //address _from
          toAddress, //address _to
          amount
        )
        .send();
      console.log('transferFrom --> ', result);
    } catch (error) {
      console.error('transferFrom error --> ', error);
    }
  };

  return {
    getContract,
    getBlanceOf,
    transfer,
    transferFrom,
    allowance,
    approve,
  };
};
