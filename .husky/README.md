<!-- @format -->

_들어가면서) 오픈소스에 처음 기여를 하면서 pr을 올렸는데 ci가 통과하지 못해 fail이 떠버렸다. 무슨 실수라도 한거 아닌가 하여 떨리는 마음으로 확인해보니 lint와 format을 적용하지 않고 올려서 문제가 되었다.
나중에 다른 pr도 확인해보니 다들 npm run format을 한 번씩 다시 한게 보여 commit 혹은 push 실행 전에 lint와 format을 자동으로 적용하도록 husky를 적용해야겠다고 생각했다. 그 과정에서 알게 된 것을 정리하였다._

## git hooks과 husky

### git hooks 란?

git hooks는 git에서 발생하는 특정 이벤트(ex.commit, push)에 자동으로 실행되는 스크립트이다. git hooks를 사용하면 특정 이벤트가 발생할 때 자동으로 사용자가 지정한 스크립트를 실행할 수 있다.

### git hooks 위치는?

git hooks는 기본적으로 프로젝트의 `.git/hooks` 디렉토리에 위치한다. **중요한 점은 git은 프로젝트 루트의 `.git` 디렉토리를 기준으로 동작한다는 것이다.**

### husky 란?

[husky](https://typicode.github.io/husky/)는 git hooks 관리를 간소화하는 도구이다.

**husky를 사용하면 개발자가 `.git/hooks`에서 스크립트를 직접 편집하는 것이 아니라 `npm install` 과정에서 사전에 세팅해둔 git hooks를 모두 적용시킬 수 있다.**

따라서 각 개발자의 환경을 개별적으로 구성하는 수고 없이 팀 전체가 동일한 hooks를 일관되게 사용할 수 있다.

# husky 적용하기

## 하나의 레포에 frontend와 backend 코드가 함께 있는 경우

### 1. husky 적용하며 만난 시행착오 (부제: husky 설치 위치의 중요성을 알게 되다.)

1. `시행착오 1`: frontend 폴더와 backend 폴더 내 각각의 .husky 폴더를 만들었지만 husky가 작동하지 않는 문제

   - 문제: frontend와 backend 내 package.json husky 설정
     ```
     {
         "scripts": {
             "prepare": "husky .husky"
         }
     }
     ```
   - 원인: 위에서의 설정(`"prepare": "husky .husky"`)은 frontend나 backend와 같은 하위 디렉터리 내의 `.husky` 폴더를 참조하므로, git이 이를 인식하지 못해 hooks가 작동하지 않는다. 이는 git이 해당 디렉터리들을 독립된 프로젝트로 인식하지 않고, 단순히 하나의 루트 프로젝트로 인식하기 때문이다.

   - 해결: husky가 프로젝트 루트에 설치되어야 git이 hooks를 올바르게 인식할 수 있다.
     ```
     {
        "scripts": {
            // 프로젝트 루트로 이동 후, husky를 설치함으로써 git이 husky가 생성한 hooks를 제대로 인식한다.
             "prepare": "cd .. && husky .husky"
        },
     }
     ```

2. `시행착오 2`: frontend 폴더와 backend 폴더 내 .husky hooks의 내용이 동일하다.

   - 문제: frontend와 backend 내 .husky 폴더 내 hooks 내용 동일
   - 해결: `.husky` 디렉토리가 프로젝트 루트에 생성되도록 수정!
   - 여러 하위 프로젝트가 있는 모노레포에서도 husky는 프로젝트 루트에 한 번만 설치하는 것이 효율적이다.
   - 프로젝트 루트에 설치함으로써 모든 하위 프로젝트에 동일한 hooks를 적용할 수 있다.

3. `시행착오 3`: (어쩌면 당연한 것이지만) lint-staged는 pre-push의 경우 적용할 수 없다.
   - 문제: pre-commit과 동일한 검사를 위해 `npx lint-staged`를 적용한 것
   - 원인: [lint-staged](https://github.com/lint-staged/lint-staged)는 현재 git에서 staged 상태인 파일들에서만 작동한다. pre-push 훅은 커밋이 완료된 후 푸시 전에 실행되므로, 이 시점에서는 파일들이 커밋된 상태로 스테이징 영역에 남아있는 것은 없다.

### 2. husky 적용 과정

이 구조는 frontend와 backend가 별도의 package.json을 가지고 있지만, husky는 프로젝트 전체에 대해 한 번만 설정하고자 할 때 유용하다.

```
├── .github                # GitHub 관련 설정 및 워크플로우
├── .husky                 # Husky 설정 및 hooks 스크립트
├── frontend               # frontend 소스 코드
│   └── package.json       # frontend package.json
├── backend                # backend 소스 코드
│   └── package.json       # backend package.json
└── README.md
```

1. 프론트엔드와 백엔드 내 각각 Husky 설치

   ```
   $ npm install --save-dev husky
   ```

2. 프로젝트의 루트에 .husky를 생성할 것이므로, 각각의 package.json 내 prepare 명령어 수정

   ```
   {
        "scripts": {
            // 프로젝트 루트로 이동 후, husky를 설치함으로써 git이 husky가 생성한 hooks를 제대로 인식한다.
            "prepare": "cd .. && husky .husky"
            "lint":   // 기호에 따라..
            "format": // 기호에 따라 ..
            ...
        },
        "lint-staged": {
            "*.{ts,tsx}": [
                "npm run lint",
                "npm run format"
            ]
        },
   }
   ```

3. 프로젝트의 루트에 `.husky` 폴더 생성 및 `.husky` 폴더 내 hooks 추가

- pre-commit 스크립트의 동작 과정

  - 스테이징된 파일 중 프론트엔드 또는 백엔드 디렉토리에 변경 사항이 있으면 해당 디렉토리로 이동해 lint와 format이 수행된다.
  - lint 또는 format 실패하면 커밋이 중단된다.
  - https://github.com/choidabom/dev-config/blob/main/.husky/pre-commit

    ```vim
    CHANGED_FILES=$(git diff --cached --name-only)

    LINT_FRONTEND=false
    LINT_BACKEND=false

    for FILE in $CHANGED_FILES; do
    if [[ "$FILE" =~ ^frontend/ ]]; then
        LINT_FRONTEND=true
    elif [[ "$FILE" =~ ^backend/ ]]; then
        LINT_BACKEND=true
    fi
    done

    if [ "$LINT_FRONTEND" = true ]; then
    echo "Changes detected in the frontend. Linting & Formatting frontend..."
    cd frontend
    npx lint-staged
    if [ $? -ne 0 ]; then
        echo "Frontend Linting & Formatting failed. Commit aborted."
        exit 1
    fi
    cd ..
    fi

    if [ "$LINT_BACKEND" = true ]; then
    echo "Changes detected in the backend. Linting & Formatting backend..."
    cd backend
    npx lint-staged
    if [ $? -ne 0 ]; then
        echo "Backend Linting & Formatting failed. Commit aborted."
        exit 1
    fi
    cd ..
    fi
    ```

---

\*해당 pre-commit이 적용된 코드: https://github.com/yorkie-team/codepair/pull/281
