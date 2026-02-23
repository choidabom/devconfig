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
├── agents/                       Custom Claude Agent SDK implementations
│   └── uiux-analyzer/               UI/UX analysis agent (TypeScript)
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

## Claude Agents

[`agents/`](agents/) 디렉토리에는 Claude Agent SDK를 사용한 고급 에이전트 구현이 포함되어 있습니다.

### UI/UX Documenter 🎨

**위치**: [`.claude/agents/uiux-documenter.md`](.claude/agents/uiux-documenter.md)

Playwright MCP를 활용한 웹사이트 UI/UX **관찰 및 문서화** 에이전트 (평가 없음, 순수 분석)

**기능**:
- 🎨 디자인 시스템 완벽 추출 (색상, 타이포그래피, 간격, 컴포넌트)
- 🖱️ 인터랙션 패턴 상세 기록 (애니메이션, 전환 효과, 마이크로인터랙션)
- 👤 사용자 경험 흐름 분석 (사용자가 보고, 느끼고, 생각하는 것)
- 🔧 기술 구현 관찰 (프레임워크, CSS 기법, 성능 최적화)
- 📐 컴포넌트 사양 문서화 (정확한 크기, 상태, 동작)
- 🧠 사용자 인식 분석 (신뢰도 지표, 인지 부하, 감정 유발 요소)

**사용법**:

```bash
# Claude Code에서
/document-ux https://stripe.com

# 특정 영역만 집중 분석
/document-ux https://linear.app design-system interactions

# 출력 경로 지정
/document-ux https://notion.so all /reports/notion-ux-study.md
```

**출력**: 디자인 시스템 복제, 컴포넌트 라이브러리 제작, UX 패턴 참고에 활용 가능한 상세 문서

### UI/UX Analyzer ⚖️

**위치**: [`agents/uiux-analyzer/`](agents/uiux-analyzer/)

Playwright MCP를 활용한 웹사이트 UI/UX **품질 평가** 에이전트 (점수 및 개선 권장사항)

**기능**:
- ✅ 접근성 감사 (WCAG 2.1 AA/AAA 준수 여부)
- 📱 반응형 디자인 테스트 (Desktop, Tablet, Mobile)
- 🎨 시각적 디자인 평가 (일관성, 품질)
- 🖱️ UX 평가 (사용성 이슈 발견)
- ⚡ 성능 분석 (Core Web Vitals)
- 📊 경쟁사 비교 분석
- 📄 점수 및 개선 권장사항 리포트

**사용법**:

```bash
# 1. 간단한 방법 (Claude Code에서)
/analyze-ux https://example.com

# 2. 고급 방법 (TypeScript SDK)
cd agents/uiux-analyzer
npm install
npm run dev https://example.com
```

**출력**: 카테고리별 점수, 발견된 이슈, 우선순위별 개선 권장사항

자세한 내용은 [agents/uiux-analyzer/README.md](agents/uiux-analyzer/README.md) 참조

---

**두 에이전트의 차이**:
- **Documenter**: "이 사이트는 **이렇게** 만들어져 있다" (관찰, 추출, 문서화)
- **Analyzer**: "이 사이트는 **이만큼** 좋다" (평가, 점수, 개선안)

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
