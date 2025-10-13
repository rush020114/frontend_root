import React from 'react'
import styles from './MyPageLayout.module.css'
import { Outlet } from 'react-router-dom'
import MainHeader from '../main/MainHeader'
import AdminMenu from '../../component/adminMenu/AdminMenu'
import MainFooter from '../main/MainFooter'
import MyPageMenu from './MyPageMenu'

const MyPageLayout = ({loginData, onLogout, userNotiCnt, onResetCnt}) => {
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
        <div className={styles.mypage_menu}>
          <MyPageMenu 
            notiCnt={userNotiCnt}
            onResetCnt={onResetCnt}
          />
        </div>
        <div className={styles.content_div}>
          <Outlet />
        </div>
        {
          loginData?.userRole === 'ADMIN'
          &&
          <AdminMenu />
        }
      </div>
      <div className={styles.footer}>
        <MainFooter />
      </div>
    </div>
  )
}

export default MyPageLayout