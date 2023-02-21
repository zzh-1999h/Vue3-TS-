# Icon图标

Zzh-ui 推荐使用 xicons作为图标库

```javascript
pnpm install @vicons/ionicons5
```

## 使用图标

- 如果你想像用例一样直接使用,你需要全局注册组件,才能够在项目里使用

<script setup lang="ts">
import {CashOutline} from '@vicons/ionicons5';
</script>
<zzh-icon color="red" size="40">
  <CashOutline/>
</zzh-icon>
<zzh-icon color="green" size="40">
  <CashOutline/>
</zzh-icon>
<zzh-icon color="blue" size="40">
  <CashOutline/>
</zzh-icon>

<zzh-icon color="red" size="60">
  <CashOutline/>
</zzh-icon>

```vue
<script setup lang="ts">
import {CashOutline} from '@vicons/ionicons5';
</script>
<template>
  <zzh-icon color="red" size="40">
  <CashOutline/>
  </zzh-icon>
</template>
```

## API

### Icon Props

| 名称    | 类型    | 默认值   | 说明    |
| ----  | ---- |  ------- | ---------- |
| color | string    | undefined   | 图标颜色 |
| size  | number \| string |undefined |图片大小|
