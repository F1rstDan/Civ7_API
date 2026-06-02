import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Civ7 Mod API',
  description: '文明7 Mod 开发 API 参考文档',
  base: '/Civ7_API/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'API', link: '/api/game' },
      { text: '事件', link: '/api/events' },
      { text: '常量', link: '/api/constants' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/F1rstDan/Civ7_API' },
    ],
    sidebar: [
      {
        text: '核心引擎 API',
        items: [
          { text: 'Game', link: '/api/game' },
          { text: 'GameplayMap', link: '/api/gameplay-map' },
          { text: 'GameInfo 数据表', link: '/api/game-info' },
          { text: 'Players', link: '/api/players' },
          { text: 'Configuration', link: '/api/configuration' },
          { text: 'Camera', link: '/api/camera' },
          { text: 'Engine', link: '/api/engine' },
          { text: 'Locale', link: '/api/locale' },
          { text: 'Network', link: '/api/network' },
          { text: 'Modding', link: '/api/modding' },
          { text: 'Automation', link: '/api/automation' },
        ]
      },
      {
        text: '游戏对象',
        items: [
          { text: 'Units', link: '/api/units' },
          { text: 'Cities', link: '/api/cities' },
          { text: 'Districts', link: '/api/districts' },
          { text: 'Resources', link: '/api/resources' },
          { text: 'Diplomacy', link: '/api/diplomacy' },
          { text: 'DiplomacyDeals', link: '/api/diplomacy-deals' },
          { text: 'Culture', link: '/api/culture' },
          { text: 'Religion', link: '/api/religion' },
          { text: 'ProgressionTrees', link: '/api/progression-trees' },
          { text: 'Notifications', link: '/api/notifications' },
          { text: 'IndependentPowers', link: '/api/independent-powers' },
          { text: 'Operations & Commands', link: '/api/operations-commands' },
        ]
      },
      {
        text: 'UI 框架',
        items: [
          { text: 'Component 基类', link: '/api/component' },
          { text: 'UI Framework', link: '/api/ui-framework' },
          { text: 'Audio & Debug', link: '/api/audio-debug' },
          { text: 'Input', link: '/api/input' },
          { text: 'Social', link: '/api/social' },
        ]
      },
      {
        text: '地图构建',
        items: [
          { text: 'Map Builders', link: '/api/map-builders' },
        ]
      },
      {
        text: '常量与枚举',
        items: [
          { text: '常量总览', link: '/api/constants' },
        ]
      },
      {
        text: '事件参考',
        items: [
          { text: '全部事件列表', link: '/api/events' },
        ]
      }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '页面导航' },
  }
})
