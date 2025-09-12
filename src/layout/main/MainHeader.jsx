import React from 'react'
import styles from './MainHeader.module.css'
import { NavLink } from 'react-router-dom'

const MainHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.member}>
        <div>회원가입</div>
        |
        <div>로그인</div>
      </div>
      <div className={styles.menu_div}>
        <div className={styles.logo}>
          <img src="root.png" />
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink>회사소개</NavLink>
          </li>
          <li>
            <NavLink>서비스 신청</NavLink>
          </li>
          <li>
            <NavLink>고객센터</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainHeader