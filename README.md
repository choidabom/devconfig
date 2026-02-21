# devconfig

Mac 개발 환경 설정 파일 모음. [GNU Stow](https://www.gnu.org/software/stow/)를 사용하여 심볼릭 링크를 관리합니다.

## 구조

```
devconfig/
├── .claude/                        → ~/.claude/
│   ├── settings.json                  전역 설정 (환경변수, 권한, hooks)
│   ├── keybindings.json               키바인딩
│   ├── commands/                      슬래시 커맨드 (/명령어)
│   ├── agents/                        전문가 에이전트
│   ├── skills/                        자동 적용 스킬
│   ├── hooks/                         훅 스크립트
│   └── claude-docs/                   참고 문서
├── .config/                        → ~/.config/
│   ├── karabiner/karabiner.json       한영 전환 자동화
│   └── pet/snippet.toml               CLI 스니펫
├── .fig/settings.json              → ~/.fig/
├── .hammerspoon/init.lua           → ~/.hammerspoon/
├── .tmux.conf                      → ~/.tmux.conf
│
├── zsh/                            ~/devconfig/zsh/*.zsh (source)
├── bin/                            ~/devconfig/bin (PATH)
└── install.sh, sync.sh
```

## 설치

```bash
# 최초 설치 (Homebrew, 도구 설치, zsh 설정, 심볼릭 링크)
./install.sh

# 심볼릭 링크만 재생성
./sync.sh

# 또는 직접 stow 실행
stow -t ~ --restow .
```

## Tools

| 도구 | 설명 | 심링크 경로 |
|------|------|-------------|
| [Claude Code](.claude/) | AI 코딩 어시스턴트 설정 (커맨드, 에이전트, 스킬, hooks) | `~/.claude/` |
| [Hammerspoon](.hammerspoon/) | 키보드 단축키로 앱 실행 | `~/.hammerspoon/` |
| [Karabiner](.config/karabiner/) | 한영 전환 자동화 (ESC, Ctrl+HJKL, ₩→`) | `~/.config/karabiner/` |
| [Pet](.config/pet/) | CLI 명령어 스니펫 관리 | `~/.config/pet/` |
| Tmux | 터미널 멀티플렉서 | `~/.tmux.conf` |
| Fig | 터미널 자동완성 | `~/.fig/` |
| [Zsh](zsh/) | Shell 설정 및 유틸리티 | 직접 source |
| Rectangle | 윈도우 크기/위치 조절 | - |
| bat | cat 개선판 (문법 강조) | - |
| jq | JSON 처리 도구 | - |
| direnv | 디렉토리별 환경변수 자동 로드 | - |

## Zsh Utilities

`.zshrc`에서 자동으로 로드되는 유틸리티:

### Commands

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `gr` | ripgrep + fzf + vim 통합 검색 | `gr "keyword" "*.js"` |
| `calc` | 계산기 (bc 사용) | `calc "1 + 2 * 3"` |
| `uuid` | 소문자 UUID 생성 | `uuid` |
| `ecurl` | curl 성능 측정 (3회) | `ecurl "https://google.com"` |
| `rundevel` | Tmux 개발 세션 시작 | `rundevel` |
| `cat` | 문법 강조된 파일 보기 (bat) | `cat file.js` |
| `json` | JSON 예쁘게 포맷 (jq) | `echo '{"a":1}' \| json` |

### Key Bindings

| 키 | 기능 |
|----|------|
| `↑` / `↓` | 명령어 기록 검색 (prefix matching) |
| `Alt+k` / `Alt+j` | 명령어 기록 검색 (vim-style) |
| `Alt+Enter` | Autosuggestion 수락 |
| `Ctrl+s` | Pet 스니펫 검색 |

### Features

- **히스토리**: 100,000개 명령어 저장, 중복 제거, 타임스탬프
- **Tmux 통합**: 창 제목에 현재 디렉토리/명령어 자동 표시
- **Enhanced ls**: `eza` 사용 시 색상 표시
- **디렉토리별 환경변수**: `direnv`로 `.envrc` 자동 로드 (프로젝트별 설정 분리)
- **문법 강조**: `bat`으로 파일 내용 가독성 향상
- **JSON 처리**: `jq`로 API 응답, 설정 파일 손쉽게 파싱

## License

MIT License
