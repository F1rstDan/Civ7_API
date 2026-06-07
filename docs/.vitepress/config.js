import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Civ7 Mod API',
  description: '文明7 Mod 开发 API 参考文档',
  base: '/Civ7_API/',
  srcExclude: ['**/_plan/**', '**/_prompt_log/**'],
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
        text: '全局对象',
        items: [
          { text: 'Game 核心对象', link: '/api/game' },
          { text: 'Players 玩家管理', link: '/api/players' },
          { text: 'Units 单位', link: '/api/units' },
          { text: 'Cities 城市', link: '/api/cities' },
          { text: 'Districts 区域', link: '/api/districts' },
          { text: 'Engine 引擎', link: '/api/engine' },
          { text: 'GameEffects 效果系统', link: '/api/game-effects' },
          { text: 'Operations & Commands 操作命令', link: '/api/operations-commands' },
        ]
      },
      {
        text: '游戏系统',
        items: [
          { text: 'Culture 文化', link: '/api/culture' },
          { text: 'Technology 科技', link: '/api/technology' },
          { text: 'ProgressionTrees 科文树', link: '/api/progression-trees' },
          { text: 'Diplomacy 外交', link: '/api/diplomacy' },
          { text: 'Combat 战斗系统', link: '/api/combat' },
          { text: 'Religion 宗教', link: '/api/religion' },
          { text: 'Trade 贸易系统', link: '/api/trade' },
          { text: 'DiplomacyDeals 外交交易', link: '/api/diplomacy-deals' },
          { text: 'Legacies 传承系统', link: '/api/legacies' },
          { text: 'Stories 故事系统', link: '/api/stories' },
          { text: 'AdvancedStart 高级开局', link: '/api/advanced-start' },
          { text: 'Victories 胜利系统', link: '/api/victories' },
          { text: 'Advisors 建议系统', link: '/api/advisors' },
          { text: 'IndependentPowers 独立势力', link: '/api/independent-powers' },
        ]
      },
      {
        text: '地图系统',
        items: [
          { text: 'Resources 资源', link: '/api/resources' },
          { text: 'GameplayMap 地图操作', link: '/api/gameplay-map' },
          { text: 'Map Builders 地图构建', link: '/api/map-builders' },
          { text: 'MapFeatures 自然特征', link: '/api/map-features' },
          { text: 'Random Events 随机事件', link: '/api/random-events' },
          { text: 'Visibility 可见性', link: '/api/visibility' },
        ]
      },
      {
        text: 'UI与可视化',
        items: [
          { text: 'Component 基类', link: '/api/component' },
          { text: 'UI Objects UI对象', link: '/api/ui-objects' },
          { text: 'Audio 音频声音', link: '/api/audio' },
          { text: 'Camera 镜头', link: '/api/camera' },
          { text: 'Locale 本地化', link: '/api/locale' },
          { text: 'Notifications 通知', link: '/api/notifications' },
          { text: 'WorldUI 世界UI', link: '/api/world-ui' },
          { text: 'WorldUnits 单位视觉表现', link: '/api/world-units' },
        ]
      },
      {
        text: '数据|常量|事件',
        items: [
          { text: 'GameInfo 数据表', link: '/api/game-info' },
          { text: 'Constants 常量总览', link: '/api/constants' },
          { text: 'Events 事件列表', link: '/api/events' },
        ]
      },
      {
        text: '调试与其他',
        items: [
          { text: 'Debug 调试', link: '/api/debug' },
          { text: 'Configuration 配置', link: '/api/configuration' },
          { text: 'Unlocks 解锁系统', link: '/api/unlocks' },
          { text: 'Automation 自动化', link: '/api/automation' },
          { text: 'Autoplay 自动播放', link: '/api/autoplay' },
          { text: 'Reflection 调试反射', link: '/api/reflection' },
          { text: 'Modding 模组', link: '/api/modding' },
          { text: 'Online 在线服务', link: '/api/online' },
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


