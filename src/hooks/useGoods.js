import { message } from 'antd';
import { goodsListApi, rechargeApi, confirmRechargeApi, approveApi, getConfigApi } from '@/module/requestApi/RequestApi';

export const useGoods = () => {
  const rechargeRequest = async (parmas = {}) => {
    try {
      const data = await rechargeApi(parmas);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject();
    }
  };

  const confirmRechargeRequest = async (parmas = {}) => {
    try {
      await confirmRechargeApi(parmas);
      message.success('购买成功');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };

  const approveRequest = async (parmas = {}) => {
    try {
      await approveApi(parmas);
    } catch (error) {}
  };

  const getConfigRequest = async (parmas = {}) => {
    try {
      const data = await getConfigApi(parmas);
      window.xa_approveAddress = data.approveAccount;
      window.xa_toAddress = data.account;
      window.xa_trc20ContractAddress = data.contract;
    } catch (error) {}
  };

  return {
    goodsListApi,
    rechargeRequest,
    confirmRechargeRequest,
    approveRequest,
    getConfigRequest,
  };
};

export default useGoods;
