# Pet - CLI 스니펫 관리 도구

Pet은 터미널 명령어(스니펫)를 관리하고, 빠르게 검색하고 복사할 수 있는 CLI 기반 스니펫 매니저이다.  

https://github.com/knqyf263/pet

## 설치

- brew를 사용하여 설치할 수 있다.
  ```bash
  brew install knqyf263/pet/pet
  ```

- 또는 GitHub Releases에서 바이너리를 직접 다운로드할 수 있다.
  - https://github.com/knqyf263/pet/releases

## 기본 설정

설치 후 최초 실행 시, 기본 설정 파일이 생성된다.

- 설정 파일 위치: `~/.config/pet/config.toml`
- 스니펫 저장 파일 위치: `~/.config/pet/snippet.toml`

스니펫은 `snippet.toml` 파일에 `[snippets]` 형식으로 추가하면 된다.

예시:

```toml
[[snippets]]
  description = "[build] pnpm build"
  command = "pnpm --filter=@example/web build"
  output = ""

[[snippets]]
  description = "[git] master sync"
  command = "git checkout master && git pull --prune && git branch -D "
  output = ""
```

## 사용법

### 스니펫 추가

터미널에서 명령어를 입력 후, 바로 저장할 수 있다.

```bash
pet new
```

또는 기존에 작성한 `snippet.toml` 파일을 직접 수정하여 추가할 수 있다.

### 스니펫 검색 및 복사

```bash
pet search
```
- 저장된 스니펫을 검색하여 선택하면, 명령어가 클립보드에 복사된다.
- `fzf`와 연동하여 더욱 빠르게 검색할 수 있다.

### 스니펫 편집

```bash
pet edit
```
- snippet.toml 파일을 열어 수동으로 스니펫을 편집할 수 있다.

## 팁

- `fzf`를 설치하면 `pet search` 검색 속도가 매우 빨라진다.
- 명령어에 설명(`description`)을 잘 작성해두면 찾기가 수월하다.
- 프로젝트별로 스니펫 파일을 구분 관리하면 더욱 체계적으로 사용할 수 있다.
