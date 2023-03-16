<template>
  <div>
    <el-select v-model="province" placeholder="请选择省份" clearable>
      <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
    <el-select v-model="city" :disabled="!province" style="margin: 0 10px" placeholder="请选择城市" clearable>
      <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name">
      </el-option>
    </el-select>
    <el-select v-model="area" :disabled="!province || !city" placeholder="请选择区域" clearable>
      <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name">
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'
import { AreaItem, Data } from './choose-area';

defineOptions({
  name: 'zzh-choose-area',
  inheritAttrs: false
})
const emits = defineEmits(['change'])
const areas = ref(allAreas)

// 下拉选择省市区的值
const province = ref<string>('')
const city = ref<string>('')
const area = ref<string>('')
// 城市下拉框的所有的值
const selectCity = ref<AreaItem[]>([])
// 区域下拉框的所有的值
const selectArea = ref<AreaItem[]>([])

// 监听选择省份,省份数据一旦发生变化,城市数据也要进行相应更新
watch(() => province.value, val => {
  if (val) {
    const cities = areas.value.find(item => item.code === province.value)!.children!
    selectCity.value = cities
  }
  // 当选择了北京之后,再选择别的省份则城市、区域进行清空(重新选择)
  city.value = ''
  area.value = ''
})

// 监听选择城市
watch(() => city.value, val => {
  if (val) {
    const area = selectCity.value.find(item => item.code === city.value)!.children!
    selectArea.value = area
  }
  area.value = ''
})

// 监听选择区域
watch(() => area.value, val => {
  if (val) {
    const provinceData: Data = {
      code: province.value,
      name: province.value && (allAreas.find(item => item.code === province.value)?.name) as string
    }
    const cityData: Data = {
      code: city.value,
      name: city.value && (selectCity.value.find(item => item.code === city.value)?.name) as string
    }
    const areaData: Data = {
      code: val,
      name: val && (selectArea.value.find(item => item.code === val)?.name) as string
    }
    // console.log(provinceData, cityData, areaData)
    emits('change', {
      province: provinceData,
      city: cityData,
      area: areaData
    })
  }
})

// watch(() => street.value, val => {
//   console.log(val)
// })
</script>