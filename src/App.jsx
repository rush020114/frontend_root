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
import TempHumDetail from './pages/user/TempHumDetail'
import SoilHumDetail from './pages/user/SoilHumDetail'
import IllumDetail from './pages/user/IllumDetail'
import UserInfo from './pages/user/UserInfo'
import UserQnA from './pages/user/UserQnA'

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
        </Route>
        {/* 관리자 페이지 */}
        <Route path='/admin' element={<MainLayout />}>
          {/* 메인 */}
          <Route path='home' element={<AdminHome />} />
          {/* 회원관리  */}
          <Route path='manage-user' element={<ManageUser />} />
          {/* 서비스 신청 관리  */}
          <Route path='manage-service' element={<ManageService />} />
          {/* Q & A */}
          <Route path='qna' element={<AdminQnA />} />
        </Route>
        {/* 마이 페이지 */}
        <Route path='/user' element={<MyPageLayout />}>
          {/* 내 정보 */}
          <Route path='info' element={<UserInfo />}/>
          {/* 농장 모니터링 페이지 */}
          <Route path='bar-chart' element={<UserControl />}/>
          {/* 온/습도 */}
          <Route path='tempHum' element={<TempHumDetail />}/>
          {/* 토양습도 */}
          <Route path='soilHum' element={<SoilHumDetail />}/>
          {/* 조도 */}
          <Route path='illum' element={<IllumDetail />}/>
          {/* 문의 */}
          <Route path='qna' element={<UserQnA />}/>
        </Route >
      </Routes>
    </>
  )
}

export default App
