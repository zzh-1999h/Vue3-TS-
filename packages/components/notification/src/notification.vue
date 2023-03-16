<template>
  <el-popover
    placement="top-start"
    :width="300"
    trigger="hover"
  >
    <!-- 匿名插槽 -->
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge
        :value="value"
        :max="max"
        :is-dot="isDot"
      >
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang='ts'>
import { notificationProps } from './notification.ts';
import { toLine } from '@zzh/utils/toLine';
defineOptions({
  name: 'zzh-notification',
  inheritAttrs: false
})

const props = defineProps(notificationProps)
</script>