import { createApp } from "vue";
import App from "./App.vue";
import Icon from "@zzh/components/icon";
import Tree from "@zzh/components/tree";
import Button from "@zzh/components/button";
import Input from "@zzh/components/input";
import { FormItem, Form } from "@zzh/components/form";
import Container from "@zzh/components/container";
import ChooseIcon from "@zzh/components/chooseIcon";
import ChooseArea from "@zzh/components/chooseArea";
import Trend from "@zzh/components/trend";
import Notification from "@zzh/components/notification";
import List from "@zzh/components/list";
import { Menu, InfiniteMenu } from "@zzh/components/menu";
import Progress from "@zzh/components/progress";
import ChooseTime from "@zzh/components/chooseTime";
import ChooseDate from "@zzh/components/chooseDate";
import ChooseCity from "@zzh/components/chooseCity";
import FormSecond from "@zzh/components/formSecond";
import ModalForm from "@zzh/components/modalForm";
import "@zzh/theme-chalk/src/index.scss";

import { toLine } from '@zzh/utils/toLine'
// 引入ep,因为一些组件是从0-1开始写,一些组件是基于ep的二次封装
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App);

// 全局注册图标 牺牲一点性能
// el-icon-xxx
for (const i in Icons) {
  // 注册全部组件
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

const plugins =
  [Icon, Tree, Button, Input, FormItem, Form, Container, ChooseIcon, ChooseArea, Trend, Notification, List, Menu, InfiniteMenu, Progress, ChooseTime, ChooseDate, ChooseCity, FormSecond, ModalForm];
// 将组件注册为全局组件
plugins.forEach((plugin) => app.use(plugin));

app.use(ElementPlus).mount("#app");
