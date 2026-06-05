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
        text: '核心引擎',
        items: [
          { text: 'Game 核心对象', link: '/api/game' },
          { text: 'GameInfo 数据表', link: '/api/game-info' },
          { text: 'Engine 引擎', link: '/api/engine' },
          { text: 'Players 玩家管理', link: '/api/players' },
          { text: 'Configuration 配置', link: '/api/configuration' },
          { text: 'Modding 模组', link: '/api/modding' },
        ]
      },
      {
        text: '游戏对象',
        items: [
          { text: 'Units 单位', link: '/api/units' },
          { text: 'Cities 城市', link: '/api/cities' },
          { text: 'Districts 区域', link: '/api/districts' },
          { text: 'IndependentPowers 独立势力', link: '/api/independent-powers' },
          { text: 'GameEffects 效果系统', link: '/api/game-effects' },
          { text: 'Operations & Commands 操作命令', link: '/api/operations-commands' },
        ]
      },
      {
        text: '游戏系统',
        items: [
          { text: 'Culture 文化', link: '/api/culture' },
          { text: 'ProgressionTrees 科文树', link: '/api/progression-trees' },
          { text: 'Diplomacy 外交', link: '/api/diplomacy' },
          { text: 'Religion 宗教', link: '/api/religion' },
          { text: 'Trade 贸易系统', link: '/api/trade' },
          { text: 'DiplomacyDeals 外交交易', link: '/api/diplomacy-deals' },
          { text: 'Legacies 传承系统', link: '/api/legacies' },
          { text: 'Stories 故事系统', link: '/api/stories' },
          { text: 'AdvancedStart 高级开局', link: '/api/advanced-start' },
          { text: 'Random Events 随机事件', link: '/api/random-events' },
          { text: 'Victories 胜利系统', link: '/api/victories' },
          { text: 'Advisors 建议系统', link: '/api/advisors' },
        ]
      },
      {
        text: 'UI与可视化',
        items: [
          { text: 'Component 基类', link: '/api/component' },
          { text: 'UI Objects UI对象', link: '/api/ui-objects' },
          { text: 'Audio & Debug 音频调试', link: '/api/audio-debug' },
          { text: 'Camera 镜头', link: '/api/camera' },
          { text: 'Locale 本地化', link: '/api/locale' },
          { text: 'Notifications 通知', link: '/api/notifications' },
          { text: 'WorldUnits 单位视觉表现', link: '/api/world-units' },
          { text: 'WorldUI 世界UI', link: '/api/world-ui' },
        ]
      },
      {
        text: '地图系统',
        items: [
          { text: 'GameplayMap 地图操作', link: '/api/gameplay-map' },
          { text: 'Map Builders 地图构建', link: '/api/map-builders' },
          { text: 'MapFeatures 自然特征', link: '/api/map-features' },
          { text: 'Resources 资源', link: '/api/resources' },
          { text: 'Visibility 可见性', link: '/api/visibility' },
        ]
      },
      {
        text: '常量与事件',
        items: [
          { text: '常量总览', link: '/api/constants' },
          { text: 'Events 事件列表', link: '/api/events' },
        ]
      },
      {
        text: '调试与其他',
        items: [
          { text: 'Automation 自动化', link: '/api/automation' },
          { text: 'Autoplay 自动播放', link: '/api/autoplay' },
          { text: 'Unlocks 解锁系统', link: '/api/unlocks' },
          { text: 'Reflection 调试反射', link: '/api/reflection' },
          { text: 'Network 网络', link: '/api/network' },
          { text: 'Social 社交', link: '/api/social' },
          { text: 'Input 输入', link: '/api/input' },
          { text: 'Globals 全局工具', link: '/api/globals' },
          { text: 'API Stats 调用统计', link: '/api/api-stats' },
        ]
      }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '页面导航' },
  }
})
