import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { logoIcon } from '@/assets';
import './Footer.style.less';

export const FooterView = () => {
  return (
    <div className="home-footer">
      <div className="home-footer-wrap">
        <Row gutter={[15, 15]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={7} xxl={7}>
            <img className="logo" src={logoIcon} alt="Cosmic" />
            <p>CM Culture is a dynamic and energetic company focus on globalanimation culture fusion and cultural transmission</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={5} xxl={5}>
            <h2>Marketplac</h2>
            <ul>
              <li>Create A Store</li>
              <li>Start Selling</li>
              <li>My Account</li>
              <li>List a Item</li>
            </ul>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={5} xxl={5}>
            <h2>Community</h2>
            <ul>
              <li>Art</li>
              <li>Digital Art</li>
              <li>Photography</li>
              <li>Games</li>
              <li>Music</li>
            </ul>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={7} xxl={7}>
            <h2>Newsletter</h2>
            <div className="flex-start">
              <Input size="large" />
              <Button type="primary" size="large">
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>
        <div className="home-footer-bottom flex-center">
          <p>© Copyright Powered by Cosmic Muggles</p>
        </div>
      </div>
    </div>
  );
};

export default FooterView;
