import { createApp } from "vue";
import App from "./App.vue";
import Icon from "@zzh/components/icon";
import Tree from "@zzh/components/tree";
import Button from "@zzh/components/button";
import Input from "@zzh/components/input";
import { FormItem, Form } from "@zzh/components/form";
import "@zzh/theme-chalk/src/index.scss";

const app = createApp(App);
const plugins = [Icon, Tree, Button, Input, FormItem, Form];
// 将组件注册为全局组件
plugins.forEach((plugin) => app.use(plugin));
app.mount("#app");
