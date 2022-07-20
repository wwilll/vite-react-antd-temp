/**
 * 导航路由配置
 */
import React from 'react';

// 路由path（去除尾部斜杠）
const basePath = __APP_DEPLOY__ === '/' ? '/' : __APP_DEPLOY__.slice(0, -1);

export const originMenus: IRouteMenu[] = [
  {
    path: basePath,
    component: React.lazy(() => import('@/layout')),
    redirect: __APP_ROOT_PAGE__,
    children: [
      {
        path: 'demo',
        title: 'Demo',
        component: React.lazy(() => import('@/pages/demo')),
      },
      {
        path: 'home',
        title: '首页',
        component: React.lazy(() => import('@/layout/Home')),
        redirect: __APP_DEPLOY__ + 'home/main',
        children: [
          {
            path: 'main',
            title: '主页',
            component: React.lazy(() => import('@/pages/home')),
          },
          {
            path: 'test',
            title: '测试',
            component: React.lazy(() => import('@/pages/home/Test')),
          },
        ],
      },
    ],
  },
];
