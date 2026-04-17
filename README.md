# Mind-Log Frontend

사용자와 생성형 AI 심리상담 시스템을 연결하는 **프론트엔드 애플리케이션 레이어**

Mind-Log Frontend는 생성형 AI 기반 심리상담 서비스 **Mind-Log**의
사용자 경험(UI/UX)을 담당하는 프론트엔드 레포지토리입니다.

백엔드(`be`), AI 엔진(`ai`), 클라우드 인프라(`infra`)와 분리된 독립 레이어로서
**확장 가능한 구조, 명확한 책임 분리, 안정적인 상태 흐름**을 목표로 설계되었습니다.

---

## 프로젝트 목적

- AI 심리상담 서비스를 위한 사용자 중심 UI 제공
- Feature-Sliced Design(FSD) 기반 프론트엔드 구조 확립
- 서버 상태와 클라이언트 상태의 명확한 분리
- AI 응답 특성을 고려한 대화형 UX 설계
- 장기 운영을 고려한 유지보수 가능한 코드베이스 구축

---

## 기술 스택

### Core
- React
- Vite
- React Router
- TypeScript

### State & Data
- Zustand: 클라이언트 상태 관리
- TanStack Query: 서버 상태 관리 및 캐싱
- Axios: API 통신

### Styling & UI
- Tailwind CSS

### Testing
- Jest / React Testing Library
- Cypress

---

## Repository Structure (FSD)

```
src/
├── main.tsx            # Vite 엔트리 포인트
├── router.tsx          # React Router 설정
├── pages/              # 라우트 단위 페이지
├── widgets/            # 복합 UI 블록
├── features/           # 사용자 행동 단위
├── entities/           # 도메인 엔티티
└── shared/             # 공통 모듈
    ├── ui/
    ├── api/
    ├── lib/
    ├── assets/
    └── icons/
```

### FSD 레이어 설명

- **pages**
  라우트 단위 화면 조합

- **widgets**  
  여러 feature/entity를 조합한 UI 블록  
  예: 상담 화면, 채팅 뷰

- **features**  
  사용자의 의도가 명확한 기능 단위  
  예: 메시지 전송, 상담 시작

- **entities**  
  도메인 중심 데이터 모델  
  예: Message, Session, User

- **shared**  
  프로젝트 전반에서 재사용되는 공통 코드

---

## 상태 관리 전략

### 서버 상태
- TanStack Query로 관리
- 상담 세션, AI 응답, 히스토리 데이터
- 캐싱 및 재요청 전략 명확화

### 클라이언트 상태
- Zustand로 관리
- UI 상태, 입력값, 인터랙션 상태
- 비즈니스 로직 최소화

---

## 환경 변수

VITE_API_BASE_URL=

VITE_ENV=

환경별(local / dev / prod)로 분리하여 관리합니다.

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
