import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/main/MainLayout'
import Home from './pages/main/Home'
import Join from './pages/user/Join'
import Login from './pages/user/Login'
import UserControl from './pages/user/UserControl'
import RegService from './pages/menu/RegService'
import CompanyProfile from './pages/menu/CompanyProfile'
import CustomerService from './pages/menu/CustomerService'
import AdminHome from './pages/admin/AdminHome'
import ManageUser from './pages/admin/ManageUser'
import AdminQnA from './pages/admin/AdminQnA'
import ManageService from './pages/admin/ManageService'
import MyPageLayout from './layout/mypage/MyPageLayout'
import PlantChatbot from './pages/menu/PlantChatbot'
import TempDetail from './pages/user/TempDetail'
import HumDetail from './pages/user/HumDetail'
import SoilHumDetail from './pages/user/SoilHumDetail'
import IllumDetail from './pages/user/IllumDetail'
import UserInfo from './pages/user/UserInfo'
import UserQnA from './pages/user/UserQnA'
import UserQnADetail from './pages/user/UserQnADetail'
import AdminQnADetail from './pages/admin/AdminQnADetail'
import UserQnAUpdate from './pages/user/UserQnAUpdate'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useWebSocket } from './hooks/useWebSocket'
import Notice from './pages/admin/Notice'
import RegNotice from './pages/admin/RegNotice'
import NoticeDetail from './pages/admin/NoticeDetail'
import axios from 'axios'
import { SERVER_URL } from './constants/webConst'

function App() {

  // localStorage 알림 목록을 저장할 state 변수(adminHome 리렌더링)
  const [alerts, setAlerts] = useState([]);

  // 총 이용자 수 오늘 방문자 수를 저장할 변수
  const countCustomer = useRef({});

  // 로그인 정보를 세팅할 state 변수
  const [loginData, setLoginData] = useState(() => {
    const loginInfo = sessionStorage.getItem('loginInfo');
    return loginInfo ? JSON.parse(loginInfo) : null;
  });

  // 관리자 알림 개수
  const [adminNotiCnt, setAdminNotiCnt] = useState(0);

  // 이용자 알림 개수
  const [userNotiCnt, setUserNotiCnt] = useState(0);

  // localStorage 저장 때 실행될 함수
  const updateAlerts = () => {
    const savedAlerts = JSON.parse(localStorage.getItem('admin_alerts') || []);
    setAlerts(savedAlerts);
  };

  // 로그인 처리 함수
  const handleLogin = () => {
    const loginInfo = sessionStorage.getItem('loginInfo');
    loginInfo
    if(loginInfo){
      setLoginData(JSON.parse(loginInfo));
    };
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setLoginData(null);
    setAdminNotiCnt(0);
    setUserNotiCnt(0);
  };

  // websocket에서 알림 받을 때 실행되는 함수
  const handleNoti = useCallback(isAdmin => {
    console.log('handleNoti 실행')
    if(isAdmin){
      setAdminNotiCnt(prev => prev + 1);
    }
    else{
      setUserNotiCnt(prev => prev + 1);
    };
  }, []);

  // 배지 클릭 시 알림 개수 초기화
  const resetNotiCnt = (isAdmin) => {
    if(isAdmin){
      setAdminNotiCnt(0);
    }
    else{
      setUserNotiCnt(0);
    }
  };

  // websocket 연결
  const isAdmin = loginData?.userRole === 'ADMIN';
  useWebSocket(loginData?.userId, isAdmin, handleNoti, resetNotiCnt, updateAlerts)

   /*
    방문자 카운트 API 호출 함수
    페이지 로드 시 한 번만 실행
    */
  useEffect(() => {
    axios.post(`${SERVER_URL}/visitor/count`)
    .then(res => countCustomer.current = res.data)
    .catch(e => console.log(e));
  }, []);

  console.log(countCustomer)

  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route path='/' element={<MainLayout 
          loginData={loginData}
          onLogout={handleLogout}
          adminNotiCnt={adminNotiCnt}
          userNotiCnt={userNotiCnt}
          onResetCnt={resetNotiCnt}
        />}>
          {/* 첫 화면 */}
          <Route path='join'          element={ <Join /> } />
          <Route path='login'         element={ <Login 
            onLogin={handleLogin}
          /> } />
          <Route path='' element={<Home />} />
          {/* 서비스 신청 화면 */}
          <Route path='service' element={<RegService />} />
          {/* 회사 소개 */}
          <Route path='company-profile' element={<CompanyProfile />} />
          {/* 고객센터 */}
          <Route path='customer-service' element={<CustomerService />} />
          {/* 식물 검색 페이지 (챗봇) */}
          <Route path='plant-chat' element={ <PlantChatbot/> }/>
          {/* 공지 상세 */}
          <Route path='notice/:noticeId' element={<NoticeDetail />} />
        </Route>
        {/* 관리자 페이지 */}
        <Route path='/admin' element={<MainLayout 
          loginData={loginData}
          onLogout={handleLogout}
          adminNotiCnt={adminNotiCnt}
          onResetCnt={resetNotiCnt}
        />}>
          {/* 메인 */}
          <Route path='home' element={<AdminHome 
            countCustomer={countCustomer}
            alerts={alerts}
            setAlerts={setAlerts}
          />} />
          {/* 회원관리  */}
          <Route path='manage-user' element={<ManageUser />} />
          {/* 서비스 신청 관리  */}
          <Route path='manage-service' element={<ManageService />} />
          {/* 관리자 문의 목록 */}
          <Route path='qna' element={<AdminQnA 
            notiCnt={adminNotiCnt}
          />} />
          {/* 관리자 문의 답변 */}
          <Route path='qna/:qstId' element={<AdminQnADetail />} />
          {/* 공지사항 */}
          <Route path='notice' element={<Notice />} />
          {/* 공지 등록 */}
          <Route path='reg-notice' element={<RegNotice />} />
        </Route>
        {/* 마이 페이지 */}
        <Route path='/user' element={<MyPageLayout 
          loginData={loginData}
          onLogout={handleLogout}
          adminNotiCnt={adminNotiCnt}
          userNotiCnt={userNotiCnt}
          onResetCnt={resetNotiCnt}
        />}>
          {/* 내 정보 */}
          <Route path='' element={<UserInfo 
            notiCnt={userNotiCnt}
          />}/>
          {/* 농장 모니터링 페이지 */}
          <Route path='bar-chart' element={<UserControl />}/>
          {/* 온도 */}
          <Route path='temp' element={<TempDetail />}/>
          {/* 습도 */}
          <Route path='hum' element={<HumDetail />}/>
          {/* 토양습도 */}
          <Route path='soilHum' element={<SoilHumDetail />}/>
          {/* 조도 */}
          <Route path='illum' element={<IllumDetail />}/>
          {/* 문의 */}
          <Route path='qna' element={<UserQnA />}/>
          {/* 이용자 문의 상세 */}
          <Route path='qna/:qstId' element={<UserQnADetail />}/>
          {/* 이용자 문의 수정 */}
          <Route path='qna/update/:qstId' element={<UserQnAUpdate />}/>
        </Route >
      </Routes>

      {/* ⭐ Toast 컨테이너: 알림 팝업이 여기에 뜸 */}
      <ToastContainer 
        position="top-right"          // 위치: 우측 상단
        autoClose={3000}              // 3초 후 자동 닫힘
        hideProgressBar={true}       // 진행바 표시
        newestOnTop={true}            // 새 알림이 위로
        closeOnClick                  // 클릭하면 닫힘
        pauseOnHover                  // 마우스 올리면 멈춤
        draggable                     // 드래그 가능
        theme="light"                 // 테마: light/dark/colored
      />
    </>
  )
}

export default App
