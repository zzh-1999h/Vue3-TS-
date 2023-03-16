<template>
  <el-progress v-bind="$attrs" :percentage="p">

  </el-progress>
</template>
 
<script setup lang='ts'>
import { progressProps } from './progress'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'zzh-progress'
})
const p = ref(0)
const props = defineProps(progressProps)

// 钩子函数,加载后先判断一下,如果有动画效果则动态控制进度
onMounted(() => {
  if (props.isAnimation) {
    // 规定时间内加载完成
    const t = Math.ceil(props.time / props.percentage) // 每秒钟加载多少
    const timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>

<style scoped></style>