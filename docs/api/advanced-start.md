---
title: AdvancedStart 高级开局
doc_type: object
summary: 高级开局 UI 模型对象，管理卡牌获取、牌组操作、效果使用和放置状态。
primary_scope:
  - AdvancedStart
related_scope:
  - player.AdvancedStart
  - Players.AdvancedStart
source:
  - TunerPanels/AdvancedStart.ltp
  - modules/base-standard/ui/advanced-start/model-advanced-start.js
  - modules/base-standard/scripts/age-transition-post-load.js
doc_update: 2026-06-05
---

# AdvancedStart 高级开局

AdvancedStart 是高级开局阶段的 UI 模型单例对象，负责管理卡牌列表、牌组确认、效果放置和传承筛选等前端交互逻辑。游戏核心 API（如获取卡牌、牌组大小）通过 `player.AdvancedStart` 实例访问。

```javascript
// 快速示例：确认牌组并进入放置阶段
// 来源 model-advanced-start.js
// 确认玩家选择的卡牌牌组，进入效果放置阶段
AdvancedStart.confirmDeck();

// 选择放置效果并放置到指定地块
AdvancedStart.selectPlacementEffect("effect_001");
AdvancedStart.placePlacementEffect({ x: 10, y: 20 });
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdvancedStart.refreshCardList</API> | — | `void` | 刷新卡牌列表 |
| <API>AdvancedStart.addAvailableCard</API> | typeID: `string` | `boolean` | 添加卡牌到牌组 |
| <API>AdvancedStart.removeAvailableCard</API> | typeID: `string` | `void` | 从牌组移除卡牌 |
| <API>AdvancedStart.confirmDeck</API> | — | `void` | 确认当前牌组，进入效果放置阶段 |
| <API>AdvancedStart.unconfirmDeck</API> | — | `void` | 取消确认牌组，回到选牌阶段 |
| <API>AdvancedStart.forceComplete</API> | — | `void` | 强制完成高级开局 |
| <API>AdvancedStart.selectPlacementEffect</API> | typeID: `string` | `void` | 选择要放置的效果 |
| <API>AdvancedStart.clearSelectedPlacementEffect</API> | — | `void` | 清除已选择的放置效果 |
| <API>AdvancedStart.placePlacementEffect</API> | plot: `{x, y}` | `boolean` | 将选择的效果放置到指定地块 |
| <API>AdvancedStart.changePresetLegacies</API> | indexShift: `number` | `void` | 切换预设传承牌组 |
| <API>AdvancedStart.autoFillLegacies</API> | — | `void` | 自动填充传承卡牌 |
| <API>AdvancedStart.setFilter</API> | category: `CardCategories` | `void` | 设置卡牌类别筛选 |
| <API>AdvancedStart.getCardCategoryColor</API> | category: `CardCategories` | `string` | 获取卡牌类别对应的 CSS 颜色类名 |
| <API>AdvancedStart.getCardCategoryIconURL</API> | category: `CardCategories` | `string` | 获取卡牌类别对应的图标 URL |
| <API>AdvancedStart.getCardCategoryByColor</API> | colorCategory: `string` | `CardCategories` | 根据颜色类名反查卡牌类别 |
| <API>AdvancedStart.tooltipText</API> | hoverNodeId: `string` | `object\|null` | 获取悬停提示文本 |

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `AdvancedStart.availableCards` | `Array` | 可用卡牌列表（只读） |
| `AdvancedStart.filteredCards` | `Array` | 筛选后的卡牌列表（只读） |
| `AdvancedStart.selectedCards` | `Array` | 已选卡牌列表（只读） |
| `AdvancedStart.placeableCardEffects` | `Array` | 可放置效果列表（只读） |
| `AdvancedStart.deckConfirmed` | `boolean` | 牌组是否已确认 |
| `AdvancedStart.advancedStartClosed` | `boolean` | 高级开局是否已关闭（全部放置完成） |
| `AdvancedStart.canAddCards` | `boolean` | 是否还能添加卡牌 |
| `AdvancedStart.preSelectLoc` | `string` | 当前预设的本地化 key（只读） |
| `AdvancedStart.preSelectIndex` | `number` | 当前预设索引（只读） |

## player.AdvancedStart 子系统

`player.AdvancedStart` 是游戏核心侧的高级开局实例，提供卡牌数据获取和状态查询。通过 `Players.get(playerId).AdvancedStart` 获取。

```javascript
// 来源 model-advanced-start.js
// 获取本地玩家的 AdvancedStart 实例
const localPlayer = Players.get(GameContext.localPlayerID);
const playerAdvancedStart = localPlayer.AdvancedStart;

// 获取可用卡牌
let cards = playerAdvancedStart.getAvailableCards();
for (const card of cards) {
  card.id;          // 卡牌 ID
  card.name;        // 卡牌名称
  card.description; // 卡牌描述
  card.effects;     // 效果数组 [{id, amount}]
  card.cost;        // 费用数组 [{category, value}]
}

// 获取当前牌组
let deck = playerAdvancedStart.getCards();
for (const card of deck) {
  card.info.id;          // 卡牌 ID
  card.info.effects;     // 效果数组 [{id, amount}]
}

// 获取牌组大小
let deckSize = playerAdvancedStart.getDeckSize();

// 放置状态
let isComplete = playerAdvancedStart.getPlacementComplete();
playerAdvancedStart.setPlacementComplete(true);

// 获取传承点数
let legacyPoints = playerAdvancedStart.getLegacyPoints();
```

## Players.AdvancedStart 静态方法

`Players.AdvancedStart` 提供静态工厂方法，用于跨玩家操作高级开局数据。

```javascript
// 来源 age-transition-post-load.js
// 通过 Players.AdvancedStart.get() 获取指定玩家的 AdvancedStart 实例
const advStart = Players.AdvancedStart.get(iPlayer);

// 动态添加卡牌
advStart?.addDynamicAvailableCard(card);

// 动态卡牌添加完成
advStart?.dynamicCardsAddedComplete();
```

## Game.PlayerOperations 高级开局

高级开局的核心操作通过 `Game.PlayerOperations` 发送请求执行。

```javascript
// 来源 AdvancedStart.ltp
// 通过 PlayerOperations 执行高级开局操作

// 添加卡牌
let args = { Type: "ADD", ID: cardId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, args, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, args);

// 移除卡牌
let argsRemove = { Type: "REMOVE", ID: cardId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, argsRemove, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, argsRemove);

// 使用效果
let argsEffect = { ID: effectId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_USE_EFFECT, argsEffect, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_USE_EFFECT, argsEffect);

// 放置定居点
let argsPlace = { ID: effectId, X: plotX, Y: plotY };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_PLACE_SETTLEMENT, argsPlace, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_PLACE_SETTLEMENT, argsPlace);

// 标记完成
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_MARK_COMPLETED, {}, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_MARK_COMPLETED, {});
```

## GameInfo 关联表

```javascript
// 来源 model-advanced-start.js
// 高级开局卡牌效果表
GameInfo.AdvancedStartCardEffects;    // 卡牌效果定义表
for (const effectDef of GameInfo.AdvancedStartCardEffects) {
  effectDef.EffectID;     // 效果 ID
  effectDef.Name;         // 效果名称
  effectDef.Description;  // 效果描述
  effectDef.EffectType;   // 效果类型
}

// 来源 model-advanced-start.js
// 高级开局牌组预设表
GameInfo.AdvancedStartDeckCardEntries;  // 牌组卡牌预设条目
for (const deck of GameInfo.AdvancedStartDeckCardEntries) {
  deck.DeckID;   // 牌组 ID
  deck.CardID;   // 卡牌 ID
}
```

<API id="AdvancedStart.refreshCardList"><h3>AdvancedStart.refreshCardList()</h3>

**说明**: 刷新卡牌列表，触发 UI 重新渲染。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 触发卡牌列表刷新
AdvancedStart.refreshCardList();
```

</API>

<API id="AdvancedStart.addAvailableCard"><h3>AdvancedStart.addAvailableCard(typeID)</h3>

**说明**: 将指定 ID 的卡牌添加到当前牌组。通过 `PlayerOperations` 发送添加请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `string` | 卡牌类型 ID |

**返回值**: `boolean` — 添加成功返回 `true`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 添加卡牌到牌组
if (AdvancedStart.addAvailableCard("CARD_CULTURAL_LEGACY")) {
  console.log("卡牌添加成功");
}
```

</API>

<API id="AdvancedStart.removeAvailableCard"><h3>AdvancedStart.removeAvailableCard(typeID)</h3>

**说明**: 从牌组中移除指定 ID 的卡牌。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `string` | 要移除的卡牌类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 从牌组移除卡牌
AdvancedStart.removeAvailableCard("CARD_CULTURAL_LEGACY");
```

</API>

<API id="AdvancedStart.confirmDeck"><h3>AdvancedStart.confirmDeck()</h3>

**说明**: 确认当前牌组选择，进入效果放置阶段。确认后 `deckConfirmed` 变为 `true`。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 确认牌组，进入放置阶段
AdvancedStart.confirmDeck();
if (AdvancedStart.deckConfirmed) {
  // 进入效果放置逻辑
}
```

</API>

<API id="AdvancedStart.unconfirmDeck"><h3>AdvancedStart.unconfirmDeck()</h3>

**说明**: 取消确认牌组，回到选牌阶段。`deckConfirmed` 变为 `false`。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 取消确认，回到选牌
AdvancedStart.unconfirmDeck();
```

</API>

<API id="AdvancedStart.forceComplete"><h3>AdvancedStart.forceComplete()</h3>

**说明**: 强制完成高级开局阶段，自动应用所有实例效果并标记完成。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 强制完成高级开局
AdvancedStart.forceComplete();
```

</API>

<API id="AdvancedStart.selectPlacementEffect"><h3>AdvancedStart.selectPlacementEffect(typeID)</h3>

**说明**: 选择要放置的效果，后续调用 `placePlacementEffect` 时使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `string` | 效果 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 选择效果并放置
AdvancedStart.selectPlacementEffect("effect_001");
AdvancedStart.placePlacementEffect(PlotCursor.plotCursorCoords);
```

</API>

<API id="AdvancedStart.clearSelectedPlacementEffect"><h3>AdvancedStart.clearSelectedPlacementEffect()</h3>

**说明**: 清除当前选中的放置效果。

**参数**: 无

**返回值**: `void`

</API>

<API id="AdvancedStart.placePlacementEffect"><h3>AdvancedStart.placePlacementEffect(plot)</h3>

**说明**: 将选中的放置效果放置到指定地块坐标。需先调用 `selectPlacementEffect` 选择效果。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plot | `{x: number, y: number}` | 目标地块坐标 |

**返回值**: `boolean` — 放置成功返回 `true`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 将选中的效果放置到指定坐标
const success = AdvancedStart.placePlacementEffect({ x: 10, y: 20 });
if (success) {
  console.log("效果放置成功");
}
```

</API>

<API id="AdvancedStart.changePresetLegacies"><h3>AdvancedStart.changePresetLegacies(indexShift)</h3>

**说明**: 切换预设传承牌组。`indexShift` 为 `1` 切换到下一个预设，`-1` 切换到上一个。

| 参数名 | 类型 | 说明 |
|------|------|------|
| indexShift | `number` | 索引偏移量，`1` 为下一个，`-1` 为上一个 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 切换到下一个预设传承
AdvancedStart.changePresetLegacies(1);
// 切换到上一个预设传承
AdvancedStart.changePresetLegacies(-1);
```

</API>

<API id="AdvancedStart.autoFillLegacies"><h3>AdvancedStart.autoFillLegacies()</h3>

**说明**: 根据当前可用传承点数自动填充卡牌。会遍历所有可用卡牌，依次添加负担得起的卡牌。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 自动填充传承卡牌
AdvancedStart.autoFillLegacies();
```

</API>

<API id="AdvancedStart.setFilter"><h3>AdvancedStart.setFilter(category)</h3>

**说明**: 设置卡牌列表的类别筛选。传入 `CardCategories.CARD_CATEGORY_NONE` 清除筛选。

| 参数名 | 类型 | 说明 |
|------|------|------|
| category | `CardCategories` | 筛选类别，如 `CardCategories.CARD_CATEGORY_MILITARISTIC` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 筛选军事类卡牌
AdvancedStart.setFilter(CardCategories.CARD_CATEGORY_MILITARISTIC);
// 清除筛选
AdvancedStart.setFilter(CardCategories.CARD_CATEGORY_NONE);
```

</API>

<API id="AdvancedStart.getCardCategoryColor"><h3>AdvancedStart.getCardCategoryColor(category)</h3>

**说明**: 根据卡牌类别枚举值获取对应的 CSS 颜色类名（如 `"mili"`、`"cult"`、`"econ"`、`"scie"`、`"wild"`、`"dark"`）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| category | `CardCategories` | 卡牌类别枚举值 |

**返回值**: `string` — CSS 颜色类名

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 获取军事类卡牌的颜色类名
const colorClass = AdvancedStart.getCardCategoryColor(CardCategories.CARD_CATEGORY_MILITARISTIC);
// 返回 "mili"
```

</API>

<API id="AdvancedStart.getCardCategoryIconURL"><h3>AdvancedStart.getCardCategoryIconURL(category)</h3>

**说明**: 根据卡牌类别获取对应的图标文件路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| category | `CardCategories` | 卡牌类别枚举值 |

**返回值**: `string` — 图标 URL（如 `"fs://game/bonus_militaristic.png"`）

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 获取经济类卡牌的图标 URL
const iconURL = AdvancedStart.getCardCategoryIconURL(CardCategories.CARD_CATEGORY_ECONOMIC);
// 返回 "fs://game/bonus_economic.png"
```

</API>

<API id="AdvancedStart.getCardCategoryByColor"><h3>AdvancedStart.getCardCategoryByColor(colorCategory)</h3>

**说明**: 根据颜色类名反查对应的卡牌类别枚举值。用于 UI 交互中从 CSS 类名还原类别。

| 参数名 | 类型 | 说明 |
|------|------|------|
| colorCategory | `string` | 颜色类名（`"mili"`、`"cult"`、`"econ"`、`"scie"`、`"wild"`） |

**返回值**: `CardCategories` — 卡牌类别枚举值

**使用示例**:

```javascript
// 来源 model-advanced-start.js
// 根据颜色类名获取卡牌类别
const category = AdvancedStart.getCardCategoryByColor("mili");
// 返回 CardCategories.CARD_CATEGORY_MILITARISTIC
```

</API>

<API id="AdvancedStart.tooltipText"><h3>AdvancedStart.tooltipText(hoverNodeId)</h3>

**说明**: 根据悬停节点 ID 获取对应的提示文本对象。用于高级开局界面中的 tooltip 显示。

| 参数名 | 类型 | 说明 |
|------|------|------|
| hoverNodeId | `string` | 悬停节点 ID（可能是卡牌 typeID 或货币颜色类名） |

**返回值**: `object | null` — 包含 `locKey` 的提示对象，或 `null`

**使用示例**:

```javascript
// 来源 advanced-start-tooltip.js
// 获取悬停节点的提示文本
const tooltip = AdvancedStart.tooltipText("mili");
// 返回 { locKey: "LOC_ADVANCED_START_PRESET_MILITARY" }
```

</API>