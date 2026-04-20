# Bloom Frontend

Bloom Frontend는 직장인 멘탈케어 서비스 **Bloom**의 웹 프론트엔드입니다.  
Google OAuth 기반 로그인, 고민 입력, AI 분석 결과 확인, 팟캐스트형 콘텐츠 감상, 사후 트래킹, 마이페이지, 관리자 대시보드까지 하나의 코드베이스에서 제공합니다.

사용자 화면은 모바일 앱처럼 좁은 뷰포트에 최적화되어 있고, 관리자 화면은 별도의 전체 폭 레이아웃으로 동작합니다.

## 주요 기능

### 사용자 영역

- Google OAuth 로그인 및 세션 복구
- 고민을 대화형으로 입력하는 입장권 발급 플로우
- 작성 중인 입장권 초안 자동 저장 및 복원
- AI 분석 결과를 보여주는 Greenroom 화면
- 추천 팟캐스트 선택 및 감상 플로우
- 알림 센터 및 트래킹 설문 제출
- 상담/콘텐츠 이용 이력 조회
- 프로필 수정 및 계정 삭제
- 약관, 개인정보처리방침, 알림 설정 화면

### 관리자 영역

- 관리자 전용 로그인 진입점
- 조직 계정 목록 조회
- 조직 사용자 초대, 수정, 비활성화
- 조직 마인드 온톨로지 시각화
- 키워드 클러스터, 카테고리 분포, 연관 키워드 확인

## 사용자 흐름

1. 사용자가 Google 계정으로 로그인합니다.
2. 홈 화면에서 고민 나누기를 시작합니다.
3. 입장권 발급 화면에서 단계별 질문에 답변합니다.
4. 제출 후 AI 세션 ID를 기준으로 Greenroom 결과를 polling으로 조회합니다.
5. 이어서 팟캐스트 추천/선택 화면으로 진입합니다.
6. 이후 알림 센터에서 3일, 7일, 14일 등 시점별 트래킹 알림을 확인할 수 있습니다.
7. 마이페이지에서 과거 입장권, 팟캐스트, 트래킹 이력을 다시 볼 수 있습니다.

## 기술 스택

### Core

- React 19
- TypeScript
- Vite 7
- React Router DOM 7

### State / Data

- Zustand: 세션, Greenroom 세션 등 클라이언트 상태
- TanStack Query: 서버 상태 조회, 캐싱, 무효화
- Axios: API 클라이언트 및 인증/재시도 처리

### UI / Visualization

- Tailwind CSS v4
- Storybook 10
- `react-force-graph-2d`: 그래프 시각화
- `react-minimal-pie-chart`: 도넛 차트
- `lottie-react`: 로딩/모션 표현

## 프로젝트 구조

이 프로젝트는 FSD(Feature-Sliced Design)에 가깝게 구성되어 있습니다.

```text
src/
├── main.tsx                 # 앱 엔트리
├── providers.tsx            # QueryClient, 세션 복구, 부트스트랩
├── router.tsx               # 라우트 정의 및 보호 레이아웃
├── responsive-layout.tsx    # 사용자/관리자 레이아웃 분기
├── pages/                   # 라우트 단위 페이지
├── widgets/                 # 화면을 구성하는 복합 UI 블록
├── features/                # 사용자 액션, API 훅, 기능 단위 로직
├── entities/                # 도메인 타입/상수/스토어
└── shared/
    ├── api/                 # API 클라이언트, 응답 유틸
    ├── assets/              # 공용 에셋
    ├── icons/               # 아이콘
    ├── lib/                 # 라우터/유틸
    └── ui/                  # 공통 UI 컴포넌트
```

### 디렉터리 역할

- `pages`: 라우트 엔트리 포인트
- `widgets`: 페이지에서 바로 조합되는 큰 UI 단위
- `features`: API 호출, mutation, 훅, 폼/플로우 로직
- `entities`: 타입, 상수, 전역 상태 등 도메인 기초 레이어
- `shared`: 전역 공통 UI, API, 유틸리티, 에셋

## 라우트 개요

### 공개 라우트

- `/login`: 사용자 로그인
- `/login/terms`: 회원가입/약관 동의
- `/oauth/callback/google`: Google OAuth 콜백
- `/admin/login`: 관리자 로그인

### 인증 필요 라우트

- `/`: 홈
- `/issuance`: 입장권 발급
- `/greenroom`: AI 결과 확인
- `/greenroom/podcast-choice`: 팟캐스트 선택
- `/greenroom/podcast`: 팟캐스트 감상
- `/notifications`: 알림 센터
- `/notification-settings`: 알림 설정
- `/tracking/:id`: 트래킹 설문
- `/history`: 이용 이력
- `/history/:id`: 이력 상세
- `/account`: 계정 관리
- `/privacy-policy`: 개인정보처리방침
- `/terms-of-service`: 서비스 이용약관

### 관리자 보호 라우트

- `/admin`: 관리자 대시보드

## 상태 관리와 인증 처리

### 세션

- `Zustand`의 `useSessionStore`가 인증 상태, 사용자 정보, 액세스 토큰을 관리합니다.
- 앱 시작 시 `useSessionRestore`가 `/auth/me` 성격의 요청을 통해 세션 복구를 시도합니다.
- 인증 상태가 `booting`일 때는 OAuth 콜백 화면을 제외하고 로딩 스피너를 먼저 보여줍니다.

### API 클라이언트

- 공통 Axios 인스턴스는 `VITE_API_BASE_URL`을 기준으로 생성됩니다.
- 액세스 토큰이 있으면 `Authorization: Bearer ...` 헤더를 자동 부착합니다.
- 401 응답 시 `/auth/refresh`로 refresh를 시도하고, 성공하면 원래 요청을 재실행합니다.
- refresh 실패 시 세션을 초기화합니다.

### 서버 상태

- 목록/상세/설정 조회는 `TanStack Query`로 관리합니다.
- 사용자 초대/수정/삭제, 프로필 수정, 트래킹 제출 등은 mutation 후 관련 query를 invalidate하거나 직접 갱신합니다.

## UI 특성

- 일반 사용자 화면은 `max-width: 480px` 기반의 모바일 앱형 레이아웃입니다.
- 관리자 화면은 별도 반응형 분기 없이 넓은 데스크톱 레이아웃으로 표시됩니다.
- 글로벌 스타일은 `src/globals.css`에 정의되어 있으며, SUIT Variable 폰트와 디자인 토큰이 함께 선언되어 있습니다.
- 공통 UI 컴포넌트 일부는 Storybook 스토리로 관리됩니다.

## 환경 변수

`.env` 파일에 아래 값을 설정해야 합니다.

| 이름                       | 설명                       |
| -------------------------- | -------------------------- |
| `VITE_API_BASE_URL`        | 백엔드 API 베이스 URL      |
| `VITE_GOOGLE_CLIENT_ID`    | Google OAuth 클라이언트 ID |
| `VITE_GOOGLE_REDIRECT_URI` | Google OAuth 콜백 URI      |

예시:

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_REDIRECT_URI=http://localhost:3000/oauth/callback/google
```

## 로컬 실행

### 요구 사항

- Node.js 20 이상 권장
- npm

### 설치 및 실행

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 사용 가능한 스크립트

```bash
npm run dev               # 개발 서버 실행
npm run build             # 타입 체크 후 프로덕션 빌드
npm run preview           # 빌드 결과 미리보기
npm run lint              # ESLint 실행
npm run type-check        # TypeScript 타입 검사
npm run storybook         # Storybook 실행
npm run build-storybook   # Storybook 정적 빌드
```

## 빌드와 배포

### CI

GitHub Actions의 `fe-ci` 워크플로우가 다음을 수행합니다.

- `npm ci`
- `npm run lint`
- 테스트 스크립트가 있을 경우에만 테스트 실행
- `npm run build`
- `dist/` 산출물 업로드

현재 `package.json`에는 `test` 스크립트가 없으므로, CI에서는 테스트 단계를 자동으로 건너뜁니다.

### CD

`main` 브랜치에서 CI가 성공하면 `fe-cd` 워크플로우가 실행됩니다.

- CI 아티팩트 다운로드
- S3에 `dist/` 동기화
- `index.html` 캐시 무효화 설정
- CloudFront invalidation 수행

`vite.config.ts`의 `build.outDir`는 CI/CD 파이프라인과 맞춰 `dist`로 고정되어 있습니다.

## 스토리북

공통 UI 컴포넌트에 대한 스토리가 일부 작성되어 있습니다.

- `Button`
- `Card`
- `Chip`
- `CheckCircle`
- `CheckSquare`
- `Modal`
- `Typography`

디자인 시스템이나 공통 컴포넌트를 확장할 때는 Storybook을 함께 업데이트하는 흐름이 잘 맞습니다.

## 운영 메모

- 사용자 라우트는 대부분 인증 보호가 걸려 있습니다.
- 관리자 로그인도 Google OAuth를 사용하지만, 서버에서 관리자 권한 여부를 검증합니다.
- Greenroom과 Podcast 데이터는 AI 처리 완료까지 polling으로 대기합니다.
- 알림 목록은 cursor 기반 무한 스크롤로 불러옵니다.
