import { rootContainer } from '@/model/plugin-model/runtime';
import Root from '@/router';
import { initConfig } from '@/utils/config';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const WrapperInitEntry = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function InitEntry() {
  const [isInit, setInit] = useState(false);

  // 获取初始化数据，可简单加密配置文件
  const init = async () => {
    const initSuccess = await initConfig();
    if (initSuccess) {
      // 系统前置内容执行完毕，再渲染业务路由组件
      setInit(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (isInit) {
    return __APP_RUN_AT_STRICT_MODE__ ? (
      <React.StrictMode>{rootContainer(<Root />)}</React.StrictMode>
    ) : (
      rootContainer(<Root />)
    );
  } else {
    return (
      <WrapperInitEntry>
        <div className="custom-loader"></div>
      </WrapperInitEntry>
    );
  }
}

export default InitEntry;
