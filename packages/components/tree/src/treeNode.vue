<template>
  <div :class="[bem.b(), bem.is('selected', isSelected)]">
    <div :class="[bem.e('content')]" :style="{ paddingLeft: `${node.level * 16}px` }">
      <span :class="[
        bem.e('expand-icon'),
        { expanded: expanded && !node.isLeaf },
        bem.is('leaf', node.isLeaf)
      ]" @click="handleExpand">
        <zzh-icon size="25" color="skyblue">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </zzh-icon>
      </span>
      <span @click="handleSelected" :class="bem.e('label')">{{ props.node?.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { treeNodeProps, treeNodeEmitts } from './tree';
import { createNameSpace } from '../../../utils/create';
import ZzhIcon from '@zzh/components/icon';
import Switcher from './icon/Switcher';
import Loading from './icon/Loading';
const bem = createNameSpace('tree-node');
const props = defineProps(treeNodeProps);
const emit = defineEmits(treeNodeEmitts);
function handleExpand() {
  emit('toggle', props.node);
}
const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key);
})
const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node.key);
})
function handleSelected() {
  emit('select', props.node);
}
</script>