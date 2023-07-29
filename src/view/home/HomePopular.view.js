import React from 'react';
import { Row, Col, Button } from 'antd';
import ItemView from '@/components/item/Item.view';
import './Home.style.less';

export const HomePopularView = () => {
  return (
    <section className="home-popular">
      <div className="app-container">
        <div className="home-popular-header flex-between">
          <div className="home-popular-header-title">
            <h2>Trending NFTs Of This Season</h2>
            <p>NFT Card will give you Access to Special Airdrops lorem ipsum.</p>
          </div>
          <Button>Popular NFTs</Button>
        </div>
        <div className="home-popular-list">
          <Row gutter={[30, 24]}>
            {[1, 2, 3, 4].map((item, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <ItemView key={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default HomePopularView;
