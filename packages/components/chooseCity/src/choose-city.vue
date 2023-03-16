<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="420"
    trigger="click"
  >
    <template #reference>
      <div class="result">
        <div> {{ result }} </div>
        <div>
          <el-icon-arrowdown :class="{'rotate': visible}"></el-icon-arrowdown>
        </div>
      </div>
    </template>
    <div class="container">
      <el-row style="margin-bottom: 10px;">
        <el-col :span="8">
          <el-radio-group
            v-model="radioValue"
            size="large"
          >
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col
          :offset="1"
          :span="15"
        >
          <el-select
            v-model="selectValue"
            :filter-method="filterMethod"
            size="small"
            filterable
            placeholder="请搜索城市"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <!-- <div v-for="(value,key) in cities">
          {{ key }}
        </div> -->
          <div
            v-for="(item,index) in Object.keys(cities)"
            :key="index"
            class="city-item"
            @click="clickChat(item)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(value,key) in cities"
            :key="key"
          >
            <el-row
              :id="key"
              style="margin-bottom: 10px;"
            >
              <el-col :span="2"> {{ key }}:</el-col>
              <el-col
                :span="22"
                class="city-name"
              >
                <div
                  v-for="(item,index) in value"
                  :key="index"
                  class="city-name-item"
                  @click="clickItem(item)"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
            class="province-item"
            @click="clickChat(item)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item,index) in Object.values(provinces)"
            :key="index"
          >
            <template
              v-for="(item1,index1) in item"
              :key="index1"
            >
              <el-row
                :id="item1.id"
                style="margin-bottom: 10px;"
              >
                <el-col :span="3"> {{ item1.name }}: </el-col>
                <el-col
                  :span="21"
                  class="province-name"
                >
                  <div
                    v-for="(item2,index2) in item1.data"
                    :key="index2"
                    class="province-name-item"
                    @click="clickProvince(item2)"
                  >
                    {{ item2 }}
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
import city from '../lib/city'
import { City } from './choose-city';
import province from '../lib/province.json'


defineOptions({
  name:'zzh-choose-city',
  inheritAttrs: false
})

const emits = defineEmits(['chooseCity','chooseProvince'])

const result = ref<string>('请选择')
const visible = ref<boolean>(false)
const radioValue = ref<string>('按城市')
const selectValue = ref<string>('')
const cities = ref(city.cities)
const provinces = ref(province)
const searchValue = ref<string>('')
const allCity  = ref<City[]>([])

// 点击每个城市
const clickItem = (item: City) => {
  // 给结果赋值
  result.value = item.name
  // 关闭弹出层
  visible.value = false
  emits('chooseCity', item)
}

// 点击字母区域
const clickChat = (item: string)=>{
  const el = document.getElementById(item)
  if (el) {
    el.scrollIntoView()
  }
}

const clickProvince = (item: string) => {
  result.value = item
  // 关闭弹出层
  visible.value = false
  emits('chooseProvince', item)
}

const options = ref<City[]>([
])

// 自定义搜索过滤
const filterMethod = (val: string) => {
  searchValue.value = val
  const values = Object.values(cities.value).flat(2)
  if (val === ''){
    options.value = values
  } else {
    if (radioValue.value === '按城市'){
      // 中文和拼音一起过滤
      options.value = values.filter(item => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter(item => {
        return item.name.includes(val)
      })
    }
  }
}

// 下拉框选择
const changeSelect = (val: number) => {
  const city = allCity.value.find(item => item.id === val )
  if ( city && city.name){
    result.value = city.name
    if (radioValue.value === '按城市') {
      emits('chooseCity', city)
    } else {
      emits('chooseProvince', city.name)
    }
  }
}

onMounted(() => {
  // 获取下拉框的城市数据
  const values = Object.values(cities.value).flat(2)
  allCity.value = values
  options.value = values
})

</script>

<style lang='scss' scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
.rotate {
  transform: rotate(180deg);
}
svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}
.container {
  padding: 6px;
}
.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    cursor: pointer;
  }
}
.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .city-name-item,
  .province-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>