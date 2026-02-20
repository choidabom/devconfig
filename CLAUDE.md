# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Mac 개발 환경 설정 파일 모음. GNU Stow를 사용하여 심볼릭 링크를 관리하고, 직접 source/PATH로 참조하는 파일도 포함한다.

## Common Commands

### Installation and Setup
```bash
# 최초 설치 (Homebrew, 도구 설치, zsh 설정, 심볼릭 링크)
./install.sh

# 심볼릭 링크만 재생성
./sync.sh

# 또는 직접 stow 실행
stow -t ~ --restow .
```

## Architecture and Structure

### Stow Integration

`stow -t ~ --restow .` 실행 시 `.stow-local-ignore`에 정의되지 않은 파일/디렉토리가 `~/`로 심링크된다.

- **Stow로 심링크되는 항목**: `.config/` (ghostty, karabiner, pet), `.fig/`, `.hammerspoon/`, `.tmux.conf`
- **직접 참조하는 항목** (심링크 제외): `zsh/` (`.zshrc`에서 source), `bin/` (PATH에 추가)
- **참고용 항목** (심링크 제외): `docs/`, `iterm2/`, `rectangle/`, `vim/`

### Core Components

- **Shell**: `zsh/*.zsh` - aliases, functions, history, keybindings, path, pet, prompt, tmux 모듈로 분리. `.zshrc`에서 자동 로드
- **Terminal Emulators**:
  - `.config/ghostty/` - Ghostty 터미널 설정
- **Window Management**:
  - `.hammerspoon/init.lua` - 키보드 단축키로 앱 실행
  - `rectangle/` - 윈도우 크기/위치 조절 (참고용)
- **Input Management**: `.config/karabiner/` - 한영 전환 자동화 (ESC, Ctrl+HJKL, ₩→`)
- **Terminal Multiplexer**: `.tmux.conf` - prefix `Ctrl+O`, vi 모드, TPM 플러그인 (resurrect, continuum)
- **CLI Tools**:
  - `.config/pet/` - CLI 명령어 스니펫
  - `.fig/` - 터미널 자동완성
  - `bin/rundevel` - Tmux 개발 세션 시작 스크립트

## Development Workflow

설정 파일을 추가, 수정, 삭제할 때는 반드시 `README.md`도 함께 업데이트할 것:
- 루트 `README.md`의 구조 트리, Tools 테이블 등 관련 섹션을 변경 사항에 맞게 갱신
- 하위 디렉토리에 `README.md`가 있으면 해당 파일도 갱신

새로운 도구를 추가할 때:
1. 설정 파일을 적절한 위치에 배치
2. Stow 심링크 대상이면 `.stow-local-ignore` 확인
3. 직접 참조라면 `.stow-local-ignore`에 제외 패턴 추가
4. `install.sh`에 설치 함수 추가
5. `README.md` 업데이트

## Important Notes

- 커밋 메시지는 영어로 작성 (feat:, fix:, refactor: 등 conventional commits 스타일)
- 이 레포는 개인 macOS 환경 설정이며, 일부 설정은 특정 폰트(Google Sans Code, Sarasa Term K)와 Homebrew 패키지에 의존
- Karabiner 설정에 한영 전환 키바인딩 포함
