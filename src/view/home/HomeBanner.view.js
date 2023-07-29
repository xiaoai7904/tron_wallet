import React from 'react';
import { Row, Col, Button } from 'antd';
import { nft1Icon, heartIcon } from '@/assets';

export const HomeBannerView = () => {
  return (
    <section className="home-banner">
      <div className="app-container">
        <Row gutter={[80, 50]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={15} xxl={15}>
            <div className="home-banner-left">
              <h5>Collectibles NFTs</h5>
              <h1>IP:Cosmic Muggles Theme: Cosmic Muggles collection NFT Format: JPG</h1>
              <p>CM Culture is a dynamic and energetic company focus on global animation culture fusion and cultural transmission</p>
              <Button size="large">Browse NFTs</Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={9} xxl={9}>
            <div className="home-banner-right">
              <div className="home-banner-right-content">
                <div className="home-banner-right-image flex-center">
                  <img src={nft1Icon} alt="cosmic" />
                  <div className="hot">
                    <img src={heartIcon} />
                    <span>1.2k</span>
                  </div>
                </div>
                <h3>Droplet Diamond</h3>
                <div className="flex-between">
                  <div className="home-nft-price">
                    <span>Height 0.074 </span>
                    <span>ETH</span>
                  </div>
                  <Button className="home-buy">Place Bid</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HomeBannerView