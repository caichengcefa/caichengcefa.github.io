import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
// import { docsearchPlugin } from "@vuepress/plugin-docsearch";
// import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import type { NavbarConfig, SidebarConfig } from "@vuepress/theme-default";

const navbar: NavbarConfig = [
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
  {
    text: "算法",
    children: [
      {
        text: "数据结构",
        children: ["/algorithm/array.md", "/algorithm/linklist.md"],
      },
      {
        text: "算法",
        children: ["/algorithm/动态规划.md"],
      },
    ],
  },
  {
    text: "基础",
    children: [
      {
        text: "html",
        children: ["/html/html.md"],
      },
      {
        text: "js",
        children: ["/js/js.md"],
      },
      {
        text: "css",
        children: ["/css/css.md"],
      },
    ],
  },
  {
    text: "其他",
    children: [
      {
        text: "工具",
        children: ["/tool/vuepress.md"],
      },
    ],
  },
];
const sidebar: SidebarConfig = {
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
  "/nodejs/": [
    {
      text: "Nodejs",
      children: ["/nodejs/nodejs.md"],
    },
    {
      text: "Nestjs",
      children: ["/nodejs/Nestjs.md"],
    },
  ],
  "/algorithm/": [
    {
      text: "数据结构",
      children: ["/algorithm/array.md", "/algorithm/linklist.md"],
    },
    {
      text: "算法",
      children: ["/algorithm/动态规划.md"],
    },
  ],
};

export default defineUserConfig({
  base: "/",
  title: "caichengcefa博客",
  description: "关于前端技术栈的分享",

  theme: defaultTheme({
    // logo: "/images/hero.png",
    repo: "https://github.com/caichengcefa/caichengcefa.github.io",
    repoLabel: "Github",

    navbar: navbar,
    sidebar: sidebar,

    docsDir: "docs",
    editLinkText: "Edit this page on GitHub",
  }),

  // plugins: [
  //   docsearchPlugin({
  //     appId: "34YFD9IUQ2",
  //     apiKey: "9a9058b8655746634e01071411c366b8",
  //     indexName: "vuepress",
  //     searchParameters: {
  //       facetFilters: ["tags:v2"],
  //     },
  //     locales: {
  //       "/zh/": {
  //         placeholder: "搜索文档",
  //         translations: {
  //           button: {
  //             buttonText: "搜索文档",
  //             buttonAriaLabel: "搜索文档",
  //           },
  //           modal: {
  //             searchBox: {
  //               resetButtonTitle: "清除查询条件",
  //               resetButtonAriaLabel: "清除查询条件",
  //               cancelButtonText: "取消",
  //               cancelButtonAriaLabel: "取消",
  //             },
  //             startScreen: {
  //               recentSearchesTitle: "搜索历史",
  //               noRecentSearchesText: "没有搜索历史",
  //               saveRecentSearchButtonTitle: "保存至搜索历史",
  //               removeRecentSearchButtonTitle: "从搜索历史中移除",
  //               favoriteSearchesTitle: "收藏",
  //               removeFavoriteSearchButtonTitle: "从收藏中移除",
  //             },
  //             errorScreen: {
  //               titleText: "无法获取结果",
  //               helpText: "你可能需要检查你的网络连接",
  //             },
  //             footer: {
  //               selectText: "选择",
  //               navigateText: "切换",
  //               closeText: "关闭",
  //               searchByText: "搜索提供者",
  //             },
  //             noResultsScreen: {
  //               noResultsText: "无法找到相关结果",
  //               suggestedQueryText: "你可以尝试查询",
  //               reportMissingResultsText: "你认为该查询应该有结果？",
  //               reportMissingResultsLinkText: "点击反馈",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   }),
  //   registerComponentsPlugin({
  //     componentsDir: path.resolve(__dirname, "./components"),
  //   }),
  // ],
});
