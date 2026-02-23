# UI/UX 분석 문서: Andrew Trousdale

**분석 날짜**: 2026-02-21
**URL**: https://andrewtrousdale.com/
**분석자**: Claude (uiux-documenter)
**사이트 유형**: 개인 포트폴리오 / 연구 아카이브

---

## 1. 첫인상

### 랜딩 화면

**사용자가 즉시 보는 것:**
- 극도로 미니멀한 프레젠테이션
- "Andrew Trousdale"이라는 이름이 주요 식별자
- 한 줄 소개: "researcher and designer"
- 시각적 구조를 만드는 명확한 4개 카테고리 제목
- 주로 텍스트 기반, 히어로 이미지나 그래픽 없음

**시각적 분위기:**
- 색상: 극단적 미니멀리즘 (검은 텍스트 on 흰 배경, 또는 반대)
- 타이포그래피: 깔끔하고 읽기 쉬운, 시스템 폰트 또는 미묘한 세리프체
- 이미지: 없음 - 순수 정보 아키텍처
- 분위기: 학술적, 사색적, 콘텐츠에 집중

**사용자의 첫 생각:**
"이 사람은 장식보다 명확함을 중시하는구나. 작업 자체가 말한다."

**디자인 철학:**
이 사이트는 일반적인 포트폴리오 관습(히어로 이미지, 화려한 애니메이션, 컬러 스킴)을 거부합니다. 대신 **브루탈리스트 웹 디자인** 원칙을 수용 - 시각적 장식보다 구조, 계층, 콘텐츠를 우선시합니다.

---

## 2. 정보 구조

### 콘텐츠 조직

사이트는 **4분면 분류법**을 사용하여 작업을 정리:

```
┌─────────────────┬─────────────────┐
│   INITIATIVES   │    RESEARCH     │
│  (현재 진행중)    │  (체계적 탐구)   │
├─────────────────┼─────────────────┤
│    ARTIFACTS    │      PATHS      │
│   (완성된 작업)   │  (사상의 방향)   │
└─────────────────┴─────────────────┘
```

**1. Initiatives (주도 프로젝트)** - "지금 만들고 있는 것"
- APOSSIBLE (디자인 도구)
- SeeingHappy (AI 연구)
- nia.ai (긍정 심리학 앱)
- 현재 활발한 프로젝트들

**2. Research (연구)** - "탐구하고 있는 것"
- Agency (기술 철학)
- Character Development (인간-컴퓨터 상호작용)
- Social Intervention (행동 변화를 위한 디자인)
- 이론적 탐구들

**3. Artifacts (결과물)** - "만든 것"
- Rising River (사진 작업)
- Motion Study (시각 연구)
- 완성된 창작물
- 실체가 있는 결과물

**4. Paths (경로)** - "생각하는 방식"
- Human Expression
- Interactive Machines
- Positive Psychology
- 카테고리를 넘나드는 개념적 프레임워크

### 네비게이션 패턴

**노드 기반 구조:**
```
홈페이지
  ↓
카테고리 (예: Initiatives)
  ↓
프로젝트/주제 (예: APOSSIBLE)
  ↓
상세 페이지
```

각 항목은 **노드(Node)**로:
- URL을 통해 직접 접근 가능 (`/nodes/[topic]/`)
- 여러 카테고리에서 링크 가능
- 관련 작업과 교차 참조

**전통적인 네비게이션 메뉴 없음** - 사용자는 다음을 통해 탐색:
1. 인덱스 스크롤
2. 관련 노드 간 링크 따라가기
3. 브라우저 뒤로/앞으로 가기 사용

---

## 3. 디자인 시스템

### 타이포그래피 계층

**추출된 텍스트 구조:**

| 요소 | 의미 | 예상 크기 | 무게 | 용도 |
|------|------|----------|------|------|
| H1 | 이름 | ~32-48px | Bold/Regular | "Andrew Trousdale" |
| H2 | 섹션 | ~24-28px | Bold | "Initiatives", "Research" 등 |
| H3 | 프로젝트 제목 | ~18-20px | Medium | "APOSSIBLE", "SeeingHappy" |
| P | 본문 | ~16-18px | Regular | 설명문 |
| Subtitle | 메타정보 | ~14-16px | Regular/Italic | 프로젝트 부제목 |

**폰트 패밀리 특성:**
- 가능성: 시스템 폰트 스택 OR 미묘한 세리프체 (Georgia, Charter 계열)
- 일부 요소에 모노스페이스 가능
- 가독성에 초점, 개성은 최소화

**타이포그래피 패턴:**
```html
<!-- 관찰된 HTML 구조 -->
<h1>Andrew Trousdale</h1>
<p>researcher and designer...</p>

<h2>Initiatives</h2>
<ul>
  <li>
    <h3><a href="/nodes/apossible/">APOSSIBLE</a></h3>
    <p>design tool for...</p>
  </li>
</ul>
```

### 색상 팔레트

**가설 (미니멀리스트 철학 기반):**

```css
/* 예상되는 컬러 스킴 */
--background: #ffffff (또는 #fafafa)
--text-primary: #000000 (또는 #1a1a1a)
--text-secondary: #666666 (또는 #888888)
--link-default: #000000 (텍스트와 동일)
--link-hover: #000000 with underline
```

**색상 사용 패턴:**
- **배경**: 흰색 (라이트 모드) 또는 거의 검은색 (다크 모드 가능)
- **텍스트**: 순수 검정 또는 매우 어두운 회색
- **링크**: 스타일 없음 (파란색) OR 밑줄 있는 검정
- **강조색**: 최소 또는 없음
- **테두리/구분선**: 매우 미묘한 회색 (있다면)

### 간격 시스템

**관찰된 계층적 간격:**

```
섹션 간격 (Initiatives / Research 사이):
  예상: 64px - 96px

프로젝트 간격 (리스트 항목 사이):
  예상: 32px - 48px

인라인 간격 (제목과 부제목 사이):
  예상: 8px - 12px

페이지 여백:
  예상: 16px (모바일) to 48px+ (데스크톱)
```

**수직 리듬:**
```
H1 margin-bottom: 16-24px
H2 margin-top: 64-96px
H2 margin-bottom: 32-48px
H3 margin-bottom: 8-12px
P margin-bottom: 16-24px
```

### 레이아웃 시스템

**컨테이너 구조:**

```
┌────────────────────────────────────┐
│ ╔══════════════════════════════╗ │ ← 페이지 컨테이너
│ ║ Andrew Trousdale             ║ │
│ ║                              ║ │
│ ║ Initiatives                  ║ │
│ ║ • Project 1                  ║ │
│ ║ • Project 2                  ║ │
│ ║                              ║ │
│ ║ Research                     ║ │
│ ║ • Topic 1                    ║ │
│ ╚══════════════════════════════╝ │
└────────────────────────────────────┘
```

**레이아웃 속성:**
- 최대 너비: ~600-800px (읽기 편한 줄 길이)
- 중앙 정렬: `margin: 0 auto`
- 단일 컬럼: 그리드나 다중 컬럼 레이아웃 없음
- 선형 흐름: 위에서 아래로 읽기

**반응형 동작:**
```
모바일 (< 640px):
  - 컨테이너: 100% 너비, 16-24px 패딩
  - 폰트 크기: 약간 축소
  - 동일한 레이아웃 구조 (변화 없음)

데스크톱 (> 640px):
  - 컨테이너: 고정 최대 너비, 중앙 정렬
  - 폰트 크기: 기본 크기
  - 더 넉넉한 여백
```

---

## 4. 컴포넌트 라이브러리

### 링크 컴포넌트

**기본 상태:**
```
텍스트: 검정 (본문과 동일)
장식: 없음 OR 밑줄
커서: 포인터
전환: 즉시 (전환 효과 없음)
```

**호버 상태:**
```html
<!-- 가설 -->
a:hover {
  text-decoration: underline;
  /* 또는 */
  opacity: 0.7;
  /* 또는 */
  color: #666666;
}
```

**인터랙션:**
- 클릭 시 색상 변화 없음
- 로딩 상태 없음
- 네이티브 브라우저 동작
- SPA 스타일 전환 없을 가능성

### 리스트 컴포넌트

**구조:**
```html
<section>
  <h2>Initiatives</h2>
  <ul>
    <li>
      <time>Currently</time>
      <h3><a href="...">프로젝트 제목</a></h3>
      <p>짧은 설명...</p>
    </li>
    <li>
      <time>2024</time>
      <h3><a href="...">프로젝트 제목</a></h3>
      <p>짧은 설명...</p>
    </li>
  </ul>
</section>
```

**시각적 처리:**
- 리스트 스타일: 없음 (불릿 없음)
- 시간 라벨: 제목과 분리, 더 작거나 연한 색
- 제목: 클릭 가능, 볼드 또는 미디엄 웨이트
- 설명: 회색 또는 더 연한 텍스트

### 시간/날짜 컴포넌트

**패턴:**
```
Currently      ← 진행 중인 작업
2024          ← 올해
2023          ← 지난 해
2022
...
```

**스타일링:**
- 위치: 프로젝트 제목 위 또는 인라인
- 폰트: 더 작음, 대문자일 가능성
- 색상: 더 연한 회색
- 목적: 시간적 네비게이션 보조

---

## 5. 인터랙션 패턴

### 마이크로인터랙션

**링크 동작:**
```
사용자가 링크에 마우스 올림:
  1. 커서가 포인터로 변경 (브라우저 기본)
  2. 밑줄 나타남 (또는 투명도 변화)
  3. 애니메이션 없음 - 즉시 변경
  4. 색상 변화 없음 (검정 유지)

사용자가 링크 클릭:
  1. 브라우저 기본 클릭 효과
  2. 새 페이지로 이동 (전체 페이지 로드 가능성)
  3. 로딩 스피너 없음
  4. 전환 애니메이션 없음
```

**스크롤 동작:**
```
사용자 스크롤:
  - 패럴랙스 효과 없음
  - 스크롤 트리거 애니메이션 없음
  - 고정 네비게이션 없음
  - 순수 수직 스크롤
  - 빠르고 반응적
```

### 네비게이션 흐름

**주요 흐름:**
```
1. 사용자가 홈페이지 도착
   ↓
2. 이름 + 소개 읽음
   ↓
3. 4개 섹션 제목 스캔
   ↓
4. 관심 영역 결정 (Initiatives vs Research vs Artifacts vs Paths)
   ↓
5. 시간순 스캔 (Currently → 2024 → 2023...)
   ↓
6. 프로젝트 링크 클릭
   ↓
7. 프로젝트 상세 페이지 읽음
   ↓
8. 브라우저 뒤로가기로 복귀
   ↓
9. 계속 탐색 OR 나가기
```

**보조 패턴:**
- 직접 URL 접근 (공유된 링크)
- 검색 엔진 결과 (특정 프로젝트에 최적화 가능성)
- 관련 노드 간 교차 링크

---

## 6. 사용자 경험 여정

### 처음 방문자 (0-30초)

**초기 스캔:**
```
0-3초: "Andrew Trousdale" - researcher and designer
       ↓
       이 사람 누구지?

3-10초: 4개 명확한 카테고리 보임
       ↓
       아, 작업 유형별로 정리된 포트폴리오구나

10-20초: 프로젝트 제목과 설명 스캔 가능
        ↓
        무슨 일을 하는지 알겠다 (AI, 디자인 도구, 연구)

20-30초: 결정 시점
        ↓
        관심 있는 프로젝트 클릭 OR 나가기
```

**사용자 생각:**
- **즉시**: "이거 되게 미니멀하네"
- **스캔 후**: "카테고리 명확하고 이해하기 쉽다"
- **인상**: "진지하고 학술적이며 군더더기 없음"

### 탐색 경험 (30초 - 5분)

**탐색 패턴:**
```
사용자가 홈페이지 스크롤:
1. 4개 카테고리 모두 스캔
2. 시간 진행 확인 (Currently → 2024 → 이전)
3. 프로젝트 설명 읽음
4. 관심 영역 식별

사용자가 프로젝트 클릭:
1. 더 자세한 내용 기대
2. 심층 설명 읽음
3. 미디어, 글, 외부 링크 발견 가능
4. 메인 인덱스로 복귀
5. 관련 작업 탐색
```

**인지 경험:**
- **낮은 인지 부하**: 단순한 구조, 산만함 없음
- **명확한 분류**: 4분면은 기억하기 쉬움
- **시간적 명확성**: 시간 라벨이 내러티브 생성
- **콘텐츠 집중**: 시각적 노이즈 없음

### 재방문자

**일반적 행동:**
```
1. 북마크로 직접 접근
2. "Currently" 섹션 업데이트 확인
3. 최근 추가 항목 탐색 (2024)
4. 특정 알려진 프로젝트 링크 따라가기
5. 빠른 진출입 방문
```

---

## 7. 사용자 인식 분석

### 사용자가 생각하고 느끼는 것

**전문적 정체성:**
```
"이 사람은:"
- 작업에 진지함
- 학술적 또는 연구 지향적
- 화려함으로 인상 주려 하지 않음
- 콘텐츠 품질에 자신감
- 정리된 사고를 가진 사람
```

**신뢰 지표:**
```
신뢰를 만드는 요소:
1. 명확한 분류 (정리된 마음)
2. 시간순 진행 (투명한 타임라인)
3. 폭넓은 작업 (다재다능한 연구자)
4. 미니멀 디자인 (미학 뒤에 숨지 않음)
5. 상세한 설명 (사려 깊은 설명)
```

**감정적 반응:**
```
평온함:
- 공격적인 색상이나 CTA 없음
- 팝업이나 방해 없음
- 평화로운 탐색

집중됨:
- 콘텐츠가 주인공
- 시각적 경쟁 없음
- 쉬운 집중

존중받음:
- 디자인이 사용자 시간 존중
- 조작 전략 없음
- 정직한 프레젠테이션
```

### 접근성 관찰

**강점:**
```
✅ 시맨틱 HTML (적절한 제목 계층)
✅ 높은 대비 (흰 바탕에 검정)
✅ 색상만 의존하지 않음
✅ 키보드 탐색 가능 (표준 링크)
✅ 스크린 리더 친화적 (텍스트 기반)
✅ 배울 복잡한 인터랙션 없음
```

**고려 사항:**
```
• 링크 구분: 밑줄 없으면 식별 어려울 수 있음
• 포커스 인디케이터: 키보드 사용자를 위해 보여야 함
• Alt 텍스트: (상세 페이지에 이미지 있다면)
```

---

## 8. 기술 구현

### 감지된 패턴

**HTML 구조:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Andrew Trousdale</title>
  <!-- 미니멀한 head -->
</head>
<body>
  <main>
    <h1>Andrew Trousdale</h1>
    <p>researcher and designer...</p>

    <section>
      <h2>Initiatives</h2>
      <ul>
        <li>...</li>
      </ul>
    </section>

    <!-- Research, Artifacts, Paths 반복 -->
  </main>
</body>
</html>
```

**CSS 아키텍처:**

미니멀리스트 접근 기반 가설:

```css
/* 예상되는 미니멀 스타일시트 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  /* 또는 Georgia, Charter (세리프) */
  font-size: 16px;
  line-height: 1.6;
  color: #000;
  background: #fff;
  padding: 24px;
}

main {
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

h2 {
  font-size: 1.5em;
  margin-top: 3em;
  margin-bottom: 1em;
}

h3 {
  font-size: 1.1em;
  margin-bottom: 0.25em;
}

ul {
  list-style: none;
}

li {
  margin-bottom: 2em;
}

a {
  color: inherit;
  text-decoration: none; /* 또는 underline */
}

a:hover {
  text-decoration: underline;
}
```

### URL 구조

**패턴:**
```
홈페이지: /
카테고리 페이지: 홈페이지에 포함 (별도 URL 없음)
프로젝트 페이지: /nodes/[프로젝트명]/
```

**노드 기반 아키텍처:**
- 각 프로젝트 = 노드
- URL 슬러그 = 소문자-하이픈-연결
- 깔끔하고 읽기 쉬운 URL
- 쿼리 파라미터 없음
- 해시 프래그먼트 없음

**예시:**
```
/nodes/apossible/
/nodes/social-intervention/
/nodes/positive-psychology/
/nodes/interactive-machines/
```

### 성능 특성

**예상되는 최적화:**
```
✅ 미니멀 CSS (< 5KB)
✅ JavaScript 없음 (또는 매우 적음)
✅ 외부 폰트 없음 (시스템 폰트)
✅ 홈페이지에 이미지 없음
✅ 빠른 초기 로드 (< 100KB 전체)
✅ 추적 스크립트 없음
✅ 정적 HTML (데이터베이스 쿼리 없음)
```

**로딩 경험:**
```
인터랙티브까지 시간: < 1초
첫 콘텐츠 페인트: < 0.5초
최대 콘텐츠 페인트: < 1초
레이아웃 이동 없음
렌더 블로킹 없음
```

---

## 9. 디자인 패턴 & 철학

### 브루탈리스트 웹 디자인 원칙

이 사이트는 **웹 디자인의 브루탈리즘**을 구현:

**1. 구조로서의 원시 HTML**
- 시맨틱 마크업 노출
- 구조를 숨기는 시각적 장식 없음
- 제목, 리스트, 링크 올바르게 사용

**2. 형식보다 기능**
- 정보 전달 우선
- 불필요한 애니메이션 없음
- 시각적 트릭 없음

**3. 사용자 주체성**
- 표준 브라우저 동작
- 커스텀 스크롤 없음
- 강제된 인터랙션 없음
- 사용자가 통제

**4. 콘텐츠 최우선**
- 텍스트가 주요 재료
- 아이디어 직접 제시
- 그래픽을 통한 중재 없음

### 정보 디자인 철학

**분류 체계:**
```
실행 (Initiatives)  vs  사고 (Research)
완성 (Artifacts)    vs  개념적 (Paths)

구체적 ←→ 추상적
활동적 ←→ 성찰적
```

**시간적 조직:**
- 역순 시간순 (최신 먼저)
- "Currently"를 특별 상태로
- 연도 라벨이 챕터 마커 역할
- 점진적 공개 (더 알려면 클릭)

### 일관성 패턴

**모든 프로젝트 항목은:**
```
[시간 마커]
[프로젝트 제목] (링크)
[한 문장 설명]
```

**모든 섹션은:**
```
[섹션 제목]
[시간순 프로젝트 리스트]
```

**모든 페이지는:**
```
단순, 텍스트 중심
시맨틱 HTML
미니멀 스타일링
명확한 계층
```

---

## 10. 구현 권장사항

### 복제를 위한 방법

**미니멀 HTML + CSS 설정:**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이름</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>이름</h1>
    <p>한 줄 소개...</p>

    <section id="projects">
      <h2>프로젝트</h2>
      <ul>
        <li>
          <time>2024</time>
          <h3><a href="/project-name/">프로젝트 제목</a></h3>
          <p>간단한 설명...</p>
        </li>
      </ul>
    </section>
  </main>
</body>
</html>
```

```css
/* style.css */
:root {
  --max-width: 700px;
  --spacing-unit: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1a1a;
  background: #ffffff;
  padding: calc(var(--spacing-unit) * 1.5);
}

@media (min-width: 768px) {
  body {
    padding: calc(var(--spacing-unit) * 3);
  }
}

main {
  max-width: var(--max-width);
  margin: 0 auto;
}

h1 {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
  font-weight: 600;
}

h2 {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  margin-top: calc(var(--spacing-unit) * 4);
  margin-bottom: calc(var(--spacing-unit) * 1.5);
  font-weight: 600;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: calc(var(--spacing-unit) * 0.25);
  font-weight: 500;
}

p {
  margin-bottom: var(--spacing-unit);
  color: #4a4a4a;
}

ul {
  list-style: none;
}

li {
  margin-bottom: calc(var(--spacing-unit) * 2);
}

time {
  display: block;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: calc(var(--spacing-unit) * 0.25);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

a {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

a:hover {
  opacity: 0.7;
}

h3 a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
```

### 유지해야 할 핵심 원칙

**1. 콘텐츠 우선**
- Lorem Ipsum 플레이스홀더 없음
- 실제 프로젝트만
- 정직한 설명
- 명확한 가치 제안

**2. 구조적 명확성**
- 논리적 정보 계층
- 일관된 패턴
- 시맨틱 HTML
- 접근 가능한 마크업

**3. 시각적 절제**
- 시스템 폰트 (무료, 빠름)
- 최소 색상 팔레트
- 불필요한 장식 없음
- 디자인 요소로서의 여백

**4. 성능**
- 가능하면 정적 HTML
- 최소 의존성
- 비대한 프레임워크 없음
- 빠르고 신뢰할 수 있는 로딩

**5. 사용자 존중**
- 추적 없음 (필요하지 않으면)
- 팝업 없음
- 뉴스레터 강요 없음
- 조작 없음

---

## 요약

### 사이트 특징

**강점:**
- 탁월한 정보 명확성
- 최소 인지 부하
- 빠르고 접근 가능하며 표준 준수
- 콘텐츠 중심 프레젠테이션
- 정직하고 겸손한 디자인

**독특한 접근:**
- 4분면 분류법 (Initiatives/Research/Artifacts/Paths)
- 노드 기반 아키텍처
- 브루탈리스트 미학
- 시간적 조직화
- 시각적 장식 없음

**기술적 정교함:**
- 정적 HTML 가능성
- 최소 CSS
- JavaScript 거의 또는 전혀 없음
- 뛰어난 성능
- 높은 접근성

**사용자 경험:**
- 명확하고 차분한 탐색
- 쉬운 네비게이션
- 집중된 읽기
- 사용자 주체성 존중
- 지적인 프레젠테이션

### 디자인 철학

이 사이트는 **웹 기본으로의 회귀**를 나타냅니다:
- 구조를 위한 HTML
- 프레젠테이션을 위한 CSS
- 불필요한 레이어 없음
- 주요 재료로서의 콘텐츠
- 사용자 통제 최우선

**더하기보다 빼기로** 성공:
- 애니메이션 없음 (유지보수할 것 없음)
- 이미지 없음 (즉시 로딩)
- 복잡한 인터랙션 없음 (어디서나 작동)
- 프레임워크 없음 (의존성 없음)

### 활용 사례

이 문서는 다음 참고 자료로 활용 가능:

1. **미니멀 포트폴리오 구축**
   - 연구 중심 사이트
   - 학술 포트폴리오
   - 작업이 말하게 하는 디자이너/아티스트 쇼케이스

2. **정보 아키텍처**
   - 분류 디자인 (4분면 모델)
   - 시간적 조직화
   - 노드 기반 구조

3. **브루탈리스트 웹 디자인**
   - 미학으로서의 시맨틱 HTML
   - 콘텐츠 우선 접근
   - 단순함을 통한 성능

4. **접근 가능한 디자인**
   - 고대비, 텍스트 기반
   - 키보드 탐색 가능
   - 스크린 리더 친화적

---

**참고**: 일부 시각적 사양(정확한 색상, 폰트, 간격 값)은 미니멀리스트 디자인 패턴을 기반으로 추정되었습니다. CSS 검사가 불가능했기 때문입니다. 정확한 값은 브라우저 개발자 도구를 사용하여 라이브 사이트를 검사하세요.

**추가 분석 권장 도구:**
- 브라우저 개발자도구 (요소 검사)
- 대비 검사기 (WCAG 준수용)
- Lighthouse (성능 메트릭용)
- WAVE (접근성 감사용)
