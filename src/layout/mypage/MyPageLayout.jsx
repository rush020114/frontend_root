import React from 'react'
import styles from './MyPageLayout.module.css'
import { Outlet } from 'react-router-dom'
import MainHeader from '../main/MainHeader'
import AdminMenu from '../../component/adminMenu/AdminMenu'
import MainFooter from '../main/MainFooter'

const MyPageLayout = () => {
  return (
     <div className={styles.container}>
      <div className={styles.header}>
        <MainHeader />
      </div>
      <div className={styles.content}>
        <Outlet />
        <AdminMenu />
      </div>
      <div className={styles.footer}>
        <MainFooter />
      </div>
    </div>
  )
}

export default MyPageLayout