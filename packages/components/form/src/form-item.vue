<template>
  <div 
    :class="[
      bem.b(),
      bem.is('success',validateState== 'success'),
      bem.is('error',validateState== 'error')
    ]"
  >
    <label :class="bem.e('lbael')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">
          {{ validateMsg }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNameSpace } from '@zzh/utils/create'
import { ref, provide,computed,inject} from 'vue';
import { FormItemValidateState, formItemProps, FormItemContextKey, FormItemContext, FormItemRule, Arrayable } from './form-item';
import {  FormContextKey } from './form';
import AsyncValdaitor, { Values } from 'async-validator';
import { onMounted } from 'vue';

const bem = createNameSpace('form-item')
const props = defineProps(formItemProps)

const formContext =inject(FormContextKey)
console.log(formContext);

defineOptions({
  name:'zzh-form-item'
})

// 这里主要是校验逻辑
const validateState = ref<FormItemValidateState>('')
const validateMsg = ref('校验失败')

const convertArray = (
  rules:Arrayable<FormItemRule> | undefined):FormItemRule[] =>{
    return rules ? Array.isArray(rules)
        ? rules
        : [rules]
      : []
}

const _rules = computed(()=>{
  // 自己的规则
  const myRules:FormItemRule[] = convertArray(props.rules) 
  const formRules = formContext?.rules  
  if(formRules && props.prop){
    const _temp = formRules[props.prop]
    if(_temp){
      myRules.push(...convertArray(_temp))
    }
  }
  return myRules
})

const getRuleFiltered = (trigger:string) =>{
  // blur change
  const rules = _rules.value
  return rules.filter(rule=>{
    // 这种情况意味着无论如果都要校验
    if(!rule.trigger || !trigger) return true
    if(Array.isArray(rule.trigger)){
      return rule.trigger.includes(trigger)
    }else {
      return rule.trigger === trigger
    }
  })
}

const onValidationSuccessede = ()=>{
  validateState.value = 'success'
  validateMsg.value = ''
}
const onValidationFailed = (err:Values)=>{
  validateState.value = 'error'
  // console.dir(error);
  // debugger
  const { errors } = err
  validateMsg.value = errors ? errors[0].message : ''
}
const validate:FormItemContext['validate'] = async(trigger:string) =>{
  // 拿到触发的时机,校验是否通过可以调用callback 或者调用promise.then
  const rules = getRuleFiltered(trigger)
  // rules 就是触发的规则,trigger就是触发的方式
  // 需要找到对应的数据源头,上面找到对应的prop
  // 触发事件了,找到对应的规则和数据源在哪里,校验那个属性

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const modelName = props.prop!
  // 拿到校验器 
  const validator = new AsyncValdaitor({
    [modelName] : rules
  })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const model = formContext!.model!
  return validator.validate({
    [modelName]:model[modelName]
  }).then(()=>{
    onValidationSuccessede()
  }).catch((err:Values)=>{
    onValidationFailed(err)
    return Promise.reject(err)
  })
  
}

const context:FormItemContext = {
  ...props,
  validate
}

provide(FormItemContextKey,context)

onMounted(()=>{
  // 将上下文传递给form
  formContext?.addField(context)
})

</script>