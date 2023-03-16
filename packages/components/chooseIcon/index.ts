// 用来整合组件的 最终实现导出组件
import _chooseIcon from "./src/choose-icon.vue";
import { withInstall } from "@zzh/utils/with-install";
const chooseIcon = withInstall(_chooseIcon);

export default chooseIcon; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/choose-icon";

declare module "vue" {
  export interface GlobalComponents {
    ZzhChooseIcon: typeof chooseIcon;
  }
}
