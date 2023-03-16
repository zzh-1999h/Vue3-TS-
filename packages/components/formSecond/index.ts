// 用来整合组件的 最终实现导出组件
import _formSecond from "./src/form-second.vue";
import { withInstall } from "@zzh/utils/with-install";
const formSecond = withInstall(_formSecond);

export default formSecond; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/form-second";

declare module "vue" {
  export interface GlobalComponents {
    ZzhformSecond: typeof formSecond;
  }
}
