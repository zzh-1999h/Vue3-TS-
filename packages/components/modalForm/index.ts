// 用来整合组件的 最终实现导出组件
import _modalForm from "./src/modal-form.vue";
import { withInstall } from "@zzh/utils/with-install";
const modalForm = withInstall(_modalForm);

export default modalForm; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/modal-form";

declare module "vue" {
  export interface GlobalComponents {
    ZzhmodalForm: typeof modalForm;
  }
}
