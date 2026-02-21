local keyMap = {
    C = "Google Chrome",
    F = "Finder",
    S = "Slack",
    I = "iTerm",
    N = 'notes',
    K = 'kakaoTalk',
    B = 'Beekeeper Studio',
    M = 'YouTube Music',
    D = 'Dia',
    X = 'Cursor',
    Z = 'Zed',
    G = 'Ghostty'
}

for k, prog in pairs(keyMap) do
    hs.hotkey.bind({'cmd', 'ctrl'}, k, function()
        print(k, prog)
        hs.application.launchOrFocus(prog)
    end)
end

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