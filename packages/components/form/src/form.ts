// form 表单的属性
// model
// rules 
import { PropType, ExtractPropTypes, InjectionKey } from 'vue';
import { Arrayable, FormItemRule, FormItemContext } from './form-item';

export const formProps = {
  model: Object,
  rules: {
    // PropType:为了类型推论，让我们在使用属性的时候获取更丰富的类型提示
    // Record<K extends keyof any, T>的作用是将 K 中所有的属性的值转化为 T 类型
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
  },
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>

export interface FormContext extends FormProps {
  addField: (fields: FormItemContext) => void
}

export const FormContextKey: InjectionKey<FormContext> = Symbol()
