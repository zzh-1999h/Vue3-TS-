<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('group')">
      <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>

      <div :class="[bem.e('wrapper')]">
        <span v-if="slots.prefixIcon" :class="bem.e('prefix')">
          <slot name="prefixIcon"></slot>
        </span>

        <!-- 这里用ref为子组件指定引用id -->
        <!-- 如果需要显示密码,看当前是普通文本还是密码 -->
        <!-- @input:跟随输入框输入内容实时变更数据 -->
        <input
          ref="input"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs" 
          :class="bem.e('inner')" 
          :placeholder="placeholder"
          :readonly="readonly" 
          :disabled="disabled" 
          @input="handleInput" 
          @change="handleChange" 
          @blur="handleBlur"
          @focus="handleFocus"
        >

        <zzh-icon 
          v-if="showPwdVisible" 
          style="line-height:16px"
          @click="handlePasswordVisible" 
        >
          e
        </zzh-icon>
        <zzh-icon 
          v-if="showClear" 
          style="line-height:16px"
          @click="clear" 
        >
          x
        </zzh-icon>

        <!-- <span v-if="slots.sufixIcon" :class="bem.e('suffix')">
          <slot name="sufixIcon"></slot>
        </span> -->
      </div>

      <div v-if="slots.append" :class="bem.be('group', 'append')">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useSlots, useAttrs, watch, ref, onMounted,nextTick,computed,inject } from 'vue';
import { createNameSpace } from '../../../utils/create';
import { inputProps, inputEmits } from './input';
import { FormItemContext, FormItemContextKey } from '../../form/src/form-item';
const bem = createNameSpace('input')

// 从form组件中取值
const formItemContext = inject(FormItemContextKey)

defineOptions({
  name: 'zzh-input',
  // 属性邦在input身上,而不是div身上
  inheritAttrs: false
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()
const attrs = useAttrs()

const input = ref<HTMLInputElement | null>(null)

const focus = async() =>{
  await nextTick() // 这里重新获取焦点
  input.value?.focus()
  // 等价于:
  // nextTick等DOM更新完,即在数据发生变化之后立即获取数据或者操作
  /* nextTick(()=>{
    input.value?.focus()
  }) */
}

// 4.用来控制是否显示密码
const passwordVisible = ref(false)
const handlePasswordVisible = () =>{
  passwordVisible.value = !passwordVisible.value
  focus()
}
const showPwdVisible = computed(()=>{
  return props.modelValue && props.showPassword && !props.disabled && !props.readonly
})

// 5.清空文本框内容
const showClear = computed(()=>{
    return props.modelValue && props.clearable && !props.disabled && !props.readonly
})
const clear = () =>{
  emit('input', '')
  emit('update:modelValue', '') // 触发事件可以实现双向绑定
  emit('clear')
  focus()
}

// 1.监控value的值的变化 重新赋值
watch(
    () => props.modelValue, 
    () => {
      (formItemContext as FormItemContext)?.validate('change')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(()=>{})
    // console.log("props.modelValue", props.modelValue);
    setNativeInputValue();
    }
  )

const setNativeInputValue = () => {
  const inputEle = input.value
  if (!inputEle) return
  inputEle.value = String(props.modelValue)
}

// 2.组件加载完毕后,设置一次输入框的值
onMounted(() => {
  setNativeInputValue()
})

// 3.实现双向绑定
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value) // 触发事件可以实现双向绑定
}
const handleChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value)
}
const handleBlur = (e: FocusEvent) => {
  (formItemContext as FormItemContext)?.validate('blur')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(()=>{})
  emit('blur', e)
}
const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}
</script>
