---
title: 事件列表
---

# Engine 事件列表

共 **148** 个事件。通过 `engine.on()` 监听。

```javascript
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);
```

## 事件列表

| 事件名 | 说明 |
|--------|------|
| `GameStarted` | 游戏开始（含热加载） |
| `LocalPlayerChanged` | 本地玩家变更 |
| `LocalPlayerTurnBegin` | 本地玩家回合开始 |
| `LocalPlayerTurnEnd` | 本地玩家回合结束 |
| `TurnBegin` | 回合开始 |
| `TurnEnd` | 回合结束 |
| `CityAddedToMap` | 城市添加到地图 |
| `CityRemovedFromMap` | 城市从地图移除 |
| `CityInitialized` | 城市初始化完成 |
| `CityNameChanged` | 城市名称变更 |
| `CityPopulationChanged` | 城市人口变更 |
| `CityProductionChanged` | 城市生产变更 |
| `CityProductionCompleted` | 城市生产完成 |
| `CityProductionQueueChanged` | 城市生产队列变更 |
| `CityProductionUpdated` | 城市生产更新 |
| `CityYieldChanged` | 城市产出变更 |
| `CityYieldGranted` | 城市获得产出 |
| `CitySelectionChanged` | 城市选中状态变更 |
| `CityGovernmentLevelChanged` | 城市政府等级变更 |
| `CityGrowthModeChanged` | 城市增长模式变更 |
| `CityReligionChanged` | 城市宗教变更 |
| `CityTransfered` | 城市转移 |
| `CityStateBonusChosen` | 城邦奖励选择 |
| `CityProjectCompleted` | 城市项目完成 |
| `CapitalCityChanged` | 首都变更 |
| `ConqueredSettlementIntegrated` | 被征服定居点整合 |
| `UnitAddedToMap` | 单位添加到地图 |
| `UnitRemovedFromMap` | 单位从地图移除 |
| `UnitMoved` | 单位移动 |
| `UnitMoveComplete` | 单位移动完成 |
| `UnitSelectionChanged` | 单位选中状态变更 |
| `UnitDamageChanged` | 单位伤害变更 |
| `UnitPromoted` | 单位晋升 |
| `UnitKilledInCombat` | 单位在战斗中阵亡 |
| `UnitExperienceChanged` | 单位经验值变更 |
| `UnitActivityChanged` | 单位活动变更 |
| `UnitCommandStarted` | 单位命令开始 |
| `UnitVisibilityChanged` | 单位可见性变更 |
| `UnitOperationAdded` | 单位操作添加 |
| `UnitOperationStarted` | 单位操作开始 |
| `UnitOperationSegmentComplete` | 单位操作段完成 |
| `UnitOperationDeactivated` | 单位操作停用 |
| `UnitOperationsCleared` | 单位操作清空 |
| `UnitMovementPointsChanged` | 单位移动力变更 |
| `UnitAddedToArmy` | 单位加入军队 |
| `UnitRemovedFromArmy` | 单位离开军队 |
| `PlotChanged` | 地块变更 |
| `PlotOwnershipChanged` | 地块所有权变更 |
| `PlotVisibilityChanged` | 地块可见性变更 |
| `PlotYieldChanged` | 地块产出变更 |
| `PlotEffectAddedToMap` | 地块效果添加 |
| `PlotEffectRemovedFromMap` | 地块效果移除 |
| `DistrictAddedToMap` | 城区添加到地图 |
| `DistrictRemovedFromMap` | 城区从地图移除 |
| `DistrictControlChanged` | 城区控制变更 |
| `DistrictDamageChanged` | 城区伤害变更 |
| `ConstructibleAddedToMap` | 建筑添加到地图 |
| `ConstructibleRemovedFromMap` | 建筑从地图移除 |
| `ConstructibleChanged` | 建筑变更 |
| `ConstructibleBuildCompleted` | 建筑建造完成 |
| `ResourceAddedToMap` | 资源添加到地图 |
| `ResourceRemovedFromMap` | 资源从地图移除 |
| `ResourceAssigned` | 资源分配 |
| `ResourceUnassigned` | 资源取消分配 |
| `ResourceCapChanged` | 资源上限变更 |
| `RouteAddedToMap` | 道路添加到地图 |
| `TradeRouteAddedToMap` | 贸易路线添加 |
| `TradeRouteChanged` | 贸易路线变更 |
| `TradeRouteRemovedFromMap` | 贸易路线移除 |
| `DiplomacyEventStarted` | 外交事件开始 |
| `DiplomacyEventEnded` | 外交事件结束 |
| `DiplomacyEventResponse` | 外交事件响应 |
| `DiplomacyEventCanceled` | 外交事件取消 |
| `DiplomacyDeclareWar` | 宣战 |
| `DiplomacyMakePeace` | 和谈 |
| `DiplomacyMeet` | 遇见新文明 |
| `DiplomacyMeetMajors` | 遇见主要文明 |
| `DiplomacyRelationshipChanged` | 外交关系变更 |
| `DiplomacyRelationshipLevelChanged` | 外交关系等级变更 |
| `DiplomacyRelationshipStatusChanged` | 外交关系状态变更 |
| `DiplomacyStatement` | 外交声明 |
| `DiplomacyQueueChanged` | 外交队列变更 |
| `DiplomacyTreasuryChanged` | 外交金库变更 |
| `DiplomacyGlobalTokensChanged` | 外交全局代币变更 |
| `DiplomacySessionClosed` | 外交会话关闭 |
| `DiplomacyEventSupportChanged` | 外交事件支持变更 |
| `TechNodeCompleted` | 科技节点完成 |
| `TechTreeChanged` | 科技树变更 |
| `TechTargetChanged` | 科技目标变更 |
| `ScienceYieldChanged` | 科技产出变更 |
| `CultureNodeCompleted` | 文化节点完成 |
| `CultureTreeChanged` | 文化树变更 |
| `CultureTargetChanged` | 文化目标变更 |
| `CultureYieldChanged` | 文化产出变更 |
| `AttributeNodeCompleted` | 属性节点完成 |
| `AttributePointsChanged` | 属性点数变更 |
| `TraditionChanged` | 传统变更 |
| `TraditionSlotsAdded` | 传统槽位添加 |
| `FoodQueueChanged` | 食物队列变更 |
| `TreasuryChanged` | 国库变更 |
| `PlayerDefeat` | 玩家失败 |
| `PlayerInfoChanged` | 玩家信息变更 |
| `PlayerTurnActivated` | 玩家回合激活 |
| `PlayerTurnDeactivated` | 玩家回合停用 |
| `PlayerYieldChanged` | 玩家产出变更 |
| `PlayerSettlementCapChanged` | 玩家定居点上限变更 |
| `PlayerAgeTransitionComplete` | 玩家时代转换完成 |
| `PlayerLegacyCompleted` | 玩家传承完成 |
| `PlayerLegacyProgress` | 玩家传承进度 |
| `PlayerUnlockChanged` | 玩家解锁变更 |
| `PlayerUnlockProgressChanged` | 玩家解锁进度变更 |
| `WonderCompleted` | 奇观完成 |
| `ReligionFounded` | 宗教创立 |
| `BeliefAdded` | 信仰添加 |
| `PantheonFounded` | 万神殿创立 |
| `GreatWorkCreated` | 大作品创建 |
| `GreatWorkMoved` | 大作品移动 |
| `GreatWorkArchived` | 大作品归档 |
| `NaturalWonderRevealed` | 自然奇观揭示 |
| `RandomEventOccurred` | 随机事件发生 |
| `GoodyHutReward` | 村庄奖励 |
| `Combat` | 战斗 |
| `NotificationAdded` | 通知添加 |
| `NotificationDismissed` | 通知关闭 |
| `NotificationActivated` | 通知激活 |
| `NotificationUpdated` | 通知更新 |
| `NotificationListUpdated` | 通知列表更新 |
| `GameAgeEnded` | 时代结束 |
| `AgeProgressionChanged` | 时代进度变更 |
| `BeforeAgeTransition` | 时代转换前 |
| `GenerateAgeTransition` | 生成时代转换 |
| `GenerateMap` | 生成地图 |
| `CameraChanged` | 镜头变更 |
| `InputAction` | 输入动作 |
| `UpdateFrame` | 每帧更新 |
| `BeginFrame` | 帧开始 |
| `EndFrame` | 帧结束 |
| `AffinityLevelChanged` | 亲密度变更 |
| `LegacyPathMilestoneCompleted` | 传承路径里程碑完成 |
| `LegacyPathProgress` | 传承路径进度 |
| `VictoryType` | 胜利类型 |
| `TeamVictory` | 团队胜利 |
| `EndStateReached` | 终局状态达到 |
| `MultiplayerChat` | 多人聊天 |
| `MultiplayerHostMigrated` | 多人房主迁移 |
| `ConnectionStatusChanged` | 连接状态变更 |
| `SaveComplete` | 保存完成 |
| `LoadComplete` | 加载完成 |
---
title: 引擎事件列表
---

# 引擎事件参考

文明7引擎事件通过 `engine.on()` 监听，通过 `engine.trigger()` 触发。每个事件的回调参数中包含相关数据对象。

```javascript
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);
```

## 游戏流程事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `GameStarted` | 游戏开始时触发 | — |
| `LocalPlayerChanged` | 本地玩家切换（热座模式） | — |
| `TurnBegin` | 回合开始 | — |
| `LocalPlayerTurnBegin` | 本地玩家回合开始 | — |
| `LocalPlayerTurnEnd` | 本地玩家回合结束 | — |
| `TurnEnd` | 回合结束 | — |
| `BeforeUnload` | 游戏退出前，用于清理资源 | — |
| `GameAgeEnded` | 时代结束 | — |
| `AutoplayStarted` | 自动播放开始 | — |
| `PlayerDefeat` | 玩家被击败 | `player` |
| `PlayerTurnActivated` | 玩家回合激活 | `player` |

## 城市事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `CityAddedToMap` | 城市添加到地图 | `cityID` |
| `CityRemovedFromMap` | 城市从地图移除 | `cityID` |
| `CityInitialized` | 城市初始化完成 | `cityID` |
| `CityPopulationChanged` | 城市人口变化 | `cityID`, `population` |
| `CityProductionChanged` | 城市生产项目变化 | `cityID` |
| `CityProductionCompleted` | 城市生产完成 | `cityID` |
| `CityYieldChanged` | 城市产出变化 | `cityID` |
| `CitySelectionChanged` | 城市选中状态变化 | `cityID` |

## 单位事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `UnitAddedToMap` | 单位添加到地图 | `unit` |
| `UnitRemovedFromMap` | 单位从地图移除 | `unit` |
| `UnitMoved` | 单位移动 | `unit` |
| `UnitMoveComplete` | 单位移动完成 | `unit` |
| `UnitSelectionChanged` | 单位选中状态变化 | `unit` |
| `UnitDamageChanged` | 单位受到伤害 | `unit`, `damage` |
| `UnitPromoted` | 单位升级 | `unit` |
| `UnitKilledInCombat` | 单位在战斗中被击杀 | `unit` |
| `UnitMovementPointsChanged` | 单位移动力变化 | `unit` |
| `Combat` | 战斗发生 | — |
| `SimulateCombatResult` | 战斗结果模拟（预览） | — |

## 地图/地块事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `PlotChanged` | 地块数据变化 | `x`, `y` |
| `PlotOwnershipChanged` | 地块所有权变化 | `x`, `y` |
| `PlotVisibilityChanged` | 地块可见性变化 | `x`, `y` |
| `PlotYieldChanged` | 地块产出变化 | `x`, `y` |
| `RequestMapInitData` | 引擎请求地图初始化数据（地图生成） | `initParams` |
| `GenerateMap` | 引擎请求生成地图 | — |

## 区域/建筑事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `DistrictAddedToMap` | 区域添加到地图 | `districtID` |
| `DistrictRemovedFromMap` | 区域从地图移除 | `districtID` |
| `ConstructibleAddedToMap` | 建筑/改良添加到地图 | — |
| `ConstructibleRemovedFromMap` | 建筑/改良从地图移除 | — |
| `WonderCompleted` | 奇观建造完成 | — |

## 资源事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `ResourceAssigned` | 资源分配 | — |
| `ResourceUnassigned` | 资源取消分配 | — |

## 外交事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `DiplomacyEventStarted` | 外交事件开始 | — |
| `DiplomacyEventEnded` | 外交事件结束 | — |
| `DiplomacyDeclareWar` | 宣战 | — |
| `DiplomacyMakePeace` | 和平 | — |
| `DiplomacyMeet` | 首次遇见文明 | — |
| `DiplomacyRelationshipChanged` | 外交关系变化 | — |

## 科技/文化事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `TechNodeCompleted` | 科技节点完成 | `node` |
| `CultureNodeCompleted` | 文化节点完成 | `node` |

## 经济事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `FoodQueueChanged` | 食物队列变化 | — |
| `TreasuryChanged` | 国库变化 | — |

## 宗教事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `ReligionFounded` | 宗教创立 | — |

## UI/输入事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `NotificationAdded` | 通知添加 | — |
| `CameraChanged` | 相机变化 | — |
| `InputAction` | 输入动作发生 | — |
| `UpdateFrame` | 每帧更新（慎用，回调中不要做重计算） | — |
| `InputContextChanged` | 输入上下文变化 | — |

## 教程事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `TutorialBegin` | 教程开始 | — |
| `TutorialCallout` | 教程提示显示/隐藏 | — |
