import { getNavigate } from '@/layout';

/**
 * 返回上一级方法
 */
export const goBack = () => {
  if (history.state?.idx !== 0) {
    getNavigate()?.(-1);
  } else {
    getNavigate()?.(__APP_ROOT_PAGE__);
  }
};

/**
 * 切换主题，此处为简单演示
 */
export const changeTheme = () => {
  if (document.body.classList.contains('pink-theme')) {
    document.body.classList.remove('pink-theme');
  } else {
    document.body.classList.add('pink-theme');
  }
};
