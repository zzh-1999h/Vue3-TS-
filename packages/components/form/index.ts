// 整合表单组件,表单组件的入口
import { withInstall } from "@zzh/utils/with-install";
import _FormItem from "./src/form-item.vue";
import _Form from './src/form.vue'
const FormItem = withInstall(_FormItem);
const Form = withInstall(_Form);

export { FormItem, Form }; // 可以通过app.use来使用,也可以通过import方式单独使用
export type { FormItemProps } from "./src/form-item";
export type { FormProps } from "./src/form";
export type FormInstance = InstanceType<typeof Form>

export default {}

declare module "vue" {
  export interface GlobalComponents {
    ZzhFormItem: typeof FormItem;
    ZzhForm: typeof Form;
  }
}
