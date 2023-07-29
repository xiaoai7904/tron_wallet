import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import useStoreApi from '@/hooks/useStoreApi';

export const PageLoading = () => {
  const { pageLoading } = useStoreApi();
  if (pageLoading)
    return (
      <div className="flex-center" style={{ height: '100vh', position: 'fixed', zIndex: 999, inset: 0, background: '#0000005c' }}>
        <LoadingOutlined style={{ fontSize: '60px', color: '#3393bb' }} />
      </div>
    );
  return null;
};

export default PageLoading;
