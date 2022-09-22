# <img src='https://user-images.githubusercontent.com/97580782/177033615-c8306bf0-f293-4370-961b-d9f701174ba3.png' width='30px'> Pill my rhythm

### PMR은 인공지능을 기반으로 사용자의 건강 상태에 맞춘 영양제 추천, 영양제 복용 스케줄 관리 서비스입니다.

<br>

🔗 Link

- Service 주소 👉 https://kdt-ai4-team17.elicecoding.com/
- **자세한 프로젝트 소개는 해당 페이지를 확인해주세요** 👉 [프로젝트 기술 소개서](https://power-platypus-d4a.notion.site/17-27fd07d817fa4385bdda2afa5fcd674e)

## TEAM

| 이름      | 담당 업무                                                           |
| --------- | ------------------------------------------------------------------- |
| 노송희 👑 | **백엔드(팀장)** : 프로젝트 관리, API 구현, Web Push, 인공지능 학습 |
| 박정윤    | **백엔드** : API 구현, Flask 서버 구축, 배포, 인공지능 학습         |
| 석윤주    | **프론트엔드** : 메인 페이지, 소개 페이지, 마이 페이지, 디자인      |
| 이영우    | **프론트엔드** : 스케줄러 페이지, 검색 페이지, 디자인                            |

<br>

## 1. 서비스 소개

### 💡 기획 배경

- 코로나 이후로 영양제와 같은 건강 기능 식품에 대한 관심이 크게 높아짐. <br>
  📎[관련 기사](https://www.pharmnews.com/news/articleView.html?idxno=103260)

- 긴 코로나 상황으로 인해 개인의 생체리듬이 무너진 사람들이 많음.<br>
  📎[관련 기사](http://www.whosaeng.com/117633)

- 이제 코로나로 약해졌던 면역력과 같은 건강 부분과 생체 리듬에 대한 회복이 요구됨.

- 매년 국내 건강기능식품의 성장.<br>
  📎[관련 기사](https://www.donga.com/news/Economy/article/all/20200209/99609334/1)

- 영양제를 먹으려고 해도, 뭐 부터 먹어야 좋을지에 대해 개인이 평가를 내리기 어려움.

<br>

### 🚩 목적 및 필요성

🔎 기존에 있는 유사 서비스의 분석

- 건강 검진 이력이나 복용 중인 영양제를 바탕으로 영양제를 추천
- 맞춤 영양제를 위해 정보를 일일이 입력하고 선택지를 작성해야 해서 접근이 복잡함
  (예시 : [https://pilly.kr](https://pilly.kr/) ⇒ 5분 이상 소요)
- 유료 구독 서비스는 영양제를 대신 구매해 배송해주는 서비스에 그침

<br>

<div align='center'>
  <img src='https://user-images.githubusercontent.com/97580782/179143186-890528e1-618c-4d27-be64-00dc910644e3.png' width='500px'>
</div>

<br>

✨ 기존 서비스와의 차별화

- 간단한 증상 검색을 통해 “현재” 본인의 건강 상태에 필요한 영양제를 추천
- 추천해 준 영양제들의 정보를 확인하고 그 중 본인이 원하는 영양제를 구매
- 구매 후 꾸준한 복용까지 챙겨주는 서비스

⚒️ 서비스명 확정

> 꾸준한 **영양제 섭취**와 함께, 건강한 나만의 **생체 리듬**을 만들어보자!

<br>

### 📝 기대 효과와 활용 방안

🎯 기대 효과

- 간단하게 내 증상을 입력하는 것 만으로도 AI 분석을 통해 나에게 적합한 영양제를 추천 받을 수 있음 <br>
  ➡️ 접근이 쉽고 섭취할 영양제를 파악하기도 편리함
- 너무 많은 영양제에 대한 정보로 구매를 고민하는 사용자의 경우 <br>
  ➡️ 선택지를 축소해줘서 구매로 이어질 수 있는 가능성을 높일 수 있음
- 구매한 영양제를 꾸준히 복용하는 데 어려움을 느끼는 사용자의 경우 <br>
  ➡️ 설정한 시간에 도착하는 푸시 알림을 통해 영양제 복용을 유도할 수 있음

  <br>

🎇 활용 방안

- 증상에 대한 키워드 추출을 심화한다면, 이 증상이 심할 경우(혹은 지속되는 경우) <br>
  어떠한 질병의 초기 증세일 수 있으니 병원 내방을 권하는 등의 의료 제안 서비스로 확장 가능

<br>

### 🔩 서비스 기능

### 1. 메인 기능

- **AI 문장 분석 영양제 추천 서비스** <br />

  - 나만을 위한 영양제를 추천해주세요.

    - “눈이 뻑뻑해요.. 요새 자주 피곤해요” 와 같은 사용자의 상태를 입력 받으면 그 문장 안에서 **AI가 키워드를 추출**해서 사용자의 현재 상태를 기반하여 건강 개선에 도움이 되는 영양제를 추천

  - 결과 페이지에서 구매까지 한 방에!

    - 추천받은 영양제는 바로 구매로 이어질 수 있도록 제품 목록을 제공

  - 섭취 전 확인해보세요!
    - 추천 받은 영양제에 대해 의사나 약사가 설명하는 유튜브 동영상을 제공, 사용자는 전문가의 설명을 듣고 복용 의사를 결정할 수 있음

<br>

<div align='center'>
    <img src='https://user-images.githubusercontent.com/97580782/177033630-494c83d9-359b-4422-9ce2-85ba6b1f8752.gif' width='650px'>
</div>

<br>

### 2. 서브 기능

- 영양제 **북마크** 기능

  - 증상 검색 결과로 나온 영양제 중 마음에 드는 영양제를 북마크
  - 북마크 한 영양제들은 마이페이지에서 확인 및 북마크 취소 가능

<br>

- **영양제 복용 시간 및 건강 관리 스케줄 관리**

  - 한 번에 이해하는 스케줄러 사용법
    - Onboarding Description으로 스케줄러 사용법을 기능별로 이해할 수 있도록 도와줌
    - 사용자 편의를 위해 “오늘 하루 더이상 보이지 않기” 기능 추가
  - 복용할 영양제 선택
    - 아침 / 점심 / 저녁에 걸쳐 북마크 한 영양제를 분류
  - **드래그앤드롭**으로 일정 생성
    - 영양제 복용 일정과 생체리듬 개선 관련 활동들을 스케줄러에 추가할 수 있음
  - 스케줄 달성률 체크하기

    - 매일 매일 체크리스트 작성을 통해 달성률에 따라 달라지는 배경색을 확인하며 건강한 하루를 보냈는지 회고할 수 있음
      - 5개 이상 성공 : 초록불
      - 3개 이상 성공 : 노란불
      - 1개 이상 성공 : 빨간불

<div align='center'>
    <img src='https://user-images.githubusercontent.com/97580782/177033656-05fa22ed-ce4c-4704-b117-888af2a157ae.gif' width='650px'>
</div>

<br>

- 구독 후 영양제 복용 시간 **푸시 알림** 서비스

  - Web / Android
    - 두 가지 환경 중 선택하거나 둘 다 **구독** 신청 가능
    - Android의 경우 쉽게 구독할 수 있도록 **QR 코드** 제공
  - 사용자가 설정한 영양제 일정에 따라 푸시 알림 전송
    - 아침 / 점심 / 저녁에 분류한 영양제 정보와 함께 영양제 복용 시간이라는 알림을 확인하여 규칙적인 영양제 복용에 도움을 줌
    - ex) {예진: user_name}님, {아침 / 점심 / 저녁: time} 영양제 드실 시간이에요!
      {루테인, 비타민B: supplements} 영양제를 복용해주세요.

<br>

- 원하는 영양제를 검색할 수 있는 **영양제 백과사전**

  - 영양제명으로 검색 / 원재료로 검색
    - 두 가지 검색 옵션을 제공해 사용자 편의성과 검색 결과의 정확도를 높임

<br>

- 한눈에 보는 **건강 신호등**

  - 마이페이지의 **yearly heatmap**
    - 매일 매일 작성한 체크리스트의 결과 색깔들(빨강, 노랑, 초록)을 연단위로 보여줌
    - 본인이 얼마나 건강한 하루 하루를 보내고 있는지 회고할 수 있음

<br>

- 내 **동년배**들은 다 이거 먹더라

  - 마이페이지의 **추천 영양제**
    - 연령대, 성별에 따른 추천 영양제 목록을 제공
    - 역시 클릭하면 바로 구매 가능하도록 연결
    - 향후 직업에 따른 추천 영양제 서비스도 추가할 예정

<br>

### 3. 부가 기능

- 모바일 **홈 화면에 추가**

  1. 서비스 접근성을 높이기 위해 PWA를 적용<br />
  2. Android의 경우 chrome, ios의 경우 safari에서 홈 화면에 추가 시 아이콘을 통해 **앱과 같이 접근 가능**<br /><br />

- 모바일 환경 최적화를 위해 모든 페이지에 **반응형 UI 적용**<br />

  1. 메인, 검색, 마이 페이지
  2. 스케줄러 페이지<br />
     - 스케줄러 형식을 weekly에서 **daily로 변경**해서 보여줌<br />

<br />

## 2. 프로젝트 설계

### 🗂 파일 구조도

<details>
<summary>AI</summary>

```
📦ai
 ┣ 📂__pycache__
 ┣ 📜Dockerfile
 ┣ 📜app.py
 ┣ 📜requirements.txt
 ┣ 📜stopwords.txt
 ┣ 📜test_model.py
 ┣ 📜textrule.txt
 ┣ 📜trained_mtx.pkl
 ┣ 📜trained_tf.pkl
 ┗ 📜verifyToken.py
```

</details>

<details>
<summary>Frontend</summary>

```
📦src
 ┣ 📂hooks
 ┃ ┣ 📜useLoginCheck.tsx
 ┃ ┗ 📜useResize.tsx
 ┣ 📂routes
 ┃ ┣ 📂Pmr
 ┃ ┃ ┣ 📜Pmrguide.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Schedule
 ┃ ┃ ┣ 📂Mobile
 ┃ ┃ ┃ ┣ 📜PushCheckList.tsx
 ┃ ┃ ┃ ┗ 📜Subscribe.tsx
 ┃ ┃ ┣ 📜Calendar.css
 ┃ ┃ ┣ 📜Calendar.tsx
 ┃ ┃ ┣ 📜CheckList.tsx
 ┃ ┃ ┣ 📜Cookies.ts
 ┃ ┃ ┣ 📜DayItem.tsx
 ┃ ┃ ┣ 📜Onboarding.tsx
 ┃ ┃ ┣ 📜Subscribe.tsx
 ┃ ┃ ┣ 📜SupItem.tsx
 ┃ ┃ ┣ 📜Supplements.tsx
 ┃ ┃ ┣ 📜TaskItem.tsx
 ┃ ┃ ┗ 📜YearlyChecklist.tsx
 ┃ ┣ 📂Search
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂Result
 ┃ ┃ ┃ ┣ 📜Blankresult.tsx
 ┃ ┃ ┃ ┣ 📜PRList.tsx
 ┃ ┃ ┃ ┣ 📜Promotion.tsx
 ┃ ┃ ┃ ┣ 📜RecommendationArea.tsx
 ┃ ┃ ┃ ┣ 📜Result.tsx
 ┃ ┃ ┃ ┣ 📜VideoArea.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂SupSearch
 ┃ ┃ ┣ 📜Paging.css
 ┃ ┃ ┣ 📜SupCard.tsx
 ┃ ┃ ┣ 📜SupSearch.tsx
 ┃ ┃ ┣ 📜SupSearchResult.tsx
 ┃ ┃ ┗ 📜SupStyled.tsx
 ┃ ┣ 📂User
 ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┣ 📜MyPage.tsx
 ┃ ┃ ┣ 📜MyYearlyChecklist.tsx
 ┃ ┃ ┣ 📜Reigsterform.tsx
 ┃ ┃ ┣ 📜UserBookMarkPage.tsx
 ┃ ┃ ┣ 📜UserMyPage.tsx
 ┃ ┃ ┗ 📜UserRecommendPage.tsx
 ┃ ┗ 📂_shared
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📜Aboutus.tsx
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜AnalysisCard.tsx
 ┃ ┃ ┣ 📜BookMark.tsx
 ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┣ 📜PRCard.tsx
 ┃ ┃ ┣ 📜PRModal.tsx
 ┃ ┃ ┣ 📜ScrollTopButton.tsx
 ┃ ┃ ┗ 📜Searchbar.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜index.css
 ┣ 📜Api.ts
 ┣ 📜App.tsx
 ┣ 📜Dispatcher.tsx
 ┣ 📜GlobalStyle.tsx
 ┣ 📜Router.tsx
 ┣ 📜atoms.tsx
 ┣ 📜index.tsx
 ┗ 📜reducer.ts
```

</details>

<details>
<summary>Backend</summary>

```
📦src
 ┣ 📂db
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜config.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜analysis.ts
 ┃ ┃ ┣ 📜bookMark.ts
 ┃ ┃ ┣ 📜checklist.ts
 ┃ ┃ ┣ 📜dailySupplement.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜recommend.ts
 ┃ ┃ ┣ 📜schedule.ts
 ┃ ┃ ┣ 📜subscribe.ts
 ┃ ┃ ┣ 📜supplement.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📜1.create-table-user.ts
 ┃ ┃ ┣ 📜2.create-table-schedule.ts
 ┃ ┃ ┣ 📜3.create-table-checklist.ts
 ┃ ┃ ┣ 📜4.create-table-supplement.ts
 ┃ ┃ ┣ 📜5.create-table-daily-supplement.ts
 ┃ ┃ ┣ 📜6.create-table-recommend.ts
 ┃ ┃ ┣ 📜7.create-table-bookmark.ts
 ┃ ┃ ┣ 📜8.create-table-subscribe.ts
 ┃ ┃ ┗ 📜9.create-table-analysis.ts
 ┃ ┣ 📜Analysis.ts
 ┃ ┣ 📜BookMark.ts
 ┃ ┣ 📜Checklist.ts
 ┃ ┣ 📜DailySupplement.ts
 ┃ ┣ 📜Schedule.ts
 ┃ ┣ 📜Subscribe.ts
 ┃ ┣ 📜Supplement.ts
 ┃ ┗ 📜User.ts
 ┣ 📂logs
 ┣ 📂controllers
 ┃ ┣ 📜bookMarkController.ts
 ┃ ┣ 📜checklistController.ts
 ┃ ┣ 📜scheduleController.ts
 ┃ ┣ 📜subscribeController.ts
 ┃ ┣ 📜supplementController.ts
 ┃ ┗ 📜userController.ts
 ┣ 📂customType
 ┃ ┗ 📂express
 ┃ ┃ ┗ 📜index.d.ts
 ┣ 📂interfaces
 ┃ ┣ 📜bookMarkInput.ts
 ┃ ┣ 📜checklistInput.ts
 ┃ ┣ 📜scheduleInput.ts
 ┃ ┣ 📜subscribeInput.ts
 ┃ ┗ 📜userInput.ts
 ┣ 📂middlewares
 ┃ ┣ 📜errorMiddleware.ts
 ┃ ┣ 📜loginRequired.ts
 ┃ ┣ 📜validator.ts
 ┃ ┣ 📜verifyRefreshToken.ts
 ┃ ┗ 📜verifyToken.ts
 ┣ 📂routes
 ┃ ┣ 📜bookMarkRouter.ts
 ┃ ┣ 📜checklistRouter.ts
 ┃ ┣ 📜scheduleRouter.ts
 ┃ ┣ 📜subscribeRouter.ts
 ┃ ┣ 📜supplementRouter.ts
 ┃ ┗ 📜userRouter.ts
 ┣ 📂services
 ┃ ┣ 📜bookMarkService.ts
 ┃ ┣ 📜checklistService.ts
 ┃ ┣ 📜scheduleService.ts
 ┃ ┣ 📜subscribeService.ts
 ┃ ┣ 📜supplementService.ts
 ┃ ┗ 📜userService.ts
 ┣ 📂swagger
 ┃ ┣ 📂paths
 ┃ ┃ ┣ 📜_index.yaml
 ┃ ┃ ┣ 📜bookmark.yaml
 ┃ ┃ ┣ 📜recommend.yaml
 ┃ ┃ ┣ 📜schedule.yaml
 ┃ ┃ ┣ 📜supplement.yaml
 ┃ ┃ ┗ 📜user.yaml
 ┃ ┗ 📜openapi.yaml
 ┣ 📂utils
 ┃ ┣ 📜emailUtil.ts
 ┃ ┣ 📜error-util.ts
 ┃ ┣ 📜jwt-util.ts
 ┃ ┣ 📜redis.ts
 ┃ ┣ 📜webPush.ts
 ┃ ┗ 📜winston.ts
 ┣ 📜app.ts
 ┗ 📜swagger.yaml
```

</details>

<details>
<summary>Push</summary>

```
📦src
 ┣ 📂controllers
 ┃ ┗ 📜subscribeController.ts
 ┣ 📂db
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜config.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜dailySupplement.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜schedule.ts
 ┃ ┃ ┣ 📜subscribe.ts
 ┃ ┃ ┣ 📜supplement.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┣ 📜Schedule.ts
 ┃ ┗ 📜Subscribe.ts
 ┣ 📂interfaces
 ┃ ┣ 📜subscribeInput.ts
 ┃ ┗ 📜userInput.ts
 ┣ 📂middlewares
 ┃ ┗ 📜errorMiddleware.ts
 ┣ 📂routes
 ┃ ┗ 📜subscribeRouter.ts
 ┣ 📂services
 ┃ ┗ 📜subscribeService.ts
 ┣ 📂utils
 ┃ ┣ 📜emailUtil.ts
 ┃ ┣ 📜error-util.ts
 ┃ ┣ 📜jwt-util.ts
 ┃ ┣ 📜webPush.ts
 ┃ ┗ 📜winston.ts
 ┗ 📜app.ts
```

</details>

<br />

### 📑 와이어 프레임

1. 메인 MVP <br>
   📎[링크](https://whimsical.com/17-ai-8jP8umFsK6ie9HwxFCpchE)
2. 서브 MVP <br>
   📎[링크](https://www.figma.com/file/qUrq2wAdZiNv8KkubpkXIc/AI-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-17%ED%8C%80_%EC%84%9C%EB%B8%8C%EA%B8%B0%EB%8A%A5?node-id=0%3A1)

<br>

### ⚙️ 아키텍쳐

### 1. 전체적인 구조도

<br>

🔔 **Database**

- Redis : **Refresh Token**을 저장하기 위해 사용
- MySQL : Cloud 서버에서 이용하기 위해 Oracle 인스턴스를 **DB 전용 서버**로 구축

🔔 **AI**

- Sklearn : 요청시 학습한 결괏값을 flask 웹 서비스에 반환
- Flask : 결괏값을 **WSGI 서버**인 gunicorn에 전달
- gunicorn : front에 응답

<div align='center'>
  <img src='https://user-images.githubusercontent.com/97580782/177033692-1fc80c04-5c8a-48d1-b76f-25eb52b5f5b4.png' width='800px'>
</div>

<br>

### 2. Docker-Compose 구조

🔔 **Push 서버 분리**

- 서비스 간의 의존도를 낮추기 위해 기존의 Node 서버와 **Push 전송 서버**를 분리

<div align='center'>
  <img src='https://user-images.githubusercontent.com/97580782/179144069-cc3dcfe8-c2dd-44a8-9eea-beec2f4ec045.png' width='450px'>
</div>

<br>

### ☁️ ER Diagram

- ERD Cloud

📎[ERD 보러가기](https://www.erdcloud.com/d/xx8qkkurmF37XyweN)

<div align='center'>
  <img src='https://user-images.githubusercontent.com/97580782/179144557-7c8f4df5-e24d-4b18-b5a1-8b99229fe361.png' width='450px'>
</div>

<br>

### 📜 API Docs

📎[Swagger API 보러가기](https://kdt-ai4-team17.elicecoding.com/api/swagger/)

<br>

### 🤖 인공지능 모델

- 데이터셋 수집

  1. 식품의약품안전처에서 제공하는 OpenAPI로 데이터셋을 수집 <br>
     📎[공공데이터 활용](http://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=C003)
  2. 단종, 개편된 영양제 데이터셋들을 방지하기 위해 “최종수정일시” 컬럼이 **2년 이내**(2021년부터)인 데이터만 사용

  3. **네이버 검색 쇼핑 API**를 사용해 영양제 구매 링크, 이미지 썸네일 컬럼 추가 <br>
     📎[네이버 search API](https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md#%EC%87%BC%ED%95%91)

<br>

- **데이터셋 전처리**

  1. 하나의 컬럼이라도 null인 값 제거

  2. 특수문자 제거 (한글, 숫자, 영어 빼고 모두 삭제)

  3. **OKT**를 사용하여 “주된기능성” 컬럼의 형태소 분석 수행, 의미 없는 한국어 불용어 제거 <br>
     📎[open-korean-text](https://github.com/open-korean-text/open-korean-text)

<br>

- 인공지능 모델 학습 및 테스트

  1. Sklearn의 tfidfvectorizer를 사용해 전처리 한 데이터들의 가중치(tf)를 부여 <br>
     📎[sklearn.feature_extraction.text.TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)

  2. 사용자에게 문장을 입력 받으면 전처리 단계의 2, 3번을 진행 후 저장된 가중치를 이용해서 “주된기능성” 컬럼과의 **유사도 산정**

  3. 유사도가 **가장 높은 순**으로 3개의 영양제 index 응답

  - 만약 같은 유사도를 가진 영양제들이 3개 이상이면 그 중에 랜덤하게 응답

<br>

- **응답 정확도 개선**

  1. 인공지능 모델 학습만으로 모든 단어를 포괄할 수 없어 QA를 수행하며 부족한 부분은 **룰을 추가**

```
  🪄 여자 → 여성, 생리 → 월경, 변비 → 배변 등
```

<br>

### ⚙️ 기술 스택

- Front-end

  - `React`, `TypeScript`, `axios`
  - `Recoil`, `daisyUI`, `Styled components`

- Back-end

  - `Node.js`, `TypeScript`
  - `Flask`, `Python`
  - `Redis`, `MySQL - Sequelize`

- AI

  - `Sklearn - tfidfvectorizer`

- Deployment

- `Docker`, `Docker-compose`, `Nginx`, `gunicorn`, `Certbot - LetsEncrypt`

<br>

## 3. 시연 영상

![시연영상](https://user-images.githubusercontent.com/97580782/191692840-d946beaf-33c9-4b24-92fb-360943c5dc8d.mp4)

<div align='center'>
  <img src='https://user-images.githubusercontent.com/97580782/191693588-f9157b27-17f8-43e4-a65d-a023f1ba5954.gif' width='450px'>
</div>
1. 첫 번째 시연 영상 1분 30초에 나오는 큐알 코드로 모바일에서 구독
2. 스케줄에 등록한 시간에 웹, 앱 모두 푸시 알람
