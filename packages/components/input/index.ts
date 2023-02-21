// 用来整合组件的 最终实现导出组件
import _input from "./src/input.vue";
import { withInstall } from "@zzh/utils/with-install";
const Input = withInstall(_input);

export default _input; // 可以通过app.use来使用,也可以通过import方式单独使用
export { inputProps } from "./src/input";

declare module "vue" {
  export interface GlobalComponents {
    ZzhInput: typeof Input;
  }
}
