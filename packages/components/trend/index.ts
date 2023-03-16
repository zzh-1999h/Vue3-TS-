// 用来整合组件的 最终实现导出组件
import _trend from "./src/trend.vue";
import { withInstall } from "@zzh/utils/with-install";
const trend = withInstall(_trend);

export default trend; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/trend";

declare module "vue" {
  export interface GlobalComponents {
    ZzhTrend: typeof trend;
  }
}
