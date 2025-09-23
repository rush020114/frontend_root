import React, { useState, useEffect } from 'react'
import styles from './MyPageMenu.module.css'
import { NavLink, useLocation } from 'react-router-dom';

const MyPageMenu = () => {
  const location = useLocation();

  // 경로와 메뉴 이름 매핑
  const getMenuNameByPath = (pathname) => {
    const pathMap = {
      '/user': '내 정보',
      '/user/bar-chart': '마이팜',
      '/user/tempHum': '온/습도',
      '/user/soilHum': '토양습도',
      '/user/illum': '조도',
      '/user/qna': '문의'
    };
    return pathMap[pathname] || '문의';
  };

  // 현재 경로에 따라 초기값 설정
  // 함수 정의문이 들어갔지만 리액트 자체 설계에서 마운트 시에만 실행하게끔 만들어져 있다.
  // 다른 state 변경 렌더링 시에는 실행하지 않는다.
  // 함수 호출을 초기값으로 잡을 시 다른 리렌더링 시 최근값 규칙으로 호출이 되어도 반영이 되진 않지만 호출 자체는 되어 비효율적이다.
  const [menuName, setMenuName] = useState(() => getMenuNameByPath(location.pathname));

  // 경로가 변경될 때마다 메뉴 이름 업데이트
  useEffect(() => {
    setMenuName(getMenuNameByPath(location.pathname));
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {menuName}
      </div>
      <div className={styles.menu_div}>
        <ul className={styles.menu}>
          <li onClick={() => setMenuName('내 정보')}>
            <NavLink
              to={'/user'} 
              end
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