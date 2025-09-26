import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/main/MainLayout'
import Home from './pages/main/Home'
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

function App() {
  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route path='/' element={<MainLayout />}>
          {/* 첫 화면 */}
          <Route path='' element={<Home />} />
          {/* 서비스 신청 화면 */}
          <Route path='service' element={<RegService />} />
          {/* 회사 소개 */}
          <Route path='company-profile' element={<CompanyProfile />} />
          {/* 고객센터 */}
          <Route path='customer-service' element={<CustomerService />} />
          {/* 식물 검색 페이지 (챗봇) */}
          <Route path='plant-chat' element={ <PlantChatbot/> }/>
        </Route>
        {/* 관리자 페이지 */}
        <Route path='/admin' element={<MainLayout />}>
          {/* 메인 */}
          <Route path='home' element={<AdminHome />} />
          {/* 회원관리  */}
          <Route path='manage-user' element={<ManageUser />} />
          {/* 서비스 신청 관리  */}
          <Route path='manage-service' element={<ManageService />} />
          {/* 관리자 문의 목록 */}
          <Route path='qna' element={<AdminQnA />} />
          {/* 관리자 문의 답변 */}
          <Route path='qna/:qstId' element={<AdminQnADetail />} />
        </Route>
        {/* 마이 페이지 */}
        <Route path='/user' element={<MyPageLayout />}>
          {/* 내 정보 */}
          <Route path='' element={<UserInfo />}/>
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
    </>
  )
}

export default App
