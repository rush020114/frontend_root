import React, { useState } from 'react'
import styles from './MyPageMenu.module.css'
import { NavLink } from 'react-router-dom';

const MyPageMenu = () => {

  // 메뉴 이름을 저장할 state 변수
  const [menuName, setMenuName] = useState('내 정보');

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {menuName}
      </div>
      <div className={styles.menu_div}>
        <ul className={styles.menu}>
          <li onClick={() => setMenuName('내 정보')}>
            <NavLink
              to={'/user/info'}
              className={({isActive}) => isActive ? styles.active : null}
            >내 정보</NavLink>
          </li>
          <li onClick={() => setMenuName('마이팜')}>
            <NavLink
              to={'/user/bar-chart'}
              className={({isActive}) => isActive ? styles.active : null}
            >마이팜</NavLink>
          </li>
          <li onClick={() => setMenuName('온/습도')}>
            <NavLink
              to={'/user/tempHum'}
              className={({isActive}) => isActive ? styles.active : null}
            >온/습도</NavLink>
          </li>
          <li onClick={() => setMenuName('토양습도')}>
            <NavLink
              to={'/user/soilHum'}
              className={({isActive}) => isActive ? styles.active : null}
            >토양습도</NavLink>
          </li>
          <li onClick={() => setMenuName('조도')}>
            <NavLink
              to={'/user/illum'}
              className={({isActive}) => isActive ? styles.active : null}
            >조도</NavLink>
          </li>
          <li onClick={() => setMenuName('문의')}>
            <NavLink
              to={'/user/qna'}
              className={({isActive}) => isActive ? styles.active : null}
            >문의</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyPageMenu