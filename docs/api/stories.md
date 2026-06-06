---
title: Stories 故事系统
doc_type: system
summary: 文明7的故事系统管理叙事事件、任务和标签，通过 player.Stories 子系统访问。
primary_scope:
  - player.Stories
  - player.Identity
related_scope:
  - GameInfo.NarrativeStories
  - GameInfo.NarrativeTags
source:
  - TunerPanels/Player Stories.ltp
  - TunerPanels/Player.ltp
  - modules/base-standard/ui/narrative-event/screen-narrative-event.js
  - modules/base-standard/ui/narrative-event/screen-narrative-trial.js
  - modules/base-standard/ui/narrative-event/graphic-narrative-event.js
  - modules/base-standard/ui/small-narrative-event/small-narrative-event.js
  - modules/base-standard/ui/syncretism/syncretism-screen-model.js
doc_update: 2026-06-05
---

# Stories 故事系统

文明7的故事系统管理叙事事件、任务和标签。通过 `player.Stories` 子系统访问。

## 快速示例

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取活动故事和已归档故事
const playerStories = player.Stories;

// 遍历活动故事
let activeIds = playerStories.getActiveIds();
for (const id of activeIds) {
  let story = playerStories.find(id);
  let stateName = playerStories.getStoryStateName(story.state);
  let location = playerStories.getStoryPlotCoord(id);
}

// 遍历已归档故事
let numArchived = playerStories.getNumArchived();
for (let i = 0; i < numArchived; i++) {
  let archived = playerStories.getArchived(i);
}
```

## 方法列表

### player.Stories 子系统（共 12 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Stories.getActiveIds</API> | — | `array` | 获取活动故事 ID 列表 |
| <API>player.Stories.find</API> | id | `object` | 根据 ID 查找故事 |
| <API>player.Stories.getStoryStateName</API> | state | `string` | 获取故事状态名称 |
| <API>player.Stories.getStoryPlotCoord</API> | id | `object` | 获取故事发生地块坐标 |
| <API>player.Stories.isSuppressed</API> | type | `bool` | 检查故事类型是否被抑制 |
| <API>player.Stories.getNumArchived</API> | — | `int` | 获取已归档故事数量 |
| <API>player.Stories.getArchived</API> | index | `object` | 根据索引获取已归档故事 |
| <API>player.Stories.getActiveQuests</API> | — | `array` | 获取活动任务列表 |
| <API>player.Stories.getCompletedQuests</API> | — | `array` | 获取已完成任务列表 |
| <API>player.Stories.onRequirementsMet</API> | storyId | `void` | 完成故事（满足要求后调用） |
| <API>player.Stories.getFirstPendingDiscoveryLastMetID</API> | — | `int` | 获取第一个待处理发现的 ID |
| <API>player.Stories.canAfford</API> | type | `bool` | 检查故事选项是否可负担 |

### player.Identity 子系统（共 3 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Identity.getNarrativeTagPoints</API> | tagIndex | `int` | 获取叙事标签点数 |
| <API>player.Identity.changeNarrativeTagPoints</API> | tagIndex, amount | `void` | 改变叙事标签点数 |
| <API>player.Identity.addWildcardAttributePoints</API> | amount | `void` | 增加通配属性点 |

## player.Stories 详情

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取活动故事和已归档故事的详细信息
const playerStories = player.Stories;

// 获取活动故事
let activeIds = playerStories.getActiveIds();
for (const id of activeIds) {
  let story = playerStories.find(id);
  // story.type — 故事类型
  // story.state — 故事状态
  let stateName = playerStories.getStoryStateName(story.state);
  let location = playerStories.getStoryPlotCoord(id);
  let isSuppressed = playerStories.isSuppressed(story.type);
}

// 已归档故事
let numArchived = playerStories.getNumArchived();
for (let i = 0; i < numArchived; i++) {
  let archived = playerStories.getArchived(i);
  // archived.type, archived.linkedToType, archived.state, archived.turn
}

// 任务系统
playerStories.getActiveQuests();     // [{storyId, story, progress, goal, endTurn, state}]
playerStories.getCompletedQuests();  // 同上结构

// 完成故事
playerStories.onRequirementsMet(storyId);
```

## 叙事事件注入（高级用法）

```javascript
// 来源 modules/base-standard/ui/narrative-event/screen-narrative-event.js
// 处理叙事事件的选择和注入
const playerStories = player.Stories;
const targetStoryId = playerStories.getFirstPendingDiscoveryLastMetID();
const story = playerStories.find(targetStoryId);

// 确定叙事注入组件
const titleComp = playerStories.determineNarrativeInjectionComponentId(targetStoryId, StoryTextTypes.TITLE);
const bodyComp = playerStories.determineNarrativeInjectionComponentId(targetStoryId, StoryTextTypes.BODY);

// 检查链接故事是否满足条件
const isRequisite = playerStories.determineRequisiteLink(linkDef.NarrativeStoryType, targetStoryId);

// 判断是否可以负担选项成本
const canAfford = playerStories.canAfford(linkDef.NarrativeStoryType);
```

## player.Identity 详情（叙事标签）

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 叙事标签和属性点管理
const identity = player.Identity;
identity.getNarrativeTagPoints(tagIndex);        // 获取标签点数
identity.changeNarrativeTagPoints(tagIndex, 5);  // 改变标签点数
```

```javascript
// 来源 TunerPanels/Player.ltp
// 增加通配属性点
const identity = player.Identity;
identity.addWildcardAttributePoints(1);
```

## GameInfo 关联表

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 叙事相关定义表
GameInfo.NarrativeStories;  // 叙事故事定义表
GameInfo.NarrativeTags;     // 叙事标签定义表
```

---

<API id="player.Stories.getActiveIds"><h3>player.Stories.getActiveIds()</h3>

**说明**: 获取玩家当前所有活动故事的 ID 列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 遍历活动故事
let activeIds = player.Stories.getActiveIds();
for (const id of activeIds) {
  let story = player.Stories.find(id);
}
```

</API>
<API id="player.Stories.find"><h3>player.Stories.find(id)</h3>

**说明**: 根据故事 ID 查找故事对象。返回的故事对象包含 `type`、`state` 等属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 故事 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 查找故事并读取属性
let story = player.Stories.find(id);
// story.type — 故事类型
// story.state — 故事状态
```

</API>
<API id="player.Stories.getStoryStateName"><h3>player.Stories.getStoryStateName(state)</h3>

**说明**: 获取故事状态的名称字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| state | `int` | 故事状态值 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取故事状态名称
let stateName = player.Stories.getStoryStateName(story.state);
```

</API>
<API id="player.Stories.getStoryPlotCoord"><h3>player.Stories.getStoryPlotCoord(id)</h3>

**说明**: 获取故事发生的地块坐标。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 故事 ID |

**返回值**: `object` — 坐标 `{x, y}`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取故事地块坐标
let location = player.Stories.getStoryPlotCoord(id);
```

</API>
<API id="player.Stories.isSuppressed"><h3>player.Stories.isSuppressed(type)</h3>

**说明**: 检查指定类型的故事是否被抑制（不会触发）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 故事类型 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 检查故事是否被抑制
let isSuppressed = player.Stories.isSuppressed(story.type);
```

</API>
<API id="player.Stories.getNumArchived"><h3>player.Stories.getNumArchived()</h3>

**说明**: 获取已归档（已完成）故事的数量。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 遍历已归档故事
let numArchived = player.Stories.getNumArchived();
for (let i = 0; i < numArchived; i++) {
  let archived = player.Stories.getArchived(i);
}
```

</API>
<API id="player.Stories.getArchived"><h3>player.Stories.getArchived(index)</h3>

**说明**: 根据索引获取已归档故事。返回对象包含 `type`、`linkedToType`、`state`、`turn` 等属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 归档故事索引 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取已归档故事
let archived = player.Stories.getArchived(i);
// archived.type, archived.linkedToType, archived.state, archived.turn
```

</API>
<API id="player.Stories.getActiveQuests"><h3>player.Stories.getActiveQuests()</h3>

**说明**: 获取当前活动的任务列表。每个任务包含 `storyId`、`story`、`progress`、`goal`、`endTurn`、`state` 等属性。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取活动任务
let quests = player.Stories.getActiveQuests();
for (const quest of quests) {
  // quest.storyId, quest.progress, quest.goal, quest.endTurn, quest.state
}
```

</API>
<API id="player.Stories.getCompletedQuests"><h3>player.Stories.getCompletedQuests()</h3>

**说明**: 获取已完成的任务列表。结构与活动任务相同。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取已完成任务
let quests = player.Stories.getCompletedQuests();
```

</API>
<API id="player.Stories.onRequirementsMet"><h3>player.Stories.onRequirementsMet(storyId)</h3>

**说明**: 当故事要求满足时调用，完成指定故事。

| 参数名 | 类型 | 说明 |
|------|------|------|
| storyId | `int` | 故事 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 完成故事
player.Stories.onRequirementsMet(storyId);
```

</API>
<API id="player.Stories.getFirstPendingDiscoveryLastMetID"><h3>player.Stories.getFirstPendingDiscoveryLastMetID()</h3>

**说明**: 获取第一个待处理发现故事的 ID，用于叙事事件流程。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/narrative-event/screen-narrative-event.js
// 获取待处理叙事事件
const targetStoryId = player.Stories.getFirstPendingDiscoveryLastMetID();
const story = player.Stories.find(targetStoryId);
```

</API>
<API id="player.Stories.canAfford"><h3>player.Stories.canAfford(type)</h3>

**说明**: 检查玩家是否可以负担指定叙事故事类型的选项成本。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 叙事故事类型 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/narrative-event/screen-narrative-event.js
// 检查选项成本是否可负担
const canAfford = player.Stories.canAfford(linkDef.NarrativeStoryType);
```

</API>
<API id="player.Identity.getNarrativeTagPoints"><h3>player.Identity.getNarrativeTagPoints(tagIndex)</h3>

**说明**: 获取指定叙事标签的当前点数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| tagIndex | `int` | 叙事标签索引 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 获取叙事标签点数
const points = player.Identity.getNarrativeTagPoints(tagIndex);
```

</API>
<API id="player.Identity.changeNarrativeTagPoints"><h3>player.Identity.changeNarrativeTagPoints(tagIndex, amount)</h3>

**说明**: 改变指定叙事标签的点数。正值增加，负值减少。

| 参数名 | 类型 | 说明 |
|------|------|------|
| tagIndex | `int` | 叙事标签索引 |
| amount | `int` | 变化量，正数增加、负数减少 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Stories.ltp
// 改变叙事标签点数
player.Identity.changeNarrativeTagPoints(tagIndex, 5);   // 增加 5 点
player.Identity.changeNarrativeTagPoints(tagIndex, -1);  // 减少 1 点
```

</API>
<API id="player.Identity.addWildcardAttributePoints"><h3>player.Identity.addWildcardAttributePoints(amount)</h3>

**说明**: 增加通配属性点。

| 参数名 | 类型 | 说明 |
|------|------|------|
| amount | `int` | 增加的点数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 增加通配属性点
player.Identity.addWildcardAttributePoints(1);
```

</API>