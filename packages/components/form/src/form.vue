<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>

<script setup lang='ts'>
import { createNameSpace } from '@zzh/utils/create';
import { FormContextKey, formProps, FormContext } from './form';
import {provide} from 'vue';
import { FormItemContext } from './form-item';
import { Values} from 'async-validator';
const bem = createNameSpace('form')
defineOptions({
  name:'zzh-form'
})
const props = defineProps(formProps)

// form的校验,在父级中调用所有儿子的校验方法
const validate = async (callback?:(valid:boolean,fields?: Values ) => void) =>{
  let errors:Values = {}
  for(const field of fields){
    try{
      await field.validate('')
    } catch(error){
      errors = {
        ...errors,
        ...(error as Values).fields
      }
    }
  }
  if (Object.keys(errors).length === 0) {
    return callback?.(true)
  } else {
    if (callback){
      callback?.(false, errors)
    } else {
      return Promise.reject(errors)
    }
  }
}

const fields:FormItemContext[] = []
const addField: FormContext['addField'] = context =>{
  fields.push(context)
}

const context = {
  ...props,
  addField
}

provide(FormContextKey,context)

// 将form表单的校验方法暴露给用户,用户可以通过ref来进行校验
defineExpose({
  validate
})
</script>