<template>
  <zzh-button size="medium" type="primary" @click="handleClick">
    <slot></slot>
  </zzh-button>
  <el-dialog v-model="dialogVisible" :title="title">
    <div class="container">
      <div v-for="(item, index) in Object.keys(ElIcons)" :key="index" @click="clickItem(item)" class="item">
        <div>
          <component :is="`el-icon-${toLine(item)}`"></component>
        </div>
        <div>{{ item }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang='ts'>
import { chooseIconProps } from './choose-icon'
import { watch, ref } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import { toLine } from '@zzh/utils/toLine.ts';
import { useCopy } from '../../../hooks/useCopy';

defineOptions({
  name: 'zzh-choose-icon',
  inheritAttrs: false
})
const props = defineProps(chooseIconProps)
// const emits = defineEmits(chooseIconEmits)
// const emits = defineEmits(['update:visible'])
const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

// 拷贝一份父组件传递过来的visible,为了遵循单向数据流
const dialogVisible = ref<boolean>(props.visible)

// 点击按钮显示弹出框
const handleClick = () => {
  // 需要修改父组件的数据
  emits('update:visible', !props.visible)
}

// 点击图标进行复制
const clickItem = (item: string) => {
  const text = `<el-icon-${toLine(item)} />`
  useCopy(text)
  dialogVisible.value = false
}

// 监听visible的变化,只能监听第一次的变化
watch(() => props.visible, val => {
  dialogVisible.value = val
})

// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})
</script>

<style lang='scss'>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}

.text {
  font-size: 14px;
}

.icon {
  flex: 1;
}

svg {
  width: 2em;
  height: 2em;
}
</style>