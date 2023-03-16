// 用来整合组件的 最终实现导出组件
import _menu from "./src/menu.vue";
import _infiniteMenu from "./src/menu.tsx"
import { withInstall } from "@zzh/utils/with-install";
const Menu = withInstall(_menu);
const InfiniteMenu = withInstall(_infiniteMenu);

export { Menu, InfiniteMenu }; // 可以通过app.use来使用,也可以通过import方式单独使用
export * from "./src/menu";

declare module "vue" {
  export interface GlobalComponents {
    ZzhMenu: typeof Menu;
    ZzhInfiniteMenu: typeof InfiniteMenu;
  }
}
