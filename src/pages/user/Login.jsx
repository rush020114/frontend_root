import React, { useState } from 'react'
import styles from './Login.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleErrorMsg } from '../../utils/validation.jsx'

const Login = () => {
  //회원 로그인 시, 입력하는 아이디와 비밀번호를 저장하는 변수
  const[loginData, setLoginData] = useState({
    'userId' : '',
    'userPw' : ''
  });

  //유효성 검사 에러 메세지를 저장하는 변수
  const[errorMsg, setErrorMsg] = useState({
    'userId' : '',
    'userPw' : ''
  });

  //입력한 데이터를 저장하는 함수
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    });

    //실시간 유효성 검사
    setErrorMsg({
      ...errorMsg,
      [e.target.name] : handleErrorMsg(e, loginData, false, 'x-circle-fill')
    })
  };

  //페이지 이동
  const nav = useNavigate();

  //서버에 회원 로그인 데이터를 요청하는 함수
  const login = () => {
    console.log('=== 로그인 버튼 클릭 ===');
    console.log('loginData:', loginData);

    //아이디 유효성 검사
    const idError = handleErrorMsg({
      target : {
        name : 'userId',
        value : loginData.userId
      }
    }, loginData, false, 'x-circle-fill');

    //비밀번호 유효성 검사
    const pwError = handleErrorMsg({
      target : {
        name : 'userPw',
        value : loginData.userPw
      }
    }, loginData, false, 'x-circle-fill');

    //유효성 검사 결과 확인
    if(idError || pwError){
      setErrorMsg({
        'userId' : idError,
        'userPw' : pwError
      });
      return;                               //유효성 검사 실패 시 함수 종료
    }

    //유효성 검사 통과 후 로그인 진행
    axios
    .post('/api/users/login', loginData)
    .then(res => {
      console.log(res.data);

      //HTTP 상태코드가 200인 경우
      if(res.data && res.data.userId){
        alert('정상적으로 로그인되었습니다.')
        
        //메인 페이지로 이동
        nav('/')

        //세션 스토리지에 저장할 로그인 정보 객체 생성 (아이디, 회원명, 사용자 유형)
        const loginInfo = {
          'userId' : res.data.userId,
          'userName' : res.data.userName,
          'userRole' : res.data.userRole
        };

        console.log(loginInfo);
        console.log(JSON.stringify(loginInfo));

        //로그인 정보를 세션 스토리지에 JSON 문자열로 저장
        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
      }
      else{
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
    })
    .catch(error => {
      if(error.response){
        alert(error.response.data);
      }
      else{
          alert('서버와 통신 중 오류가 발생했습니다.')
      }
    })
  };

  return (
    <div className={styles.container}>
      <div></div>

      <div className={styles.form}>
        <div className={styles.normal_login}>
          <div>
            <p>아이디</p>
            <Input
              placeholder = '아이디를 입력해주세요'
              type = 'text'
              size = '100%'
              padding = '12px'

              name = 'userId'
              value = {loginData.userId}
              onChange = {e => handleChange(e)}
            />
            <p className={styles.error}>{errorMsg.userId}</p>
          </div>
          <div>
            <p>비밀번호</p>
            <Input
              placeholder = '비밀번호를 입력해주세요'
              type = 'password'
              size = '100%'
              padding = '12px'

              name = 'userPw'
              value = {loginData.userPw}
              onChange = {e => handleChange(e)}          
            />
            <p className={styles.error}>{errorMsg.userPw}</p>
          </div>
          <div>
            <span>아이디 저장</span>
          </div>

          <div className={styles.btn}>
            <Button
              content = '로그인'
              size = '100%'
              onClick = {() => login()}
            />
          </div>

          <div className={styles.link_wrap}>
            <p>회원가입</p>
            <p>아이디 찾기</p>
            <p>비밀번호 찾기</p>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.social_login}>
          <p>소설 로그인</p>

          <div className={styles.btn}>
            <Button 
              content = '카카오로 로그인'
              size = '100%'
              
            />
            <Button 
              content = '네이버로 로그인'
              size = '100%'
            />
            <Button 
              content = '구글로 로그인'
              size = '100%'
            />
          </div>
        </div>
      </div>
      <Button 
        content = '로그아웃'
        onClick={() => {
          sessionStorage.removeItem('loginInfo');
          nav('/');
        }}
      />
    </div>
  )
}

export default Login