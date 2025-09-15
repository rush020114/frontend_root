import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/main/MainLayout'
import Home from './pages/main/Home'
import RegService from './pages/servicePage/RegService'

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
        </Route>
      </Routes>
    </>
  )
}

export default App
