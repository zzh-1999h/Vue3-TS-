// 用来整合组件的 最终实现导出组件
import _chooseDate from "./src/choose-date.vue";
import { withInstall } from "@zzh/utils/with-install";
const chooseDate = withInstall(_chooseDate);

export default chooseDate; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/choose-date";

declare module "vue" {
  export interface GlobalComponents {
    ZzhChooseDate: typeof chooseDate;
  }
}
