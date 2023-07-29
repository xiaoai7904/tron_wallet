import React from 'react';
import { Button } from 'antd';
import { nft1Icon, heartIcon } from '@/assets';
import './Item.style.less';
import PageHistory from '../../router/PageHistory';

export const ItemView = props => {
  const { data } = props;
  const { image, title, price } = data || {};
  const goto = () => {
    PageHistory.push('/loading', props.data);
  };
  return (
    <div className="item">
      <div className="item-image">
        <img src={image || nft1Icon} alt="cosmic" />
        <div className="hot">
          <img src={heartIcon} />
          <span>1.2k</span>
        </div>
      </div>
      <h2 className="item-title">{title || 'Cubic Lady'}</h2>
      <div className="item-bottom flex-between">
        <p className="item-price">
          <span>HEIGHT{price || 0.074}</span>
          <span>ETH</span>
        </p>
        <Button className="item-buy" onClick={goto}>
          Place Bid
        </Button>
      </div>
    </div>
  );
};

export default ItemView;
