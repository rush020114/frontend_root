import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/main/MainLayout'
import Home from './pages/main/Home'
import Join from './pages/user/Join'
import Login from './pages/user/Login'

function App() {
  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route path='/' element={<MainLayout />}>
          {/* 첫 화면 */}
          <Route path=''              element={ <Home /> } />
          <Route path='join'          element={ <Join /> } />
          <Route path='login'         element={ <Login /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App
