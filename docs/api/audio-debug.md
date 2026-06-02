---
title: Audio & Debug
---

# Audio & Debug

音频和调试 API。

## Audio

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `playSound` | soundTag | `void` | 播放音效 |
| `getSoundTag` | soundID | `string` | 获取音效标签 |

## Sound

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `play` | soundID | `void` | 播放声音 |
| `volumeSetMaster` | volume | `void` | 设置主音量 |
| `volumeGetMaster` | — | `float` | 获取主音量 |
| `volumeSetMusic` | volume | `void` | 设置音乐音量 |
| `volumeGetMusic` | — | `float` | 获取音乐音量 |
| `volumeSetSFX` | volume | `void` | 设置音效音量 |
| `volumeGetSFX` | — | `float` | 获取音效音量 |
| `volumeSetUI` | volume | `void` | 设置 UI 音量 |
| `volumeGetUI` | — | `float` | 获取 UI 音量 |
| `getSubtitles` | soundID | `string` | 获取字幕 |

## Debug

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `registerWidget` | name, getter | `void` | 注册调试组件 |
| `getWidgetValue` | name | `any` | 获取调试组件值 |
| `deleteWidget` | name | `void` | 删除调试组件 |
