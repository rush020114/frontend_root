import React, { useEffect, useState } from 'react'
import styles from './MainHeader.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

const MainHeader = ({onLogout, notiCnt, onResetCnt}) => {

  const nav = useNavigate();

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  return (
    <div className={styles.container}>
      <div className={styles.member}>
        {
          !loginData
          ?
          <>
          <div
            onClick={() => nav('/join')}
          >회원가입</div>
          |
          <div
            onClick={() => nav('/login')}
          >로그인</div>
          </>
          :
          <>
          <div
            style={{cursor: 'default'}}
          >
            {`${loginData.userId}님 환영합니다.`}
          </div>
          |
          <div
            onClick={() => {
              nav('/user');
              onResetCnt(false);
            }}
            style={{position: 'relative'}}
            >
            👩‍🌾 내 농장
            {notiCnt > 0 &&
            (<span
              className='badge'
              style={{top: '-7px', right: '-15px'}}
            >
              {notiCnt > 99 ? '99+' : notiCnt}
            </span>)}
          </div>
          |
          <div
            onClick={() => {
              nav('/');
              sessionStorage.removeItem('loginInfo');
              onLogout();
            }}
          >
            로그아웃
          </div>
          </>
        }
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