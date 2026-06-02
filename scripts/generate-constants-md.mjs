import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('../docs/data/constants.json', 'utf-8'));

const lines = [];
const push = (s = '') => lines.push(s);

push('---');
push('title: 常量与枚举');
push('---');
push('');
push('# 常量与枚举');
push('');
push('> 从游戏源码中自动提取的常量字符串和枚举。共收录 **' + data.meta.totalStringConstants + '** 个字符串常量（' + data.categories.length + ' 个分类）、**' + data.objectEnums.length + '** 个代码枚举、**' + data.meta.totalGameInfoTables + '** 个 GameInfo 数据表。');
push('> 生成时间：' + data.meta.generatedAt);
push('');

// === String constants by category ===
push('## 字符串常量');
push('');
push('这些常量作为字符串标识符在游戏 API 中广泛使用，例如 `GameplayMap.getBiomeType()` 返回 `BIOME_GRASSLAND` 等值。');
push('');

// Group categories into logical sections
const sectionMap = {
  '地形与地图': ['BIOME', 'TERRAIN', 'FEATURE', 'NATURAL', 'CONTINENT', 'RADIAL', 'PLOT', 'PLOTEFFECT'],
  '文明与领袖': ['CIVILIZATION', 'LEADER', 'AGE', 'AGES', 'PLAYER', 'HANDICAP', 'DIFFERENT'],
  '城市与建筑': ['CITY', 'BUILDING', 'DISTRICT', 'IMPROVEMENT', 'WONDER', 'SETTLEMENT'],
  '单位与军事': ['UNIT', 'UNITCOMMAND', 'UNITOPERATION', 'FORMATION', 'COMBAT'],
  '资源与产出': ['RESOURCE', 'RESOURCECLASS', 'YIELD', 'TRADE'],
  '外交与胜利': ['DIPLOMACY', 'VICTORY', 'LEGACY', 'GRIEVANCE', 'WAR'],
  '文化与信仰': ['BELIEF', 'IDEOLOGY', 'TRADITION', 'PROMOTION', 'ABILITY', 'TRAIT', 'CARD'],
  '通知与界面': ['NOTIFICATION', 'INTERFACEMODE', 'SLOT', 'DROPDOWN', 'VFX', 'LOGO', 'BACKGROUND'],
  '进度与元数据': ['METAPROGRESSION', 'UNLOCK', 'PROJECT', 'QUEST', 'CHALLENGE'],
  '游戏系统': ['GAME', 'KIND', 'DEFAULT', 'CORE', 'NODE', 'DOMAIN', 'START', 'LINKED', 'TAG', 'CLASS', 'SUB', 'PROPERTY'],
  'AI 与顾问': ['AI', 'ADVICE', 'ADVISOR', 'ADVISORY', 'ACKNOWLEDGE', 'REMIND', 'NOTIFY'],
  '独立势力与野蛮人': ['INDEPENDENT', 'BARBARIAN', 'GOODYHUT', 'GOODY', 'DISCOVERY'],
  '其他': [],
};

// Track which prefixes have been assigned
const assignedPrefixes = new Set();
for (const prefixes of Object.values(sectionMap)) {
  prefixes.forEach(p => assignedPrefixes.add(p));
}

// Add unassigned categories to '其他'
for (const cat of data.categories) {
  if (!assignedPrefixes.has(cat.prefix)) {
    sectionMap['其他'].push(cat.prefix);
  }
}

for (const [sectionName, prefixes] of Object.entries(sectionMap)) {
  const cats = prefixes
    .map(p => data.categories.find(c => c.prefix === p))
    .filter(Boolean);
  if (cats.length === 0) continue;

  push('### ' + sectionName);
  push('');

  for (const cat of cats) {
    push('#### ' + cat.prefix + ' (' + cat.count + ')');
    push('');
    push('```');
    for (const v of cat.values) {
      push(v);
    }
    push('```');
    push('');
  }
}

// === Object enums ===
push('## 代码枚举');
push('');
push('这些枚举在源码中以对象形式定义（如 `export const EnumName = { ... }`），通常用于类型判断和参数传递。');
push('');

// Deduplicate by name
const seen = new Set();
for (const e of data.objectEnums) {
  if (seen.has(e.name)) continue;
  seen.add(e.name);

  push('### ' + e.name);
  push('');
  push('来源：`' + e.source + '`');
  push('');
  push('| 键 | 值 |');
  push('|---|---|');
  for (const entry of e.entries) {
    push('| `' + entry.key + '` | `' + entry.value + '` |');
  }
  push('');
}

// === GameInfo tables ===
push('## GameInfo 数据表');
push('');
push('通过 `GameInfo.TableName` 访问，共 **' + data.gameInfoTables.length + '** 个表。详细用法参见 [GameInfo 数据表](./game-info.md)。');
push('');
push('| 表名 |');
push('|---|');
for (const t of data.gameInfoTables) {
  push('| `' + t + '` |');
}
push('');

writeFileSync('../docs/api/constants.md', lines.join('\n'), 'utf-8');
console.log('Wrote docs/api/constants.md (' + lines.length + ' lines)');
