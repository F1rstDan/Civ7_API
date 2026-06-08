import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const GAME_DIR = "D:\\Games Design\\Civ7_mod\\.官方变动";
const RAW_COMPLETIONS_FILE = "docs/data/raw_completions.json";
const RAW_NAMES_FILE = "docs/data/raw_names.json";
const FILTER_FILE = "docs/data/api_filter.json";
const OUTPUT_FILE = "docs/data/civ7_api.json";

// JS 内置及常规排除对象
const BUILTIN_OBJECTS = new Set([
    "Math", "JSON", "Date", "Array", "Object", "String", "Number", "Boolean", 
    "RegExp", "Error", "Map", "Set", "Promise", "Reflect", "Proxy", "Symbol",
    "console", "globalThis", "global", "window", "process", "ts", "fs", "path",
    "TutorialManager", "StartPositioner", "PlotCursor", "Camera"
]);

// 启发式检测 TS 源码
function looksLikeTypeScript(content, filePath) {
    if (!content) return false;
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.ts' || ext === '.js' || ext === '.tsx' || ext === '.jsx') {
        return true;
    }
    if (content.trim().startsWith("<") || content.trim().startsWith("export default \"<")) {
        return false;
    }
    const indicators = ["function", "const ", "let ", "import ", "export ", "class ", "interface "];
    const snippet = content.slice(0, 1000);
    return indicators.some(ind => snippet.includes(ind));
}

// 递归遍历文件目录
function scanFiles(dir, extension, fileList = []) {
    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        return fileList;
    }
    for (const file of files) {
        const fullPath = path.join(dir, file);
        let stat;
        try {
            stat = fs.statSync(fullPath);
        } catch (e) {
            continue;
        }
        if (stat.isDirectory()) {
            scanFiles(fullPath, extension, fileList);
        } else if (file.endsWith(extension)) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

// 提取 XML .ltp 节点中的 JS 代码
function extractJsFromLtp(ltpPath) {
    const jsBlocks = [];
    let content;
    try {
        content = fs.readFileSync(ltpPath, 'utf-8');
    } catch (e) {
        return jsBlocks;
    }
    const tagRegex = /<(\w+)[^>]*>([\s\S]*?)<\/\1>/g;
    let match;
    while ((match = tagRegex.exec(content)) !== null) {
        const block = match[2].trim();
        if (block.length > 5 && (block.includes("GameplayMap") || block.includes("player") || block.includes("Players") || block.includes("Game") || block.includes("unit") || block.includes("district") || block.includes("constructible") || block.includes("army"))) {
            jsBlocks.push(block);
        }
    }
    return jsBlocks;
}

// 清洗并提取实参名
function extractParams(argsArray) {
    return argsArray.map((arg, idx) => {
        let name = `arg${idx}`;
        if (ts.isIdentifier(arg)) {
            name = arg.text;
        } else if (ts.isPropertyAccessExpression(arg)) {
            name = arg.name.text;
        }
        if (name === "true" || name === "false" || name === "null" || name === "undefined" || name === "this") {
            name = `arg${idx}`;
        }
        return name;
    });
}

function isGlobalName(name) {
    if (!name || name.length === 0) return false;
    const firstChar = name[0];
    return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase() && !BUILTIN_OBJECTS.has(name);
}

// 子系统命名规则
function isSubObjectName(name) {
    if (!name || name.length === 0) return false;
    const firstChar = name[0];
    return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
}

// 实例宿主变量列表，启动时会从 api_filter.json 动态加载
let gInstKeys = ["player", "unit", "city", "district", "constructible", "army", "plot"];

// 启发式变量宿主实例匹配
function getReceiverInstance(name) {
    if (!name || !gInstKeys || gInstKeys.length === 0) return null;
    const lower = name.toLowerCase();
    
    // 1. 排除全局管理器名（不区分大小写）
    const globalManagers = new Set([
        "players", "units", "cities", "districts", "constructibles", "armies", "gameplaymap", "game", "gamecontext"
    ]);
    if (globalManagers.has(lower)) {
        return null;
    }
    
    // 2. 精确匹配
    if (gInstKeys.includes(lower)) {
        return lower;
    }
    
    // 3. 单字母缩写匹配
    if (name.length === 1) {
        // 寻找首字母为 lower 的 key
        for (const key of gInstKeys) {
            if (key[0] === lower) {
                return key;
            }
        }
    }
    
    // 4. p + 大写字母开头的变量（例如 pUnit, pPlayer, pLocalPlayer 等）
    if (name.startsWith('p') && name.length > 1 && name[1] === name[1].toUpperCase()) {
        const restLower = name.slice(1).toLowerCase();
        // 先尝试匹配除 player 之外的其他实例（它们更具体）
        for (const key of gInstKeys) {
            if (key === 'player') continue;
            if (restLower === key || (restLower.startsWith(key) && !restLower.startsWith(key + 's'))) {
                return key;
            }
        }
        // 如果没匹配到其他具体的，且 gInstKeys 包含 player，归为 player
        if (gInstKeys.includes('player')) {
            return 'player';
        }
    }
    
    // 5. 前缀匹配（如 unitId, cityInfo, constructibleType 等，排除 managers）
    for (const key of gInstKeys) {
        if (lower.startsWith(key) && !lower.startsWith(key + 's')) {
            return key;
        }
    }
    
    return null;
}

// ==========================================================================
// 模式一：粗筛提取 (DRAFT MODE)
// ==========================================================================
function runDraft() {
    console.log("=== 启动 Civ7 API 粗筛提取 (Draft Mode) ===");
    console.log(`正在扫描 Civ7 源码目录: ${GAME_DIR}`);
    if (!fs.existsSync(GAME_DIR)) {
        console.error(`错误: 源码目录不存在: ${GAME_DIR}`);
        process.exit(1);
    }

    const mapFiles = scanFiles(GAME_DIR, '.js.map');
    const ltpFiles = scanFiles(GAME_DIR, '.ltp');
    console.log(`共发现 ${mapFiles.length} 个 .js.map 文件，以及 ${ltpFiles.length} 个 .ltp 调试面板文件`);

    // 从 api_filter.json 加载 instances
    if (fs.existsSync(FILTER_FILE)) {
        try {
            const apiFilter = JSON.parse(fs.readFileSync(FILTER_FILE, 'utf-8'));
            if (apiFilter.instances) {
                gInstKeys = Object.keys(apiFilter.instances);
            }
        } catch (e) {
            // 忽略读取错误
        }
    }

    const globals = Object.create(null);
    const instances = {};
    gInstKeys.forEach(k => {
        instances[k] = { 
            methods: Object.create(null), 
            properties: Object.create(null), 
            sub_objects: Object.create(null) 
        };
    });
    const enumMap = new Map();

    function registerGlobal(gName) {
        if (!globals[gName]) {
            globals[gName] = { 
                methods: Object.create(null), 
                properties: Object.create(null),
                sub_objects: Object.create(null)
            };
        }
    }

    function registerGlobalSubObjectMethod(gName, subObjName, methodName, params, return_type) {
        registerGlobal(gName);
        const g = globals[gName];
        if (!g.sub_objects[subObjName]) {
            g.sub_objects[subObjName] = { methods: Object.create(null), properties: Object.create(null) };
        }
        mergeMethod(g.sub_objects[subObjName].methods, methodName, params, return_type);
    }

    function registerGlobalSubObjectProperty(gName, subObjName, propName, prop_type) {
        registerGlobal(gName);
        const g = globals[gName];
        if (!g.sub_objects[subObjName]) {
            g.sub_objects[subObjName] = { methods: Object.create(null), properties: Object.create(null) };
        }
        mergeProperty(g.sub_objects[subObjName].properties, propName, prop_type);
    }

    function registerInstanceMethod(instName, methodName, params, return_type) {
        mergeMethod(instances[instName].methods, methodName, params, return_type);
    }

    function registerInstanceProperty(instName, propName, prop_type) {
        mergeProperty(instances[instName].properties, propName, prop_type);
    }

    function registerInstanceSubObjectMethod(instName, subObjName, methodName, params, return_type) {
        const inst = instances[instName];
        if (!inst.sub_objects[subObjName]) {
            inst.sub_objects[subObjName] = { methods: Object.create(null), properties: Object.create(null) };
        }
        mergeMethod(inst.sub_objects[subObjName].methods, methodName, params, return_type);
    }

    function registerInstanceSubObjectProperty(instName, subObjName, propName, prop_type) {
        const inst = instances[instName];
        if (!inst.sub_objects[subObjName]) {
            inst.sub_objects[subObjName] = { methods: Object.create(null), properties: Object.create(null) };
        }
        mergeProperty(inst.sub_objects[subObjName].properties, propName, prop_type);
    }

    function mergeMethod(methodDict, methodName, params, return_type) {
        const cleanedType = return_type ? return_type.replace(/[\n\r\t\s]+/g, " ").trim() : "any";
        if (methodDict[methodName] === undefined) {
            methodDict[methodName] = { params: params };
            if (cleanedType !== "any" && cleanedType !== "void") {
                methodDict[methodName].return_type = cleanedType;
            }
        } else {
            const existing = methodDict[methodName];
            if (params.length > existing.params.length) {
                existing.params = params;
            } else if (params.length === existing.params.length) {
                for (let i = 0; i < params.length; i++) {
                    if (existing.params[i].startsWith("arg") && !params[i].startsWith("arg")) {
                        existing.params[i] = params[i];
                    }
                }
            }
            if (cleanedType !== "any" && cleanedType !== "void" && (!existing.return_type || existing.return_type === "any")) {
                existing.return_type = cleanedType;
            }
        }
    }

    function mergeProperty(propDict, propName, prop_type) {
        const cleanedType = prop_type ? prop_type.replace(/[\n\r\t\s]+/g, " ").trim() : "any";
        if (propDict[propName] === undefined) {
            if (cleanedType !== "any") {
                propDict[propName] = { type: cleanedType };
            } else {
                propDict[propName] = {};
            }
        } else if (cleanedType !== "any" && (!propDict[propName].type || propDict[propName].type === "any")) {
            propDict[propName].type = cleanedType;
        }
    }

    function analyzeCallSites(node) {
        if (ts.isVariableDeclaration(node) && node.type && node.initializer) {
            const return_type = node.type.getText();
            const init = node.initializer;
            if (ts.isCallExpression(init) && ts.isPropertyAccessExpression(init.expression)) {
                const propAccess = init.expression;
                processCall(propAccess.expression, propAccess.name.text, init.arguments, return_type);
            } else if (ts.isPropertyAccessExpression(init)) {
                processProperty(init.expression, init.name.text, return_type);
            }
        }
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
            const propAccess = node.expression;
            processCall(propAccess.expression, propAccess.name.text, node.arguments, null);
        }
        if (ts.isPropertyAccessExpression(node)) {
            const isMethodCall = node.parent && ts.isCallExpression(node.parent) && node.parent.expression === node;
            if (!isMethodCall) {
                processProperty(node.expression, node.name.text, null);
            }
        }
        if (ts.isEnumDeclaration(node)) {
            if (node.name) {
                enumMap.set(node.name.text, node);
            }
        }
        ts.forEachChild(node, analyzeCallSites);
    }

    function processCall(receiverNode, methodName, argsArray, return_type) {
        if (methodName.startsWith("_")) return;
        const params = extractParams(argsArray);

        if (ts.isIdentifier(receiverNode)) {
            const receiverName = receiverNode.text;
            const instName = getReceiverInstance(receiverName);
            if (instName) {
                registerInstanceMethod(instName, methodName, params, return_type);
            } else if (isGlobalName(receiverName)) {
                registerGlobal(receiverName);
                mergeMethod(globals[receiverName].methods, methodName, params, return_type);
            }
        } else if (ts.isPropertyAccessExpression(receiverNode)) {
            const innerReceiver = receiverNode.expression;
            const subObjName = receiverNode.name.text;
            if (ts.isIdentifier(innerReceiver) && isSubObjectName(subObjName)) {
                const innerText = innerReceiver.text;
                const instName = getReceiverInstance(innerText);
                if (instName) {
                    registerInstanceSubObjectMethod(instName, subObjName, methodName, params, return_type);
                } else if (isGlobalName(innerText)) {
                    registerGlobalSubObjectMethod(innerText, subObjName, methodName, params, return_type);
                }
            }
        }
    }

    function processProperty(receiverNode, propName, prop_type) {
        if (propName.startsWith("_")) return;

        if (ts.isIdentifier(receiverNode)) {
            const receiverName = receiverNode.text;
            const instName = getReceiverInstance(receiverName);
            if (instName) {
                registerInstanceProperty(instName, propName, prop_type);
            } else if (isGlobalName(receiverName) && propName !== "prototype") {
                registerGlobal(receiverName);
                mergeProperty(globals[receiverName].properties, propName, prop_type);
            }
        } else if (ts.isPropertyAccessExpression(receiverNode)) {
            const innerReceiver = receiverNode.expression;
            const subObjName = receiverNode.name.text;
            if (ts.isIdentifier(innerReceiver) && isSubObjectName(subObjName)) {
                const innerText = innerReceiver.text;
                const instName = getReceiverInstance(innerText);
                if (instName) {
                    registerInstanceSubObjectProperty(instName, subObjName, propName, prop_type);
                } else if (isGlobalName(innerText)) {
                    registerGlobalSubObjectProperty(innerText, subObjName, propName, prop_type);
                }
            }
        }
    }

    console.log("正在解析 Source Maps 并提取 AST 树...");
    let parsedCount = 0;
    for (const mapFile of mapFiles) {
        let mapData;
        try {
            mapData = JSON.parse(fs.readFileSync(mapFile, 'utf-8'));
        } catch (e) {
            continue;
        }
        const sources = mapData.sources || [];
        const contents = mapData.sourcesContent || [];
        for (let i = 0; i < sources.length; i++) {
            const sourcePath = sources[i];
            const sourceText = contents[i];
            if (!sourceText || sourceText.length < 50) continue;
            if (looksLikeTypeScript(sourceText, sourcePath)) {
                const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true);
                analyzeCallSites(sourceFile);
                parsedCount++;
            }
        }
    }

    console.log("正在解析 .ltp Tuner 面板内嵌代码...");
    let ltpParsedCount = 0;
    for (const ltpFile of ltpFiles) {
        const blocks = extractJsFromLtp(ltpFile);
        blocks.forEach((jsText, idx) => {
            const virtualPath = `${ltpFile}_block_${idx}.ts`;
            const sourceFile = ts.createSourceFile(virtualPath, jsText, ts.ScriptTarget.Latest, true);
            analyzeCallSites(sourceFile);
            ltpParsedCount++;
        });
    }

    const enums_output = Object.create(null);
    for (const [enumName, node] of enumMap.entries()) {
        let description = "";
        if (node.jsDoc && node.jsDoc.length > 0) {
            description = node.jsDoc[0].comment || "";
        }
        const members = {};
        node.members.forEach(member => {
            const memberName = member.name.getText();
            let memberValue = undefined;
            if (member.initializer) {
                if (ts.isNumericLiteral(member.initializer)) {
                    memberValue = Number(member.initializer.text);
                } else if (ts.isStringLiteral(member.initializer)) {
                    memberValue = member.initializer.text;
                } else {
                    memberValue = member.initializer.getText();
                }
            }
            members[memberName] = memberValue;
        });
        enums_output[enumName] = { members };
        if (description.trim()) {
            enums_output[enumName].description = description.trim();
        }
    }

    const finalGlobals = {};
    for (const gName in globals) {
        const raw = globals[gName];
        const sub_objects_cleaned = {};
        for (const subName in raw.sub_objects) {
            sub_objects_cleaned[subName] = {
                methods: { ...raw.sub_objects[subName].methods },
                properties: { ...raw.sub_objects[subName].properties }
            };
        }
        finalGlobals[gName] = { 
            methods: { ...raw.methods }, 
            properties: { ...raw.properties },
            sub_objects: sub_objects_cleaned
        };
    }

    const finalInstances = {};
    for (const instName in instances) {
        const inst = instances[instName];
        const sub_objects_cleaned = {};
        for (const subName in inst.sub_objects) {
            sub_objects_cleaned[subName] = {
                methods: { ...inst.sub_objects[subName].methods },
                properties: { ...inst.sub_objects[subName].properties }
            };
        }
        finalInstances[instName] = {
            methods: { ...inst.methods },
            properties: { ...inst.properties },
            sub_objects: sub_objects_cleaned
        };
    }

    const rawCompletions = {
        globals: finalGlobals,
        instances: finalInstances,
        enums: { ...enums_output }
    };

    // 收集所有提取到的顶层名称以供分类 (不包含二级挂载子系统名)
    const allNames = [
        ...Object.keys(finalGlobals),
        ...Object.keys(enums_output)
    ];
    const uniqueNames = Array.from(new Set(allNames)).sort();

    // 写入粗筛文件
    fs.writeFileSync(RAW_COMPLETIONS_FILE, JSON.stringify(rawCompletions, null, 2), 'utf-8');
    fs.writeFileSync(RAW_NAMES_FILE, JSON.stringify(uniqueNames, null, 2), 'utf-8');

    console.log("\n粗筛提取报告:");
    console.log(`- 粗筛全量层级数据写入: ${RAW_COMPLETIONS_FILE}`);
    console.log(`- 粗筛对象名称列表写入: ${RAW_NAMES_FILE}`);
    console.log(`- 发现的潜在对象总数: ${uniqueNames.length} 个`);
}

// ==========================================================================
// 模式二：精筛编译 (COMPILE MODE)
// ==========================================================================
function runCompile() {
    console.log("=== 启动 Civ7 API 精筛编译 (Compile Mode) ===");

    if (!fs.existsSync(RAW_COMPLETIONS_FILE) || !fs.existsSync(RAW_NAMES_FILE)) {
        console.error("错误: 未找到粗筛中间数据。请先执行 --draft 粗筛命令！");
        process.exit(1);
    }
    if (!fs.existsSync(FILTER_FILE)) {
        console.error(`错误: 未找到分类配置文件: ${FILTER_FILE}，请先由 AI 或人工创建配置。`);
        process.exit(1);
    }

    const rawCompletions = JSON.parse(fs.readFileSync(RAW_COMPLETIONS_FILE, 'utf-8'));
    const rawNames = JSON.parse(fs.readFileSync(RAW_NAMES_FILE, 'utf-8'));
    const apiFilter = JSON.parse(fs.readFileSync(FILTER_FILE, 'utf-8'));

    // 建立分类快速检索集
    const globalsSet = new Set(apiFilter.globals || []);
    const enumsSet = new Set(apiFilter.enums || []);
    const uiComponentsSet = new Set(apiFilter.ui_components || []);
    const ignoredSet = new Set(apiFilter.ignored || []);
    const unknownList = apiFilter.unknown || [];
    const unknownSet = new Set(unknownList);

    // 1. 拦截检验: 检查是否有未分类的新对象，或者 unknown 分类是否非空
    const unclassifiedNames = [];
    rawNames.forEach(name => {
        if (!globalsSet.has(name) && !enumsSet.has(name) && !uiComponentsSet.has(name) && !ignoredSet.has(name)) {
            unclassifiedNames.push(name);
        }
    });

    if (unknownList.length > 0 || unclassifiedNames.length > 0) {
        console.error("\n❌ 发现未完全分类的对象，精筛熔断！");
        if (unknownList.length > 0) {
            console.error(`请对 api_filter.json 中悬挂在 unknown 隔离区的 ${unknownList.length} 个对象执行研判分流并将其清空。`);
        }
        if (unclassifiedNames.length > 0) {
            console.error("以下新提取对象在 api_filter.json 中没有任何记录，请将其分类：");
            console.error(JSON.stringify(unclassifiedNames, null, 2));
        }
        process.exit(1);
    }

    // 2. 数据编译与转换
    const finalGlobals = {};
    const finalInstances = {};
    const finalEnums = {};

    const ARRAY_METHODS = new Set([
        "forEach", "filter", "sort", "push", "pop", "shift", "unshift", "splice", "slice", 
        "map", "reduce", "find", "some", "every", "includes", "indexOf", "lastIndexOf", 
        "join", "keys", "values", "entries", "concat", "reverse", "toString", "toLocaleString"
    ]);

    // A. 全局对象及下属子系统组件过滤
    globalsSet.forEach(gName => {
        const raw = rawCompletions.globals[gName];
        if (raw) {
            const filteredSub = {};
            for (const subName in raw.sub_objects) {
                // 不在任何黑名单里的二级大写组件，默认保留为子系统
                if (!ignoredSet.has(subName) && !uiComponentsSet.has(subName) && !unknownSet.has(subName)) {
                    const rawSub = raw.sub_objects[subName];
                    const cleanedSubMethods = {};
                    for (const mName in rawSub.methods) {
                        if (!ARRAY_METHODS.has(mName)) {
                            cleanedSubMethods[mName] = rawSub.methods[mName];
                        }
                    }
                    filteredSub[subName] = {
                        methods: cleanedSubMethods,
                        properties: rawSub.properties || {}
                    };
                }
            }

            finalGlobals[gName] = {
                methods: raw.methods || {},
                properties: raw.properties || {},
                sub_objects: filteredSub
            };
        }
    });

    // B. 实例对象及下属子系统组件过滤
    for (const instName in rawCompletions.instances) {
        const rawInst = rawCompletions.instances[instName];
        
        // 过滤实例自身方法，剔除数组通用方法污染
        const cleanedMethods = {};
        for (const mName in rawInst.methods) {
            if (!ARRAY_METHODS.has(mName)) {
                cleanedMethods[mName] = rawInst.methods[mName];
            }
        }

        const filteredSubObjects = {};
        for (const subName in rawInst.sub_objects) {
            // 不在任何黑名单里的二级大写组件，默认保留为子系统
            if (!ignoredSet.has(subName) && !uiComponentsSet.has(subName) && !unknownSet.has(subName)) {
                const rawSub = rawInst.sub_objects[subName];
                const cleanedSubMethods = {};
                for (const mName in rawSub.methods) {
                    if (!ARRAY_METHODS.has(mName)) {
                        cleanedSubMethods[mName] = rawSub.methods[mName];
                    }
                }
                filteredSubObjects[subName] = {
                    methods: cleanedSubMethods,
                    properties: rawSub.properties || {}
                };
            }
        }
        finalInstances[instName] = {
            methods: cleanedMethods,
            properties: rawInst.properties || {},
            sub_objects: filteredSubObjects
        };
    }

    // C. 常量与枚举 (包含大写属性全局对象的转换)
    enumsSet.forEach(enumName => {
        // 如果是标准的 enum 定义
        if (rawCompletions.enums[enumName]) {
            finalEnums[enumName] = rawCompletions.enums[enumName];
        } 
        // 如果是伪装成全局对象的常量大写集合 (如 YieldTypes)
        else if (rawCompletions.globals[enumName]) {
            const rawGlobal = rawCompletions.globals[enumName];
            const members = {};
            Object.keys(rawGlobal.properties || {}).forEach(propName => {
                members[propName] = null;
            });
            finalEnums[enumName] = { members };
            if (rawGlobal.description) {
                finalEnums[enumName].description = rawGlobal.description;
            }
        }
    });

    // D. 级联精确去重（删除 properties 里和 sub_objects 同名的重复组件）
    for (const gName in finalGlobals) {
        const g = finalGlobals[gName];
        Object.keys(g.sub_objects || {}).forEach(subName => {
            delete g.properties[subName];
        });
    }

    for (const instName in finalInstances) {
        const inst = finalInstances[instName];
        Object.keys(inst.sub_objects || {}).forEach(subName => {
            delete inst.properties[subName];
        });
    }

    // 智能数据驱动绑定 instances (根据 api_filter.json 里的 instances 推导管理器关系)
    if (apiFilter.instances) {
        for (const [instName, getPath] of Object.entries(apiFilter.instances)) {
            const match = getPath.match(/^([A-Z]\w+)\./);
            if (match) {
                const gName = match[1];
                if (finalGlobals[gName]) {
                    if (!finalGlobals[gName].instances) {
                        finalGlobals[gName].instances = {};
                    }
                    finalGlobals[gName].instances[instName] = getPath;
                }
            }
        }
    }

    const outputData = {
        version: 3.2,
        globals: finalGlobals,
        instances: finalInstances,
        enums: finalEnums
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), 'utf-8');

    // 统计最终成果
    let totalMethods = 0;
    let totalProps = 0;
    
    Object.values(finalGlobals).forEach(g => {
        totalMethods += Object.keys(g.methods).length;
        totalProps += Object.keys(g.properties).length;
        Object.values(g.sub_objects).forEach(sub => {
            totalMethods += Object.keys(sub.methods).length;
            totalProps += Object.keys(sub.properties).length;
        });
    });
    
    Object.values(finalInstances).forEach(inst => {
        totalMethods += Object.keys(inst.methods).length;
        totalProps += Object.keys(inst.properties).length;
        Object.values(inst.sub_objects).forEach(sub => {
            totalMethods += Object.keys(sub.methods).length;
            totalProps += Object.keys(sub.properties).length;
        });
    });

    console.log("\n=== 精筛层级编译成功 ===");
    console.log(`- 级联 API 数据写入: ${OUTPUT_FILE} (${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB)`);
    console.log(`- 全局对象: ${Object.keys(finalGlobals).length} 个`);
    console.log(`- 实例对象: ${Object.keys(finalInstances).length} 个 (player, unit, city, district, constructible, army, plot)`);
    console.log(`- 常量/枚举 (Enums): ${Object.keys(finalEnums).length} 个`);
    console.log(`- 层级化方法总数: ${totalMethods} 个`);
    console.log(`- 层级化属性总数: ${totalProps} 个`);
}

// 主入口
const args = process.argv.slice(2);
if (args.includes('--draft')) {
    runDraft();
} else if (args.includes('--compile')) {
    runCompile();
} else {
    console.log("Usage: node scripts/extract_civ7_api.js [--draft | --compile]");
    process.exit(1);
}
