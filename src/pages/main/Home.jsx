import React from 'react'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <div className={styles.first_service}>
          <h1>회사소개</h1>
          <p>
            농장 자동화로 생산성 향상과
            소득증대는 물론, 편리한 작물재배가
            가능한 스마트팜에 대해 알아보세요!
          </p>
        </div>
        <div className={styles.last_service}>
          <h1>서비스 신청</h1>
          <p>
            스마트팜 최신 재배 기술을 배우고
            농업의 미래를 만들어가요!
          </p>
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