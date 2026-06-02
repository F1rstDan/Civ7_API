import { defineConfig } from 'vitepress'
export default defineConfig({
  title: 'Civ7 Mod API',
  description: '文明7 Mod 开发 API 参考文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'API', link: '/api/gameplay-map' },
      { text: '事件', link: '/api/events' },
    ],
    sidebar: [
      { text: '核心全局 API', items: [
        { text: 'GameplayMap', link: '/api/gameplay-map' },
        { text: 'GameInfo 数据表', link: '/api/game-info' },
        { text: 'Players', link: '/api/players' },
        { text: 'Configuration', link: '/api/configuration' },
        { text: 'Camera', link: '/api/camera' },
        { text: 'Engine', link: '/api/engine' },
        { text: 'Component 基类', link: '/api/component' },
      ]},
      { text: '事件参考', items: [
        { text: '全部事件列表', link: '/api/events' },
      ]}
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '页面导航' },
  }
})
