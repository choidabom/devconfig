# Zsh 모듈

모듈화된 Zsh 설정 파일 모음입니다. 각 `.zsh` 파일은 특정 기능별로 분리되어 있으며, `.zshrc`에서 자동으로 로드됩니다.

## 작동 방식

### 1. `.zshrc`와의 관계

- **`~/.zshrc`**: Zsh 셸이 시작될 때 자동으로 실행되는 메인 설정 파일
- **`~/devconfig/zsh/*.zsh`**: 재사용 가능한 모듈화된 설정 파일들

[install.sh](../install.sh)를 실행하면 `~/.zshrc`에 다음 코드가 추가됩니다:

```bash
# Load devconfig zsh modules
for config_file in ~/devconfig/zsh/*.zsh; do
    source $config_file
done
```

이렇게 하면 터미널 시작 시 `zsh/` 폴더의 모든 `.zsh` 파일이 자동으로 로드됩니다.

### 2. 장점

- **모듈화**: 설정을 기능별로 분리하여 관리가 쉬움
- **재사용**: Git으로 관리하여 여러 머신에서 동일한 설정 사용
- **깔끔함**: `.zshrc`를 간결하게 유지

## 모듈 설명

### [aliases.zsh](aliases.zsh)

명령어 별칭(alias) 정의

- `ls` → `eza -F` (eza 설치 시)
- `gr` → 통합 검색 (ripgrep + fzf + vim)
- `calc` → 계산기
- `uuid` → UUID 생성
- `ecurl` → URL 성능 측정
- `stern` → Kubernetes 로그 (stern 설치 시)
- `history` → 타임스탬프 포함 히스토리
- `c` → z (디렉토리 점프, Oh-My-Zsh 설치 시)

### [functions.zsh](functions.zsh)

유틸리티 함수 정의

- `_greps`: ripgrep + fzf + vim 통합 검색
- `_calc`: 계산기 (bc 사용)
- `_uuid`: 소문자 UUID 생성
- `_ecurl`: curl 성능 측정 (3회 실행)
- `_stern`: Kubernetes 로그 (healthCheck 제외)

### [history.zsh](history.zsh)

히스토리 설정

- **100,000개** 명령어 저장
- 중복 제거 (`hist_ignore_all_dups`)
- 타임스탬프 저장 (`extended_history`)
- 공백으로 시작하는 명령어는 저장 안함 (`hist_ignore_space`)

### [keybindings.zsh](keybindings.zsh)

키보드 단축키 설정 (Oh-My-Zsh 필요)

| 키 | 기능 |
|----|------|
| `↑` / `↓` | 명령어 기록 검색 (prefix matching) |
| `Alt+k` / `Alt+j` | 명령어 기록 검색 (vim-style) |
| `Alt+Enter` | Autosuggestion 수락 |

### [path.zsh](path.zsh)

PATH 환경변수 설정

- `~/devconfig/bin`을 PATH에 추가
- `rundevel` 등의 스크립트를 전역에서 실행 가능

### [pet.zsh](pet.zsh)

Pet 스니펫 매니저 키바인딩

| 키 | 기능 |
|----|------|
| `Ctrl+s` | Pet 스니펫 검색 |

### [tmux.zsh](tmux.zsh)

Tmux 창 제목 자동 업데이트

- **precmd**: 명령어 실행 전 → 현재 디렉토리명 표시
- **preexec**: 명령어 실행 중 → 실행 중인 명령어 표시

예시:
```
devconfig/           # 명령어 대기 중
vim README.md        # vim 실행 중
```

## 새 모듈 추가 방법

1. `~/devconfig/zsh/` 폴더에 새 `.zsh` 파일 생성
2. 설정 내용 작성
3. 터미널 재시작 또는 `source ~/.zshrc` 실행

**예시**: `~/devconfig/zsh/docker.zsh`
```bash
# Docker aliases
alias dps='docker ps'
alias dpa='docker ps -a'
alias di='docker images'
```

파일을 생성하면 자동으로 로드됩니다!

## 모듈 비활성화

특정 모듈을 비활성화하려면:

1. 파일 확장자를 변경: `aliases.zsh` → `aliases.zsh.disabled`
2. 터미널 재시작

## 참고

- 모든 모듈은 독립적으로 작동하도록 설계됨
- Oh-My-Zsh 플러그인과 함께 사용 가능
- 순서에 민감한 경우 파일명 앞에 숫자 추가 (예: `01-path.zsh`)
