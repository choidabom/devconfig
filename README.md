# devconfig

Mac 개발 환경 설정 파일 모음

## Tools

| 도구 | 설명 | 설정 경로 |
|------|------|-----------|
| [Hammerspoon](hammerspoon/) | 키보드 단축키로 앱 실행 | `~/.hammerspoon/` |
| [Pet](pet/) | CLI 명령어 스니펫 관리 | `~/.config/pet/snippet.toml` |
| [Tmux](tmux/) | 터미널 멀티플렉서 | `~/devconfig/tmux/.tmux.conf` |
| [Zsh](zsh/) | Shell 설정 및 유틸리티 | `~/devconfig/zsh/*.zsh` |
| Fig | 터미널 자동완성 | `~/.fig/settings.json` |
| Rectangle | 윈도우 크기/위치 조절 | - |

## Usage

```bash
# 최초 설치 (Homebrew, Hammerspoon, Pet, Fig, Rectangle, Tmux)
# + Zsh 설정 자동 추가 (devconfig 모듈 로딩)
# + 설정 파일 심볼릭 링크 자동 생성
./install.sh

# 터미널 재시작 후 devconfig 설정 적용됨

# 개발 환경 시작 (Tmux 세션)
rundevel

# 레포 수정 후 로컬에 반영 (심볼릭 링크 재생성 필요시)
./sync.sh
```

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

## License

MIT License
