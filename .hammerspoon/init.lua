local APP_MODS = {'cmd', 'ctrl'}

-- 앱 단축키 매핑. cmd+ctrl+/ 로 연결하면 이 파일을 다시 쓴다
local KEYMAP_PATH = hs.configdir .. '/keymap.json'

local keyMap = hs.json.read(KEYMAP_PATH) or {}

local function saveKeyMap()
    local keys = {}
    for k in pairs(keyMap) do table.insert(keys, k) end
    table.sort(keys)
    local lines = {}
    for _, k in ipairs(keys) do
        local v = (keyMap[k]:gsub('\\', '\\\\'):gsub('"', '\\"'))
        table.insert(lines, string.format('  "%s": "%s"', k, v))
    end
    local f = io.open(KEYMAP_PATH, 'w')
    f:write('{\n' .. table.concat(lines, ',\n') .. '\n}\n')
    f:close()
end

-- 이전 버전이 hs.settings 에 저장한 매핑을 keymap.json 으로 옮긴다
local legacy = hs.settings.get('appKeyMap')
if legacy then
    keyMap = legacy
    saveKeyMap()
    hs.settings.clear('appKeyMap')
end

local appHotkeys = {}

local function bindAppKeys()
    for _, hk in pairs(appHotkeys) do hk:delete() end
    appHotkeys = {}
    for k, prog in pairs(keyMap) do
        appHotkeys[k] = hs.hotkey.bind(APP_MODS, k, function()
            print(k, prog)
            hs.application.launchOrFocus(prog)
        end)
    end
end

bindAppKeys()

local function keyFor(app)
    for k, prog in pairs(keyMap) do
        if prog:lower() == app:lower() then return k end
    end
end

local function installedApps()
    local dirs = {
        '/Applications', '/Applications/Utilities',
        '/System/Applications', '/System/Applications/Utilities',
        os.getenv('HOME') .. '/Applications',
    }
    local seen, apps = {Finder = true}, {'Finder'}
    for _, dir in ipairs(dirs) do
        local ok, iter, obj = pcall(hs.fs.dir, dir)
        if ok and iter then
            for file in iter, obj do
                local name = file:match('^(.+)%.app$')
                if name and not seen[name] then
                    seen[name] = true
                    table.insert(apps, name)
                end
            end
        end
    end
    table.sort(apps, function(a, b) return a:lower() < b:lower() end)
    return apps
end

-- chooser 가 GC 되지 않도록 모듈 변수로 둔다
local chooser

local function pickKey(app)
    local cur = keyFor(app)
    local choices = {}
    if cur then
        table.insert(choices, {text = '연결 해제', subText = cur .. ' → ' .. app, key = ''})
    end
    for c in ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'):gmatch('.') do
        table.insert(choices, {text = c, subText = keyMap[c] and ('현재: ' .. keyMap[c]) or '비어 있음', key = c})
    end
    chooser = hs.chooser.new(function(choice)
        if not choice then return end
        if cur then keyMap[cur] = nil end
        if choice.key ~= '' then keyMap[choice.key] = app end
        saveKeyMap()
        bindAppKeys()
        hs.alert.show(choice.key ~= '' and (choice.key .. ' → ' .. app) or (app .. ' 연결 해제'))
    end)
    chooser:placeholderText(app .. ' 에 연결할 키'):choices(choices):show()
end

local function pickApp()
    local choices = {}
    for _, app in ipairs(installedApps()) do
        local k = keyFor(app)
        table.insert(choices, {text = app, subText = k and ('cmd+ctrl+' .. k) or '', app = app})
    end
    chooser = hs.chooser.new(function(choice)
        if choice then hs.timer.doAfter(0.1, function() pickKey(choice.app) end) end
    end)
    chooser:placeholderText('키를 연결할 앱'):choices(choices):show()
end

hs.hotkey.bind(APP_MODS, '/', pickApp)

hs.hints.hintChars = {'f','j','d','k','s','l','r','u','e','i','w','v','m'}
hs.hotkey.bind({'ctrl','cmd'}, 'return', function()
    hs.hints.windowHints(hs.window.filter.new():getWindows(hs.window.filter.sortByFocused))
end)

local function keyCode(key, modifiers)
   modifiers = modifiers or {}
   return function()
      hs.eventtap.event.newKeyEvent(modifiers, string.lower(key), true):post()
      hs.timer.usleep(100)
      hs.eventtap.event.newKeyEvent(modifiers, string.lower(key), false):post()
   end
end

local function remapKey(modifiers, key, keyCode)
   hs.hotkey.bind(modifiers, key, keyCode, nil, keyCode)
end

hs.hotkey.bind({'ctrl', 'cmd'}, ';', function()
    hs.alert.show('sunflower', {fadeInDuration = 0, fadeOutDuration = 0}, 0.03)
end)

-- Load move-resize module
-- require("move-resize")

-- -- Load window-management module
-- local wm = require("window-management")
-- hs.hotkey.bind({'ctrl', 'cmd'}, 'M', function()
--     wm.windowToggleMaximize()
-- end)