<template>
  {{ $attrs }}
  <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item, index) in data" :key="index">
      <el-menu-item v-if="!item.children || !item.children.length" :index="item.index">
        <component :is="`el-icon-${toLine(item.icon)}`" v-if="item.icon"></component>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
        <template #title>
          <component :is="`el-icon-${toLine(item.icon)}`" v-if="item.icon"></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="(item1, index1) in item.children" :key="index1" :index="item1.index">
          <component :is="`el-icon-${toLine(item1.icon)}`" v-if="item1.icon"></component>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang='ts'>
import { toLine } from '@zzh/utils/toLine';
import { PropType } from 'vue'
import { MenuItem } from './menu'

defineOptions({
  name: 'zzh-menu',
  inheritAttrs: false
})

// $attrs的作用:接收父组件传递过来的数据,并且数据没有在props里面做响应

const props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: '',
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false
  }
})
console.log(props.data)
</script>

<style lang="scss" scoped>
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>