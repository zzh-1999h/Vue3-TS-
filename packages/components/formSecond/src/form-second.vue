<template>
  <el-form
    v-if="model"
    ref="form"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
  >
    <template
      v-for="(item, index) in options"
      :key="index"
    >
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          :is="`el-${item.type}`"
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
        >
        </component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <div
          v-if="item.type === 'editor'"
          id="editor"
        >

        </div>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            :is="`el-${child.type}`"
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
          >

          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot
        name="action"
        :form="form"
        :model="model"
      ></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { PropType, ref, onMounted, watch, nextTick, shallowRef } from 'vue'
import { FormOptions, FormInstance } from './form-second';
import cloneDeep from 'lodash/cloneDeep'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import E from "wangeditor"

defineOptions({
  name: 'zzh-form-second',
  inheritAttrs: false
})
const props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  // eslint-disable-next-line vue/require-default-prop
  httpRequest: {
    type: Function
  }
})

const emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])

const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance | null>()
const edit = ref()
// 初始化表单
const initForm = () => {
  const m: any = { username: '', password: '' }
  const r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
    if (item.type === 'editor') {
      // 初始化富文本
      nextTick(() => {
        if (document.getElementById('editor')) {
          const editor = new E('#editor')
          editor.config.placeholder = item.placeholder as string
          editor.create()
          // 初始化富文本的内容
          editor.txt.html(item.value)
            editor.config.onchange = (newHtml: string) => {
              // console.log(newHtml)
              model.value[item.prop!] = newHtml
            }
            edit.value = editor
        }
      }) 
    }
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

const resetFields = () => {
  // 重置ep的表单
  form.value!.resetFields()
  // 重置富文本内容
  // 获取富文本配置项
  if (props.options && props.options.length) {
    const editorItem = props.options.find(item => item.type === 'editor')!
    edit.value.txt.html(editorItem.value)
  }
}

// 分发方法
defineExpose({
  resetFields
})

onMounted(() => {
  initForm()
})

// 监听父组件传递进来的options
watch(() => props.options, () => {
  initForm()
}, { deep: true })

// 上传组件的所有方法
const onPreview = (file: File) => {
  emits('on-preview', file)
}
const onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}

const onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  const uploadItem = props.options.find(item => item.type === 'upload')
  if( uploadItem && uploadItem.prop) {
    model.value[uploadItem.prop] = { response, file, fileList }
  }
  emits('on-success', { response, file, fileList })
}
const onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList, })
}
const onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
const onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
const beforeUpload = (file: File) => {
  emits('before-upload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
const onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
</script>

<style scoped></style>