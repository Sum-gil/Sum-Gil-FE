## 🌿 Sum-Gil (숨길)
> <img width="130" alt="숨길 로고" src="https://github.com/M4rs0312/m4rs.github.io/blob/main/5313c534-7153-48d7-ae16-b393dfdc9d42.jpg" />
> 
> **숨길_SUM-GIL** > *도심 속 숨은 산책길을 찾고, 당신의 건강한 발걸음을 기록하는 위치 기반 산책 서비스*

<br></br>

# 🎨 프로젝트 개요
<div align=center>
<img width="1000" alt="프로젝트소개" src="https://github.com/user-attachments/assets/메인_소개_이미지_주소" />
<br></br>	
</div>

현대인들에게 산책은 단순한 이동을 넘어 스트레스 해소와 건강 관리를 위한 중요한 활동입니다. 하지만 익숙한 공원 외에 '정말 걷기 좋은 길'에 대한 정보는 여전히 부족합니다.

본 프로젝트는 **사용자의 실시간 위치를 기반으로 쾌적한 산책로를 추천**하고, 산책 데이터를 정교하게 기록하여 건강한 생활 습관 형성을 돕는 서비스입니다.

**숨길(Sum-Gil)**은 공공 데이터를 활용한 주변 환경 지표와 실시간 GPS 추적 기술을 결합하여 최적의 산책 경험을 제공합니다. 단순히 경로를 보여주는 것을 넘어, 산책로의 **건강 점수(대기질, 날씨) 및 안전 지표(주변 인프라)**를 제공하여 스마트한 산책 환경을 구축하는 것을 목표로 합니다.

<br></br>

# 🛠️ 주요 기능
<div align=center>

### 1. 위치 기반 실시간 산책로 탐색
사용자의 현재 위치를 중심으로 반경 내 최적의 산책 장소를 지도 위에 시각화합니다. 
카카오 맵 API를 활용하여 이동 방향에 따른 동적 마커 업데이트와 직관적인 UI를 제공합니다.

### 2. 스마트 산책 기록 시스템
산책을 시작함과 동시에 실시간 트래킹 페이지로 전환되어 시간과 이동 거리를 측정합니다. 
**타임스탬프(Timestamp) 계산 방식**을 도입하여, 백그라운드나 절전 모드에서도 오차 없는 정확한 시간 기록을 보장합니다.

### 3. 산책로 환경 및 안전 지표 분석
공공데이터포털 API를 연동하여 산책 장소의 실시간 미세먼지, 기상 정보를 수치화한 '건강 점수'를 제공합니다. 
또한 편의점, 화장실 등 필수 인프라 위치를 함께 제공하여 사용자 편의성을 높였습니다.

### 4. 산책 메이트 커뮤니티
사용자들 간의 산책 경로 추천이나 일상의 기록을 공유할 수 있는 커뮤니티 공간을 제공하여 산책의 즐거움을 더합니다.

</div>

<br></br>

# 📱 서비스 화면 (Service Screens)
<div align=center>

### 1. 로그인 페이지 (Login)
서비스 이용을 위한 진입점으로, 보안성을 갖춘 사용자 인증을 제공합니다. 

<img width="800" alt="로그인페이지" src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_login.png?raw=true" />

---

### 2. 메인 페이지 (Dashboard)
서비스의 핵심 지표를 요약하여 보여주는 대시보드입니다. 사용자의 활동 요약과 실시간 환경 정보를 한눈에 확인할 수 있습니다.

<img width="800" alt="메인페이지" src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_dashboard.png?raw=true" />

---

### 3. 지도 탐색 페이지 (Map Exploration)
주변의 숨은 산책길을 지도 위에서 탐색합니다. 각 핀을 통해 실제 산책이 가능한 장소들을 직관적으로 확인하고 선택할 수 있습니다.

<img width="800" alt="지도탐색페이지" src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_login_callback_code%3DTCd3ZhTyvvs7j_svr6cHYhTmbB2x5zyz_5PvTnQgGEkOB_MP5i6VKwAAAAQKDSHZAAABnWbAsG0e0jm_MNo9Pw%20(1).png?raw=true" />

---

### 4. 산책로 상세 페이지 (Place Detail)
선택한 장소의 실시간 대기질 지수와 기상 데이터를 확인하고, 주변 3km 이내의 편의시설(편의점, 화장실 등) 정보를 거리순으로 제공합니다.

<img width="800" alt="상세페이지" src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_place_35.png?raw=true" />

---

### 5. 산책 기록 및 트래커 (Live Tracking)
산책 시작 버튼을 누르면 즉시 전환되는 페이지입니다. 현재 이동 경로와 시간, 거리를 실시간으로 트래킹하며, 타임스탬프 로직을 통해 백그라운드에서도 정확한 기록이 유지됩니다.

<img width="800" alt="산책기록페이지" src="https://github.com/user-attachments/assets/이미지_주소_3" />

---

### 6. 커뮤니티 페이지 (Community)
산책 코스 후기나 정보 공유가 이루어지는 소통 공간입니다. 다양한 사용자의 산책 경험을 공유하며 새로운 산책로를 발견할 수 있습니다.

<img width="800" alt="커뮤니티페이지" src="https://github.com/user-attachments/assets/커뮤니티_이미지_주소" />

---

### 7. 마이페이지 및 설정 (My Page & Settings)
사용자의 활동 이력을 관리하며, 편리한 서비스 이용을 위한 다양한 설정을 제공합니다.

* **활동 통계:** 누적 거리, 시간, 칼로리 등 개인 활동 데이터를 관리합니다.
* **알림 설정:** 푸시 알림 및 서비스 공지 수신 여부를 설정할 수 있습니다.
* **개인정보 보호:** 위치 정보 접근 및 계정 정보를 안전하게 관리합니다.
* **도움말:** 서비스 이용 가이드와 FAQ를 확인할 수 있습니다.

| 알림 설정 | 개인정보 보호 | 도움말 |
| :---: | :---: | :---: |
| <img src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_login_callback_code%3DTCd3ZhTyvvs7j_svr6cHYhTmbB2x5zyz_5PvTnQgGEkOB_MP5i6VKwAAAAQKDSHZAAABnWbAsG0e0jm_MNo9Pw%20(2).png?raw=true" width="250"> | <img src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_login_callback_code%3DTCd3ZhTyvvs7j_svr6cHYhTmbB2x5zyz_5PvTnQgGEkOB_MP5i6VKwAAAAQKDSHZAAABnWbAsG0e0jm_MNo9Pw%20(3).png?raw=true" width="250"> | <img src="https://github.com/M4rs0312/m4rs.github.io/blob/main/www.sumgil.shop_login_callback_code%3DTCd3ZhTyvvs7j_svr6cHYhTmbB2x5zyz_5PvTnQgGEkOB_MP5i6VKwAAAAQKDSHZAAABnWbAsG0e0jm_MNo9Pw%20(4).png?raw=true" width="250"> |

---

### 8. 모바일 반응형 최적화
모든 기능은 야외 산책 중에도 조작이 편리하도록 모바일 최적화 레이아웃을 지원합니다.

| 모바일 메인 | 모바일 트래커 | 모바일 상세 |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/모바일1" width="250"> | <img src="https://github.com/user-attachments/assets/모바일2" width="250"> | <img src="https://github.com/user-attachments/assets/모바일3" width="250"> |

</div>

<br></br>

# 💻 Tech Stack

| 구분 | 기술 / 도구 |
| ------------- | --------------------------------- |
| **Frontend** | **Next.js (App Router)**, Tailwind CSS, Lucide React, Shadcn/ui |
| **Backend** | **Spring Boot**, Spring Data JPA, **MySQL** |
| **API 연동** | Kakao Map API, Public Data API (Air Korea, KMA) |
| **State/Ref** | React Hooks (useState, useEffect, **useMemo**, **useRef**) |
| **DevOps** | Git, GitHub, AWS (S3, CloudFront) |

<br></br>

# 👥 Convention

### Branch Strategy
- `main`: 최종 배포 브랜치
- `develop`: 개발 통합 브랜치
- `feat/feature-name`: 기능별 구현 브랜치
- `fix/bug-name`: 오류 수정 브랜치

### Commit Message Convention
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정 (README 등)
- `refactor`: 코드 구조 개선
- `style`: 코드 포맷팅 (로직 변경 없음)
- `chore`: 빌드 업무, 패키지 매니저 설정 등

<br></br>

<div align=center>
	<h1>👑 Developers 👑</h1>
	
| <img src="https://github.com/본인ID.png" width="80"> | <img src="https://github.com/파트너ID.png" width="80"> |
| :---: | :---: |
| **본인 이름** | **파트너 이름** |
| [GitHub](https://github.com/본인ID) | [GitHub](https://github.com/파트너ID) |
| **Backend / Infra** | **Frontend / UI** |

</div>
