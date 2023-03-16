

export const chooseDateProps = {
  startPlaceholder: {
    type: String,
    default: '请选择开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '请选择结束日期'
  },
  // 是否禁用选择今天之前的日期
  disableToday: {
    type: Boolean,
    default: true
  }
}