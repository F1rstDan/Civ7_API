---
title: Modding 模组
source:
  - TunerPanels/Modding.ltp
  - modules/core/ui/shell/mods-content/mods-content.js
  - modules/core/ui/component-support.js
  - modules/core/ui/utilities/utilities-network.js
  - modules/core/ui/save-load/model-save-load.js
  - modules/core/ui/shell/mp-browser/mp-browser-new.js
  - modules/core/ui/shell/main-menu/main-menu.js
---

# Modding 模组

Mod 管理 API。用于查询和管理已安装的 Mod。

```javascript
// 来源 TunerPanels/Modding.ltp
// 遍历已安装 Mod 并收集其 ID、名称、启用状态
let activeMods = Modding.getActiveMods();
for (const mod of Modding.getInstalledMods()) {
    let str = mod.id.toString() + ";" + mod.name;
    str = str + ";" + (mod.enabled ? "true" : "false");
    str = str + ";" + ((activeMods.indexOf(mod.handle) != -1) ? "true" : "false");
}
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Modding.getInstalledMods</API> | — | `object[]` | 获取已安装 Mod 列表，每项含 id/name/enabled/handle 等字段 |
| <API>Modding.getInstalledModHandles</API> | — | `int[]` | 获取已安装 Mod 句柄列表 |
| <API>Modding.getActiveMods</API> | — | `int[]` | 获取当前活跃 Mod 句柄列表 |
| <API>Modding.getModInfo</API> | handle | `object` | 根据句柄获取 Mod 详细信息 |
| <API>Modding.getModProperty</API> | handle, prop | `any` | 获取 Mod 特定属性值（如 "Authors"、"ShowInBrowser"） |
| <API>Modding.getModHandle</API> | url | `int` | 根据 URL 获取 Mod 句柄 |
| <API>Modding.getModulesToExclude</API> | — | `string[]` | 获取需要排除的模块 ID 列表 |
| <API>Modding.getInitialScripts</API> | type | `object[]` | 获取初始脚本列表，需传入 InitialScriptType |
| <API>Modding.getLastErrorString</API> | — | `string` | 获取最后的错误信息字符串 |
| <API>Modding.getTransitionInProgress</API> | — | `TransitionType` | 获取当前过渡状态（Age/None 等） |
| <API>Modding.userModSupportAvailable</API> | — | `bool` | 用户 Mod 支持是否可用 |
| <API>Modding.canEnableMods</API> | handles, checkDependencies | `object` | 检查指定 Mod 是否可启用，返回含 status 字段的对象 |
| <API>Modding.canDisableMods</API> | handles | `object` | 检查指定 Mod 是否可禁用，返回含 status 字段的对象 |
| <API>Modding.enableMods</API> | handles, checkDependencies | `void` | 启用指定句柄的 Mod |
| <API>Modding.disableMods</API> | handles | `void` | 禁用指定句柄的 Mod |
| <API>Modding.applyModsTemplate</API> | template | `void` | 应用 Mod 模板（如 "enable-all"、"disable-user"） |
| <API>Modding.isOfficialAge</API> | age | `bool` | 判断指定时代是否为官方时代 |

<API id="Modding.getInstalledMods" title="Modding.getInstalledMods()">

**说明**: 获取所有已安装 Mod 的列表，每项为包含 id、name、enabled、handle 等字段的对象。

**参数**: 无

**返回值**: `object[]` — Mod 信息对象数组

**使用示例**:

```javascript
// 来源 TunerPanels/Modding.ltp
// 遍历已安装 Mod 并输出基本信息
let activeMods = Modding.getActiveMods();
for (const mod of Modding.getInstalledMods()) {
    console.log(mod.id, mod.name, mod.enabled);
}
```

**来源**: TunerPanels/Modding.ltp

</API>

<API id="Modding.getInstalledModHandles" title="Modding.getInstalledModHandles()">

**说明**: 获取所有已安装 Mod 的句柄（整数）列表，通常用于轮询检测 Mod 列表变化。

**参数**: 无

**返回值**: `int[]` — Mod 句柄数组

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 轮询检测 Mod 列表是否变化
const installedMods = Modding.getInstalledModHandles();
if (!compareInstalledMods(this.installedModHandles, installedMods)) {
    this.installedModHandles = installedMods;
    this.renderModListContent();
}
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.getActiveMods" title="Modding.getActiveMods()">

**说明**: 获取当前活跃 Mod 的句柄列表。活跃 Mod 指正在生效中的 Mod。

**参数**: 无

**返回值**: `int[]` — 活跃 Mod 句柄数组

**使用示例**:

```javascript
// 来源 TunerPanels/Modding.ltp
// 判断某个 Mod 是否活跃
let activeMods = Modding.getActiveMods();
let isActive = activeMods.indexOf(mod.handle) != -1;
```

**来源**: TunerPanels/Modding.ltp

</API>

<API id="Modding.getModInfo" title="Modding.getModInfo(handle)">

**说明**: 根据 Mod 句柄获取该 Mod 的完整信息对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| handle | `int` | Mod 句柄 |

**返回值**: `object` — Mod 信息对象，包含 id、name、enabled、handle、description 等字段

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 选中特定 Mod 并查看详情
this.selectedMod = Modding.getModInfo(modHandle);
this.selectedModHandle = modHandle;
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.getModProperty" title="Modding.getModProperty(handle, prop)">

**说明**: 获取指定 Mod 的某个属性值，如作者信息、浏览器显示设置等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| handle | `int` | Mod 句柄 |
| prop | `string` | 属性名，如 "Authors"、"ShowInBrowser" |

**返回值**: `any` — 属性值

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 获取 Mod 作者信息
const author = Modding.getModProperty(this.selectedMod.handle, "Authors");

// 检查官方 Mod 是否在浏览器中显示
const showInBrowser = Modding.getModProperty(m.handle, "ShowInBrowser");
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.getModHandle" title="Modding.getModHandle(url)">

**说明**: 根据 Mod URL 获取对应的句柄。

| 参数名 | 类型 | 说明 |
|------|------|------|
| url | `string` | Mod 的 URL 标识 |

**返回值**: `int` — Mod 句柄

**使用示例**:

```javascript
// 来源 modules/core/ui/save-load/model-save-load.js
// 存档加载时根据 Mod ID 获取句柄
const modHandle = Modding.getModHandle(mod.ID);
```

**来源**: modules/core/ui/save-load/model-save-load.js

</API>

<API id="Modding.getModulesToExclude" title="Modding.getModulesToExclude()">

**说明**: 获取需要排除的模块 ID 列表，通常在构建 Mod 列表时用于过滤不应显示的条目。

**参数**: 无

**返回值**: `string[]` — 需排除的模块 ID 数组

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 过滤掉应排除的 Mod 条目
let installedMods = Modding.getInstalledMods();
const modIdsToIgnore = Modding.getModulesToExclude();
installedMods = installedMods.filter((m) => !modIdsToIgnore.includes(m.id));
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.getInitialScripts" title="Modding.getInitialScripts(type)">

**说明**: 获取指定类型的初始脚本列表，用于游戏启动时加载 Mod 脚本。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `InitialScriptType` | 脚本类型，通常为 `InitialScriptType.Default` |

**返回值**: `object[]` — 脚本对象数组，每项含 url 和 isModule 字段

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 游戏启动时加载初始脚本
const scripts = Modding.getInitialScripts(InitialScriptType.Default);
for (const s of scripts) {
    controls.loadSource(s.url, s.isModule);
}
```

**来源**: modules/core/ui/component-support.js

</API>

<API id="Modding.getLastErrorString" title="Modding.getLastErrorString()">

**说明**: 获取最后发生的错误信息字符串，通常在 Mod 加载失败或网络出错时使用。

**参数**: 无

**返回值**: `string` — 错误信息字符串

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 网络断开时获取 Mod 缺失错误详情
const lastError = Modding.getLastErrorString();
if (lastError) {
    errorBodyLoc = lastError;
}
```

**来源**: modules/core/ui/utilities/utilities-network.js

</API>

<API id="Modding.getTransitionInProgress" title="Modding.getTransitionInProgress()">

**说明**: 获取当前游戏过渡状态，用于判断是否处于时代转换等过渡场景。

**参数**: 无

**返回值**: `TransitionType` — 过渡类型枚举值（如 `TransitionType.None`、`TransitionType.Age`）

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 检查当前过渡状态
const transitionState = Modding.getTransitionInProgress();
```

**来源**: modules/core/ui/shell/main-menu/main-menu.js

</API>

<API id="Modding.userModSupportAvailable" title="Modding.userModSupportAvailable()">

**说明**: 检查当前环境是否支持用户 Mod（社区 Mod）。

**参数**: 无

**返回值**: `bool` — 是否支持用户 Mod

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 根据用户 Mod 支持情况显示/隐藏禁用按钮
if (Modding.userModSupportAvailable()) {
    this.modsDisableUser.classList.remove("hidden");
}
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.canEnableMods" title="Modding.canEnableMods(handles, checkDependencies)">

**说明**: 检查指定 Mod 是否可以被启用。返回对象含 status 字段，0 表示允许操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| handles | `int[]` | Mod 句柄数组 |
| checkDependencies | `bool` | 是否检查依赖关系 |

**返回值**: `object` — 包含 status 字段的结果对象，status == 0 表示允许

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 检查 Mod 是否可启用
const modHandles = [this.selectedModHandle];
const canEnableModResult = Modding.canEnableMods(modHandles, true);
const allowed = canEnableModResult.status == 0;
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.canDisableMods" title="Modding.canDisableMods(handles)">

**说明**: 检查指定 Mod 是否可以被禁用。返回对象含 status 字段，0 表示允许操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| handles | `int[]` | Mod 句柄数组 |

**返回值**: `object` — 包含 status 字段的结果对象，status == 0 表示允许

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 检查 Mod 是否可禁用
const modHandles = [this.selectedModHandle];
const canDisableModResult = Modding.canDisableMods(modHandles);
const allowed = canDisableModResult.status == 0;
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.enableMods" title="Modding.enableMods(handles, checkDependencies)">

**说明**: 启用指定句柄的 Mod。

| 参数名 | 类型 | 说明 |
|------|------|------|
| handles | `int[]` | 要启用的 Mod 句柄数组 |
| checkDependencies | `bool` | 是否检查依赖关系 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 切换启用 Mod
const modHandles = [modhandle];
if (enabled) {
    Modding.disableMods(modHandles);
} else {
    Modding.enableMods(modHandles, true);
}
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.disableMods" title="Modding.disableMods(handles)">

**说明**: 禁用指定句柄的 Mod。

| 参数名 | 类型 | 说明 |
|------|------|------|
| handles | `int[]` | 要禁用的 Mod 句柄数组 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 切换禁用 Mod
const modHandles = [modhandle];
if (enabled) {
    Modding.disableMods(modHandles);
} else {
    Modding.enableMods(modHandles, true);
}
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.applyModsTemplate" title="Modding.applyModsTemplate(template)">

**说明**: 应用预设的 Mod 配置模板，一键批量启用或禁用 Mod。

| 参数名 | 类型 | 说明 |
|------|------|------|
| template | `string` | 模板名称，已知值有 "enable-all" 和 "disable-user" |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mods-content/mods-content.js
// 一键启用所有 Mod
Modding.applyModsTemplate("enable-all");

// 一键禁用所有用户 Mod
Modding.applyModsTemplate("disable-user");
```

**来源**: modules/core/ui/shell/mods-content/mods-content.js

</API>

<API id="Modding.isOfficialAge" title="Modding.isOfficialAge(age)">

**说明**: 判断指定时代是否为官方时代。

| 参数名 | 类型 | 说明 |
|------|------|------|
| age | `string` | 时代标识 |

**返回值**: `bool` — 是否为官方时代

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-browser/mp-browser-new.js
// 检查时代是否为官方时代
return Modding.isOfficialAge(value);
```

**来源**: modules/core/ui/shell/mp-browser/mp-browser-new.js

</API>