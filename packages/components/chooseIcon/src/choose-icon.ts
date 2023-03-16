import { ExtractPropTypes } from 'vue';
export const chooseIconProps = {
  // 弹出框的标题
  title: String,
  // 控制弹出框的显示与隐藏
  visible: Boolean
} as const

export const chooseIconEmits = {
  'update:visible': (v: boolean) => !!v
}

export type ChooseIconProps = ExtractPropTypes<typeof chooseIconProps>
export type ChooseIconEmits = typeof chooseIconEmits