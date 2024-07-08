![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=200&section=header&text=3팀%20Taskify&fontSize=90)


## 프로젝트 소개

안녕하세요! 저희 팀은 코드잇 스프린트 6기 3팀으로, 중급 프로젝트 Taskify를 진행하고 있습니다.<br>
Taskify는 스마트한 일정 관리 플랫폼으로, 웹 애플리케이션을 통해 일상적인 일정과 할 일을<br>효율적으로 관리할 수 있도록 도와줍니다.
<br>

## 팀원 소개

<div>

| Leader 이동석 | member 이영훈 | member 박지민 | member 장혜민 | member 안상균 |
| :------: | :------: | :------: | :------: | :------: |
| [<img src="https://github.com/part3-team3/team3-taskify/assets/89232159/330202e1-2950-4163-a631-d990f9c6d084" height=150 width=150> <br/>  이동석](https://github.com/Lee-Dong-Seok) | [<img src="https://github.com/part3-team3/team3-taskify/assets/89232159/53db5454-e7b4-487e-9f05-56c90a6c02b3" height=150 width=150> <br/> 이영훈](https://github.com/tkddbs587) | [<img src="https://github.com/part3-team3/team3-taskify/assets/89232159/8505b6e5-c3c6-4ef0-b939-7076004f197b" height=150 width=150> <br/> 박지민](https://github.com/JiminN2) | [<img src="https://github.com/part3-team3/team3-taskify/assets/89232159/b188da72-a8d5-4a9e-8c6e-6b6d2dc6280f" height=150 width=150> <br/> 장혜민](https://github.com/hnitam) | [<img src="https://github.com/part3-team3/team3-taskify/assets/89232159/5efd1701-1c8e-4e62-b949-4cb296fb8c6f" height=150 width=150> <br/> 안상균](https://github.com/emotigom) |


</div>
<br>

## 개발 환경


<div align="center">
    <img src="https://github.com/part3-team3/team3-taskify/assets/89232159/8716c52a-1526-4d27-a692-7cf1b5afba21" height=50 width=100>
  <div>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=white"/>
  <img src="https://img.shields.io/badge/git-F05032?style=flat&logo=Prettier&logoColor=white"/>
 <img src="https://img.shields.io/badge/github-181717?style=flat&logo=Prettier&logoColor=white"/>
</div></div>



<br>

## 채택한 개발 기술
<div align="center">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white"/>
  <img src="https://img.shields.io/badge/tailwind%20Css-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
</div>
<br>

## 컨벤션과 브랜치 전략

- **커밋 유형은 영어 대문자로 작성하기**

    | 커밋 유형 | 의미 |
    | --- | --- |
    | Feat | 새로운 기능 추가 |
    | Fix | 버그 수정 |
    | Docs | 문서 수정 |
    | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
    | Refactor | 코드 리팩토링 |
    | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
    | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
    | Design | CSS 등 사용자 UI 디자인 변경 |
    | Comment | 필요한 주석 추가 및 변경 |
    | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
    | Remove | 파일을 삭제하는 작업만 수행한 경우 |
    | !BREAKING CHANGE | 커다란 API 변경의 경우 |
    | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

- **핸들러 이름**
    - camelCase → ex) handleInputChange
- **함수**
    - 기본: 화살표함수
- **상수**
    - 대문자 ex) PAGE_SIZE
- **변수**
    - camelCase → ex) inputItem
- **파일명**
    - lib 폴더: axios 인스턴스 파일 ex) → axios.ts
    - pages 폴더: 피그마 url 따라서
    - components 폴더: PascalCase
        
               ex) → BestProducts.tsx
        
- **브랜치 전략**
    - 2개 - main, develop, feature

<br>

## 프로젝트 구조
team3-taskify/<br/>
│ <br/>
├── components<br/>
│   └── common // 공통 컴포넌트 관리<br/>
│       └── index.tsx<br/>
│     <br/>
├── pages // Next.js 페이지 라우팅<br/>
│   └─ index.tsx<br/>
│      <br/>
├── hooks // 커스텀 훅 <br/>
│ <br/>
├── lib // 라이브러리 관련 파일 관리 (fetch 함수)<br/>
│  <br/>
├── styles // 글로벌 css 관리 <br/>
│   <br/>
├── public // 이미지 icon, logo 폴더로 관리<br/>
│   └── images<br/>
│           <br/>
├── types // 반복되는 타입들 관리 <br/>
│ <br/>
└── utils // 헬퍼 함수, 유틸 파일들 관리<br/>
<br>

## 역할 분담

| Leader 이동석 | member 이영훈 | member 박지민 | member 장혜민 | member 안상균 |
| :------: | :------: | :------: | :------: | :------: |
| 로그인/회원가입 페이지,<br/> 마이페이지,<br/> 메인(랜딩) 페이지 구현 | 프로젝트 기초 세팅 담당,<br/> 레포지토리 생성 담당,<br/> 할 일 카드 모달,<br/> 할 일 생성 모달,<br/> 할 일 수정 모달,<br/> 카드 삭제 구현 | [userflow 제작 담당](https://www.figma.com/board/YdH1MG74F6AmsCPhQhL35C/3%ED%8C%80-Taskify-userflow?node-id=0-1&t=a2729wQjvvzMef25-0),<br/> 노션 프로젝트 페이지<br/> 제작 담당,<br/> nav바,<br/> 초대하기 모달창,<br/> 대시보드 수정 구현 | 회의 기록 정리 담당,<br/> 사이드 메뉴 바,<br/> 마이대시보드 페이지 구현,<br/> 프로젝트 배포 담당 | readme 파일 작성 담당,<br/> 칼럼 추가 모달,<br/> 공용 모달 틀,<br/> 칼럼 수정 모달,<br/> 칼럼 삭제 모달 구현,<br/> 발표 담당 |

<br>

## 개발 기간
- 기획 및 분석 6/20~6/22
- 주제 선정 6/19~6/21
- 업무 분배 6/21~6/22
- 화면구현 및 기능 구현 6/24~7/5
- 발표 7/5~7/9?
- 🔉팀미팅 매일 11시~12시
- 🔥코어타임 매일 14시~18시

<br>

## 이번 프로젝트의 특징
- 이영훈
    - Taskify에서 모달을 정말 많이 사용하기때문에 공용 모달을 만들고 그 안에 각각 다른 모달들의 요소들을 children으로 채우는 식으로 구현했습니다.
- 로그인/회원가입 페이지
    
    토큰을 저장하는 방식을 로컬 스토리지에 저장할지 쿠키에 저장할지 고민했습니다.
    로컬 스토리지는 기초 프로젝트 때 사용해봐서 이번 프로젝트는 실무 에서도 많이 사용하고 있는 쿠키에 저장하는 방식으로 구현했습니다.
    유효성 검사를 focusEvent를 사용해서 구현했습니다.
    서버에서 보내주는 리스폰스 메세지를 활용해서 에러 메세지를 모달 창으로 띄웠습니다.
    회원 가입을 성공했을 때 동시에 로그인도 될 수 있게 구현했습니다.
    
- 대시보드수정 페이지
    - 대시보드를 처음 만든 사람만 대시보드 이름, 색,구성원을 변경할 수 있다
    - 대시보드 구성원,초대내역 불러오기
        - 구성원과 초대한 이메일 리스트를 페이지네이션으로 볼 수 있다
        - ‘초대하기’버튼을 눌러 초대내역에 추가할 수 있다.
    
- 칼럼
    
    이 부분은 사용자가 직관적으로 칼럼을 생성하고 수정할 수 있어야 해서 알아보기 쉬운 인터페이스로 되어 있습니다. 버튼이나 인풋상자에 오작동이 일어나지 않으면서도 빠르게 응답하도록 고민했습니다.
    
- 마이대시보드 페이지
    - 내 대시보드
        - 내가 만든 대시보드와 초대 수락한 대시보드의 목록을 커서기반 페이지네이션로 구현했다.
        대시보드 생성모달에서 대시보드를 생성할 수 있다. 내가 만든 대시보드에는 옆에 왕관 아이콘이 표시된다.
    - 초대받은 대시보드
        - 초대받은 대시보드의 목록을 무한스크롤로 볼 수 있다. 초대에 응답할 수 있다
    - 사이드바
        - 전체 대시보드의 목록을 커서기반 페이지네이션로 구현했다. 대시보드페이지로 이동 시 해당 대시보드에 보라색으로 선택 표시가 나타난다.
<br>

## 트러블 슈팅

- 이영훈
    - IntersectionObserver로 댓글 무한 스크롤 기능 구현 중 맨 아래 댓글에서 멈추지 않고 이전과 똑같은 댓글이 반복해서 불러와지는 현상이 발생했습니다.
    - 원인은 관찰하는 요소가 화면에 보일 때마다 cursor를 업데이트하고, useEffect가 다시 실행되면서 cursorId와 cursor가 업데이트되면서 무한 반복이 발생했습니다
    - 이를 해결하기 위해 cursorId와 cursor를 비교하여 중복 댓글 데이터 패칭을 방지하고 filter() 메서드와 some() 메서드를 사용하여 이전 댓글 목록에 포함되지 않은 댓글들만 추가하도록 해결했습니다.

- 마이페이지
    
    - 프로필 이미지를 변경하고 서버로 보내는 과정에서 여러가지 방법으로 요청을 많이 시도를 했으나 network에서 계속 400에러 발생.
    - 스웨거분석을 잘못해서 올바르지 못한 리퀘스트로 계속 프로필 이미지 값을 보냈습니다.
    - 스웨거를 다시 분석해서 프로필 이미지 값을 폼 데이터를 사용해서 리퀘스트를 보내니 해결되었습니다.
    
- 칼럼 페이지

    - 칼럼이나 카드를 생성하는 모달이 생각했던것처럼 잘 작동이 안되었습니다.
    - 상태가 제대로 업데이트되지 않는듯 하면서 렌더링이 되지 않는 느낌이었습니다.
    - 생성용 모달에 useState를 사용해서 열림과 닫힘 상태를 관리하는 구조를 통해 해결할 수 있었습니다.

- 마이대시보드 페이지
    
    POST 요청, PUT 요청 시 화면에 렌더링된 컴포넌트에 업데이트된 요소가 적용되지 않는 문제.
    - 대시보드 생성, 초대받은 대시보드 수락 시 생성된 대시보드,수락한 대시보드가 사이드바와 대시보드 목록에 바로 반영되지 않음
        - 대시보드가 화면에 추가되어야 하기 때문에 상태관리, useEffect 의존성 배열을 통해 요청마다 데이터들을 요청해 다시 렌더링하도록 함.
    - 초대받은 대시보드 응답(수락,거절) 시 새로고침하지 않으면 대시보드가 목록에 그대로 남아 있음
        - 대시보드가 화면에서 제거되어야 하기 때문에 응답한 대시보드 id와 같은 대시보드만 안보이도록 필터링함.
<br>

## 프로젝트 후기

- 이영훈
  
    - 협업에서의 소통의 중요성을 확실하게 느꼈고 프로젝트 준비 단계에서 팀 내 규칙을 더 확실하게 정해야 되겠다고 생각 했습니다.

- 이동석
    
    일정을 잘못 계획하게 되면 팀원들에게 피해를 줄 수 있다는 걸 이번 기회에 알게 되었고  팀원들과 소통 하는 것에 대해서도 정말 중요하다고 생각이 들었습니다.
    
- 박지민
    
    프로젝트의 난이도가 높아질수록 팀원 간 소통의 중요성을 크게 느꼈습니다. 서로 도움을 주려 노력한 팀원들께 감사하고 기술적인 것을 포함해 많은 것을 배웠습니다. 
    
- 안상균
    
    제가 다소 준비가 안된 상태에서 시작했지만 많이 배우는 계기가 되었습니다. 타이트한 일정에도 프로젝트에 밤낮으로 고생해서 결과물을 만들어낸 팀원분들이 자랑스럽습니다.
    
- 장혜민
    
    프로젝트를 통해 ts와 Next.js에 대해 좀 더 익숙해지는 계기가 된 것 같습니다.
    모르 것을 물어봤을 친절하게 답변해 주어서 팀원들에게 감사합니다. 덕분에 팀 활동을 하면서 소통해나가는 것을 배웠습니다.
