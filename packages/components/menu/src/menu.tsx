import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './menu'
import { toLine } from "@zzh/utils/toLine";
export default defineComponent({
  name: 'ZzhInfiniteMenu',
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    // 默认选中的菜单
    defaultActive: {
      type: String,
      default: '',
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    // 封装一个渲染无限层级菜单的方法
    // 最终函数会返回一段jsx的代码
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        // 每个菜单的图标,并进行处理
        item.i = `el-icon-${toLine(item.icon)}`
        // 处理sub-menu的插槽
        const slots = {
          title: () => {
            return <>
              <item.i />
              <span>{item.name}</span>
            </>
          }
        }
        // 递归渲染children
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        }
        // 正常渲染普通的菜单
        return (
          <el-menu-item index={item.index}>
            <item.i />
            <span>{item.name}</span>
          </el-menu-item>
        )
      })
    }
    const attrs = useAttrs()
    // console.log(props.data)
    return () => {
      return (
        <el-menu
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})