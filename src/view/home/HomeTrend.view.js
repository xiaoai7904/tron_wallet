import React from 'react';
import { Row, Col } from 'antd';
import {
  user1Icon,
  user2Icon,
  user3Icon,
  user4Icon,
  user5Icon,
  user6Icon,
  user7Icon,
  user8Icon,
  user9Icon,
  user10Icon,
  user11Icon,
} from '@/assets';
import './Home.style.less';

const UserList = [
  {
    label: 'Montiya_monk',
    price: '0.074',
    icon: user1Icon,
  },
  {
    label: 'Jon_malik',
    price: '0.074',
    icon: user2Icon,
  },
  {
    label: 'Benjamin0025',
    price: '0.074',
    icon: user3Icon,
  },
  {
    label: 'Solo_mon',
    price: '0.074',
    icon: user4Icon,
  },
  {
    label: 'Robin_Milford',
    price: '0.074',
    icon: user5Icon,
  },
  {
    label: 'Montiya_monk',
    price: '0.074',
    icon: user6Icon,
  },
  {
    label: 'Montiya_monk',
    price: '0.074',
    icon: user7Icon,
  },
  {
    label: 'Rewual@2',
    price: '0.074',
    icon: user8Icon,
  },
  {
    label: 'Jeena_Parker',
    price: '0.074',
    icon: user9Icon,
  },
  {
    label: 'Flappy_Tom',
    price: '0.074',
    icon: user10Icon,
  },
  {
    label: 'Spark_ye',
    price: '0.074',
    icon: user11Icon,
  },
];
export const HomeTrendView = () => {
  return (
    <section className="home-trend">
      <div className="home-trend-wrap">
        <div className="app-container">
          <h1>Trending Creators</h1>
          <p className="sub-title">NFT Card will give you Access to Special Airdrops.</p>
          <div>
            <Row gutter={[30, 30]}>
              {UserList.map((item, index) => (
                <Col key={index} xs={24} sm={24} md={10} lg={8} xl={6} xxl={6}>
                  <div className="home-trend-item flex-start">
                    <img src={item.icon} />
                    <div className="home-trend-item-label">
                      <h4>{item.label}</h4>
                      <p>
                        <span>{item.price}</span>&nbsp;&nbsp;ETH
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrendView;
