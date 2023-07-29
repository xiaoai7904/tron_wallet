import { useEffect } from 'react';

export const useAnimate = (ids, type = 'up') => {
  const animateTypeMap = {
    up: 'animate__fadeInUp',
  };
  const handler = (entries, intersectionObserver) => {
    entries.forEach(item => {
      // 当前元素可见，并且是从上往下滚动出现
      if (item.isIntersecting && item.boundingClientRect.top > 0) {
        if (ids.includes(item.target.id)) {
          item.target.classList.add('animate__animated', animateTypeMap[type]);
        }
        // intersectionObserver.unobserve(item.target); // 停止观察当前元素 避免不可见时候再次调用callback函数
      }
    });
  };
  // 绑定事件
  const bindEvent = () => {
    let intersectionObserver;
    intersectionObserver = new IntersectionObserver(function (entries) {
      handler(entries, intersectionObserver);
    });

    ids.forEach(id => {
      intersectionObserver.observe(document.getElementById(id));
    });
  };

  useEffect(() => {
    bindEvent();
  }, []);
};
