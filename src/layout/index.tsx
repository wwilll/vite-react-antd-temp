import { useModel } from '@/model/plugin-model/useModel';
import { findPathListByPathName } from '@/router/maproutes';
import { useEffect } from 'react';
import { NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';

// 记录第一个pathname（备用，微信浏览器初始化时的url，因history模式下微信href不变）
let firstPath: string | null = null;
// 当前导航对象
let currNavigate: NavigateFunction | null = null;
// 获取导航对象，以便在其他非组件中调用
export const getNavigate = () => currNavigate;

const Layout = ({ menuInfo }: { menuInfo: IRouteMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPageInfo, pageInfo } = useModel('useGlobalModel');

  // console.log('mainLayout=============>', pageInfo, __APP_ENV__, menuInfo, location.pathname);

  const initPath = () => {
    firstPath = firstPath == null ? location.pathname : firstPath;
    const targets = findPathListByPathName(location.pathname);
    const target = targets?.slice(-1)[0];
    setPageInfo({
      menu: target,
      menus: targets,
    });
    if (target?.redirect) {
      navigate(target.redirect, { replace: true });
    }
  };
  useEffect(() => {
    currNavigate = navigate;
    // window.onpopstate = function (event) {
    //   console.log(event, event.state);
    // };
    // window.onbeforeunload = function (e) {};
    return () => {
      currNavigate = null;
    };
  }, []);

  useEffect(() => {
    initPath();
  }, [location.pathname]);

  return <Outlet />;
};

export default Layout;
