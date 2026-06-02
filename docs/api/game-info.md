---
title: GameInfo 数据表
---

# GameInfo

游戏数据表查询对象。通过 `GameInfo.TableName` 访问，支持 `.lookup()` 查询和数组遍历。

```javascript
const civInfo = GameInfo.Civilizations.lookup(civHash);
for (const terrain of GameInfo.Terrains) {
  console.log(terrain.TerrainType);
}
```

## 数据表列表

### 核心数据

| 表名 | 说明 |
|------|------|
| `Civilizations` | 文明定义 |
| `Leaders` | 领袖定义 |
| `Ages` | 时代定义 |
| `Maps` | 地图尺寸配置 |
| `Difficulties` | 难度等级 |
| `GameSpeeds` | 游戏速度 |
| `GlobalParameters` | 全局参数 |
| `Types` | 通用类型定义 |
| `TypeTags` | 类型标签 |

### 地形与地图

| 表名 | 说明 |
|------|------|
| `Terrains` | 地形类型 |
| `Biomes` | 生物群落 |
| `Features` | 地物（森林、沼泽等） |
| `FeatureClasses` | 地物分类 |
| `Feature_NaturalWonders` | 自然奇观 |
| `Continents` | 大陆类型 |
| `Resources` | 资源定义 |
| `ResourceClasses` | 资源分类 |
| `Resource_YieldChanges` | 资源产出变化 |
| `Resource_Distribution` | 资源分布 |
| `Routes` | 道路类型 |

### 建筑与城区

| 表名 | 说明 |
|------|------|
| `Constructibles` | 可建造物（建筑、改良设施等） |
| `ConstructibleModifiers` | 建造物修正器 |
| `Constructible_Adjacencies` | 建造物相邻产出 |
| `Constructible_YieldChanges` | 建造物产出变化 |
| `Constructible_Maintenances` | 建造物维护费 |
| `Buildings` | 建筑定义 |
| `Wonders` | 奇观定义 |
| `Districts` | 城区定义 |
| `UniqueQuarters` | 特色城区 |
| `Improvements` | 改良设施 |

### 单位

| 表名 | 说明 |
|------|------|
| `Units` | 单位定义 |
| `Unit_Stats` | 单位属性 |
| `Unit_Costs` | 单位成本 |
| `UnitAbilities` | 单位能力 |
| `UnitCommands` | 单位命令 |
| `UnitOperations` | 单位操作 |
| `UnitPromotions` | 单位晋升 |
| `UnitPromotionDisciplines` | 晋升学科 |
| `UnitUpgrades` | 单位升级路径 |
| `UnitReplaces` | 单位替代关系 |

### 科技与文化

| 表名 | 说明 |
|------|------|
| `ProgressionTrees` | 进阶树 |
| `ProgressionTreeNodes` | 进阶树节点 |
| `Traditions` | 传统 |
| `TraditionModifiers` | 传统修正器 |

### 政府与外交

| 表名 | 说明 |
|------|------|
| `Governments` | 政体 |
| `DiplomacyActions` | 外交行为 |
| `DiplomacyStatements` | 外交声明 |
| `Ideologies` | 意识形态 |

### 宗教与信仰

| 表名 | 说明 |
|------|------|
| `Religions` | 宗教 |
| `Beliefs` | 信仰 |
| `BeliefClasses` | 信仰分类 |

### 胜利与解锁

| 表名 | 说明 |
|------|------|
| `Victories` | 胜利条件 |
| `VictoryTypes` | 胜利类型 |
| `Defeats` | 失败条件 |
| `UnlockRequirements` | 解锁条件 |
| `UnlockRewards` | 解锁奖励 |

### 起始偏好

| 表名 | 说明 |
|------|------|
| `StartBiasBiomes` | 生物群落偏好 |
| `StartBiasResources` | 资源偏好 |
| `StartBiasTerrains` | 地形偏好 |
| `StartBiasRivers` | 河流偏好 |
| `StartBiasFeatureClasses` | 地物偏好 |
| `StartBiasLakes` | 湖泊偏好 |
| `StartBiasNaturalWonders` | 奇观偏好 |
| `StartBiasAdjacentToCoasts` | 海岸偏好 |

### UI 与百科

| 表名 | 说明 |
|------|------|
| `CivilopediaPages` | 百科页面 |
| `CivilopediaSections` | 百科章节 |
| `Notifications` | 通知类型 |
| `NotificationSounds` | 通知音效 |
| `DisplayQueuePriorities` | 显示队列优先级 |
