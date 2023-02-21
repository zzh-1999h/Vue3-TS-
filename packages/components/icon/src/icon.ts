// 准备组件相关的属性和ts类型

import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  color: String,
  // PropType:为了类型推论，让我们在使用属性的时候获取更丰富的类型提示
  size: [Number, String] as PropType<number | string>,
} as const;

// typeof 操作符可以用来获取一个变量或对象的类型
// ExtractPropTypes 可将 Constructor 转换为对应值类型
/* 它的作用是接收一个类型，然后把对应的vue3所接收的props类型提供出来，
后面有需要可以直接使用 */
export type IconProps = ExtractPropTypes<typeof iconProps>;
// export type IconProps2 = typeof iconProps;
