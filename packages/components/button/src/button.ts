import { PropType, ExtractPropTypes } from 'vue';
// 存储组件的属性和相关事件

// size 组件的大小
// type 颜色展现类型
// round 是否为圆角
// loading 是否按钮正在加载
// disabled 是否禁用按钮
// native-type 原始类型
// icon-placement 图标的位置(有别于ep,ep的前后按钮icon的<,> 是需要直接去定义的) 
// naive UI 的icon位置直接定义 left,right

// 插槽 icon

export type Size = 'small' | 'medium' | 'large'
export type Type = 'primary' | 'success' | 'primary' | 'danger' | 'info' | 'default' | ''
export type NativeType = 'button' | 'submit' | 'reset'
export type Placement = 'left' | 'right'

export const buttonProps = {
  // PropType:为了类型推论，让我们在使用属性的时候获取更丰富的类型提示
  size: String as PropType<Size>,
  type: {
    type: String as PropType<Type>,
    validator: (val: string) => {
      return ['primary', 'success', 'primary', 'danger', 'info', 'default', ''].includes(val)
    },
    default: ''
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  },
  iconPlacement: {
    type: String as PropType<Placement>,
    default: 'left'
  }
} as const

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
}


export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits