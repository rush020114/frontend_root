import React, { useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const nav = useNavigate();

  // 이미지를 보이게 할 변수
  const [isShow, setIsShow] = useState([false, false, false]);

  // 특정 이미지만 보이게 하는 함수
  const setShow = (index, value) => {
    setIsShow(prev => {
      const newShow = [...prev];
      newShow[index] = value;
      return newShow;
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <div className={styles.first_service}
          onMouseEnter={() => {setShow(0, true)}}
          onMouseLeave={() => {setShow(0, false)}}
        >
          <h1>회사소개</h1>
          <div className={styles.home_info}>
          {
            isShow[0]
            ?
            <>
            <p>
              농장 자동화로 생산성 향상과 소득증대는 물론, 편리한 작물재배가 가능한 스마트팜에 대해 알아보세요!
            </p>
            <div className={styles.info_btn}>
              <button
                type='button'
                style={{
                  border: '1px solid #00695C',
                  color: '#00695C'
                }}
                onClick={() => nav('/company-profile')}
              >
                스마트팜이란? &gt;
              </button>
            </div>
            </>
            :
            <img src="/company.png" />
          }
          </div>
        </div>
        <div className={styles.middle_service}
          onMouseEnter={() => {setShow(1, true)}}
          onMouseLeave={() => {setShow(1, false)}}
        >
          <h1>AI 분석</h1>
          <div className={styles.home_info}>
          {
            isShow[1]
            ?
            <>
            <p>
              AI가 작물의 병해충을 조기에 진단하고, 초보 농부도 쉽게 대응할 수 있도록 최적의 솔루션을 제안합니다
            </p>
            <div className={styles.info_btn}>
              <button
                type='button'
                style={{
                  border: '1px solid #E65100',
                  color: '#E65100'
                }}
                onClick={() => nav('/plant-chat')}
              >
                AI 이용해보기 &gt;
              </button>
            </div>
            </>
            :
            <img src='/ai.png' />
          }
          </div>
        </div>
        <div className={styles.last_service}
          onMouseEnter={() => {setShow(2, true)}}
          onMouseLeave={() => {setShow(2, false)}}
        >
          <h1>서비스 신청</h1>
          <div className={styles.home_info}>
          {
            isShow[2]
            ?
            <>
            <p>
              라즈베리파이 기반 스마트팜 키트로 딸기 생육을 실시간 모니터링하고, 최적의 수확을 경험하세요
            </p>
            <div className={styles.info_btn}>
              <button
                type='button'
                style={{
                  border: '1px solid #335734',
                  color: '#335734'
                }}
                onClick={() => nav('/service')}
              >
                지금 바로 신청하기 &gt;
              </button>
            </div>
            </>
            :
            <img src="/service.png" />
          }
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.notice}>공지사항 영역</div>
        <div>미정의 영역</div>
      </div>
    </div>
  )
}

export default Home