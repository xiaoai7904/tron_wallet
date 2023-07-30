import { message } from 'antd';
import { goodsListApi, rechargeApi, confirmRechargeApi, approveApi } from '@/module/requestApi/RequestApi';

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

  return {
    goodsListApi,
    rechargeRequest,
    confirmRechargeRequest,
    approveRequest,
  };
};

export default useGoods;
