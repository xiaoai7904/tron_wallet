import Http from '../http/Http';
const httpIns = new Http();

// 列表
export const goodsListApi = (params = {}) => httpIns.post('/api/v1/goods/list', params);
