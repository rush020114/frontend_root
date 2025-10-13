import React from 'react'
import styles from './MainFooter.module.css'

const MainFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top_footer}>
        <ul>
          <li>서비스 약관</li>
          <li>개인정보처리방침</li>
          <li>저작권 정책</li>
          <li>원격지원서비스</li>
          <li>1:1 문의</li>
        </ul>
      </div>
      <div className={styles.bottom_footer}>
        <div className={styles.meta_info}>
          <div className={styles.logo}>
            <img src="/root.png"  />
          </div>
          <div className={styles.meta_data}>
            <p>
              주소 : 울산광역시 남구 삼산중로100번길 26 &#40;삼산동&#41;
            </p>
            <p>
              전화 : 농식품 지식정보서비스 고객센터 1661-5159 &#40;월~금 09:00 ~ 18:00, 공휴일제외&#41;
            </p>
            <p>
              E-mail : root@gmail.com
            </p>
            <p>
              CopyRight
              <span>
                <i className="bi bi-c-circle"></i>
              </span>
              2025 ROOT.All Rights Reserved.
            </p>
          </div>
        </div>
        <div className={styles.icon_div}>
          <span style={{backgroundColor: '#24a4f2'}}>
            <i className="bi bi-twitter"></i>
          </span>
          <span style={{backgroundColor: '#36ba6e'}}>
            <i className="bi bi-bing"></i>
          </span>
          <span style={{backgroundColor: '#cf30b7'}}>
            <i className="bi bi-instagram"></i>
          </span>
          <span style={{backgroundColor: '#e6201b'}}>
            <i className="bi bi-youtube"></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MainFooter