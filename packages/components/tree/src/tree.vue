<template>
  <div :class="bem.b()">
    <zzh-tree-node v-for="node in flattenTree" :key="node.key" :node="node" :expanded="isExpanded(node)"
      :loading-keys="loadingKeysRef" @toggle="toggleExpand" :selectedKeys="selectKeysRef" @select="handleSelect">
    </zzh-tree-node>
  </div>
</template>

<script setup lang='ts'>
import { createNameSpace } from '@zzh/utils/create';
import { ref, watch, computed } from 'vue';
import { treeProps, TreeNode, TreeOption, Key, treeEmitts } from './tree';
import ZzhTreeNode from './treeNode.vue';

const bem = createNameSpace('tree')
defineOptions({
  name: 'zzh-tree'
})
const props = defineProps(treeProps);
// 有了props要对用户的数据进行格式化,格式化一个固定的结果,比如:label , key , children
// 将props.data 格式化后放到tree中
const tree = ref<TreeNode[]>([])

// 1) 获取用户传递的值
function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string;
    },
    getLabel(node: TreeOption) {
      return node[label] as string;
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[];
    }
  }
}
const treeOptions = createOptions(props.keyField, props.lbaleField, props.childrenField);

// 2) 根据用户传递的数据将数据进行格式化
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children.length == 0
      }
      // 有孩子节点再去进行递归,并将其转换成treeNode类型
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode);
      }
      return treeNode;
    })
  }
  const result: TreeNode[] = traversal(data, parent);
  return result;
}

// 监控数据变化,调用格式化方法,一上来先格式化
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data);
  }, { immediate: true }
)

// 3) 将一棵树拍平,点击还能实现展开操作(所以需要用到计算属性)
// 需要展开的key有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));
const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value; // 要展开的keys有哪些
  const flattenNodes: TreeNode[] = []; // 拍平后的结果
  const nodes = tree.value || []; // 被格式化后的节点
  const stack: TreeNode[] = []; // 用于遍历树的栈
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i]);
  }
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);
    if (expandedKeys.has(node.key)) {
      const children = node.children;
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i]);
        }
      }
    }
  }
  return flattenNodes;
})
function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key);
}

// 折叠功能
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

// 展开功能
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key);
  triggerLoading(node);
}
// 4）让用户点击展开/折叠
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value;
  // 如果当前节点正在加载中,不能收起
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node);
  } else {
    expand(node);
  }
}

// 5) 异步加载的实现
const loadingKeysRef = ref(new Set<Key>());
function triggerLoading(node: TreeNode) {
  // 这个节点需要异步加载
  if (!node.children.length && !node.isLeaf) {
    // 如果没有加载过这个节点,就加载这个节点
    const loadingKeys = loadingKeysRef.value;
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          // 修改原来的节点
          node.rawNode.children = children;
          // 更新自定义的node
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        })
      }
    }
  }
}

// 6) 实现选中节点
const emit = defineEmits(treeEmitts);
const selectKeysRef = ref<Key[]>([]);
watch(
  () => props.selectedKeys, value => {
    if (value) {
      selectKeysRef.value = value;
    }
  },
  {
    immediate: true
  }
)

// 7) 处理选中的节点
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectKeysRef.value);
  if (!props.selectable) return;
  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(index);
    }
  } else {
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }
  emit('update:selectedKeys', keys);
}
</script>

<style scoped>

</style>