// 用来整合组件的 最终实现导出组件
import { withInstall } from '@zzh/utils/with-install';
import _Tree from './src/tree.vue';

const Tree = withInstall(_Tree);
export default Tree;

declare module 'vue' {
  export interface GlobalComponents {
    ZzhTree: typeof Tree;
  }
}

export * from './src/tree';