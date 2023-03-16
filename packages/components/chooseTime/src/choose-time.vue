<template>
  <div style="display: flex;">
    <div style="margin-right: 20px;">
      <el-time-select
        v-model="startTime"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endStep"
        :end="endTimeEnd"
        :disabled="endTimeDisabled"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { chooseTimeProps } from './choose-time';
defineOptions({
  name: 'zzh-choose-time',
  inheritAttrs: false
})
const props = defineProps(chooseTimeProps)
const emits = defineEmits(['startChange','endChange'])

const startTime = ref<string>('')
const endTime = ref<string>('')
const endTimeDisabled = ref<boolean>(true)

// 监听开始时间的变化
watch(() => startTime.value, val=> {
  if(val === '') {
    endTime.value = ''
    endTimeDisabled.value = true
  } else {
    endTimeDisabled.value = false
    // 给父组件分发事件
    emits('startChange', val)
  }
})

// 监听结束时间的变化
watch(()=>endTime.value,val => {
  if(val !== ''){
    emits('endChange',{
      startTime: startTime.value,
      entTime: val
    })
  }
}) 
</script>

<style scoped></style>