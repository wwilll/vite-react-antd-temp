module.exports = {
  plugins: [
    // 前缀追加
    require('autoprefixer')({
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
      // grid: true,
    }),
    require('postcss-flexbugs-fixes'),
    // 取消移动端px转换
    // require('postcss-px-to-viewport-8-plugin')({
    //   viewportWidth: 750,
    //   exclude: /(\/|\\)(node_modules)(\/|\\)/,
    //   propList: ['*', '!font*'],
    // }),
  ],
};
