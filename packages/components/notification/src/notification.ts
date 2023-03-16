

export default {}

export const notificationProps = {
  // 显示的图标
  icon: {
    type: String,
    default: 'Bell'
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: ''
  },
  // 最大值
  max: {
    type: Number
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false
  }
}