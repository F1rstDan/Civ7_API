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
        text: 'Game 子系统（TunerPanels）',
        items: [
          { text: 'GameEffects 效果系统', link: '/api/game-effects' },
          { text: 'Trade 贸易系统', link: '/api/trade' },
          { text: 'Victories 胜利系统', link: '/api/victories' },
          { text: 'Random Events 随机事件', link: '/api/random-events' },
          { text: 'Unlocks 解锁系统', link: '/api/unlocks' },
          { text: 'Visibility 可见性', link: '/api/visibility' },
        ]
      },
      {
        text: 'Player 子系统（TunerPanels）',
        items: [
          { text: 'Legacies 传承系统', link: '/api/legacies' },
          { text: 'Stories 故事系统', link: '/api/stories' },
          { text: 'AdvancedStart 高级开局', link: '/api/advanced-start' },
          { text: 'Autoplay 自动播放', link: '/api/autoplay' },
          { text: 'Advisors 建议系统', link: '/api/advisors' },
        ]
      },
      {
        text: '地图子系统（TunerPanels）',
        items: [
          { text: 'MapFeatures 自然特征', link: '/api/map-features' },
          { text: 'Reflection 调试反射', link: '/api/reflection' },
        ]
      },
      {
        text: '可视化与调试（TunerPanels）',
        items: [
          { text: 'WorldUnits 单位可视化', link: '/api/world-units' },
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
