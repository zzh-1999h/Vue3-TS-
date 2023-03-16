// 用来整合组件的 最终实现导出组件
import _chooseArea from "./src/choose-area.vue";
import { withInstall } from "@zzh/utils/with-install";
const chooseArea = withInstall(_chooseArea);

export default chooseArea; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/choose-area";

declare module "vue" {
  export interface GlobalComponents {
    ZzhChooseArea: typeof chooseArea;
  }
}
