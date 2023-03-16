// 用来整合组件的 最终实现导出组件
import _chooseCity from "./src/choose-city.vue";
import { withInstall } from "@zzh/utils/with-install";
const chooseCity = withInstall(_chooseCity);

export default chooseCity; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/choose-city";

declare module "vue" {
  export interface GlobalComponents {
    ZzhChooseCity: typeof chooseCity;
  }
}
