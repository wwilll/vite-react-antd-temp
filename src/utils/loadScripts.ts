/**
 * 动态加载配置类脚本库（避免打包）
 * @param src : 脚本路径;
 * @param cb : 脚本load回调
 */
const loadScript = (src: string, cb: any) => {
  const oScript = document.createElement('script');
  oScript.type = 'text/javascript';
  oScript.onerror = (oError: any) => {
    throw new URIError('The script ' + oError?.target?.src + ' is not accessible.');
  };
  oScript.onload = cb || (() => {});
  oScript.src = src;
  document.head.appendChild(oScript);
};

export default loadScript;
