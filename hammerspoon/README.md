# Hammerspoon 


> **This is a tool for powerful automation of macOS.** At its core, Hammerspoon is just a bridge between the operating system and a Lua scripting engine. What gives Hammerspoon its power is a set of extensions that expose specific pieces of system functionality, to the user.'

라고 공식문서에 나와있다. 

> Lua 스크립트를 통해 macOS의 다양한 시스템 기능과 애플리케이션을 자동화하고 커스터마이징할 수 있는 강력한 생산성 도구

라고 gpt가 답해줬다. 

> There is no life on macOS without Hammerspoon.

라고 필자가 답했다. 

## 설치

1. 다운로드 및 설치

   - Download : https://www.hammerspoon.org/

2. 설정

   - 첫 실행 시, Hammerspoon이 시스템 권한을 요청할 수 있다.
     `시스템 환경 설정 - 보안 및 개인정보 보호 - 손쉬운 사용`에서 Hammerspoon에 권한을 부여해야 정상적으로 동작한다.

3. 스크립트 작성
   - Hammerspoon의 설정은 `~/.hammerspoon/init.lua` 파일에서 작성하면 된다.
   - `init.lua`는 Hammerspoon이 실행될 때 로드되는 주요 설정 파일이다.

## 단축키 사용법

> **`cmd`와 `ctrl`키를 동시에 누르고 keyMap에 넣은 키 값을 누르면 해당 앱이 실행된다.**

아래 코드에 있는 keyMap을 예로 들자면, `cmd + ctrl + S`를 누르면 `Slack`앱이 실행된다.

```lua
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
```

## 유의점

1. Key Mapping

   - `init.lua`에서 keyMap 수정 시, key 값의 이름이 특정 앱의 이름과 정확하게 일치해야 한다.

2. 설정 반영

   - 스크립트를 수정한 후 반드시 **Reload Config**를 실행해야 변경 사항이 반영된다.
<img width="150" alt="image" src="https://github.com/user-attachments/assets/15e9f94f-bfa4-4ff7-baed-ff86a1dac4a0">

