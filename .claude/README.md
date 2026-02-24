# .claude/ - Claude Code 설정

[msbaek/dotfiles](https://github.com/msbaek/dotfiles)에서 가져온 Claude Code 전역 설정.
Stow로 `~/.claude/`에 심링크되어 적용된다.

## 구조

```
.claude/
├── settings.json              전역 설정 (환경변수, 권한, hooks, 플러그인)
├── settings.local.json        프로젝트별 권한 (자동 생성)
├── keybindings.json           키바인딩
├── commands/                  슬래시 커맨드 (/명령어)
│   ├── augmented/               프롬프트 기법 커맨드
│   ├── obsidian/                Obsidian 작업 커맨드
│   └── tdp/                     TDP(테스트 주도 개발) 커맨드
├── agents/                    전문가 에이전트
│   └── obsidian-ops-team/       Obsidian 운영 팀 에이전트
├── skills/                    자동 적용 스킬 (키워드 매칭)
├── hooks/                     훅 스크립트
│   └── UserPromptSubmit/        프롬프트 제출 시 실행
└── claude-docs/               참고 문서
```

## settings.json

| 항목 | 설명 |
|------|------|
| `env` | LSP 활성화, thinking 토큰 16000, 출력 토큰 16384, agent teams 등 |
| `permissions` | git, gh, npm, node, ls, pwd, markitdown 등 자동 허용 |
| `hooks.PreToolUse` | 도구 실행 시 macOS 알림 (terminal-notifier) + bash 명령어 로깅 |
| `hooks.Stop` | Claude 응답 완료 시 macOS 알림 |
| `hooks.UserPromptSubmit` | 프롬프트 끝에 `-u` 붙이면 ultrathink 모드 |
| `spinnerVerbs` | 한국어 스피너 ("생각하는 중", "분석하는 중" 등) |
| `enabledPlugins` | code-review, github, playwright, serena 등 공식 플러그인 |

### 의존성

- `terminal-notifier` - hooks 알림 (`brew install terminal-notifier`)
- `jq` - bash 명령어 로깅 (`brew install jq`)

## keybindings.json

| 키 | 기능 | 컨텍스트 |
|----|------|----------|
| `meta+o` | Fast mode 토글 | Chat |
| `meta+t` | Thinking 토글 | Chat |
| `meta+p` | Model picker | Chat |
| `ctrl+q` | Snippet picker | Chat |
| `ctrl+s` | Stash | Chat |
| `ctrl+g` | External editor | Chat |
| `ctrl+t` | Todos 토글 | Global |
| `ctrl+o` | Transcript 토글 | Global |
| `j` / `k` | vi 스타일 네비게이션 | Settings, Confirmation, Select |

## commands/ - 슬래시 커맨드

### 범용

| 커맨드 | 파일 | 용도 |
|--------|------|------|
| `/commit` | `commit.md` | 변경사항 분석 → 자동 커밋 (한글 깨짐 방지: 임시파일 방식) |
| `/project-overview` | `project-overview.md` | 프로젝트 온보딩 분석 (구조, 기술스택, 아키텍처) |
| `/check-security` | `check-security.md` | OWASP 기반 보안 취약점 검사 |
| `/conventional-review` | `conventional-review.md` | 코드리뷰 코멘트 → Conventional Comments 형식 변환 |
| `/my-developer` | `my-developer.md` | 코드리뷰 피드백 요청 |
| `/update-claude-md` | `update-claude-md.md` | 현재 세션 분석 → CLAUDE.md 개선안 제안 |
| `/wrap-up` | `wrap-up.md` | 세션 작업 내역 정리 → cc-logs 저장 |
| `/markitdown-convert` | `markitdown-convert.md` | MS MarkItDown으로 파일 → 마크다운 변환 |
| `/askUserQuestion` | `askUserQuestion.md` | 모호한 요청 시 대화형 질문으로 요구사항 명확화 |

### msbaek 특화

| 커맨드 | 파일 | 용도 |
|--------|------|------|
| `/coffee-time` | `coffee-time.md` | 팀 커피타임 대화 정리 → Git 저장 |
| `/meeting-minutes` | `meeting-minutes.md` | 회의 녹취록 → 체계적 회의록 생성 |

### augmented/ - 프롬프트 기법

| 커맨드 | 용도 |
|--------|------|
| `cast-wide` | 넓은 범위 탐색 |
| `happy-to-delete` | 삭제 후보 식별 |
| `mind-dump` | 자유로운 아이디어 정리 |
| `parallel-impl` | 병렬 구현 |
| `refinement-loop` | 반복 개선 |
| `reverse-direction` | 역방향 접근 |
| `softest-prototype` | 최소 프로토타입 |

### obsidian/ - Obsidian 작업

| 커맨드 | 용도 |
|--------|------|
| `add-tag` | 노트에 태그 추가 |
| `add-tag-and-move-file` | 태그 추가 + 파일 이동 |
| `batch-process` | 일괄 처리 |
| `batch-summarize-urls` | URL 일괄 요약 |
| `create-presentation` | 프레젠테이션 생성 |
| `related-contents` | 관련 콘텐츠 탐색 |
| `summarize-article` | 기사 요약 |
| `summarize-youtube` | YouTube 요약 |
| `translate-article` | 기사 번역 |
| `translate-youtube` | YouTube 번역 |
| `vault-query` | Vault 검색 |
| `weekly-social-posts` | 주간 소셜 포스트 생성 |
| `tagging-example` | 태깅 예시 |

### tdp/ - 테스트 주도 개발

| 커맨드 | 용도 |
|--------|------|
| `add-test-for-boundary-values` | 경계값 테스트 추가 |
| `add-test-for-change-later` | 변경 예정 코드 테스트 |
| `add-test-for-misbehaves` | 오동작 테스트 추가 |
| `add-test-for-side-effects` | 부작용 테스트 추가 |

## agents/ - 전문가 에이전트

Task 도구에서 호출하는 AI 페르소나.

### 개발

| 에이전트 | 역할 |
|----------|------|
| `code-review-expert` | 코드 리뷰 전문가 |
| `code-refactorer` | 코드 리팩토링 실행 |
| `refactoring-expert` | 리팩토링 전문가 |
| `oop-expert` | 객체지향 설계 전문가 |
| `kent-beck-expert` | Kent Beck 스타일 TDD/설계 |
| `spring-expert` | Spring Framework 전문가 |
| `frontend-designer` | 프론트엔드 디자인 전문가 |
| `data-scientist` | 데이터 사이언스 전문가 |
| `vibe-coding-coach` | 바이브 코딩 코치 |

### 기획/문서

| 에이전트 | 역할 |
|----------|------|
| `prd-expert` | PRD 리뷰 |
| `prd-writer` | PRD 작성 |
| `project-task-planner` | 태스크 분해/계획 |
| `technical-researcher` | 기술 리서치 |
| `prompt-expert` | 프롬프트 엔지니어링 |

### 콘텐츠

| 에이전트 | 역할 |
|----------|------|
| `content-writer` | 콘텐츠 작성 |
| `content-translator` | 콘텐츠 번역 |
| `youtube-summarizer` | YouTube 영상 요약 |
| `youtube-obsidian-summarizer` | YouTube 요약 → Obsidian 노트 |
| `zettelkasten-expert` | 제텔카스텐 노트 정리 |

### 팀 에이전트

| 에이전트 | 역할 |
|----------|------|
| `obsidian-ops-team/connection-agent` | 노트 연결 관계 분석 |
| `obsidian-ops-team/metadata-agent` | 메타데이터 관리 |
| `obsidian-ops-team/moc-agent` | MOC(Map of Content) 생성 |
| `obsidian-ops-team/review-agent` | 노트 리뷰 |
| `obsidian-ops-team/tag-agent` | 태그 관리 |

## skills/ - 자동 적용 스킬

키워드 매칭으로 자동 로드되는 도메인별 가이드/자동화.

### 워크플로우 자동화

| 스킬 | 용도 | 트리거 키워드 |
|------|------|--------------|
| `daily-work-logger` | 일일 작업 내역 → Daily Note 자동 반영 | "작업 정리", "daily log" |
| `weekly-claude-analytics` | 주간 Claude 사용 통계 리포트 | "주간 분석", "weekly analytics" |
| `learning-tracker` | 학습 내용 추출/분류 | "학습", "배운 것" |
| `project-time-tracker` | 프로젝트별 시간 추적 | "시간 추적" |
| `usage-pattern-analyzer` | 도구 사용 패턴 분석 | "사용 패턴" |

### 도구 가이드

| 스킬 | 용도 |
|------|------|
| `obsidian-vault` | Obsidian vault 경로, 태그 체계, 검색 가이드 |
| `gh` | GitHub CLI 작업 가이드 |
| `jira` | Jira 연동 가이드 |
| `vis` | vault-intelligence 검색 도구 가이드 |

### 콘텐츠/개발

| 스킬 | 용도 |
|------|------|
| `react-best-practices` | React 모범 사례 |
| `prompt-contracts` | 프롬프트 계약 패턴 |
| `pdf-processing-pro` | PDF 처리 |
| `skill-creator` | 새 스킬 생성 도우미 |
| `backlog-md` | 백로그 관리 |
| `brunch-writer` | 브런치 글 작성 |
| `weekly-newsletter` | 주간 뉴스레터 생성 |
| `databricks-academy` | Databricks 학습 (msbaek 특화) |

## hooks/ - 훅 스크립트

| 파일 | 용도 |
|------|------|
| `UserPromptSubmit/append_ultrathink.py` | 프롬프트 끝 `-u` → ultrathink 모드 추가 |
| `check-env-files.sh` | .env 파일 커밋 방지 |
| `check-hardcoded-paths.sh` | 하드코딩된 경로 감지 |
| `check-sensitive-files.sh` | 민감 파일 감지 |
| `update-brewfile.sh` | Brewfile 자동 업데이트 |
| `watch-notify.sh` | 파일 변경 감시 알림 |

## claude-docs/ - 참고 문서

| 파일 | 내용 |
|------|------|
| `snippets.md` | 자주 쓰는 코드 스니펫 모음 |

## 커스터마이징 참고

msbaek 환경에 특화된 항목들 (본인 환경에 맞게 수정 필요):

- `settings.json` 내 경로 및 MCP 서버 설정
- `commands/coffee-time.md` - Git 저장소 경로 (`~/git/kt4u/coffee-time/`)
- `commands/meeting-minutes.md` - vault 경로 (`~/DocumentsLocal/msbaek_vault/`)
- `skills/obsidian-vault/` - vault 경로
- `skills/daily-work-logger/` - vault 경로, Things MCP 설정
- `skills/weekly-claude-analytics/` - 세션 로그 경로
- `skills/databricks-academy/` - Databricks 특화
