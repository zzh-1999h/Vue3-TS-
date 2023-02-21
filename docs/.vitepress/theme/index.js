import DefaultTheme from 'vitepress/theme';
import ZzhIcon from '@zzh/components/icon';
import '@zzh/theme-chalk/src/index.scss';

console.log(ZzhIcon);
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZzhIcon); // 在vitepress中注册全局组件
  }
}