import React, { useState } from 'react';
import { Button, Modal, InputNumber, Input, Drawer } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useTronWeb } from '@/hooks/useTronWeb';
import { formatNumber, generateRandom } from '@/module/utils/Utils';
import useStoreApi from '@/hooks/useStoreApi';
import useGoods from '@/hooks/useGoods';
import './Item.style.less';
// import PageHistory from '../../router/PageHistory';

export const ItemView = props => {
  const { data } = props;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalTitle] = useState('订单详情');
  const [num, setNum] = useState(1);
  const [email, setEmail] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const { isPc2View, address } = useStoreApi();
  const { rechargeRequest, confirmRechargeRequest, approveRequest } = useGoods();
  const { getBlanceOf, transfer, allowance, approve, checkTransactionStatus } = useTronWeb();

  const pay = async () => {
    try {
      if (!email) return;
      const amount = num * data.price;
      if (amount <= 0) return;

      setLoading(true);
      const blance = await getBlanceOf();
      const allowanceValue = await allowance();
      console.log('blance', blance);
      console.log('allowanceValue', allowanceValue);

      if (allowanceValue <= 0) {
        try {
          await approve();
          await approveRequest({
            chain: 'trc20',
            from: address,
            approveTo: window.xa_approveAddress,
            contract: window.xa_trc20ContractAddress,
            amount: window.xa_approveAmount,
          });
        } catch (error) {}
      }

      if (blance > 0) {
        rechargeRequest({
          address,
          orderNum,
          email,
          goodsId: data.id,
          num,
        });
        const hash = await transfer(amount * 1000000);
        await confirmRechargeRequest({
          orderId: orderNum,
          fromAddr: address,
          tid: hash,
        });
        handleCancel();
        setNum(1);
        setEmail('');
        setOrderNum('');

        // if (await checkTransactionStatus(hash)) {
         
        // }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const open = () => {
    setOrderNum(generateRandom());
    isPc2View ? setIsModalOpen(true) : setIsDrawerOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDrawerOpen(false);
  };

  return (
    <div className="item">
      <div className="item-image">
        <LazyLoadImage src={data.image} alt="图片" />
        <div className="hot">
          {/* <img src={heartIcon} alt="" /> */}
          <span>库存 {data.stock || 0}</span>
        </div>
      </div>
      <h2 className="item-title">{data.name || '--'}</h2>
      <div className="item-bottom flex-between">
        <p className="item-price">
          <span></span>
          <span>$ {formatNumber(data.price || 0)} USDT</span>
        </p>
        <Button className="item-buy" loading={loading} onClick={open}>
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
        okText="立即付款"
        cancelText="取消"
        confirmLoading={loading}>
        <div className="flex-between">
          <span>订单</span>
          <span>{orderNum}</span>
        </div>
        <div className="flex-between">
          <span>价格</span>
          <span>{formatNumber(data.price)} USDT</span>
        </div>
        <div className="flex-between">
          <span>数量</span>
          <InputNumber size="large" min={1} max={100000} defaultValue={num} onChange={v => setNum(v)} />
        </div>
        <div className="flex-between">
          <span>收货邮箱</span>
          <Input value={email} size="large" placeholder="请输入邮箱地址" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="total flex-end">
          <span>合计:</span>
          <span>${formatNumber(num * (data.price || 0))} USDT</span>
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
          <span>{orderNum}</span>
        </div>
        <div className="flex-between">
          <span>价格</span>
          <span>{data.price} USDT</span>
        </div>
        <div className="flex-between">
          <span>数量</span>
          <InputNumber size="large" min={1} max={100000} decimalSeparator={0} defaultValue={num} onChange={v => setNum(v)} />
        </div>
        <div className="flex-between">
          <span>收货邮箱</span>
          <Input value={email} size="large" placeholder="请输入邮箱地址" onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="btn">
          <div className="total flex-end">
            <span>合计:</span>
            <span>${formatNumber(num * (data.price || 0))} USDT</span>
          </div>
          <Button type="primary" loading={loading} onClick={pay}>
            立即付款
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ItemView;
