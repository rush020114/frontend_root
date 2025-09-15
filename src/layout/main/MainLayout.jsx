import React from 'react'
import styles from './MainLayout.module.css'
import { Outlet } from 'react-router-dom'
import MainHeader from './MainHeader'

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MainHeader />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout