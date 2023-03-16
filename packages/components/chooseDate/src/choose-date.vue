<template>
  <div style="display: flex;">
    <div style="margin-right: 20px;">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabled-date="startDisabledDate"
        v-bind="$attrs.startOptions"
      >
      </el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDateDisabled"
        :disabled-date="endDisabledDate"
        v-bind="$attrs.endOptions"
      >
      </el-date-picker>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { ref, watch} from 'vue'
import { chooseDateProps } from './choose-date';
defineOptions({
  name: 'zzh-choose-date',
  inheritAttrs: false
})
const props = defineProps(chooseDateProps)
const emits = defineEmits(['startChange','endChange'])

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
// 控制结束日期的禁用状态
const endDateDisabled = ref<boolean>(true)

// 禁用开始日期的函数
const startDisabledDate = (time:Date) =>{
    if(props.disableToday){
      // 拿到时间戳 < 今天之前的
      return time.getTime() < Date.now() - 1000 * 60 *60 * 24
    }
}

// 禁用结束日期的函数
const endDisabledDate = (time:Date)=>{
  if(startDate.value){
    return time.getTime() < startDate.value.getTime() + 1000 * 60 *60 * 24
  }
}

// 监听开始的日期
watch(()=> startDate.value , val => {
  if( !val ){
    endDateDisabled.value = true
    endDate.value = null
  } else {
    emits('startChange', val)
    endDateDisabled.value = false
  }
})

// 监听结束的日期
watch(()=> endDate.value , val => {
  if( val ){
    emits('endChange', {
      startDate: startDate.value,
      endDate: val
    })
  }
})
</script>

<style scoped>

</style>