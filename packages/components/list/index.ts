// 用来整合组件的 最终实现导出组件
import _list from "./src/list.vue";
import { withInstall } from "@zzh/utils/with-install";
const list = withInstall(_list);

export default list; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/list";

declare module "vue" {
  export interface GlobalComponents {
    ZzhList: typeof list;
  }
}
