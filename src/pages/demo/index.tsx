import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMeasure } from 'react-use';

import { startAnimate, stopAnimate, init, setSize } from 'mylib/threeAnimate.js';

const WrapperDemo = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  #container {
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    padding: 20px;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .my-btn {
      color: #fff;
      text-decoration: none;
      margin-top: 10px;
    }
  }
  .desc {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    text-align: center;
    font-weight: normal;
    font-size: 14px;
  }
`;

function Demo() {
  const [searchParams] = useSearchParams();
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();

  useEffect(() => {
    init(width, height);
    startAnimate();
    return () => {
      stopAnimate();
    };
  }, []);

  useEffect(() => {
    setSize(width, height);
  }, [width, height]);

  // console.log(x, y, width, height, top, right, bottom, left);

  return (
    <WrapperDemo>
      <div id="container" ref={ref as any}></div>
      <div className="content">
        <a className="ghost-btn my-btn" href="/foo">
          框架测试
        </a>
        <a className="ghost-btn my-btn" href="/docs">
          我的文档
        </a>
      </div>
      <a
        className="gradient-text desc"
        rel="external nofollow noreferrer noopener"
        target="_blank"
        href="https://beian.miit.gov.cn"
      >
        ©2022 粤ICP备2022054648号-1
      </a>
    </WrapperDemo>
  );
}

export default Demo;
