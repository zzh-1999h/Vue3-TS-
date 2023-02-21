// 用来整合组件的 最终实现导出组件
import _Button from "./src/button.vue";
import { withInstall } from "@zzh/utils/with-install";
const Button = withInstall(_Button);

export default Button; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/button";

declare module "vue" {
  export interface GlobalComponents {
    ZzhButton: typeof Button;
  }
}
