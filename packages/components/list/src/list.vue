
<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
        <el-scrollbar max-height="300px">
          <div v-for="(item1, index1) in item.content" :key="index1" @click="clickItem(item1, index1)" class="container">
            <div class="avatar">
              <el-avatar size="small" :src="item1.avatar"></el-avatar>
            </div>
            <div class="content">
              <div v-if="item1.title" class="title">
                {{ item1.title }}
                <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{ item1.tag }}
                </el-tag>
              </div>
              <div v-if="item1.desc" class="time">{{ item1.desc }}
              </div>
              <div v-if="item1.time" class="time">{{ item1.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div v-for="(action, i) in actions" :key="i" @click="clickAction(action, i)" class="a-item"
              :class="{ 'border': i !== actions.length }">
              <div v-if="action.icon" class="a-icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">
                {{ action.text }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang='ts'>
import { ListOptions, ActionOptions, ListItem } from "@zzh/components/list"
import { toLine } from "@zzh/utils/toLine";
import { PropType } from "vue";
defineOptions({
  name: 'zzh-list',
  inheritAttrs: false
})

const props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})
const emits = defineEmits(['clickItem', 'clickAction'])

const clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}
const clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', { item, index })
}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background: #e6f6ff;
  }

  .avatar {
    flex: 1;
  }

  .content {
    flex: 3;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;

  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}

.border {
  border-right: 1px solid #eee;
}
</style>