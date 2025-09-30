import React from 'react'
import styles from './MainHeader.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

const MainHeader = () => {

  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.member}>
        <div>회원가입</div>
        |
        <div>로그인</div>
      </div>
      <div className={styles.menu_div}>
        <div className={styles.logo}>
          <img src="/root.png" 
            onClick={() => {nav('/')}}
          />
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to={'/company-profile'}
              className={({isActive}) => isActive ? styles.active : null}
            >회사소개</NavLink>
          </li>
          <li>
            <NavLink
              to={'/service'}
              className={({isActive}) => isActive ? styles.active : null}
            >서비스 신청</NavLink>  
          </li>
          <li>
            <NavLink
              to={'/plant-chat'}
              className={({isActive}) => isActive ? styles.active : null}
            >AI 검색</NavLink>
          </li>          
          <li>
            <NavLink
              to={'/customer-service'}
              className={({isActive}) => isActive ? styles.active : null}
            >고객센터</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainHeader