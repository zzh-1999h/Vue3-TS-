<template>
  <nav-header :class="bem.b()">
    <span @click="toggle">
      <zzh-icon>
        <Expand></Expand>
      </zzh-icon>
    </span>
  </nav-header>
</template>

<script setup lang='ts'>
import { createNameSpace } from '@zzh/utils/create'
import { Expand } from '@vicons/ionicons5';
import { containerProps } from './container';
defineOptions({
  name:'zzh-header'
})
const bem = createNameSpace('header')

const props = defineProps(containerProps)
const emits = defineEmits(['update:collapse'])
const toggle = () =>{
  emits('update:collapse', !props.collapse)
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
svg {
  width: 1em;
  height: 1em;
}
</style>