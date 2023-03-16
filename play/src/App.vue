<template>
  <zzh-choose-icon
    v-model:visible="visible"
    title="选择图标"
  >
    选择图标
  </zzh-choose-icon>
  <zzh-choose-area @change="changeArea">
  </zzh-choose-area>
  <div class="flex">
    <zzh-trend
      text="营业额"
      reverse-color
      up-text-color="blue"
      up-icon="CaretTop"
    ></zzh-trend>
    <zzh-trend
      text="销售额"
      type="dwon"
      down-text-color="red"
      down-icon="CaretBottom"
    ></zzh-trend>
  </div>
  <hr>
  <!-- 下面的是通知组件,利用了ep的图标/徽章 +自 自己封装的list组件 -->
  <zzh-notification
    :value="50"
    :max="30"
    icon="ChatRound"
  >
    <template #default>
      <!-- <zzh-list :list="list" :actions="actions" @click-item="clickItem" @click-action="clickAction"></zzh-list> -->
      <zzh-list
        :list="list"
        :actions="actions"
      ></zzh-list>
    </template>
  </zzh-notification>

  <!-- 1-2级的菜单栏 -->
  <!--   <div style="width:200px">
    <zzh-menu :data="data1" default-active="2" a="1">
    </zzh-menu>
  </div> -->

  <!-- 无限层级的菜单栏 -->
  <div style="width:200px">
    <Zzh-infinite-menu :data="data2"></Zzh-infinite-menu>
  </div>
  <!-- <zzh-container></zzh-container> -->
  <zzh-progress
    :percentage="60"
    is-animation
  ></zzh-progress>
  <br />
  <!-- <zzh-progress is-animation status="success" :stroke-width="20" :percentage="60"></zzh-progress>
  <br />
  <zzh-progress :time="5000" type="circle" is-animation :percentage="60"></zzh-progress> -->
  <zzh-choose-time
    :startOptions="startOptions"
    @startChange="startChange"
    @endChange="endChange"
  ></zzh-choose-time>
  <zzh-choose-date
    @startChange="dateStartChange"
    @endChange="dateEndChange"
  ></zzh-choose-date>
  <zzh-choose-city></zzh-choose-city>

  <!-- 基于ep的二次封装的form -->
  <zzh-form-second
    ref="form"
    :options="options"
    @on-change="handleChange"
    @before-upload="handleBeforeUpload"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="beforeRemove"
    @on-success="handleSuccess"
    @on-exceed="handleExceed"
  >
    <template #uploadArea>
      <el-button
        size="small"
        type="primary"
      >Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div style="color: #ccc;font-size: 12px;">
        只接受jpg和png格式的图片
      </div>
    </template>
    <template #action="scope">
      <el-button
        type="primary"
        @click="submitForm(scope)"
      >
        提交
      </el-button>
      <!-- <el-button @click="resetForm">重置</el-button> -->
    </template>
  </zzh-form-second>
  <zzh-modal-form></zzh-modal-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { list, actions } from '@zzh/components/notification/src/data'
import { FormOptions, Scope } from '@zzh/components/formSecond/src/form-second'
// import ElMessage from 'element-plus/es/components/message'

const visible = ref<boolean>(false)
const changeArea = (val: any) => {
  console.log(val)
}

// const clickItem = (val: any) => {
//   console.log(val)
// }
// const clickAction = (val: any) => {
//   console.log(val)
// }

// menu菜单的数据
const data1 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'document',
      }
    ]
  }
]

const data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'document',
                children: [
                  {
                    name: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    icon: 'document',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

interface endValue {
  startTime: string,
  entTime: string
}

const startChange = (val: string) => {
  console.log(val)
}
const endChange = (val: endValue) => {
  console.log(val)
}
const startOptions = {
  size: 'small',
  clearable: false
}

interface DateEndValue {
  startDate: Date,
  entDate: Date
}

const dateStartChange = (val: Date) => {
  console.log(val)
}

const dateEndChange = (val: DateEndValue) => {
  console.log(val)
}
const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 16,
        message: '密码在6-15位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      showPassword: true
    }
  },
  {
    type: 'select',
    value: '3',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs:{
      style:{
        width: '100%'
      },
    },
    rules: [
      {
        required:true,
        message:'职位不能为空',
        trigger: 'blur'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      },
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'not'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs:{
      action :"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      multiple: true,
      limit: 3
    },
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入内容',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur'
      }
    ]
  }
]

const submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      console.log(scope.model)
    } else {
      console.error('表单填写有误,请检查')
    }
  })
}

const form = ref()

const resetForm = () => {
  form.value.resetFields()
}

const handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
const handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
const beforeRemove = (val: any) => {
  console.log('beforeRemove',val)
  // return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
const handleExceed = (val: any) => {
  console.log('handleExceed', val)
  // ElMessage.warning(
  //   `The limit is 3, you selected ${val.files.length
  //   } files this time, add up to ${val.files.length + val.fileList.length} totally`
  // )
}
const handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
const handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
const handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}
</script>

<style scoped lang="scss"> .flex {
   display: flex;

   div {
     margin-right: 10px;
   }
 }
</style>