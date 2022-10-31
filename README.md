# Application
react-native를 이용한 front-end 개발

v0.0.0
- project 생성

v0.0.1
- Login UI 구성

v0.0.2
- Home UI prototype 작성

v0.1.0
- 화면 네비게이션 구조 구성

v0.1.1
- ~~Tab Bar에 사용할 icons assets 추가~~(v0.1.2에 추가된 Ionicons 사용)

v0.1.2
- React Native Ionicons를 이용하여 Tab Bar icons 추가

v0.1.3
- App.js 파일 화면별로 js파일 분리 및 Home화면 UI 일부 변경

v0.1.4
- 메인화면(Tab스크린) 구성 js파일 mainTabScreen으로 분리 및 회원가입 화면 기본 UI 구성

v0.1.5
- 회원가입 화면 password 일치 여부 출력하는 함수 작성중
- Home 화면 잔여 날짜 출력하는 내용 추가중

v0.1.6
- MyTextInput : 커스텀 TextInput 컴포넌트 생성
- MyButton :  커스텀 MyButton 컴포넌트 생성
- 회원가입 화면 MyTextInput, MyButton 컴포넌트 사용해서 간소화 및 디자인 수정
- 패스워드 일치여부 useEffect 사용해서 구현 완료

v0.1.7
- 시작화면, 로그인, 회원가입 디자인 통일
- 회원가입 아이디 중복버튼 추가해야함

v0.1.8
- fetch() 메소드 사용하여 데이터 받아온 뒤 화면에 렌더링 테스트

v0.1.9
- Join화면에서 회원가입 완료시 Login화면으로 이동하는 기능 추가
- Mybutton, MyTextInput 일부 수정 (회원가입시 ID입력란 별도로 사용할수 있게끔 수정)

v0.2.0
- API명세서를 이용해 회원가입시 데이터를 넣는 기능 추가

v0.2.1
- 로그인 기능 구현 완료

v0.2.2
- 회원가입 시 아이디 중복 시 버튼 비활성화 기능 추가
- 회원가입 기능 구현 완료

v0.2.3
- 레시피에 필요한 배열 DB에서 불러오는 코드 추가

v0.2.4
- Recipe List를 불러오는 FlatList 구현

v0.2.5
- RecipeList, FoodList Custom_Component로 제작
- home 화면 DB에서 불러오도록 수정
- Recipe화면, List화면 사진 출력 및 UI 일부 수정

v0.2.6
- 식재료 리스트 검색 기능 추가
- 캘린더 추가 (기능 구현은 아직 X)
- 식재료 추가 버튼 + 팝업창 띄우는 것까지만 구현
- 설정화면 스택 네비게이터 생성, 주석 정리 (22.07.08)
- 설정화면 기본 UI 구성 (22.07.22)

v0.2.7
- 세팅화면 -> 로그아웃 버튼 구현
- 사용자 정보 수정 기본적인 UI 구성 ==> 사용자 정보 변경 관련 API 사용해서 닉네임, ID 불러오도록 하기
- 식재료 추가 화면 스택으로 구성 + 기본UI 구성 ==> 카메라 연결, picker 사용해서 선택, 날짜입력 구현하기 (22.07.25)
- 식재료 추가 화면 카메라 연결, dropdown picker 사용 + zIndex설정 완료 (22.08.07)

v0.2.8
(22.10.15)
- KeyboardAvoidingView 추가해서 키보드 입력 시 입력창 가리는 현상 해결 (로그인 화면)
- 회원가입, 식재료추가 같이 인풋이 많은 화면에는 react-native-keyboard-aware-scroll-view의 KeyboardAwareScrollView를 사용해서 키보드 입력 시 스크롤 가능하도록 해줌
- 키보드 바깥 터치 시 키보드 사라지도록 (TouchableWithoutFeedback 사용)
- picker 하나만 열리게 함
- 식재료 추가하면 바로 식재료 화면으로 넘어가서 렌더링되도록 수정
(22.10.16)
- 바코드 스캐너 샘플 추가(식재료 추가 화면에서 확인)

v0.2.9
(22.10.13)
- 식재료 정보 확인 페이지 추가
 - 식재료 정보 수정 페이지, 삭제버튼 추가
 - API적용은 아직 X

v0.2.10
(22.11.01)
- 식재료 정보 수정 구현
- 바코드 스캔 시 이전 화면으로 돌아가는거 추가/수정 별로 나눠야 되는데 안됨
- 바코드 스캔한 값 받아서 open API로 음식 이름 받아오기