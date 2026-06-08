import fs from 'fs';

const RAW_NAMES_FILE = "docs/data/raw_names.json";
const FILTER_FILE = "docs/data/api_filter.json";

// 包含所有被认为属于全局 Manager 或是 Engine 核心的 API 对象
const KNOWN_GLOBALS = [
    "GameplayMap", "Players", "Units", "Cities", "Game", "GameContext", "Configuration", "UI", 
    "WorldBuilder", "WorldUI", "Locale", "MapConstructibles", "MapCities", "MapUnits", "WorldUnits",
    "Districts", "Database", "Loading", "Controls", "GameInfo", "engine", "Input", 
    "InterfaceMode", "ReflectionArchives", "TutorialSupport", "Constructibles", "Armies"
];

function main() {
    if (!fs.existsSync(RAW_NAMES_FILE)) {
        console.error("未找到 raw_names.json 文件。");
        process.exit(1);
    }

    const rawNames = JSON.parse(fs.readFileSync(RAW_NAMES_FILE, 'utf-8'));

    // 读取已有的配置，进行增量融合
    let filterConfig = {
        globals: [],
        enums: [],
        ui_components: [],
        ignored: [],
        unknown: [],
        instances: {
            "player": "Players.get(playerId)",
            "unit": "Units.get(unitId)",
            "city": "Cities.get(cityId)",
            "district": "Districts.get(districtId)",
            "constructible": "Constructibles.get(constructibleId)",
            "army": "Armies.get(unit.armyId)",
            "plot": "GameplayMap.getPlot(x, y)"
        }
    };

    if (fs.existsSync(FILTER_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(FILTER_FILE, 'utf-8'));
            if (existing.instances) filterConfig.instances = existing.instances;
            if (existing.globals) filterConfig.globals = existing.globals;
            if (existing.enums) filterConfig.enums = existing.enums;
            if (existing.ui_components) filterConfig.ui_components = existing.ui_components;
            if (existing.ignored) filterConfig.ignored = existing.ignored;
            if (existing.unknown) filterConfig.unknown = existing.unknown;
        } catch (e) {
            console.warn("读取已有 api_filter.json 失败，将重新初始化。");
        }
    }

    const globalsSet = new Set(filterConfig.globals);
    const enumsSet = new Set(filterConfig.enums);
    const uiComponentsSet = new Set(filterConfig.ui_components);
    const ignoredSet = new Set(filterConfig.ignored);
    const unknownSet = new Set(filterConfig.unknown);

    const knownGlobalsSet = new Set(KNOWN_GLOBALS);

    const uiKeywords = [
        "Context", "Model", "Button", "Screen", "Panel", "Manager", "Widget", "Controller", 
        "Element", "Layer", "Options", "Dialog", "Menu", "Tooltip", "Tray", "Anchor", 
        "Fxs", "Scrollable", "Setup", "Filigree", "Divider", "Lens", "Popup", "Radial", "Slider", "HUD"
    ];

    const enumKeywords = [
        "Types", "Statuses", "Colors", "Keys", "Ages", "Strength", "Limits", "Modes", "Ranges", "Align", "Size", "Fonts", "Profiles", "Reasons"
    ];

    // 新对象的增量分配
    rawNames.forEach(name => {
        // 如果已在任何已有分类，直接跳过以保全原有分类配置
        if (globalsSet.has(name) || enumsSet.has(name) || uiComponentsSet.has(name) || ignoredSet.has(name) || unknownSet.has(name)) {
            return;
        }

        // 新发现的对象分类
        if (knownGlobalsSet.has(name)) {
            filterConfig.globals.push(name);
        } else if (name === name.toUpperCase() && name.length > 2 && !name.includes(".")) {
            filterConfig.enums.push(name);
        } else if (enumKeywords.some(keyword => name.endsWith(keyword))) {
            filterConfig.enums.push(name);
        } else if (uiKeywords.some(keyword => name.includes(keyword))) {
            filterConfig.ui_components.push(name);
        } else {
            filterConfig.unknown.push(name);
        }
    });

    // 重新排序去重
    filterConfig.globals = Array.from(new Set(filterConfig.globals)).sort();
    filterConfig.enums = Array.from(new Set(filterConfig.enums)).sort();
    filterConfig.ui_components = Array.from(new Set(filterConfig.ui_components)).sort();
    filterConfig.ignored = Array.from(new Set(filterConfig.ignored)).sort();
    filterConfig.unknown = Array.from(new Set(filterConfig.unknown)).sort();

    fs.writeFileSync(FILTER_FILE, JSON.stringify(filterConfig, null, 2), 'utf-8');
    console.log(`分类过滤器配置文件增量更新成功: ${FILTER_FILE}`);
    console.log(`- globals: ${filterConfig.globals.length} 个`);
    console.log(`- enums: ${filterConfig.enums.length} 个`);
    console.log(`- ui_components: ${filterConfig.ui_components.length} 个`);
    console.log(`- ignored: ${filterConfig.ignored.length} 个`);
    console.log(`- unknown: ${filterConfig.unknown.length} 个 (待 AI 判定)`);
}

main();
