import React from 'react'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img_div}>
        
      </div>
      <div className={styles.content}>
        <div className={styles.notice}>공지사항 영역</div>
        <div>미정의 영역</div>
      </div>
      <div className={styles.admin_menu}>
        관리자 메뉴
      </div>
    </div>
  )
}

export default Home