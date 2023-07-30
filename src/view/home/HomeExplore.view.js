/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import ItemView from '@/components/item/Item.view';
import useGoods from '@/hooks/useGoods';
import { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17 } from '@/assets';
const imageList = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17];

export const HomeExploreView = () => {
  const [loading, setLoading] = useState(false);
  const [goodsMap, setGoodsMap] = useState({});
  const { goodsListApi } = useGoods();

  const randomNum = () => Math.floor(Math.random() * (1 - 16 + 1)) + 16;
  useEffect(() => {
    setLoading(true);
    goodsListApi().then(
      data => {
        const dataObj = {};
        data.List.forEach(item => {
          if (!dataObj[item.categoryId]) {
            dataObj[item.categoryId] = {
              title: item.categoryName,
              value: [],
            };
          }
          dataObj[item.categoryId].value.push({ ...item, ...{ image: imageList[randomNum()] } });
        });
        setGoodsMap(dataObj);
        setLoading(false);
      },
      err => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <section className="home-explore">
      <div className="app-container">
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          Object.keys(goodsMap).map((item, index) => (
            <div key={index}>
              <h1>{goodsMap[item].title}</h1>
              <Row gutter={[30, 30]}>
                {goodsMap[item].value.map((item, index) => (
                  <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
                    <ItemView data={item} />
                  </Col>
                ))}
              </Row>
            </div>
          ))
        )}
        {/* <div className="home-explore-btns flex-center">
          <Button>Load More</Button>
        </div> */}
      </div>
    </section>
  );
};

export default HomeExploreView;
