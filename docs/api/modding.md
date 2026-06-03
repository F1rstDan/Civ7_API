---
title: Modding 模组
---

# Modding 模组

Mod 管理 API。用于查询和管理已安装的 Mod。

```javascript
const mods = Modding.getInstalledMods();
const error = Modding.getLastErrorString();
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getLastErrorString` | — | `string` | 获取最后的错误信息 |
| `getModulesToExclude` | — | `string[]` | 获取需要排除的模块 |
| `getTransitionInProgress` | — | `bool` | 转换是否进行中 |
| `getModInfo` | handle | `object` | 获取 Mod 信息 |
| `getModProperty` | handle, prop | `any` | 获取 Mod 属性 |
| `getInitialScripts` | — | `string[]` | 获取初始脚本列表 |
| `getInstalledMods` | — | `array` | 获取已安装 Mod 列表 |
| `userModSupportAvailable` | — | `bool` | 用户 Mod 支持是否可用 |
| `getInstalledModHandles` | — | `array` | 获取已安装 Mod 句柄 |
| `canDisableMods` | — | `bool` | 是否可以禁用 Mod |
| `canEnableMods` | — | `bool` | 是否可以启用 Mod |
| `applyModsTemplate` | template | `void` | 应用 Mod 模板 |
| `getActiveMods` | — | `array` | 获取活跃 Mod 列表 |
| `getModHandle` | url | `int` | 根据 URL 获取 Mod 句柄 |
| `disableMods` | handles | `void` | 禁用 Mod |
| `enableMods` | handles | `void` | 启用 Mod |
| `isOfficialAge` | age | `bool` | 是否为官方时代 |
