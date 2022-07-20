/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_SOME_KEY: string;
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** 当前环境 production / development */
declare const __APP_ENV__: string;
/** 部署根路径 */
declare const __APP_DEPLOY__: string;
/** 根路径，用于初始化重定向、404根返回 */
declare const __APP_ROOT_PAGE__: string;
/** 测试数据 */
declare const __APP_INFO__: {
  somekey: string;
};
/** react严格模式 */
declare const __APP_RUN_AT_STRICT_MODE__: boolean;

interface IEnvConfig {
  baseURL: string;
  vconsole?: boolean;
}
interface Window {
  config: {
    dev: IEnvConfig;
    prod: IEnvConfig;
  };
}

declare module 'mylib/*.js';

// 配置svg插件 https://cloud.tencent.com/developer/ask/sof/945067
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
