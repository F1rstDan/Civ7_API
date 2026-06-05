---
title: Engine 引擎
doc_type: object-api
summary: 引擎核心对象，提供事件系统（on/off/trigger）、数据绑定（createJSModel/updateWholeModel）、引擎就绪检测（whenReady）等功能。
primary_scope:
  - engine
related_scope:
  - GameContext
source:
  - modules/base-standard/ui/unit-combat-preview/panel-unit-combat-preview.js
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
  - modules/base-standard/maps/continents.js
  - modules/base-standard/ui/unit-promotion/model-unit-promotion.js
  - modules/base-standard/ui/tutorial/tutorial-manager.js
doc_update: 2026-06-05
---

# Engine 引擎

引擎核心对象。提供事件系统、数据绑定、引擎就绪检测等功能。从不通过 import 引入，引擎直接注入。

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-manager.js
// 等待引擎就绪后初始化
engine.whenReady.then(() => {
  console.log('引擎就绪');
});

// 来源 modules/base-standard/ui/unit-combat-preview/panel-unit-combat-preview.js
// 注册事件监听
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);

// 来源 modules/base-standard/maps/continents.js
// 调用引擎方法
engine.call('SetMapInitData', initParams);
```

## 方法列表（共 14 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>engine.on</API> | eventName, callback, context? | `void` | 注册事件监听器（最核心 API） |
| <API>engine.off</API> | eventName, callback, context? | `void` | 移除事件监听器 |
| <API>engine.trigger</API> | eventName, data? | `void` | 手动触发事件 |
| <API>engine.call</API> | method, args? | `any` | 调用引擎注册的方法 |
| <API>engine.whenReady</API> | — | `Promise` | 引擎就绪的 Promise |
| <API>engine.createJSModel</API> | name, model | `void` | 创建 JS 数据绑定模型 |
| <API>engine.updateWholeModel</API> | model | `void` | 更新整个数据绑定模型 |
| <API>engine.synchronizeModels</API> | — | `void` | 同步所有数据绑定模型 |
| <API>engine.reloadLocalization</API> | — | `void` | 重新加载本地化文本 |
| <API>engine.BindingsReady</API> | — | `bool` | 数据绑定系统是否就绪（属性） |
| <API>engine.AddOnHandler</API> | event, handler | `void` | engine.on 的别名 |
| <API>engine.RemoveOnHandler</API> | event, handler | `void` | engine.off 的别名 |
| <API>engine.addDataBindEventListner</API> | event, listener | `void` | 添加数据绑定事件监听 |
| <API>engine.registerBindingAttribute</API> | name, handler | `void` | 注册自定义绑定属性 |

<API id="engine.on"><h3>engine.on(eventName, callback, context?)</h3>

**说明**: 注册事件监听器。这是 Mod 开发中最核心的 API，用于监听游戏引擎发出的各种事件。第三个参数 `context` 用于绑定 `this` 上下文，方便后续用 `off` 移除。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventName | `string` | 事件名称，如 `CityAddedToMap`、`TurnBegin` |
| callback | `function` | 事件回调函数 |
| context | `object` | 可选，绑定 `this` 上下文 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/unit-combat-preview/panel-unit-combat-preview.js
// 监听城市添加到地图事件
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);

// 来源 modules/base-standard/ui/tutorial/tutorial-manager.js
// 在引擎就绪后注册事件，转发给本地玩家
engine.whenReady.then(() => {
  engine.on('UnitMovementPointsChanged', (data) => {
    if (data.unit.owner == GameContext.localPlayerID) {
      engine.trigger('LocalPlayerUnitMovementPointsChanged', data);
    }
  });
});
```

</API>

<API id="engine.off"><h3>engine.off(eventName, callback, context?)</h3>

**说明**: 移除事件监听器。必须传入与 `on` 相同的参数才能正确匹配移除。通常在组件的 `onDetach` 或清理函数中调用，防止内存泄漏。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventName | `string` | 事件名称 |
| callback | `function` | 之前注册的回调函数 |
| context | `object` | 可选，之前绑定的 `this` 上下文 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/unit-combat-preview/panel-unit-combat-preview.js
// 组件卸载时移除事件监听
onDetach() {
  engine.off('UnitSelectionChanged', this.onUnitSelectionChanged, this);
  engine.off('UnitRemovedFromMap', this.onUnitRemovedFromMap, this);
  engine.off('UnitMoveComplete', this.onUnitMoveComplete, this);
  engine.off('Combat', this.onCombat, this);
}
```

</API>

<API id="engine.trigger"><h3>engine.trigger(eventName, data?)</h3>

**说明**: 手动触发一个引擎事件。触发的事件会被所有通过 `engine.on` 注册的监听器接收。可用于模块间通信或触发教程系统。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventName | `string` | 事件名称 |
| data | `any` | 可选，传递给监听器的数据 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 触发教程和百科事件
engine.trigger('TutorialBegin');
engine.trigger('open-civilopedia', searchTerm);
```

</API>

<API id="engine.call"><h3>engine.call(method, args?)</h3>

**说明**: 调用引擎注册的方法。主要用于 JS 与原生引擎之间的通信。在地图生成脚本中广泛使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| method | `string` | 方法名称 |
| args | `any` | 可选，传递给方法的参数 |

**返回值**: `any` — 引擎方法的返回值

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/continents.js
// 调用引擎的地图初始化方法
engine.call('SetMapInitData', initParams);
```

</API>

<API id="engine.whenReady"><h3>engine.whenReady</h3>

**说明**: 引擎就绪的 Promise 属性。几乎所有需要与引擎交互的初始化代码都应该在 `whenReady` 回调中执行。

**参数**: 无

**返回值**: `Promise`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/unit-promotion/model-unit-promotion.js
// 引擎就绪后创建数据模型
engine.whenReady.then(() => {
  engine.createJSModel('g_UnitPromotion', UnitPromotion);
  engine.updateWholeModel(UnitPromotion);
});
```

</API>

<API id="engine.createJSModel"><h3>engine.createJSModel(name, model)</h3>

**说明**: 将一个 JS 对象注册为命名模型，引擎和 UI 框架可以通过该名称访问数据。通常在 `whenReady` 回调中调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 模型名称 |
| model | `object` | JS 数据模型对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-manager.js
// 创建教程数据模型，绑定更新回调
engine.whenReady.then(() => {
  engine.createJSModel('g_TutorialInspector', TutorialData);
  TutorialData.updateCallback = () => engine.updateWholeModel(TutorialData);
});
```

</API>

<API id="engine.updateWholeModel"><h3>engine.updateWholeModel(model)</h3>

**说明**: 在模型数据发生变化后调用，触发 UI 框架的响应式更新。

| 参数名 | 类型 | 说明 |
|------|------|------|
| model | `object` | 需要更新的模型对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/unit-promotion/model-unit-promotion.js
// 模型更新后触发 UI 刷新
const updateModel = () => engine.updateWholeModel(UnitPromotion);
UnitPromotion.updateCallback = updateModel;
```

</API>

<API id="engine.synchronizeModels"><h3>engine.synchronizeModels()</h3>

**说明**: 同步所有数据绑定模型。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 同步所有数据绑定模型
engine.synchronizeModels();
```

</API>

<API id="engine.reloadLocalization"><h3>engine.reloadLocalization()</h3>

**说明**: 重新加载本地化文本。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 重新加载本地化文本
engine.reloadLocalization();
```

</API>

<API id="engine.BindingsReady"><h3>engine.BindingsReady</h3>

**说明**: 数据绑定系统是否就绪（属性）。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 检查数据绑定系统是否就绪
if (engine.BindingsReady) {
  engine.createJSModel('MyModel', myData);
}
```

</API>

<API id="engine.AddOnHandler"><h3>engine.AddOnHandler(event, handler)</h3>

**说明**: engine.on 的别名，功能完全相同。

| 参数名 | 类型 | 说明 |
|------|------|------|
| event | `string` | 事件名称 |
| handler | `function` | 事件处理函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 注册事件监听（等效于 engine.on）
engine.AddOnHandler('TurnBegin', () => {
  console.log('回合开始');
});
```

</API>

<API id="engine.RemoveOnHandler"><h3>engine.RemoveOnHandler(event, handler)</h3>

**说明**: engine.off 的别名，功能完全相同。

| 参数名 | 类型 | 说明 |
|------|------|------|
| event | `string` | 事件名称 |
| handler | `function` | 事件处理函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 移除事件监听（等效于 engine.off）
engine.RemoveOnHandler('TurnBegin', myHandler);
```

</API>

<API id="engine.addDataBindEventListner"><h3>engine.addDataBindEventListner(event, listener)</h3>

**说明**: 添加数据绑定事件监听。

| 参数名 | 类型 | 说明 |
|------|------|------|
| event | `string` | 事件名称 |
| listener | `function` | 监听器函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 添加数据绑定事件监听
engine.addDataBindEventListner('modelUpdated', (model) => {
  console.log('模型已更新', model);
});
```

</API>

<API id="engine.registerBindingAttribute"><h3>engine.registerBindingAttribute(name, handler)</h3>

**说明**: 注册自定义绑定属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 属性名称 |
| handler | `function` | 处理函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 未在 .js/.ltp 源码中找到直接调用示例，以下为根据 API 签名补充的用法
// 注册自定义绑定属性
engine.registerBindingAttribute('myCustomAttr', (element, value) => {
  element.textContent = value;
});
```

</API>
