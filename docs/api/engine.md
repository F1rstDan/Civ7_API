---
title: Engine API
---

# Engine

引擎核心对象。提供事件系统、数据绑定、引擎就绪检测等功能。从不通过 import 引入，引擎直接注入。

```javascript
// 等待引擎就绪后初始化
engine.whenReady.then(() => {
  console.log('引擎就绪');
});

// 监听事件
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);

// 移除事件监听
engine.off('CityAddedToMap', this.cityAddedToMapListener);

// 手动触发事件
engine.trigger('TutorialBegin');

// 调用引擎方法
engine.call('SetMapInitData', initParams);
```

## 方法列表（共 12 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `on` | eventName, callback, context? | `void` | 注册事件监听器（最核心 API） |
| `off` | eventName, callback, context? | `void` | 移除事件监听器 |
| `trigger` | eventName, data? | `void` | 手动触发事件 |
| `call` | method, args? | `any` | 调用引擎注册的方法 |
| `whenReady` | — | `Promise` | 引擎就绪的 Promise |
| `createJSModel` | name, model | `void` | 创建 JS 数据绑定模型 |
| `updateWholeModel` | model | `void` | 更新整个数据绑定模型 |
| `synchronizeModels` | — | `void` | 同步所有数据绑定模型 |
| `reloadLocalization` | — | `void` | 重新加载本地化文本 |
| `BindingsReady` | — | `bool` | 数据绑定系统是否就绪（属性） |
| `AddOnHandler` | event, handler | `void` | engine.on 的别名 |
| `RemoveOnHandler` | event, handler | `void` | engine.off 的别名 |
| `addDataBindEventListner` | event, listener | `void` | 添加数据绑定事件监听 |
| `registerBindingAttribute` | name, handler | `void` | 注册自定义绑定属性 |

## 详细说明

### `on(eventName, callback, context?)`

这是 Mod 开发中最核心的 API。用于监听游戏引擎发出的各种事件，如 `CityAddedToMap`、`UnitMoved`、`TurnBegin` 等。所有事件详见 [事件列表](/api/events)。

第三个参数 `context` 用于绑定 `this` 上下文，方便后续用 `off` 移除。

```javascript
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);

// 在引擎就绪后注册事件
engine.whenReady.then(() => {
  engine.on('UnitMovementPointsChanged', (data) => {
    if (data.unit.owner == GameContext.localPlayerID) {
      engine.trigger('LocalPlayerUnitMovementPointsChanged', data);
    }
  });
});
```

### `off(eventName, callback, context?)`

移除事件监听器。必须传入与 `on` 相同的参数才能正确匹配移除。通常在组件的 `onDetach` 或清理函数中调用，防止内存泄漏。

```javascript
onDetach() {
  engine.off('UnitSelectionChanged', this.onUnitSelectionChanged, this);
  engine.off('UnitRemovedFromMap', this.onUnitRemovedFromMap, this);
  engine.off('UnitMoveComplete', this.onUnitMoveComplete, this);
  engine.off('Combat', this.onCombat, this);
}
```

### `trigger(eventName, data?)`

手动触发一个引擎事件。触发的事件会被所有通过 `engine.on` 注册的监听器接收。可用于模块间通信或触发教程系统。

```javascript
engine.trigger('TutorialBegin');
engine.trigger('open-civilopedia', searchTerm);
```

### `call(method, args?)`

调用引擎注册的方法。主要用于 JS 与原生引擎之间的通信。在地图生成脚本中广泛使用。

```javascript
engine.call('SetMapInitData', initParams);
```

### `whenReady`

返回一个 Promise，在引擎完全就绪后 resolve。几乎所有需要与引擎交互的初始化代码都应该在 `whenReady` 回调中执行。

```javascript
engine.whenReady.then(() => {
  engine.createJSModel('g_UnitPromotion', UnitPromotion);
  engine.updateWholeModel(UnitPromotion);
});
```

### `createJSModel(name, model)`

将一个 JS 对象注册为命名模型，引擎和 UI 框架可以通过该名称访问数据。通常在 `whenReady` 回调中调用。

```javascript
engine.whenReady.then(() => {
  engine.createJSModel('g_TutorialInspector', TutorialData);
  TutorialData.updateCallback = () => engine.updateWholeModel(TutorialData);
});
```

### `updateWholeModel(model)`

在模型数据发生变化后调用，触发 UI 框架的响应式更新。

```javascript
const updateModel = () => engine.updateWholeModel(UnitPromotion);
UnitPromotion.updateCallback = updateModel;
```

## 源文件引用

- `modules/base-standard/ui/unit-combat-preview/panel-unit-combat-preview.js` — 战斗预览面板的事件监听
- `modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js` — 古典时代教程的事件监听
- `modules/base-standard/maps/continents.js` — 地图生成脚本的 engine.call 使用
- `modules/base-standard/ui/unit-promotion/model-unit-promotion.js` — 数据绑定模型使用
- `modules/base-standard/ui/tutorial/tutorial-manager.js` — 教程管理器的引擎事件使用