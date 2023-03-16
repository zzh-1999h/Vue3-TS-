

export interface MenuItem {
  icon?: string,
  // 处理之后的图标
  i?: string,
  name: string,
  // 导航的标识
  index: string,
  children?: MenuItem[]
}