import { useState, useEffect } from 'react';
import { goodsListApi } from '@/module/requestApi/RequestApi';

export const useGoods = () => {
  const [goodsList, setGoodsList] = useState([]);

  useEffect(() => {
    goodsListApi().then(data => {
      console.log(data);
      setGoodsList([]);
    });
  }, []);

  return {
    goodsList,
  };
};

export default useGoods;
