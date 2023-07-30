import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import ItemView from '@/components/item/Item.view';
import useGoods from '@/hooks/useGoods';

export const HomeExploreView = () => {
  const [goodsList, setGoodsList] = useState([]);
  const { goodsListApi } = useGoods();
  // console.log(goodsList);
  useEffect(() => {
    goodsListApi().then(data => {
      console.log(data);
      setGoodsList([]);
    });
  }, []);

  return (
    <section className="home-explore">
      <div className="app-container">
        <h1>Explore NFTs</h1>
        <Row gutter={[30, 30]}>
          {new Array(8).fill('').map((item, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
              <ItemView data={{}} />
            </Col>
          ))}
        </Row>
        <div className="home-explore-btns flex-center">
          <Button>Load More</Button>
        </div>
      </div>
    </section>
  );
};

export default HomeExploreView;
