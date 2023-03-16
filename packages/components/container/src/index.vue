<template>
  <el-container>
    <el-aside width="auto">
      <!-- <nav-side :collapse="isCollapse"></nav-side> -->
      <nav-size :collapse="isCollapse"></nav-size>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
        <!-- <nav-header></nav-header> -->
      </el-header>
      <el-main>
        <!-- <router-view></router-view> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import navHeader from './nav-header.vue';
import navSize from './nav-size.vue'

defineOptions({
  name: 'zzh-container'
})
const isCollapse = ref(false)
</script>

<style scoped></style>