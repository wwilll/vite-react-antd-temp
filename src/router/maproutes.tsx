import { originMenus } from './menus';
import { Route } from 'react-router-dom';
import React, { LazyExoticComponent, Suspense } from 'react';
import CustomLoading from '@/components/CustomLoading';

/**
 * 为路由添加唯一标识，以便后续查找匹配
 * @param nowRoutes
 * @param parentKey
 * @returns
 */
const addMenuKey = (nowRoutes?: IRouteMenu[], parentKey?: string): IRouteMenu[] | undefined => {
  return nowRoutes?.map((item) => {
    const parentKeyTemp = parentKey === '/' ? '' : parentKey;
    const key = parentKeyTemp == null ? item.path : `${parentKeyTemp}/${item.path}`;
    return {
      ...item,
      key,
      children: addMenuKey(item.children, key),
    };
  });
};

const tranformMenus = addMenuKey(originMenus) as IRouteMenu[];

/**
 * 判断路径与路由是否匹配（增加对动态路由的判断）
 * @param path 需要判断的path，包含url上的原生path和umi的path
 * @param route 路由path
 * @param type 目前只有一种，path匹配
 * @returns boolean 是否匹配上
 */
export const isMatch = (path = '', route = '', type = 'path'): boolean => {
  if (!path) return false;
  const basePath = __APP_DEPLOY__;
  switch (type) {
    case 'path': {
      // 解析地址栏path，使之跟路由配置对应起来
      let newPath = decodeURIComponent(path || '').replace(/\s/g, '');
      if (basePath.startsWith(newPath)) {
        newPath = basePath;
      }
      newPath = newPath.replace(basePath, '/');
      newPath = newPath.slice(-1) === '/' && newPath.length > 1 ? newPath.slice(0, -1) : newPath;
      // 解析配置中的path（此处为配置计算出的key），使之跟路由配置对应起来
      let newRoute = route;
      if (basePath.startsWith(newRoute)) {
        newRoute = basePath;
      }
      newRoute = newRoute.replace(basePath, '/');
      newRoute = newRoute.slice(-1) === '/' && newRoute.length > 1 ? newRoute.slice(0, -1) : newRoute;
      if (newPath === newRoute) return true;
      // 判断动态路由情况
      const routeArr = newRoute.split('/');
      const pathArr = newPath.split('/');
      if (routeArr.length !== pathArr.length) return false;
      let isMatchRoute = true;
      while (routeArr.length) {
        const route_part = routeArr.pop() || '';
        const path_part = pathArr.pop() || '';
        if (route_part !== path_part) {
          if (!route_part.startsWith(':')) {
            isMatchRoute = false;
            break;
          }
        }
      }
      return isMatchRoute;
    }
    default: {
      return path === route;
    }
  }
};

/**
 * 通过path查找路由项
 * @param path 需要查找的path
 * @param nowRoutes 需要搜索的路由列表
 * @returns 路由菜单的整合数组
 */
export const findPathListByPathName = (path: string, nowRoutes: IRouteMenu[] = tranformMenus): IRouteMenu[] => {
  const pathTemp = decodeURIComponent(path);
  let pathList: IRouteMenu[] = [];
  for (const item of nowRoutes) {
    if (isMatch(path, item.key)) {
      pathList.push(item);
      break;
    } else if (item.children?.length) {
      const subPathList = findPathListByPathName(pathTemp, item.children || []);
      if (subPathList.length) {
        pathList = [item, ...subPathList];
        break;
      }
    }
  }
  return pathList;
};

const NotFound = React.lazy(() => import('@/pages/404'));

export const getMapRoutes = (routes: IRouteMenu[] = originMenus) => {
  const LastRoute = (
    <Route
      key="redirect"
      path="*"
      element={
        <Suspense fallback={<CustomLoading />}>
          <NotFound />
        </Suspense>
      }
    />
  );
  const newRoutes = routes
    ?.filter((i) => !!i.component)
    .map((i) => {
      const Node = i.component as LazyExoticComponent<any>;
      const Children = i.children && getMapRoutes(i.children);
      return (
        <Route
          key={i.path}
          path={i.path}
          element={
            <Suspense fallback={<CustomLoading />}>
              <Node key={i.key} menuInfo={i} />
            </Suspense>
          }
        >
          {i.children?.length ? Children : null}
        </Route>
      );
    });
  return [...newRoutes, LastRoute];
};

const MapRoutes = getMapRoutes();

export default MapRoutes;
