# Vuepress

## 前言

随着vue3的转正，很多基于vue2写的工具面临着更新，vuepress为其中之一，vuepress-next官方显示当前状态为beta状态。

最近刚好有搭建个人blog的想法，于是就开始学习一下。



## 快速搭建

1. 创建vuepress-blog目录
```ts
mkdir vuepress-blog
```

2. 进入vuepress-blog目录，安装依赖
```ts
cd vuepress-blog
yarn add -D vuepress@next
```

3. package.json添加脚本命令
```ts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

4. 创建docs目录及文档文件
```ts

mkdir dos
echo '# Hello VuePress' > docs/README.md
```

5. 创建.gitignore文件，并添加以下内容
```ts

node_modules
.temp
.cache
```

6. 运行脚本命令
yarn docs:dev

![](./images/Pasted%20image%2020220428095700.png)

## Github Pages部署

1. 创建`<USERNAME>.github.io`仓库
2. 使用Github Actions 实现自动部署
在项目根目录下，创建.github/workflows/docs.yml文件，并输入以下内容
```ts

name: docs

on:
  # trigger deployment on every push to main branch
  push:
    branches: [main]
  # trigger deployment manually
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # fetch all commits to get last updated time or other git log info
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # choose node.js version to use
          node-version: '14'

      # cache node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # install dependencies if the cache did not hit
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # run build script
      - name: Build VuePress site
        run: yarn docs:build

      # please check out the docs of the workflow for more details
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # deploy to gh-pages branch
          target_branch: gh-pages
          # deploy the default output dir of VuePress
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

3. 将项目git push到仓库main分支后，会自动执行Github Actions生成gh-pages branch分支

4. 在项目Settings-> Pages -> Source 设置GitHub Pages 对应的分支gh-pages

![](./images/Pasted%20image%2020220428101713.png)

5. 打开`<USERNAME>.github.io` 即可看到部署的网站

![](./images/Pasted%20image%2020220428095700.png)


## 定制化

### 配置说明

vuepress的配置形式：
1. config.ts，通常为网站范围的配置
2. frontmatter，通常为页面级的配置，包含主页和普通页面的配置

以下使用default theme 来说明下具体配置


### 配置网站基本信息

网站范围配置，这里使用config.ts进行，配置项由base，lang，title，description，head 等，具体说明可以查看[官网](https://v2.vuepress.vuejs.org/reference/config.html)

```ts
import { defineUserConfig } from "@vuepress/cli";
export default defineUserConfig({
  base: "/",
  title: "caichengcefa博客",
  description: "关于前端技术栈的分享",
});
```


### 配置首页内容

页面范围配置，使用frontmatter进行配置，配置项有home,heroImage，tagline，actions，features，footer等，具体说明可以查看[官网](https://v2.vuepress.vuejs.org/reference/default-theme/frontmatter.html#home-page)

```ts
---
home: true
heroText: caichengcefa博客
tagline: 关于前端技术栈的分享
actions:
  - text: 浏览
    link: /vue/vue.md
    type: primary
---
```

![](./images/Snipaste_2022-04-28_11-22-50.png)

### 配置导航栏、侧边栏内容

1. 配置导航栏，配置项navbar由default theme 提供，具体可以查看[官网](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#navbar)
举例说明，比如添加导航内容，前端导航，下拉包含vue、react子项，该如何配置

```ts
import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
export default defineUserConfig({
  ...
  theme: defaultTheme({
    navbar: [
      {
        text: "前端",
        children: [
          {
            text: "Vue",
            children: ["/vue/vue.md"],
          },
          {
            text: "React",
            children: ["/react/react.md"],
          },
        ],
      },
      {
        text: "后端",
        children: [
          {
            text: "Nodejs",
            children: ["/nodejs/nodejs.md"],
          },
        ],
      },
      ...
    ],
  }),
});

```
![](./images/Pasted%20image%2020220428103458.png)

1. 配置侧边栏，配置项sidebar由default theme 提供，具体可以查看[官网](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar)

```ts
import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
export default defineUserConfig({
  ...
  theme: defaultTheme({
	...
    sidebar: {
      "/vue/": [
        {
          text: "Vue",
          children: ["/vue/vue.md"],
        },
      ],
      "/react/": [
        {
          text: "React",
          children: ["/react/react.md"],
        },
      ],
    },
    ...
  }),
});

```
![](./images/Pasted%20image%2020220428104122.png)

### 页面内容

1. 使用图片，推荐使用相对路径

```ts
# Hello Vue

![图片](./Snipaste_2022-04-28_10-43-32.png)

```
![](./images/Pasted%20image%2020220428104511.png)

2. 使用组件

```ts
<CountComponent></CountComponent>
```
<CountComponent></CountComponent>

## 内容总结

以上主要是Vuepress基本使用的内容，使用默认主题default theme进行搭建。

主要包含一下三方面内容：
- 博客搭建
- Github Pages部署
- 定制化

其中定制化包含：
- 配置网站信息，首页内容，导航栏，侧边栏等内容
- 页面内容如何使用图片、组件等

