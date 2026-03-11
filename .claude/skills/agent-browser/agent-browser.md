---
name: agent-browser
description: >
  브라우저 자동화 작업 시 사용. 웹 QA, 스크래핑, 폼 자동화, 로그인 유지,
  웹 내비게이션 등 브라우저가 필요한 모든 상황에서 Bash를 통해 agent-browser CLI를 실행.
  Playwright MCP 대신 사용하며 93% 토큰 절감.
  "브라우저", "웹 테스트", "QA", "스크래핑", "폼 자동화", "agent-browser" 등의 요청 시 자동 적용.
---

# agent-browser — Browser Automation for AI Agents

Vercel의 [agent-browser](https://github.com/vercel-labs/agent-browser) CLI를 사용하여
브라우저를 자동화한다. Playwright MCP 대비 **93% 토큰 절감**.

> **IMPORTANT**: Playwright MCP 도구(`mcp__plugin_playwright_*`)를 사용하지 않는다.
> 모든 브라우저 자동화는 `Bash` 도구로 `agent-browser` CLI를 실행한다.

## 설치

```bash
npm install -g agent-browser
agent-browser install   # Chromium 다운로드
```

macOS Homebrew:
```bash
brew install agent-browser
agent-browser install
```

## 핵심 개념

### Accessibility Tree + Ref ID

agent-browser는 DOM 대신 **accessibility tree**를 사용한다.
스냅샷 출력에 `[ref=eN]` 형태의 ref ID가 붙으며, 이후 상호작용에 이 ref를 사용한다.

```
- button "Sign In" [ref=e1]
- textbox "Email" [ref=e2]
- textbox "Password" [ref=e3]
```

ref로 상호작용: `agent-browser click @e1`, `agent-browser fill @e2 "user@test.com"`

### 왜 토큰 효율적인가

| 항목 | Playwright MCP | agent-browser |
|------|---------------|---------------|
| 스냅샷 | 8,247자 | 280자 |
| 클릭 응답 | 12,891자 | 6자 |
| 평균 응답 | 3,112자 | 328자 |

## Core Workflow

**모든 브라우저 작업은 이 패턴을 따른다:**

```
1. Navigate:  agent-browser open <url>
2. Snapshot:  agent-browser snapshot -i       # interactive 요소만
3. Interact:  agent-browser click @e1         # ref 사용
4. Re-snapshot: agent-browser snapshot -i     # 변경 후 새 ref 확인
```

## 명령어 레퍼런스

### Navigation
```bash
agent-browser open <url>          # 페이지 이동
agent-browser reload              # 새로고침
agent-browser back                # 뒤로
agent-browser forward             # 앞으로
```

### Snapshot (정보 조회)
```bash
agent-browser snapshot -i         # interactive 요소만 (추천)
agent-browser snapshot -i -c      # + compact (빈 요소 제거)
agent-browser snapshot -d 3       # 깊이 3으로 제한
agent-browser snapshot -s "#main" # CSS selector 범위 지정
```

| Flag | 용도 |
|------|------|
| `-i, --interactive` | interactive 요소만 |
| `-c, --compact` | 빈 구조 요소 제거 |
| `-d, --depth <n>` | 최대 트리 깊이 |
| `-s, --selector <sel>` | 특정 영역만 스냅샷 |

### Interaction
```bash
agent-browser click @e1           # 클릭
agent-browser fill @e2 "text"     # 입력 필드 클리어 후 입력
agent-browser type @e2 "text"     # 기존 값에 추가 입력
agent-browser hover @e1           # 호버
agent-browser press Enter         # 키 입력
agent-browser scroll down 500     # 스크롤
agent-browser select @e1 "value"  # 드롭다운 선택
agent-browser check @e1           # 체크박스
agent-browser upload @e1 file.png # 파일 업로드
```

### Wait
```bash
agent-browser wait @e1              # 요소 보일 때까지
agent-browser wait 3000             # 3초 대기
agent-browser wait --text "Done"    # 텍스트 나타날 때까지
agent-browser wait --url "**/dash"  # URL 패턴 매치
agent-browser wait --load networkidle  # 네트워크 안정화
```

### Screenshot
```bash
agent-browser screenshot path.png           # 스크린샷
agent-browser screenshot --annotate path.png # ref 번호 표시된 스크린샷
```

### Data Extraction
```bash
agent-browser get text @e1        # 텍스트 추출
agent-browser get html @e1        # innerHTML
agent-browser get value @e1       # input 값
agent-browser get attr @e1 href   # 속성 값
agent-browser get count "li"      # 요소 개수
```

### State Check
```bash
agent-browser is visible @e1
agent-browser is enabled @e1
agent-browser is checked @e1
```

### Network & Console
```bash
agent-browser network requests           # 네트워크 요청 목록
agent-browser network requests --filter api  # 필터링
agent-browser console                     # 콘솔 메시지
agent-browser errors                      # JS 에러
```

### JavaScript 실행
```bash
agent-browser eval "document.title"
agent-browser eval "window.scrollY"
```

### Diff (비교)
```bash
agent-browser diff snapshot                     # 마지막 스냅샷 대비 변경
agent-browser diff screenshot --baseline b.png  # 스크린샷 비교
```

## 세션 & 프로필 관리

### Isolated Session
```bash
agent-browser --session my-test open example.com
agent-browser --session my-test snapshot -i
```

### Persistent Session (자동 저장/복원)
```bash
agent-browser --session-name twitter open twitter.com
# ~/.agent-browser/sessions/에 상태 자동 저장
```

### Persistent Profile (로그인 유지)
```bash
agent-browser --profile ~/.myapp-profile open myapp.com
# 쿠키, localStorage, 캐시 등 전체 상태 유지
```

### 인증 헤더
```bash
agent-browser open api.example.com \
  --headers '{"Authorization": "Bearer <token>"}'
```

## Selector 우선순위

1. **Ref** (추천): `@e1` — 스냅샷에서 얻은 ref 사용
2. **CSS**: `"#id"`, `".class"`, `"div > button"`
3. **Text**: `"text=Submit"`
4. **Semantic**: `find role button click --name "Submit"`

## 디버깅

```bash
agent-browser --headed open example.com   # 브라우저 창 표시
agent-browser console                      # 콘솔 로그
agent-browser errors                       # JS 에러
agent-browser highlight @e1                # 요소 하이라이트
```

## 브라우저 종료

```bash
agent-browser close
```

## 사용 패턴 예시

### 로그인 + 데이터 확인
```bash
agent-browser open https://app.example.com/login
agent-browser snapshot -i
# - textbox "Email" [ref=e1]
# - textbox "Password" [ref=e2]
# - button "Sign In" [ref=e3]
agent-browser fill @e1 "user@test.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --url "**/dashboard"
agent-browser snapshot -i
```

### QA 테스트
```bash
agent-browser open https://localhost:3000
agent-browser screenshot baseline.png
agent-browser snapshot -i
agent-browser click @e5                    # 테스트 대상 버튼
agent-browser wait --text "완료"
agent-browser screenshot result.png
agent-browser network requests --filter api
agent-browser console
agent-browser diff snapshot
```
