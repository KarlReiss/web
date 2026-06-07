# 外部链接配置使用说明

## 配置文件

配置文件位于: `public/external-links.json`

### 文件内容示例

```json
{
  "links": {
    "github": "https://github.com/username/repo",
    "docs": "/portfolio/knowledge",
    "blog": "https://myblog.com"
  },
  "description": "第三方链接配置文件 - 此文件不参与编译"
}
```

## 链接类型说明

### 1. 外部链接（新标签页打开）

- 格式: 以 `http://` 或 `https://` 开头
- 行为: 点击后在新标签页打开
- 示例:
  ```json
  {
    "github": "https://github.com"
  }
  ```

### 2. 内部链接（路由跳转）

- 格式: 以 `/` 开头的路径
- 行为: 点击后使用 Vue Router 跳转
- 示例:
  ```json
  {
    "docs": "/portfolio/knowledge"
  }
  ```

## 使用方式

### 方式1: 使用 ExternalLink 组件（推荐）

```vue
<template>
  <ExternalLink linkKey="github">前往 GitHub</ExternalLink>

  <ExternalLink url="/portfolio/knowledge">查看文档</ExternalLink>

  <ExternalLink linkKey="blog">
    <span style="color: red;">我的博客</span>
  </ExternalLink>
</template>

<script setup lang="ts">
  import ExternalLink from '@/components/portfolio/ExternalLink.vue'
</script>
```

### 方式2: 使用工具函数

```vue
<template>
  <button @click="handleLinkClick">点击跳转</button>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { loadExternalLinks, getLinkHandler } from '@/utils/external-links'

  const router = useRouter()

  const handleLinkClick = async () => {
    // 方式A: 直接获取链接
    const links = await loadExternalLinks()
    const handler = getLinkHandler(router, links.links.github)
    handler()

    // 方式B: 通过key获取
    const { getLinkByKey } = await import('@/utils/external-links')
    const url = await getLinkByKey('github')
    if (url) {
      const handler = getLinkHandler(router, url)
      handler()
    }
  }
</script>
```

### 方式3: 在页脚中使用

```vue
<template>
  <div class="footer-links">
    <ExternalLink linkKey="github">GitHub</ExternalLink>
    <ExternalLink linkKey="docs">文档</ExternalLink>
  </div>
</template>
```

## API 说明

### ExternalLink 组件 Props

| 属性             | 类型    | 必填 | 默认值 | 说明                                |
| ---------------- | ------- | ---- | ------ | ----------------------------------- |
| linkKey          | string  | 否   | -      | 从配置文件读取的链接key             |
| url              | string  | 否   | -      | 直接的链接地址（优先级高于linkKey） |
| showExternalIcon | boolean | 否   | true   | 是否显示外部链接图标                |

### 工具函数

#### `loadExternalLinks()`

加载外部链接配置文件

#### `getLinkByKey(key: string)`

根据key获取链接

#### `getAllLinks()`

获取所有链接配置

#### `isExternalLink(url: string)`

判断是否为外部链接

#### `getLinkHandler(router, url)`

获取链接处理函数

## 注意事项

1. 配置文件 `public/external-links.json` 不参与编译，可以随时修改
2. 修改配置后需要刷新页面才能生效
3. 建议将此文件加入 `.gitignore`（如果需要不同环境不同配置）
4. 外部链接会自动添加 `rel="noopener noreferrer"` 属性
