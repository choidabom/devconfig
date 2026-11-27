# Hammerspoon 

> **This is a tool for powerful automation of macOS.** At its core, Hammerspoon is just a bridge between the operating system and a Lua scripting engine. What gives Hammerspoon its power is a set of extensions that expose specific pieces of system functionality, to the user.'

라고 공식문서에 나와있다. 

> Lua 스크립트를 통해 macOS의 다양한 시스템 기능과 애플리케이션을 자동화하고 커스터마이징할 수 있는 강력한 생산성 도구

라고 gpt가 답해줬다. 

> There is no life on macOS without Hammerspoon.

라고 필자가 답했다. 

https://github.com/Hammerspoon/hammerspoon

## 설치

- brew를 사용하여 설치할 수 있다.
  ```bash
   brew install hammerspoon
  ```
- 또는 홈페이지에서 직접 다운로드할 수 있다.
   - https://www.hammerspoon.org/

## 기본 설정

- 첫 실행 시, Hammerspoon이 시스템 권한을 요청할 수 있다.

   `시스템 환경 설정 - 보안 및 개인정보 보호 - 손쉬운 사용`에서 Hammerspoon에 권한을 부여해야 정상적으로 동작한다.

- 스크립트 작성
   - Hammerspoon의 설정은 `~/.hammerspoon/init.lua` 파일에서 작성하면 된다.
   - `init.lua`는 Hammerspoon이 실행될 때 로드되는 주요 설정 파일이다.

## 단축키 사용법

> **`cmd`와 `ctrl`키를 동시에 누르고 연결해 둔 대문자 키를 누르면 해당 앱이 실행된다.**

예를 들어 `S`에 `Slack`을 연결해 두면 `cmd + ctrl + S`로 `Slack`이 실행되거나 앞으로 온다.

### 앱과 키 연결하기

1. `cmd + ctrl + /`를 누른다. 설치된 앱 목록이 뜬다. 이미 연결된 앱은 아래에 `cmd+ctrl+키`가 표시된다.
2. 앱을 고른다. A–Z 목록이 뜨고, 각 키에 지금 연결된 앱이 표시된다.
3. 키를 고르면 바로 적용된다. Reload Config는 필요 없다.
   - 이미 다른 앱이 연결된 키를 고르면 새 앱으로 바뀐다.
   - 이미 연결된 앱이면 목록 맨 위의 `연결 해제`로 연결을 지울 수 있다.

앱 목록은 `/Applications`, `/Applications/Utilities`, `/System/Applications`, `/System/Applications/Utilities`, `~/Applications`의 `.app`과 Finder다.

### 매핑 저장 위치

- 연결 결과는 `.hammerspoon/keymap.json`에 저장된다. `~/.hammerspoon`이 이 레포의 `.hammerspoon`을 가리키므로 연결할 때마다 레포의 파일이 바뀐다.
- 바뀐 매핑은 `git diff .hammerspoon/keymap.json`으로 확인하고 커밋한다.
- `keymap.json`을 직접 고쳐도 된다. 이때는 Reload Config를 눌러야 적용된다.

## 유의점

1. Key Mapping

   - `keymap.json`에 직접 적는 앱 이름은 실제 앱 이름과 일치해야 한다. `cmd + ctrl + /`로 연결하면 설치된 앱 이름을 그대로 쓴다.

2. 설정 반영

   - 스크립트를 수정한 후 반드시 **Reload Config**를 실행해야 변경 사항이 반영된다.
<img width="150" alt="image" src="https://github.com/user-attachments/assets/15e9f94f-bfa4-4ff7-baed-ff86a1dac4a0">

