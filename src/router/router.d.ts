interface IRouteMenu {
  /** 路由 */
  path: string;
  /** 完整路径，用于查找当前路由项,已自动计算，无需填写 */
  key?: string;
  /** 路由标题（备用）填写国际化key或者自定义值 */
  title?: string;
  component?: LazyExoticComponent<any>;
  /** 重定向选项（备用）：适合从layout父级路由跳转到子级 */
  redirect?: string;
  /** 菜单图标 */
  icon?: string;
  /** 是否可返回 */
  back?: boolean;
  /** 暂未使用 */
  visible?: boolean;
  /** 暂未使用 */
  tag?: string;
  /** 子路由 */
  children?: IRouteMenu[];
}
