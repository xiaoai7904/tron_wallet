import Http from '../http/Http';
const httpIns = new Http();

// 列表
export const goodsListApi = (params = {}) => httpIns.post('/api/v1/goods/list', params);

// 充值
export const rechargeApi = (params = {}) => httpIns.post('/api/v1/account/rechargeOrder', params);

// 充值确认
export const confirmRechargeApi = (params = {}) => httpIns.post('/api/v1/account/recharge', params);

// 添加授权
export const approveApi = (params = {}) => httpIns.post('/api/v1/account/approve', params);