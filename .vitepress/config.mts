import { defineConfig } from 'vitepress';

export default defineConfig({
  title: "ZnP锌小屋",
  description: "A place to put down my spirits.",
  locales: {
    root: {
      label: 'Chinese',
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Long+Cang&display=swap' 
    }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap' 
    }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+SC&display=swap' 
    }]
  ],
  ignoreDeadLinks: true,
  outline: [2, 6],
  lastUpdated: true,
  prev: false,
  next: false,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '小说', link: '/novel-docs' },
      { text: '通联日志', link: '/ham-log' },
      { text: '博客', link: '/blog-docs' },
      { text: '友情链接', link: '/friends' },
      { text: '本项目', link: 'https://github.com/wujx3433/wujx3433.github.io' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wujx3433' },
      { icon: 'twitter', link: 'https://twitter.com/wujx3433' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/7619378' }
    ],
    footer: {
      message: 'Released under CC BY-NC-SA 4.0 License.',
      copyright: 'Copyright © 2025 wujx3433 aka Zn.'
    },
    search: {
      provider: 'local'
    },
  }
});