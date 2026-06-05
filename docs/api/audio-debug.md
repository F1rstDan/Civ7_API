---
title: Audio & Debug 音频调试
doc_type: other
summary: 音频和调试 API 参考，包括 Audio 音效播放、Sound 音量控制和 UI.Debug 调试组件注册。
primary_scope:
  - Audio
  - Sound
related_scope:
  - UI
source:
  - modules/core/ui/options/options.js
  - modules/base-standard/ui/action/panel-action.js
  - modules/core/ui-next/utilities/debug-widgets.js
  - modules/base-standard/ui/cinematic/cinematic-manager.js
doc_update: 2026-06-05
---

# Audio & Debug 音频调试

音频播放、音量控制和调试组件注册 API。Audio 和 Sound 为全局对象，UI.Debug 为 UI 子对象，均无需手动 import。

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 播放音效（单参数）
Audio.playSound("data-audio-activate");

// 来源 modules/core/ui/options/options.js
// 获取和设置主音量
const vol = Sound.volumeGetMaster();
Sound.volumeSetMaster(0.5);

// 来源 modules/core/ui-next/utilities/debug-widgets.js
// 注册调试组件
UI.Debug.registerWidget(widget);
UI.Debug.deleteWidget(widget.id);
```

## Audio

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `playSound` | soundTag, bus? | `void` | 播放音效，可选指定音频总线 |
| `getSoundTag` | soundID, bus? | `string` | 获取音效标签，可选指定音频总线 |

## Sound

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `play` | soundID | `int` | 播放声音，返回播放索引 |
| `playOnIndex` | soundID, index | `void` | 在指定索引停止声音 |
| `volumeSetMaster` | volume | `void` | 设置主音量 |
| `volumeGetMaster` | — | `float` | 获取主音量 |
| `volumeSetMusic` | volume | `void` | 设置音乐音量 |
| `volumeGetMusic` | — | `float` | 获取音乐音量 |
| `volumeSetSFX` | volume | `void` | 设置音效音量 |
| `volumeGetSFX` | — | `float` | 获取音效音量 |
| `volumeSetVoice` | volume | `void` | 设置语音音量 |
| `volumeGetVoice` | — | `float` | 获取语音音量 |
| `volumeSetUI` | volume | `void` | 设置 UI 音量 |
| `volumeGetUI` | — | `float` | 获取 UI 音量 |
| `volumeSetCinematics` | volume | `void` | 设置过场动画音量 |
| `volumeGetCinematics` | — | `float` | 获取过场动画音量 |
| `getDynamicRangeOption` | — | `int` | 获取动态范围选项 |
| `setDynamicRangeOption` | value | `void` | 设置动态范围选项 |
| `getMuteOnFocusLoss` | — | `bool` | 获取失焦静音状态 |
| `setMuteOnFocusLoss` | value | `void` | 设置失焦静音状态 |
| `getSubtitles` | — | `string` | 获取字幕设置 |
| `setSubtitles` | value | `void` | 设置字幕开关 |

## UI.Debug

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `registerWidget` | widget | `void` | 注册调试组件，widget 需包含 `id` 和 `getter` |
| `getWidgetValue` | id | `any` | 获取调试组件值 |
| `deleteWidget` | id | `void` | 删除调试组件 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `UI.sendAudioEvent(tag)` | 发送音频事件，常与 `Audio.getSoundTag` 配合使用 |