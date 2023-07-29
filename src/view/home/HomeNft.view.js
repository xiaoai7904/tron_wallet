import React from 'react';
import { Row, Col, Button } from 'antd';
import { nftbgIcon } from '@/assets';

export const HomeNftView = () => {
  return (
    <section className="home-nft">
      <div className="app-container">
        <div className="home-nft-wrap">
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14}>
              <h1>Explore And Discover Top Trending NFTs</h1>
              <p>raroin is a shared liquidity NFT market smart contract which is used by multiple websites to provide the users</p>
              <div className='btns'>
                <Button>Browse NFTs</Button>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <img src={nftbgIcon} alt="cosmic" />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default HomeNftView;
