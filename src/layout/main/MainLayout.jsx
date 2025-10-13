import React from 'react'
import styles from './MainLayout.module.css'
import { Outlet } from 'react-router-dom'
import MainHeader from './MainHeader'
import AdminMenu from '../../component/adminMenu/AdminMenu'
import MainFooter from './MainFooter'

const MainLayout = ({loginData, onLogout, adminNotiCnt, userNotiCnt, onResetCnt}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MainHeader 
          onLogout={onLogout}
          notiCnt={userNotiCnt}
          onResetCnt={onResetCnt}
        />
      </div>
      <div className={styles.content}>
        <Outlet />
        {
          loginData?.userRole === 'ADMIN'
          &&
          <AdminMenu 
            notiCnt={adminNotiCnt}
            onResetCnt={onResetCnt}
          />
        }
      </div>
      <div className={styles.footer}>
        <MainFooter />
      </div>
    </div>
  )
}

export default MainLayout