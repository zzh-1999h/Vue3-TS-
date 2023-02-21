

+ 使用 monorepo 环境，在一个项目下可以管理多个项目



树组件的二次封装：

+ 格式化树形结构，根据用户的数据将数据进行格式化

  + 比如用户传进来的可能不是label、key、children，将其格式化成前面的。

    + 实现：树形结构的建立使用递归，并为树节点 `treeNode`建立k-v。

    ```
          const treeNode: TreeNode = {
            key: treeOptions.getKey(node),
            label: treeOptions.getLabel(node),
            children: [],
            rawNode: node,
            level: parent ? parent.level + 1 : 0,
            isLeaf: node.isLeaf ?? children.length == 0
          }
    ```

    

