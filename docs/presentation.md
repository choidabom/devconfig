---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->

# macOS 개발 환경 자동화

---

# 목차

1. **왜 (Why)** - 문제와 동기
2. **무엇을 (What)** - 솔루션 개요
3. **어떻게 (How)** - 심볼릭 링크로 관리
4. **주요 기능들** - 관리하는 도구와 설정

---

<!-- _class: lead -->

# 1. 왜 (Why)

문제 정의와 동기

---

## 겪었던 문제들

**새 맥북을 받았을 때**
- 터미널 설정, 에디터 설정, 앱 설치... 반나절 소요
- "이전 맥에서 뭘 설정했더라?" 기억 안 남
- `.zshrc`, `.tmux.conf` 구글링하며 재작성

**여러 머신을 쓸 때**
- 회사 맥북 vs 개인 맥북 설정 불일치
- A 컴퓨터에서 설정 바꾸면 B 컴퓨터는 구버전
- 같은 설정을 두 번 하는 비효율

---

## 기존 해결책의 한계

**수동 복사**
```bash
# 설정 파일마다 일일이 복사
cp ~/.zshrc /path/to/backup
cp ~/.tmux.conf /path/to/backup
# ... 수십 개의 파일
```
**문제:** 실수하기 쉽고, 동기화 불가능

**심볼릭 링크 직접 관리**
```bash
ln -s ~/dotfiles/.zshrc ~/.zshrc
ln -s ~/dotfiles/.tmux.conf ~/.tmux.conf
# ... 반복 작업
```
**문제:** 스크립트 직접 작성 필요, 에러 처리 복잡

---

## 해결하고 싶었던 것

- **중앙 관리**: 설정을 한 곳에 집중화, Git으로 관리
- **재현 가능성**: 어느 맥에서나 한 번에 환경 구성
- **버전 관리**: 설정 변경 이력 추적
- **동기화**: 여러 머신 간 설정 일치
- **백업**: 실수로 날려도 복구 가능
- **커스터마이징**: Raycast처럼 자동은 아니지만, 내 입맛대로 구성

---

<!-- _class: lead -->

# 2. 무엇을 (What)

솔루션 개요

---

## 해결책: Dotfiles + Git

```
devconfig/
├── .claude/          # Claude Code 설정 (지침, 스킬, 에이전트, 훅)
├── .config/          # 앱 설정 (ghostty, karabiner, pet)
├── .hammerspoon/     # 앱 런처
├── .tmux.conf        # Tmux 설정
├── zsh/              # Shell 설정 (모듈화)
└── install.sh        # 한 줄로 설치
```

**핵심:**
- 설정 파일을 한 곳에 모아서 Git으로 관리
- 심볼릭 링크로 제자리에 배치
- `./install.sh` 한 줄로 새 맥북 세팅 완료

---

<!-- _class: lead -->

# 3. 어떻게 (How)

심볼릭 링크로 관리

---

## 심볼릭 링크란?

**바로가기와 같은 개념**

```
원본: ~/devconfig/.tmux.conf
링크: ~/.tmux.conf → ~/devconfig/.tmux.conf
```

- 원본은 한 곳(Git 관리)
- 필요한 곳에 "바로가기" 생성
- 링크 접근 = 원본 접근

---

## GNU Stow가 하는 일

**Before:**
```
~/devconfig/.config/ghostty/config  (원본)
~/.config/ghostty/                  (비어있음)
```

**After (stow 실행):**
```bash
stow -t ~ --restow .

~/devconfig/.config/ghostty/config  (원본)
                ↓ 심볼릭 링크
~/.config/ghostty/config            (링크)
```

앱이 `~/.config/ghostty/config` 읽으면 → 자동으로 원본 참조

---

<!-- _class: lead -->

# 4. 주요 기능들

관리하는 도구와 설정

---

## install.sh - 설치 자동화

```bash
#!/bin/bash

# 각 도구별 설치 함수
setup_stow()        # GNU Stow
setup_hammerspoon() # 앱 런처
setup_karabiner()   # 키보드 매핑
setup_pet()         # CLI 스니펫
setup_tmux()        # 세션 관리
setup_bat()         # cat 대체
setup_jq()          # JSON 처리
setup_direnv()      # 디렉토리별 환경변수
setup_zsh()         # Zsh 모듈 로드

# Stow로 심링크 생성
./sync.sh
```

**한 줄로 설치:** `./install.sh`

---

## Pet - CLI 스니펫 관리

```bash
# 명령어 저장
$ pet new
Command: docker ps --format "table {{.Names}}\t{{.Status}}"
Description: 실행중인 컨테이너 목록

# 저장된 명령어 검색 & 실행 (Ctrl+R)
$ pet search
```

**장점:**
- 복잡한 명령어 저장 & 재사용
- 팀원과 스니펫 공유 가능
- fzf 통합으로 빠른 검색

---

## Hammerspoon - 앱 런처

```lua
-- .hammerspoon/init.lua
local appKeys = {
    A = "Arc",
    C = "Dia",
    O = "Obsidian",
    S = "Slack",
    T = "Ghostty",
}

local modifiers = {"cmd", "ctrl", "alt"}

for key, app in pairs(appKeys) do
    hs.hotkey.bind(modifiers, key, function()
        hs.application.launchOrFocus(app)
    end)
end
```

`Cmd+Ctrl+C` → Dia 즉시 실행

---

## Tmux - 세션 관리

```conf
# .tmux.conf
set -g prefix C-o                    # Prefix: Ctrl+O
setw -g mode-keys vi                 # Vi 모드

# Resurrect: 세션 복원
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @continuum-restore 'on'       # 자동 복원
```

**장점:**
- 재부팅해도 세션 그대로 복원
- 여러 프로젝트를 세션으로 분리
- Vi 키바인딩으로 편리한 조작

---

## Claude Code 설정

```
devconfig/.claude/
├── CLAUDE.md      # 전역 지침 (모든 프로젝트에 적용)
├── commands/      # 슬래시 커맨드
├── agents/        # 서브에이전트 정의
├── skills/        # 키워드로 로드되는 스킬
└── hooks/         # 도구 실행 전후에 실행되는 스크립트
```

- `~/.claude/` 아래 항목마다 심볼릭 링크를 만든다
- Claude가 반복해서 틀린 규칙을 전역 CLAUDE.md에 추가하고, Git으로 이력을 남긴다
- 어느 맥에서든 같은 지침과 스킬로 Claude Code를 실행한다

---

## 공개 / 비공개 분리

**devconfig (public) + devconfig-private (private)**

```
~/.claude/CLAUDE.md          → devconfig          # 일반 규칙
~/.claude/CLAUDE.private.md  → devconfig-private  # 업무 관련 규칙
~/.claude/settings.json      → devconfig-private  # 업무 플러그인 포함
~/.claude/skills/<이름>      → 둘 중 한 레포
```

- 지침은 `@~/.claude/CLAUDE.private.md` import 로 나눈다. 파일이 없으면 import는 건너뛴다
- `skills/`, `agents/`는 디렉토리 전체가 아니라 항목별로 링크한다. 두 레포가 같은 디렉토리에 링크하기 때문이다

---

## 실제 사용 워크플로우

```bash
# 새 맥북 세팅
git clone https://github.com/choidabom/devconfig.git ~/devconfig
cd ~/devconfig && ./install.sh

# 비공개 설정
git clone https://github.com/choidabom/devconfig-private.git ~/devconfig-private
stow -d ~/devconfig-private -t ~ --restow .

# 설정 변경 후 동기화
vim .hammerspoon/init.lua
./sync.sh
git commit -m "feat: add new app key" && git push
```

---

<!-- _class: lead -->

# 5. 교훈

## 핵심 교훈 요약

1. **민감 정보 분리**: `.local` 파일 활용, 업무 관련 설정은 비공개 레포로 분리
2. **도구 < 목적**: 수단과 목적 구분
3. **CLAUDE.md 위치 확인**: `~/CLAUDE.md`는 홈 아래 모든 프로젝트에서 로드된다. 전역 지침은 `~/.claude/CLAUDE.md`에 둔다

---

<!-- _class: lead -->

# 결론

**"완벽한 dotfiles는 없다. 계속 진화하는 dotfiles만 있을 뿐"** (by cc)

- 한 번 설정하면 어느 맥에서나 재현 가능
- Git으로 변경 이력 추적 및 롤백
- 팀원과 베스트 프랙티스 공유
- 계속 개선 중...

---

## 향후 계획

**완료:**
- `.claude/` 디렉토리를 Stow로 관리 (전역 지침, 스킬, 에이전트, 훅)
- 업무 관련 설정을 비공개 레포로 분리

**TODO:**
- 문장 규칙(em-dash, 금지 단어)을 PreToolUse 훅으로 검사

**목표:** Claude Code 워크플로우도 dotfiles처럼 관리

---

<!-- _class: lead -->

# Q&A

**GitHub:** https://github.com/choidabom/devconfig

---

<!-- _class: lead -->

# Thank You!

