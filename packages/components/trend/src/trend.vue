<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slots.default"></slot>
      <div v-else> {{ text }} </div>
    </div>
    <div class="icon">
      <!-- <el-icon-arrowup v-if="type === 'up'" :style="{ color: !reverseColor ? upIconColor : '#52c41a' }" />
      <el-icon-arrowdown v-else :style="{ color: !reverseColor ? downIconColor : '#f5222d' }" /> -->
      <component :is="`el-icon-${toLine(upIcon)}`" v-if="type === 'up'"
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }">
      </component>
      <component :is="`el-icon-${toLine(downIcon)}`" v-else :style="{ color: !reverseColor ? downIconColor : '#f5222d' }">
      </component>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { trendProps } from './trend'
import { useSlots, computed } from 'vue'
import { toLine } from '@zzh/utils/toLine';

defineOptions({
  name: 'zzh-trend',
  inheritAttrs: false
})

const props = defineProps(trendProps)
// 获取插槽内容
const slots = useSlots()

// 文字颜色,用计算属性的原因:因为这里的文字颜色是需要根据type来改变的
const textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang='scss' scoped>
.trend {
  display: flex;
  align-items: center;

  .text {
    font-size: 12px;
    margin-right: 4px;
  }

  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>