<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled)
  
    ]" :type="props.nativeType" :disabled="disabled || loading" @click="emitClick" @mousedown="emitMouseDown"
  >
    <slot></slot>
  </button>
</template>

<script setup lang='ts'>
import { createNameSpace } from '@zzh/utils/create';
import { buttonEmits, buttonProps } from './button';
const bem = createNameSpace('button');
defineOptions({
  name: 'zzh-button'
})
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const emitClick = (e: MouseEvent) => {
  emit('click', e)
}
const emitMouseDown = (e: MouseEvent) => {
  emit('mousedown', e)
}
</script>
