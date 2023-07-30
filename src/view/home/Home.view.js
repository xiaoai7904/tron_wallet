import React from 'react';
// import { HeartOutlined } from '@ant-design/icons';
import HeaderView from '@/components/header/Header.view';
import LayoutView from '@/components/layout/Layout.view';
// import HomePopularView from './HomePopular.view';
// import HomeTrendView from './HomeTrend.view';
// import HomeBannerView from './HomeBanner.view';
import HomeExploreView from './HomeExplore.view';
// import HomeInfoBoxView from './HomeInfoBox.view';
// import HomeNftView from './HomeNft.view';
import HomeTestView from './HomeTest.view'
import './Home.style.less';

export const HomeView = () => {
  return (
    <div className="home">
      <HeaderView />
      <LayoutView>
        {/* <HomeBannerView /> */}
        {/* <HomePopularView /> */}
        {/* <HomeTrendView /> */}
        <HomeExploreView />
        {/* <HomeInfoBoxView /> */}
        {/* <HomeNftView /> */}
        {/* <HomeTestView /> */}
      </LayoutView>
    </div>
  );
};

export default HomeView;
