import React from 'react';
// import FooterView from '@/components/footer/Footer.view';

import './Layout.style.less';

export const LayoutView = props => {
  return (
    <div className="layout">
      {props.children}
    </div>
  );
};

export default LayoutView;
