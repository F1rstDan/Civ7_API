---
title: GameInfo 数据表
---

# GameInfo 数据表

通过 `GameInfo.TableName` 访问游戏数据表。使用 `.lookup()` 方法通过哈希值查询，使用数组遍历获取所有条目。

```javascript
// 通过哈希值查询
const civInfo = GameInfo.Civilizations.lookup(civHash);

// 遍历所有条目
for (const terrain of GameInfo.Terrains) {
  console.log(terrain.TerrainType);
}

// 获取地图配置
const mapInfo = GameInfo.Maps.lookup(mapSize);
```

## 数据表列表（共 84 个）

| 表名 | 中文名 | 说明 |
|------|--------|------|
| `Adjacency_YieldChanges` | 相邻产出变化 | 建筑/城区与相邻地块的产出加成规则 |
| `Ages` | 时代 | 游戏时代定义（古典、探索、现代） |
| `Attributes` | 属性 | 领袖属性定义 |
| `BeliefClasses` | 信仰类别 | 信仰的分类定义 |
| `Beliefs` | 信仰 | 所有信仰定义 |
| `Biomes` | 生物群落 | 生物群落类型定义 |
| `Buildings` | 建筑 | 所有建筑定义 |
| `CityStateBonuses` | 城邦奖励 | 城邦提供的奖励定义 |
| `CityStateTypes` | 城邦类型 | 城邦类型定义 |
| `Civilizations` | 文明 | 所有文明定义 |
| `CivilopediaPages` | 百科页面 | 游戏百科页面定义 |
| `Constructibles` | 可建造物 | 所有可建造物（建筑、改良设施等）定义 |
| `ConstructibleModifiers` | 建造物修正 | 建造物的修正器定义 |
| `Constructible_Adjacencies` | 建造物相邻 | 建造物相邻产出规则 |
| `Constructible_YieldChanges` | 建造物产出 | 建造物产出变化定义 |
| `Continents` | 大陆 | 大陆类型定义 |
| `CultureSlots` | 文化槽位 | 文化传承槽位定义 |
| `Defeats` | 失败条件 | 游戏失败条件定义 |
| `Difficulties` | 难度 | 游戏难度等级定义 |
| `DiplomacyActions` | 外交行为 | 外交行为类型定义 |
| `Districts` | 城区 | 城区类型定义 |
| `FeatureClasses` | 地物类别 | 地物分类定义 |
| `Features` | 地物 | 所有地物定义（森林、沼泽等） |
| `Feature_NaturalWonders` | 自然奇观 | 自然奇观定义 |
| `GameSpeeds` | 游戏速度 | 游戏速度定义 |
| `GlobalParameters` | 全局参数 | 游戏全局参数定义 |
| `Governments` | 政府 | 政体定义 |
| `GreatPersonClasses` | 伟人类别 | 伟人分类定义 |
| `GreatWorks` | 大作品 | 大作品定义 |
| `Ideologies` | 意识形态 | 意识形态定义 |
| `Improvements` | 改良设施 | 改良设施定义 |
| `Independents` | 独立势力 | 独立势力定义 |
| `InterfaceModes` | 界面模式 | 界面模式定义 |
| `Leaders` | 领袖 | 所有领袖定义 |
| `Legacies` | 传承 | 传承定义 |
| `LegacyPaths` | 传承路径 | 传承路径定义 |
| `LegacyCivilizations` | 传承文明 | 传承文明定义 |
| `Maps` | 地图 | 地图尺寸配置 |
| `MapResourceMinimumAmountModifier` | 地图资源修正 | 地图资源最小数量修正 |
| `Mementos` | 纪念品 | 纪念品定义 |
| `Modifiers` | 修正器 | 修正器定义 |
| `NarrativeStories` | 叙事故事 | 叙事故事定义 |
| `Notifications` | 通知 | 通知类型定义 |
| `PlotEffects` | 地块效果 | 地块效果定义 |
| `ProgressionTrees` | 进阶树 | 进阶科技/文化树定义 |
| `ProgressionTreeNodes` | 进阶树节点 | 进阶树节点定义 |
| `Projects` | 项目 | 项目定义 |
| `RandomEvents` | 随机事件 | 随机事件定义 |
| `Religions` | 宗教 | 宗教定义 |
| `Resources` | 资源 | 资源定义 |
| `ResourceClasses` | 资源类别 | 资源分类定义 |
| `Resource_YieldChanges` | 资源产出 | 资源产出变化 |
| `Routes` | 道路 | 道路类型定义 |
| `StartBiasBiomes` | 起始偏好生物群落 | 文明起始位置的生物群落偏好 |
| `StartBiasResources` | 起始偏好资源 | 文明起始位置的资源偏好 |
| `StartBiasTerrains` | 起始偏好地形 | 文明起始位置的地形偏好 |
| `StartBiasRivers` | 起始偏好河流 | 文明起始位置的河流偏好 |
| `StartBiasFeatureClasses` | 起始偏好地物 | 文明起始位置的地物偏好 |
| `StartBiasLakes` | 起始偏好湖泊 | 文明起始位置的湖泊偏好 |
| `StartBiasNaturalWonders` | 起始偏好奇观 | 文明起始位置的奇观偏好 |
| `StartBiasAdjacentToCoasts` | 起始偏好海岸 | 文明起始位置的海岸偏好 |
| `StartingGovernments` | 起始政府 | 起始政府定义 |
| `Terrains` | 地形 | 地形类型定义 |
| `Traditions` | 传统 | 传统定义 |
| `TraditionModifiers` | 传统修正 | 传统修正器定义 |
| `Types` | 类型 | 通用类型定义 |
| `TypeTags` | 类型标签 | 类型标签定义 |
| `UniqueQuarters` | 特色城区 | 特色城区定义 |
| `UnitAbilities` | 单位能力 | 单位能力定义 |
| `UnitCommands` | 单位命令 | 单位命令定义 |
| `UnitOperations` | 单位操作 | 单位操作定义 |
| `UnitPromotions` | 单位晋升 | 单位晋升定义 |
| `UnitPromotionDisciplines` | 晋升学科 | 晋升学科定义 |
| `UnitStats` | 单位属性 | 单位属性定义 |
| `Unit_Costs` | 单位成本 | 单位成本定义 |
| `Unit_Stats` | 单位数值 | 单位数值定义 |
| `UnitUpgrades` | 单位升级 | 单位升级路径定义 |
| `Units` | 单位 | 所有单位定义 |
| `UnlockRequirements` | 解锁条件 | 解锁条件定义 |
| `Victories` | 胜利 | 胜利条件定义 |
| `VictoryTypes` | 胜利类型 | 胜利类型定义 |
| `Wonders` | 奇观 | 奇观定义 |
| `WorkerYields` | 工人产出 | 工人操作产出定义 |
| `Yields` | 产出 | 产出类型定义（食物、生产力、金币等） |
