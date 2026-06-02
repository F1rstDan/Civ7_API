/**
 * 一键更新脚本：从游戏源码中提取所有常量，生成 JSON + Markdown，并重建 VitePress 站点。
 *
 * 用法：在项目根目录 Civ7_API/ 下执行：
 *   cd scripts && node update-constants.mjs
 *
 * 等价于手动执行：
 *   1. rg 提取字符串常量 → all-strings.tmp.txt
 *   2. node extract-constants.mjs → docs/data/constants.json
 *   3. node generate-constants-md.mjs → docs/api/constants.md
 *   4. npx vitepress build docs → docs/.vitepress/dist/
 */
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MODULES_DIR = 'D:\\Games Design\\Civ7_mod\\.官方变动\\modules';
const TMP_FILE = resolve(ROOT, 'all-strings.tmp.txt');

function run(cmd, cwd = ROOT, usePowerShell = false) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit', shell: usePowerShell ? 'powershell.exe' : true });
}

console.log('=== 文明7 常量更新流程 ===\n');

// Step 1: rg 提取字符串（用 PowerShell 管道 + Set-Content 确保 UTF-8 编码）
console.log('[1/4] 提取字符串常量...');
run(`rg '"[A-Z][A-Z_]+_[A-Z][A-Z_]+"' "${MODULES_DIR}" --no-filename -o | Sort-Object -Unique | Set-Content -Path "${TMP_FILE}" -Encoding UTF8`, ROOT, true);

// Step 2: 提取枚举 + GameInfo → JSON
console.log('\n[2/4] 提取枚举和 GameInfo 表...');
run('node extract-constants.mjs', __dirname);

// Step 3: 生成 Markdown
console.log('\n[3/4] 生成 Markdown 文档...');
run('node generate-constants-md.mjs', __dirname);

// Step 4: 构建站点
console.log('\n[4/4] 构建 VitePress 站点...');
run('npx vitepress build docs');

console.log('\n=== 更新完成 ===');
console.log('站点目录：docs/.vitepress/dist/');
console.log('常量页面：docs/api/constants.md');
console.log('数据文件：docs/data/constants.json');
