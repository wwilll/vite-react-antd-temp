/**
 * todo
 * 获取配置文件是系统前置步骤
 * 此处请求应使用原生的axios，fetch等方式，因封装的request需要用到获取的配置信息
 */
import axios from 'axios';
import loadScript from './loadScripts';

window.config = window.config || {
  dev: {
    baseURL: 'http://192.168.1.100:4396',
    vconsole: false,
  },
  prod: {
    baseURL: 'http://xxx.com',
    vconsole: false,
  },
};

// todo
const getConfig = () => {
  const config = __APP_ENV__ === 'development' ? window.config.dev : window.config.prod;
  return config;
};

const initAfterGetConfig = async () => {
  const config = getConfig();
  if (config.vconsole) {
    loadScript(`${__APP_DEPLOY__}vconsole.min.js`, () => {
      new (window as any).VConsole();
    });
  }
};

const initConfig = async () => {
  // const url = `${__APP_DEPLOY__}config.js`;
  // const res = await axios
  //   .get(url)
  //   .then((r) => r)
  //   .catch((e) => e);
  // console.log(res);
  // 获取成功后再执行
  initAfterGetConfig();
  // 根据返回内容判断配置信息是否获取成功
  return true;
};

export { getConfig, initConfig };
