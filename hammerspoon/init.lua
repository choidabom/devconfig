local keyMap = {
    C = "Google Chrome",
    V = "Visual Studio Code",
    F = "Finder",
    P = "Postman",
    S = "Slack",
    I = "iTerm",
    N = 'notes',
    K = 'kakaoTalk',
    B = 'Beekeeper Studio',
    M = 'YouTube Music',
    D = 'Discord',
    X = 'Cursor',
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
