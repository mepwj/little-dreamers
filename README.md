# 🍴 꼬망이들 (Little Dreamers)

제주도 아동급식카드 가맹점 찾기 웹 서비스

## 📝 프로젝트 설명

"꼬망이들"은 제주도의 아동급식카드 사용 가능 가맹점을 찾을 수 있는 React 기반 SPA 웹 서비스입니다. 
지도 기반으로 주변 가맹점을 표시하고, 메뉴 정보와 이모지 기반 리뷰 시스템을 제공합니다.

**⚠️ 데모 버전**: 모든 가맹점 정보는 제주도 지역 더미 데이터입니다.

## 🚀 라이브 데모

**배포 URL**: [little-dreamers.vercel.app](https://little-dreamers.vercel.app)

## ✨ 주요 기능

- 🗺️ **카카오맵 기반 가맹점 지도**: 제주도 지역 가맹점 15개 표시
- 📍 **현재 위치 기능**: 데모 모드 (제주도 중심으로 이동)
- 🏪 **가맹점 상세 정보**: 메뉴, 가격, 리뷰 정보 제공
- 😊 **이모지 리뷰 시스템**: 직관적인 리뷰 작성 및 조회
- 🔍 **카테고리별 필터링**: 음식점, 편의점, 카페 등 카테고리 분류
- 📱 **반응형 디자인**: 모바일 최적화
- ⚡ **PWA 지원**: 앱처럼 설치 가능

## 🛠️ 기술 스택

### Frontend
- **React** 18.3.1 - UI 라이브러리
- **React Router DOM** 6.26.1 - 클라이언트 사이드 라우팅
- **Styled Components** 6.1.12 - CSS-in-JS 스타일링
- **Kakao Maps API** - 지도 서비스

### Deployment
- **Vercel** - 정적 웹앱 배포
- **더미 데이터** - 로컬 JSON 기반 데이터

## 📦 설치 및 실행

### 로컬 개발 환경

1. **저장소 클론**
```bash
git clone https://github.com/[사용자명]/little-dreamers.git
cd little-dreamers
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정** (선택사항)
```bash
# .env 파일 생성
REACT_APP_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

4. **개발 서버 실행**
```bash
npm start
```

5. **브라우저에서 접속**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 정적 파일 생성 (build 폴더)
```

## 🗂️ 프로젝트 구조

```
little-dreamers/
├── public/
│   ├── index.html          # HTML 템플릿
│   ├── favicon.ico         # 파비콘
│   └── site.webmanifest    # PWA 매니페스트
├── src/
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── ModernMainPage.jsx    # 메인 페이지 (추천)
│   │   ├── MainPage.jsx          # 클래식 메인 페이지
│   │   ├── Restaurant.jsx        # 가맹점 상세 페이지
│   │   └── Review.jsx            # 리뷰 작성 페이지
│   ├── component/          # 재사용 컴포넌트
│   │   ├── Map/                  # 지도 컴포넌트
│   │   ├── Layout/               # 레이아웃 컴포넌트
│   │   └── ...
│   ├── data/               # 더미 데이터
│   │   ├── stores.js             # 가맹점 & 메뉴 데이터
│   │   └── reviews.js            # 리뷰 데이터
│   ├── services/           # API 서비스
│   │   └── dummyApi.js           # 더미 API 함수들
│   └── styles/             # 스타일 테마
├── vercel.json             # Vercel 배포 설정
└── package.json
```

## 🎯 주요 페이지

1. **메인 페이지** (`/`)
   - 카카오맵으로 가맹점 위치 표시
   - 카테고리별 필터링
   - 가맹점 카드 목록

2. **가맹점 상세** (`/restaurant/:id`)
   - 가맹점 정보 (주소, 전화번호, 카테고리)
   - 메뉴 및 가격 정보
   - 리뷰 통계 및 목록

3. **리뷰 작성** (`/review/:id`)
   - 이모지 기반 평가 선택
   - 자유 텍스트 리뷰 작성

## 🗄️ 더미 데이터

### 가맹점 데이터 (15개)
- 푸라닭 이도점, 루스트플레이스 구남점, GS25 제주구남점 등
- 제주시 이도동, 아라일동 중심 위치
- 음식점, 편의점, 카페, 베이커리 등 다양한 카테고리

### 리뷰 옵션
- 🍴 맛있어요
- 😊 친절해요  
- 💳 카드결제 잘돼요
- ✨ 깨끗해요
- 🍽️ 양이 많아요

## 🌐 환경변수

### Vercel 배포 시 필요한 환경변수

| 변수명 | 설명 | 예시값 |
|--------|------|--------|
| `REACT_APP_KAKAO_MAP_API_KEY` | 카카오맵 API 키 | `6022b3ea363825dba0253bc58c3f328c` |

## 🚀 배포 가이드

### Vercel 배포

1. **GitHub 연결**: Vercel에서 리포지토리 import
2. **환경변수 설정**: `REACT_APP_KAKAO_MAP_API_KEY` 추가
3. **자동 배포**: main 브랜치 push 시 자동 배포

### 수동 배포

```bash
# Vercel CLI 사용
npm i -g vercel
vercel --prod
```

## 💡 개발 참고사항

### API 구조
- 모든 API 호출은 `src/services/dummyApi.js`에서 처리
- 네트워크 지연 시뮬레이션 (300ms) 포함
- Promise 기반 비동기 처리

### 위치 서비스
- 개발 환경: 항상 제주도 좌표 사용
- 프로덕션 환경: 실제 GPS 위치 → 실패 시 제주도 기본값

### 스타일링
- `styled-components` 사용
- `src/styles/newTheme.js`에서 디자인 토큰 관리
- 반응형 디자인 (모바일 우선)

## 🔧 주요 명령어

```bash
npm start          # 개발 서버 시작
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행
npm run eject      # CRA eject (주의)
```

## 📄 라이센스

이 프로젝트는 데모 목적으로 제작되었습니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Made with ❤️ for 제주도 아이들**

🍴 꼬망이들과 함께 맛있는 식사를 찾아보세요!