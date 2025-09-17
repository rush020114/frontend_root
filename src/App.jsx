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

function App() {
  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route path='/' element={<MainLayout />}>
          {/* 유저 관리 페이지 */}
          <Route path='bar-chart' element={<UserControl />}/>
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
          {/* Q & A */}
          <Route path='qna' element={<AdminQnA />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
