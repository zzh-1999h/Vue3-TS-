// form-item 这里用来定义 formitem中所需要的属性
// prop 校验的输入框的属性
// label属性 输入框的标题
// rules 表单输入框的规则
// show-message 是否显示错误,默认为true

// change/blur 事件

import type { RuleItem } from 'async-validator'
import { PropType, ExtractPropTypes, InjectionKey } from 'vue';

export type Arrayable<T> = T | T[]

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export const formItemValidateState = ['success', 'error', ''] as const
export type FormItemValidateState = typeof formItemValidateState[number]

export const formItemProps = {
  prop: String,
  label: String,
  // 等价于: PropType<FormItemRule | FormItemRule[]>
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => void
  ) => Promise<any>
}

// InjectionKey来标记注入值的类型，确保父传出去的值和子接收到的值类型是一样的
export const FormItemContextKey
  = Symbol('form-item') as InjectionKey<FormItemContext>


