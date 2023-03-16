

export default {}

export const trendProps = {
  // 标记当前趋势是上升还是下降
  type: {
    type: String,
    default: 'up'
  },
  // 趋势显示的文字
  // 1. 父组件传递过来的数据
  // 2.插槽的形式
  text: {
    type: String,
    default: '文字'
  },

  // 颜色翻转只在默认的颜色下生效,如果使用了自定义颜色,这个属性就不生效了
  reverseColor: {
    type: Boolean,
    default: false
  },
  // 上升趋势的图标颜色
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  // 下降趋势的图标颜色
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  // 上升趋势的文字颜色
  upTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
  // 下降趋势的文字颜色
  downTextColor: {
    type: String,
    default: '#52c41a'
  },

  // 上升趋势显示的图标
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  // 下降趋势显示的图标
  downIcon: {
    type: String,
    default: 'ArrowDown'
  }
}