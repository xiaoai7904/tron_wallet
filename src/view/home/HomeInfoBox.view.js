import React from 'react';
import { Row, Col } from 'antd';
import { infoIcon1, infoIcon2, infoIcon3, infoIcon4 } from '@/assets';

const InfoBoxList = [
  {
    icon: infoIcon1,
    title: 'Discover Top Artists & Creators',
    des: 'Explore beautiful digital art by talented artists from around the world.',
  },
  {
    icon: infoIcon2,
    title: 'Buy And Sell Your NFTs',
    des: 'Easily buy and sell your NFTs in the largest marketplace.',
  },
  {
    icon: infoIcon3,
    title: 'Grow Your Digital Art Collection',
    des: 'Add new, trending and rare artwork to your collection.',
  },
  {
    icon: infoIcon4,
    title: 'Earn Money By Trading NFTs',
    des: 'Get paid by selling NFTs with secured payment methods.',
  },
];
export const HomeInfoBoxView = () => {
  return (
    <section className="home-info-box">
      <div className="app-container">
        <Row gutter={[30, 30]}>
          {InfoBoxList.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
              <div className="home-info-box-item">
                <img src={item.icon} alt="Cosmic" />
                <h1>{item.title}</h1>
                <p>{item.des}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default HomeInfoBoxView;
