<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormInstance } from '@zzh/components/form';
import { AddCircle } from '@vicons/ionicons5';
import { Expand } from '@vicons/ionicons5';

const state = reactive({username:'',password:''})
const formRef = ref<FormInstance>()

const validateForm = () =>{
  const form = formRef.value
  form?.validate((valid,errors)=>{
    console.log(valid,errors)
  })
}
</script>
<template>
  <zzh-icon>
    <Expand></Expand>
  </zzh-icon>
  <zzh-form
    ref="formRef"
    :model="state"
    :rules="{
      username:{
        min: 6,
        max: 10,
        message: '用户名6-10位',
        trigger: ['change','blur']
      }
    }"
  >
    <zzh-form-item 
      prop="username" 
      :rules="[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {
          min:6,
          max:10,
          message:'用户名6-10位',
          trigger:['change','blur']
        }
      ]"
    >
      <zzh-input 
        v-model="state.username"
        placeholder="请输入用户名"
      />
      <template #label>
        用户名
      </template>
    </zzh-form-item>

    <zzh-form-item 
      prop="password" 
      :rules="[
        {required:true,message:'请输入密码',trigger:'blur'},
      ]"
    >
      <zzh-input 
        v-model="state.password"
        placeholder="请输入密码"
        type="password"
      />
      <template #label>
        用户名
      </template>
    </zzh-form-item>

    <zzh-button type="primary" size="medium" :round="true" @click="validateForm">
      按钮
    </zzh-button>
  </zzh-form>
  <zzh-icon>
    <AddCircle></AddCircle>
  </zzh-icon>
</template>

<style scoped></style>
