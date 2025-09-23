import React from 'react'
import styles from './Login.module.css'

const Login = () => {
  return (
    <div className={styles.container}>
      <div></div>

      <div className={styles.form}>
        <div className={styles.normal_login}>
          <p>사용자 로그인</p>
          <Input
            placeholder='아이디를 입력해주세요'
            size='100%'
          />
          <Input
            placeholder='비밀번호를 입력해주세요'
            size='100%'
          />
          <div>
            <span>아이디 저장</span>
            <div>
              <p>아이디 찾기</p>
              <p>비밀번호 변경</p>
            </div>
          </div>

          <div className={styles.btn}>
            <Button
              title='로그인'
              size='100%'
            />
            <Button
              title='회원가입'
              size='100%'
            />
          </div>
        </div>

        <div className={styles.social_login}>
          <p>소설 로그인</p>

          <div className={styles.btn}>
            <Button 
              title='카카오로 로그인'
              size='100%'
            />
            <Button 
              title='네이버로 로그인'
              size='100%'
            />
            <Button 
              title='구글로 로그인'
              size='100%'
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login