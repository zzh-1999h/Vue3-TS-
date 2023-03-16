// 用来整合组件的 最终实现导出组件
import _container from "./src/index.vue";
import { withInstall } from "@zzh/utils/with-install";
const Container = withInstall(_container);

export default _container; // 可以通过app.use来使用,也可以通过import方式单独使用

declare module "vue" {
  export interface GlobalComponents {
    ZzhContainer: typeof Container;
  }
}
