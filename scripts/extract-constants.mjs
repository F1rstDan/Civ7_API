import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, relative, extname } from 'path';

const MODULES_DIR = 'D:\\Games Design\\Civ7_mod\\.官方变动\\modules';
const STRINGS_FILE = '../all-strings.tmp.txt';
const OUTPUT_JSON = '../docs/data/constants.json';

// Step 1: Read pre-extracted strings from rg output
console.log('Reading string constants from rg output...');
const rawStrings = readFileSync(STRINGS_FILE, 'utf-8')
  .replace(/^\uFEFF/, '')       // strip BOM
  .replace(/\u0000/g, '')       // strip null bytes (UTF-16 leftover)
  .split('\n')
  .map(s => s.trim())
  .filter(Boolean);
console.log(`Loaded ${rawStrings.length} raw strings`);

// Filter and categorize
const SKIP_PREFIXES = ['LOC', 'FXS', 'COHTML'];
const byPrefix = {};
let filtered = 0;

for (const quoted of rawStrings) {
  const str = quoted.replace(/^"|"$/g, '');
  if (!str || str.length < 3) continue;
  const prefix = str.split('_')[0];
  if (SKIP_PREFIXES.includes(prefix)) { filtered++; continue; }
  if (!byPrefix[prefix]) byPrefix[prefix] = new Set();
  byPrefix[prefix].add(str);
}

const totalConstants = Object.values(byPrefix).reduce((sum, set) => sum + set.size, 0);
console.log(`After filtering: ${totalConstants} constants in ${Object.keys(byPrefix).length} categories (filtered ${filtered} LOC/FXS/COHTML)`);

// Step 2: Collect JS files for enum/GameInfo extraction
function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) results.push(...collectFiles(full));
    else if (extname(entry) === '.js') results.push(full);
  }
  return results;
}

console.log('\nCollecting JS files for enum extraction...');
const files = collectFiles(MODULES_DIR);
console.log(`Found ${files.length} JS files`);

// Step 3: Extract object-based enums
function extractObjectEnums() {
  const enums = [];
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const relPath = relative(MODULES_DIR, file).replace(/\\/g, '/');
    const re1 = /(?:export\s+)?(?:const|var)\s+(\w+)\s*=\s*\{([^}]{20,})\}/g;
    let match;
    while ((match = re1.exec(content)) !== null) {
      const name = match[1];
      const body = match[2];
      const entries = [];
      const entryRe = /(\w+)\s*:\s*(\d+|"[^"]*"|'[^']*'|true|false|-?\d+(?:\.\d+)?)/g;
      let em;
      while ((em = entryRe.exec(body)) !== null) entries.push({ key: em[1], value: em[2] });
      if (entries.length >= 2) {
        const hasUpperKeys = entries.some(e => /^[A-Z]/.test(e.key));
        const hasNumericValues = entries.some(e => /^\d+/.test(e.value));
        if (hasUpperKeys && hasNumericValues) {
          enums.push({ name, type: 'enum', source: relPath, entries: entries.slice(0, 80) });
        }
      }
    }
    const re2 = /(?:export\s+)?(?:const|var)\s+(\w+)\s*=\s*Object\.freeze\(\{([^}]+)\}\)/g;
    while ((match = re2.exec(content)) !== null) {
      const name = match[1];
      const body = match[2];
      const entries = [];
      const entryRe = /(\w+)\s*:\s*(\d+|"[^"]*"|'[^']*')/g;
      let em;
      while ((em = entryRe.exec(body)) !== null) entries.push({ key: em[1], value: em[2] });
      if (entries.length >= 2) {
        enums.push({ name, type: 'enum (frozen)', source: relPath, entries: entries.slice(0, 80) });
      }
    }
  }
  return enums;
}

// Step 4: Extract GameInfo tables
function extractGameInfoTables() {
  const tables = new Set();
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const re = /GameInfo\.(\w+)/g;
    let match;
    while ((match = re.exec(content)) !== null) tables.add(match[1]);
  }
  return [...tables].sort();
}

console.log('\nExtracting object enums...');
const objectEnums = extractObjectEnums();
console.log(`Found ${objectEnums.length} object-based enums`);

console.log('Extracting GameInfo tables...');
const gameInfoTables = extractGameInfoTables();
console.log(`Found ${gameInfoTables.length} GameInfo tables`);

// Build output
const prefixSummary = Object.entries(byPrefix)
  .map(([prefix, set]) => ({ prefix, count: set.size }))
  .sort((a, b) => b.count - a.count);

const output = {
  meta: {
    generatedAt: new Date().toISOString(),
    totalStringConstants: totalConstants,
    totalPrefixCategories: prefixSummary.length,
    totalObjectEnums: objectEnums.length,
    totalGameInfoTables: gameInfoTables.length,
  },
  categories: prefixSummary
    .filter(p => p.count >= 2)
    .slice(0, 200)
    .map(({ prefix, count }) => ({
      prefix,
      count,
      values: [...byPrefix[prefix]].sort().slice(0, 500),
    })),
  objectEnums: objectEnums.sort((a, b) => a.name.localeCompare(b.name)),
  gameInfoTables,
};

writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2), 'utf-8');
console.log(`\nWrote ${OUTPUT_JSON}`);
console.log(`Summary: ${output.meta.totalStringConstants} constants in ${output.categories.length} categories, ${output.objectEnums.length} enums, ${output.meta.totalGameInfoTables} GameInfo tables`);

console.log('\n--- Top Categories ---');
for (const cat of output.categories.slice(0, 30)) {
  console.log(`${cat.prefix}: ${cat.count}`);
}
