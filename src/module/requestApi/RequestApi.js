import Http from '../http/Http';
const httpIns = new Http();

// 注册
export const registerApi = (params = {}) => httpIns.post('/api/v1/userfront/register', params);

// 获取用户信息
export const getUserInfoApi = () => httpIns.post('/api/v1/userfront/user-info');

// 登录
export const loginApi = (params = {}) => httpIns.post('/api/v1/userfront/login-contract', params);

// 登出
export const logoutApi = (params = {}) => httpIns.post('/api/v1/userfront/logout', params);

//用户检查
export const logoutCheckApi = (params = {}) => httpIns.post('/api/v1/userfront/login-check', params);

// 游戏列表
export const gameListApi = (params = {}) => httpIns.post('/api/v1/game/list', params);

// 游戏详情
export const gameInfoApi = (params = {}) => httpIns.post('/api/v1/game/info', params);

// 提交审核
export const promoteApplyApi = (params = {}) => httpIns.post('/api/v1/promote/apply', params);

// 获取推广链接
export const promoteInfoApi = (params = {}) => httpIns.post('/api/v1/promote/info', params);

// 获取游戏列表收益
export const gameIncomeListApi = (params = {}) => httpIns.post('/api/v1/income/game-income-list', params);

// 游戏收益详情
export const gameIncomeDayListApi = (params = {}) => httpIns.post('/api/v1/income/income-day-list', params);

//提现记录
export const withdrawListApi = (params = {}) => httpIns.post('/api/v1/withdraw/list', params);

//提现
export const withdrawApi = (params = {}) => httpIns.post('/api/v1/withdraw/save', params);

//提现额度
export const withdrawAmountApi = (params = {}) => httpIns.post('/api/v1/withdraw/info', params);
