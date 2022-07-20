import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import checker from 'vite-plugin-checker';
import legacy from '@vitejs/plugin-legacy';
import VitePrettier from 'vite-plugin-prettier';
// 作者说VitePrettier不需要其他配置，但是为了vscode编辑器能识别，还是得写配置文件
const prettierConfig = require('.prettierrc.js');
const svgr = require('@svgr/rollup');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // command: serve | build
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  const legacyConfig = legacy({ targets: ['defaults', 'not IE 11'] });
  const legacyMode = env.es_target != 'es6' ? [legacyConfig] : [];
  const deployPath = env.deploy_path && env.deploy_path != '/' ? `/${env.deploy_path}/` : '/';
  console.log('当前环境变量=============>');
  console.log('es_target:', env.es_target, typeof env.es_target);
  console.log('deploy_path:', env.deploy_path, typeof env.deploy_path);
  console.log('soucemap:', env.soucemap, typeof env.soucemap);
  console.log('out_dir:', env.out_dir, typeof env.out_dir);
  console.log('root_path:', env.root_path, typeof env.root_path);
  console.log('实际部署位置:', deployPath);
  console.log('<========================');
  const config = {
    define: {
      // 字符串需要引号包裹, dev模式下NODE_ENV可能是undefined，可在命令前加(cross-env NODE_ENV=development)
      __APP_ENV__: `"${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}"`,
      __APP_DEPLOY__: `"${deployPath}"`,
      __APP_ROOT_PAGE__: `"${deployPath}${env.root_path}"`,
      // 对象可以直接写
      __APP_INFO__: { somekey: 'xxxxx' },
      __APP_RUN_AT_STRICT_MODE__: env.strict_mode === 'true',
    },
    plugins: [react(), checker({ typescript: true }), ...legacyMode, VitePrettier(prettierConfig), svgr()],
    server: {
      port: 4000,
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // 配置解决第三方js库没有ts声明的问题
        mylib: path.resolve(__dirname, 'src/pages/demo'),
      },
    },
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        hashPrefix: 'prefix',
      },
      preprocessorOptions: {
        less: {},
      },
    },
    base: deployPath,
    build: {
      outDir: env.out_dir,
      sourcemap: env.soucemap === 'true',
    },
  };
  return config;
});
