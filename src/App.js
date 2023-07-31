/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import './style/index.less';
import RouterApp from '@/router/Router';
import useStoreApi from '@/hooks/useStoreApi';
import { debounce } from '@/module/utils/Utils';
import PageLoading from '@/components/pageLoading/PageLoading.view';
import {useGoods} from '@/hooks/useGoods'
import mitt from 'mitt';

window.xa = {};
window.xa.$event = mitt();

const App = () => {
  const { setIsPc, setIsMinScreen } = useStoreApi();
  const { getConfigRequest } = useGoods();

  const windowResizeEvent = debounce(() => {
    setIsPc(document.body.clientWidth > 1000);
    setIsMinScreen(document.body.clientHeight <= 900);
  }, 500);

  useEffect(() => {
    getConfigRequest()
    setIsPc(document.body.clientWidth > 1000);
    setIsMinScreen(document.body.clientHeight <= 900);
    window.addEventListener('resize', windowResizeEvent);
    return () => {
      window.removeEventListener('resize', windowResizeEvent);
    };
  }, []);

  return (
    <>
      <RouterApp />
      <PageLoading />
    </>
  );
};

export default App;
