---
title: Stories 故事系统
---

# Stories 故事系统

文明7的故事系统管理叙事事件、任务和标签。通过 `player.Stories` 子系统访问。

> 来源：Player Stories.ltp

## player.Stories 子系统

```javascript
// 来源 Player Stories.ltp
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

## player.Identity 子系统（叙事标签）

```javascript
// 来源 Player Stories.ltp
const identity = player.Identity;
identity.getNarrativeTagPoints(tagIndex);        // 获取标签点数
identity.changeNarrativeTagPoints(tagIndex, 5);  // 改变标签点数
identity.addWildcardAttributePoints(1);          // 增加通配属性点
```

## GameInfo 关联表

```javascript
GameInfo.NarrativeStories;  // 叙事故事定义表
GameInfo.NarrativeTags;     // 叙事标签定义表
```

---

*来源：Player Stories.ltp*