// 准备组件相关的属性和ts类型
import { ExtractPropTypes, PropType } from 'vue';
export type Key = string | number;
export interface TreeOption {
  label?: Key,
  key?: Key,
  children?: TreeOption[],
  [key: string]: unknown, // 任意接口
  isLeaf?: boolean
}

// Required:将类型的属性变成必选
export interface TreeNode extends Required<TreeOption> {
  level: number,
  rawNode: TreeOption,
  children: TreeNode[],
  isLeaf: boolean
}

// vue组件的props
export const treeProps = {
  // props是只读的
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  lbaleField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  }
} as const

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}
export const treeEmitts = {
  // 内部发射的事件用来同步响应式数据
  'update:selectedKeys': (keys: Key[]) => keys
}

// ExtractPropTypes 可将 Constructor 转换为对应值类型
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>