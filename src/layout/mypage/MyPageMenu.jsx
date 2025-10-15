import React, { useState, useEffect } from 'react'
import styles from './MyPageMenu.module.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPageMenu = ({notiCnt, onResetCnt}) => {
  const location = useLocation();

  const nav = useNavigate();

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 서비스 신청자인지 판단할 state 변수
  const [isApplicant, setIsApplicant] = useState(null);

  // 경로와 메뉴 이름 매핑
  const getMenuNameByPath = (pathname) => {
    const pathMap = {
      '/user': '내 정보',
      '/user/bar-chart': '마이팜',
      '/user/temp': '온도',
      '/user/hum': '습도',
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

  // 서비스 신청 여부를 판단할 useEffect
  useEffect(() => {
    axios.get(`/api/applications/${loginData.userId}`)
    .then(res => setIsApplicant(res.data.apprDate))
    .catch(e => console.log(e));
  }, []);

  const handleServiceClick = e => {
    if(loginData.userRole !== 'ADMIN'){
      if(!isApplicant){
        alert('서비스 신청 후 이용해주십시오.');
        e.preventDefault();
        nav('/service');
        return;
      };
    };
  };

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
              style={{position: 'relative'}}
              onClick={() => onResetCnt(false)}
            >
              내 정보
              {notiCnt > 0 && (
                <span
                  className='badge'
                  style={{top: '5px', left: '65px'}}
                >
                  {notiCnt > 99 ? '99+' : notiCnt}
                </span>
              )}
            </NavLink>
          </li>
          <li onClick={() => setMenuName('마이팜')}>
            <NavLink
              to={'/user/bar-chart'}
              className={({isActive}) => isActive ? styles.active : null}
              onClick={(e) => handleServiceClick(e)}
            >마이팜</NavLink>
          </li>
          <li onClick={() => setMenuName('온도')}>
            <NavLink
              to={'/user/temp'}
              className={({isActive}) => isActive ? styles.active : null}
              onClick={(e) => handleServiceClick(e)}
            >온도</NavLink>
          </li>
          <li onClick={() => setMenuName('습도')}>
            <NavLink
              to={'/user/hum'}
              className={({isActive}) => isActive ? styles.active : null}
              onClick={(e) => handleServiceClick(e)}
            >습도</NavLink>
          </li>
          <li onClick={() => setMenuName('토양습도')}>
            <NavLink
              to={'/user/soilHum'}
              className={({isActive}) => isActive ? styles.active : null}
              onClick={(e) => handleServiceClick(e)}
            >토양습도</NavLink>
          </li>
          <li onClick={() => setMenuName('조도')}>
            <NavLink
              to={'/user/illum'}
              className={({isActive}) => isActive ? styles.active : null}
              onClick={(e) => handleServiceClick(e)}
            >조도</NavLink>
          </li>
          <li onClick={() => setMenuName('문의')}>
            <NavLink
              to={'/user/qna'}
              end
              className={({isActive}) => isActive ? styles.active : null}
            >문의</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyPageMenu