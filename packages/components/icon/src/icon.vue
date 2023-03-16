<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { createNameSpace } from "../../../utils/create";
import { iconProps } from "./icon";
defineOptions({
  name: "zzh-icon",
});

const bem = createNameSpace("icon");
const props = defineProps(iconProps);
// 计算属性来计算一个样式来处理
const style = computed(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>
