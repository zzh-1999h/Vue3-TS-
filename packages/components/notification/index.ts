// 用来整合组件的 最终实现导出组件
import _notification from "./src/notification.vue";
import { withInstall } from "@zzh/utils/with-install";
const notification = withInstall(_notification);

export default notification; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/notification";

declare module "vue" {
  export interface GlobalComponents {
    ZzhNotification: typeof notification;
  }
}
