import { ExtractPropTypes } from "vue";

export const progressProps = {
  // 进度条进度
  percentage: {
    type: Number,
    default: 0
  },
  // 进度条是否有动画效果
  isAnimation: {
    type: Boolean,
    default: false
  },
  // 动画时长(毫秒)
  time: {
    type: Number,
    default: 3000
  }
} as const

// ExtractPropTypes 可将 Constructor 转换为对应值类型
/* 它的作用是接收一个类型，然后把对应的vue3所接收的props类型提供出来，
后面有需要可以直接使用 */
export type ProgressProps = ExtractPropTypes<typeof progressProps>;