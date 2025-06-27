# 꼬망이들 (Little Dreamers)

전국 아동급식카드 가맹점 찾기 데모 서비스

## 프로젝트 설명

"꼬망이들"은 전국의 아동급식카드 사용 가능 가맹점을 찾을 수 있는 웹 서비스입니다. 
사용자 위치 기반으로 주변 가맹점을 표시하고, 메뉴 정보와 리뷰를 확인할 수 있습니다.

**주의**: 이것은 데모 서비스로, 모든 가맹점 정보는 Mock 데이터입니다.

## 기술 스택

### Frontend
- React 18.3.1
- React Router DOM 6.26.1
- Styled Components 6.1.12
- Axios 1.7.4
- Kakao Maps API

### Backend (Mock API)
- Express.js
- TypeScript
- Node.js

### Deployment
- Docker
- docker-compose

## 설치 및 실행

### 개발 환경에서 실행

1. 저장소 클론
```bash
git clone [repository-url]
cd little-dreamers
```

2. 의존성 설치
```bash
# 모든 의존성 한 번에 설치
npm run install:all
```

3. 개발 서버 실행

**방법 1: 한 줄 명령어로 실행 (추천)**
```bash
npm run dev
```
이 명령어는 Mock API 서버(포트 3001)와 React 개발 서버(포트 3000)를 동시에 실행합니다.

**방법 2: 개별 실행**
```bash
# 터미널 1: Mock API 서버 실행 (포트 3001)
npm run server

# 터미널 2: React 개발 서버 실행 (포트 3000)
npm start
```

4. 브라우저에서 http://localhost:3000 접속

### Docker로 실행

1. Docker 이미지 빌드
```bash
docker build -t little-dreamers:latest .
```

2. Docker 컨테이너 실행
```bash
docker run -d -p 3000:3000 --name little-dreamers little-dreamers:latest
```

또는 docker-compose 사용:
```bash
docker-compose up -d
```

## 주요 기능

1. **위치 기반 가맹점 검색**
   - 사용자 위치 기반 2km 반경 내 가맹점 표시
   - 지도에 마커로 표시

2. **필터링 기능**
   - 메뉴 카테고리별 필터링 (분식, 패스트푸드, 카페 등)
   - 가격대별 필터링

3. **가맹점 상세 정보**
   - 가맹점 정보 (이름, 주소, 전화번호)
   - 메뉴 및 가격 정보
   - 리뷰 및 평가

4. **리뷰 시스템**
   - 익명 리뷰 작성
   - 미리 정의된 평가 항목 선택
   - 자유 텍스트 리뷰

## API 엔드포인트

- `GET /api/stores/search`: 위치 기반 가맹점 검색
- `GET /api/stores/menu`: 가맹점 메뉴 정보
- `GET /api/stores/review`: 가맹점 리뷰 조회
- `POST /api/review/upload`: 리뷰 작성

## 프로젝트 구조

```
little-dreamers/
├── src/                    # React 소스 코드
│   ├── pages/             # 페이지 컴포넌트
│   ├── component/         # 재사용 컴포넌트
│   └── api/               # API 설정
├── mock-api-server/       # Express Mock API 서버
│   ├── src/
│   │   ├── routes/       # API 라우트
│   │   ├── services/     # 비즈니스 로직
│   │   └── types/        # TypeScript 타입
│   └── package.json
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 환경 변수

개발 환경에서는 별도의 환경 변수 설정이 필요 없습니다.
프로덕션 환경에서는 다음 환경 변수를 설정할 수 있습니다:

- `PORT`: 서버 포트 (기본값: 3000)
- `NODE_ENV`: 실행 환경 (development/production)

## 주의사항

- 모든 가맹점 데이터는 Mock 데이터입니다
- 서버 재시작 시 모든 데이터가 초기화됩니다
- 리뷰는 메모리에만 저장되며 영구 보존되지 않습니다