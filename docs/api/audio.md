---
title: Audio 音频
doc_type: other
summary: 音频 API 参考，包括 Audio 音效播放和 Sound 音量控制。
primary_scope:
  - Audio
  - Sound
related_scope:
  - UI
source:
  - modules/core/ui/options/options.js
  - modules/core/ui/options/model-options.js
  - modules/base-standard/ui/action/panel-action.js
  - modules/base-standard/ui/cinematic/cinematic-manager.js
  - modules/core/ui/shell/oob-experience/oob-experience-mgr.js
doc_update: 2026-06-06
---

# Audio 音频

音频播放与音量控制 API。Audio 和 Sound 为全局对象，引擎直接注入，无需手动 import 引入。

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 播放音效（支持指定音频总线）
Audio.playSound("data-audio-activate");
Audio.playSound("data-audio-dropdown-open", "audio-base");

// 来源 modules/core/ui/options/options.js
// 获取和设置主音量
const vol = Sound.volumeGetMaster();
Sound.volumeSetMaster(0.5);

// 来源 modules/base-standard/ui/unit-actions/unit-actions.js
// 获取音效标签并发送音频事件
UI.sendAudioEvent(Audio.getSoundTag("data-audio-cancel-action", "interact-unit"));
```

## Audio

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Audio.playSound</API> | soundTag, bus? | `void` | 播放音效，可选指定音频总线 |
| <API>Audio.getSoundTag</API> | soundID, bus? | `string` | 获取音效标签，用于 `UI.sendAudioEvent`，可选指定音频总线 |

## Sound

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Sound.play</API> | soundID | `int` | 播放声音，返回播放索引 |
| <API>Sound.playOnIndex</API> | soundID, index | `void` | 在指定索引播放声音，可用于替换/停止该索引上的声音 |
| <API>Sound.volumeSetMaster</API> | volume | `void` | 设置主音量（0.0 ~ 1.0） |
| <API>Sound.volumeGetMaster</API> | — | `float` | 获取主音量 |
| <API>Sound.volumeSetMusic</API> | volume | `void` | 设置音乐音量 |
| <API>Sound.volumeGetMusic</API> | — | `float` | 获取音乐音量 |
| <API>Sound.volumeSetSFX</API> | volume | `void` | 设置音效音量 |
| <API>Sound.volumeGetSFX</API> | — | `float` | 获取音效音量 |
| <API>Sound.volumeSetVoice</API> | volume | `void` | 设置语音音量 |
| <API>Sound.volumeGetVoice</API> | — | `float` | 获取语音音量 |
| <API>Sound.volumeSetUI</API> | volume | `void` | 设置 UI 音量 |
| <API>Sound.volumeGetUI</API> | — | `float` | 获取 UI 音量 |
| <API>Sound.volumeSetCinematics</API> | volume | `void` | 设置过场动画音量 |
| <API>Sound.volumeGetCinematics</API> | — | `float` | 获取过场动画音量 |
| <API>Sound.getDynamicRangeOption</API> | — | `int` | 获取动态范围选项 |
| <API>Sound.setDynamicRangeOption</API> | value | `void` | 设置动态范围选项 |
| <API>Sound.getMuteOnFocusLoss</API> | — | `bool` | 获取失焦静音状态 |
| <API>Sound.setMuteOnFocusLoss</API> | value | `void` | 设置失焦静音状态 |
| <API>Sound.getSubtitles</API> | — | `string` | 获取字幕设置 |
| <API>Sound.setSubtitles</API> | value | `void` | 设置字幕开关 |
| <API>Sound.volumeSetCheckpoint</API> | — | `void` | 保存当前音量设置检查点 |
| <API>Sound.volumeWriteSettings</API> | — | `void` | 将音量设置写入磁盘 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `UI.sendAudioEvent(tag)` | 发送音频事件，常与 `Audio.getSoundTag` 配合使用 |

<API id="Audio.playSound"><h3>Audio.playSound(soundTag, bus?)</h3>

**说明**: 播放指定音效标签对应的音效。可选传入音频总线名称以指定播放通道。

| 参数名 | 类型 | 说明 |
|------|------|------|
| soundTag | `string` | 音效数据标签，如 `"data-audio-activate"` |
| bus | `string` | 可选，音频总线名称，如 `"audio-base"`、`"interact-unit"` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 播放激活音效
Audio.playSound("data-audio-activate");

// 来源 modules/core/ui/shell/create-panels/game-creation-options.js
// 指定音频总线播放
Audio.playSound("data-audio-dropdown-open", "audio-base");
```

</API>

<API id="Audio.getSoundTag"><h3>Audio.getSoundTag(soundID, bus?)</h3>

**说明**: 获取音效标签字符串，通常与 `UI.sendAudioEvent` 配合使用发送音频事件。

| 参数名 | 类型 | 说明 |
|------|------|------|
| soundID | `string` | 音效数据 ID，如 `"data-audio-cancel-action"` |
| bus | `string` | 可选，音频总线名称 |

**返回值**: `string` - 音效标签

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/unit-actions/unit-actions.js
// 获取音效标签并通过 UI.sendAudioEvent 发送
UI.sendAudioEvent(Audio.getSoundTag("data-audio-cancel-action", "interact-unit"));
```

</API>

<API id="Sound.play"><h3>Sound.play(soundID)</h3>

**说明**: 播放指定 ID 的声音，返回播放索引，可用于后续 `playOnIndex` 操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| soundID | `string` | 声音 ID，如 `"Play_NaturalWonder_Music"`、`"Stop_Quote"` |

**返回值**: `int` - 播放索引

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/cinematic/cinematic-manager.js
// 播放音乐并保存索引，稍后用于停止
const musicIndex = Sound.play("Play_NaturalWonder_Music");
// ... 后续停止
Sound.playOnIndex("Stop_NaturalWonder_Music", musicIndex);
```

</API>

<API id="Sound.playOnIndex"><h3>Sound.playOnIndex(soundID, index)</h3>

**说明**: 在指定索引播放声音。常用于播放停止音效以替换/终止该索引上正在播放的声音。

| 参数名 | 类型 | 说明 |
|------|------|------|
| soundID | `string` | 声音 ID，如 `"Stop_NaturalWonder_Music"` |
| index | `int` | 播放索引，通常由 `Sound.play` 返回 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/cinematic/cinematic-manager.js
// 停止之前播放的音乐
const musicIndex = Sound.play("Play_NaturalWonder_Music");
// ...
Sound.playOnIndex("Stop_NaturalWonder_Music", musicIndex);
```

</API>

<API id="Sound.volumeSetMaster"><h3>Sound.volumeSetMaster(volume)</h3>

**说明**: 设置主音量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volume | `float` | 音量值，范围 0.0 ~ 1.0 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 设置主音量为 50%
Sound.volumeSetMaster(0.5);
```

</API>

<API id="Sound.volumeGetMaster"><h3>Sound.volumeGetMaster()</h3>

**说明**: 获取当前主音量值。

**参数**: 无

**返回值**: `float` - 当前主音量（0.0 ~ 1.0）

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 读取当前主音量
const vol = Sound.volumeGetMaster();
```

</API>

<API id="Sound.volumeSetMusic"><h3>Sound.volumeSetMusic(volume)</h3>

**说明**: 设置音乐音量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volume | `float` | 音量值，范围 0.0 ~ 1.0 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.volumeSetMusic(0.8);
```

</API>

<API id="Sound.volumeGetMusic"><h3>Sound.volumeGetMusic()</h3>

**说明**: 获取当前音乐音量值。

**参数**: 无

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
const vol = Sound.volumeGetMusic();
```

</API>

<API id="Sound.volumeSetSFX"><h3>Sound.volumeSetSFX(volume)</h3>

**说明**: 设置音效音量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volume | `float` | 音量值，范围 0.0 ~ 1.0 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.volumeSetSFX(0.7);
```

</API>

<API id="Sound.volumeGetSFX"><h3>Sound.volumeGetSFX()</h3>

**说明**: 获取当前音效音量值。

**参数**: 无

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
const vol = Sound.volumeGetSFX();
```

</API>

<API id="Sound.volumeSetVoice"><h3>Sound.volumeSetVoice(volume)</h3>

**说明**: 设置语音音量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volume | `float` | 音量值，范围 0.0 ~ 1.0 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.volumeSetVoice(0.9);
```

</API>

<API id="Sound.volumeGetVoice"><h3>Sound.volumeGetVoice()</h3>

**说明**: 获取当前语音音量值。

**参数**: 无

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
const vol = Sound.volumeGetVoice();
```

</API>

<API id="Sound.volumeSetUI"><h3>Sound.volumeSetUI(volume)</h3>

**说明**: 设置 UI 音量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volume | `float` | 音量值，范围 0.0 ~ 1.0 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.volumeSetUI(0.6);
```

</API>

<API id="Sound.volumeGetUI"><h3>Sound.volumeGetUI()</h3>

**说明**: 获取当前 UI 音量值。

**参数**: 无

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
const vol = Sound.volumeGetUI();
```

</API>

<API id="Sound.volumeSetCinematics"><h3>Sound.volumeSetCinematics(volume)</h3>

**说明**: 设置过场动画音量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volume | `float` | 音量值，范围 0.0 ~ 1.0 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.volumeSetCinematics(0.5);
```

</API>

<API id="Sound.volumeGetCinematics"><h3>Sound.volumeGetCinematics()</h3>

**说明**: 获取当前过场动画音量值。

**参数**: 无

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
const vol = Sound.volumeGetCinematics();
```

</API>

<API id="Sound.getDynamicRangeOption"><h3>Sound.getDynamicRangeOption()</h3>

**说明**: 获取当前动态范围选项的索引值。

**参数**: 无

**返回值**: `int` - 动态范围选项索引

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 初始化动态范围选项
const idx = Sound.getDynamicRangeOption();
```

</API>

<API id="Sound.setDynamicRangeOption"><h3>Sound.setDynamicRangeOption(value)</h3>

**说明**: 设置动态范围选项。

| 参数名 | 类型 | 说明 |
|------|------|------|
| value | `int` | 动态范围选项索引 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 更新动态范围选项
Sound.setDynamicRangeOption(1);
```

</API>

<API id="Sound.getMuteOnFocusLoss"><h3>Sound.getMuteOnFocusLoss()</h3>

**说明**: 获取失焦时是否静音的设置。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
const muted = Sound.getMuteOnFocusLoss();
```

</API>

<API id="Sound.setMuteOnFocusLoss"><h3>Sound.setMuteOnFocusLoss(value)</h3>

**说明**: 设置失焦时是否静音。

| 参数名 | 类型 | 说明 |
|------|------|------|
| value | `bool` | 是否在窗口失焦时静音 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.setMuteOnFocusLoss(true);
```

</API>

<API id="Sound.getSubtitles"><h3>Sound.getSubtitles()</h3>

**说明**: 获取当前字幕设置。

**参数**: 无

**返回值**: `string` - 字幕设置值

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/oob-experience/oob-experience-mgr.js
// 读取字幕设置状态
const subs = Sound.getSubtitles();
```

</API>

<API id="Sound.setSubtitles"><h3>Sound.setSubtitles(value)</h3>

**说明**: 设置字幕开关。

| 参数名 | 类型 | 说明 |
|------|------|------|
| value | `string` | 字幕设置值（如 `"true"` / `"false"`） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
Sound.setSubtitles("true");
```

</API>

<API id="Sound.volumeSetCheckpoint"><h3>Sound.volumeSetCheckpoint()</h3>

**说明**: 保存当前所有音量设置为检查点，供后续恢复使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/model-options.js
// 保存音量检查点
Sound.volumeSetCheckpoint();
```

</API>

<API id="Sound.volumeWriteSettings"><h3>Sound.volumeWriteSettings()</h3>

**说明**: 将当前音量设置写入磁盘持久化保存。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/model-options.js
// 提交音量设置到磁盘
Sound.volumeWriteSettings();
```

</API>