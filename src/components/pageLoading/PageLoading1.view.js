/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import PageHistory from '@/router/PageHistory';
export const PageLoading = () => {
  const data = PageHistory.location.state;

  useEffect(() => {
    setTimeout(() => {
      PageHistory.push('/storeDetails', data);
    }, 500);
  }, []);

  return (
    <div className="flex-center" style={{ height: '100vh', position: 'fixed', zIndex: 999, inset: 0, background: '#0000005c' }}>
      <LoadingOutlined style={{ fontSize: '60px', color: '#3393bb' }} />
    </div>
  );
};

export default PageLoading;
