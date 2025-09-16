import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/main/MainLayout'
import Home from './pages/main/Home'
import UserControl from './pages/user/UserControl'

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
        </Route>
      </Routes>
    </>
  )
}

export default App
