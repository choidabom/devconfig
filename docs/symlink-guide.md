# sync.sh - 설정 파일 동기화 스크립트

## 개요

`install.sh`는 **최초 설치**용이고, `sync.sh`는 **레포 수정 후 로컬에 반영**하기 위한 스크립트입니다.

```
install.sh  →  새 환경에서 도구 설치 + 설정 복사 (1회)
sync.sh     →  레포 수정 후 로컬 설정 업데이트 (필요할 때마다)
```

## 동기화 대상

| 도구 | 레포 경로 | 로컬 경로 |
|------|-----------|-----------|
| Hammerspoon | `hammerspoon/` | `~/.hammerspoon/` |
| Pet | `pet/snippet.toml` | `~/.config/pet/snippet.toml` |

## sync.sh 사용법

```bash
# 레포 디렉토리에서 실행
~/devconfig/sync.sh

# 또는 pet에서 검색
pet search  # "devconfig sync" 검색
```

## 스크립트 동작

1. 레포의 설정 파일을 로컬 설정 경로로 복사
2. 변경된 파일만 복사 (rsync 사용)
3. 결과 출력
