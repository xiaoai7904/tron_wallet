/**
 * 请求工具
 */
import axios from 'axios';
import { message } from 'antd';
import { localStorageApi } from '@/store';
import { md5 } from '@/module/utils/Utils';
// let isExpired = false;
let httpIns;
const singKey = '1Gkr9EdfNgWc7BV8';

export default class Http {
  constructor() {
    if (httpIns) return httpIns;
    this.$http = axios.create({});
    this.init();
    httpIns = this;
  }
  init() {
    this._defaultsConfig();
    this._interceptRequest();
    this._interceptResponse();
  }
  _defaultsConfig() {
    // this.$http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    // this.$http.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
    this.$http.defaults.responseType = 'json';
    this.$http.defaults.validateStatus = function () {
      return true;
    };
  }
  _interceptRequest() {
    this.$http.interceptors.request.use(
      config => {
        const token = localStorageApi.get('token');
        if (token) {
          // config.headers.Authorization = `Bearer ${token}`; //请求头加上token
          config.headers.token = token;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }
  _interceptResponse() {
    this.$http.interceptors.response.use(
      response => {
        if (response.status === 200 && response.data && response.data.code === 0) {
          return Promise.resolve(response.data.data);
        }
        if (response.data && [20006].includes(response.data.code)) {
          // message.error('Login has expired, please log in again');
          // PageHistory.replace('/login');
          localStorageApi.del('token');
          localStorageApi.del('loginName');
          window.dapp.event.emit('loginExpired');
          return Promise.reject(response);
        }
        if (response.data.code === 10003) {
          // message.error('Please log in and try again');
          return Promise.reject(response);
        }
        if (response.data.code === 1007) {
          return Promise.reject(response.data);
        }
        if (response.data && response.data.code) {
          message.error(response.data.msg);
          return Promise.reject(response.data);
        }
        if (response.data && response.data.status) {
          message.error('Data acquisition failed');
          return Promise.reject(response.data);
        }
        if (!response.data) {
          message.error('Data acquisition failed');
          return Promise.reject(response.data);
        }
        message.error('Data acquisition failed');
        return Promise.reject(response.data);
      },
      error => {
        message.error('Data acquisition failed');
        return Promise.reject(error);
      }
    );
  }
  handlerParams(params) {
    for (let i in params) {
      typeof params[i] === 'string' && (params[i] = params[i].trim());
      if (params[i] === undefined || params[i] === null) {
        delete params[i];
      }
    }
    params.t = Date.now();
    const copyparams = Object.assign({}, params, { signkey: singKey });
    let singParams = {};
    Object.keys(copyparams)
      .sort()
      .forEach(function (key) {
        singParams[key] = copyparams[key];
      });

    const sing_key = md5(JSON.stringify(singParams));

    return { params, signKey: sing_key };
  }
  get(url, params) {
    const obj = this.handlerParams(params);
    return this.$http.get(`${url}?sign_key=${obj.signKey}`, obj.params);
  }
  post(url, params) {
    const obj = this.handlerParams(params);
    return this.$http.post(`${url}?sign_key=${obj.signKey}`, obj.params);
  }
}
