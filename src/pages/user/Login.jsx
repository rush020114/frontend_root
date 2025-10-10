import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleErrorMsg } from '../../utils/validation'

const Login = () => {
  //회원 로그인 시, 입력하는 아이디와 비밀번호를 저장하는 state 변수
  const[loginData, setLoginData] = useState({
    'userId' : '',
    'userPw' : ''
  });

  console.log(loginData);

  //유효성 검사 에러 메세지를 저장하는 state 변수
  const[errorMsg, setErrorMsg] = useState({
    'userId' : '',
    'userPw' : ''
  });

  // 비밀번호 보이기/숨기기 상태를 저장하는 state 변수
  const [showPw, setShowPw] = useState(false);
  
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
  
  //회원 아이디 저장 체크 상태를 저장하는 변수
  const[saveId, setSaveId] = useState(false);

  //페이지 로드 시 저장된 아이디 불러오기
  useEffect(() => {
    //localStorage에서에 저장된 아이디 가져오기
    const saveId = localStorage.getItem('saveId');

    if(saveId){
      //아이디 Input에 저장된 값을 기본값으로 설정
      setLoginData(prev => ({
        ...prev,
        'userId' : saveId
      }));

      //아이디 저장 체크박스를 체크 상태로 변경
      setSaveId(true);
    }
  }, []);

  //아이디 저장 체크박스의 체크 상태 변경하는 함수
  const handleSaveId = () => {
    setSaveId(!saveId);
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
      return;
    }

    //유효성 검사 통과 후 로그인 진행
    axios
    .post('/api/users/login', loginData)
    .then(res => {
      console.log(res.data);

      //HTTP 상태코드가 200인 경우
      if(res.data && res.data.userId){
        alert('정상적으로 로그인되었습니다.')

        //아이디 저장 체크박스가 체크되어 있으면 localStorage에 아이디 저장
        if(saveId){
          localStorage.setItem('saveId', loginData.userId)
        }
        //체크 해제되어 있으면 localStorage에서 아이디 삭제
        else{
          localStorage.removeItem('saveId');
        }
        
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

  // 아이디 찾기 모달창 숨기기/보이기 여부를 저장하는 state 변수
  const[showFindId, setShowFindId] = useState(false);
  
  // 비밀번호 찾기 모달창 숨기기/보이기 여부를 저장하는 state 변수
  const [showFindPw, setShowFindPw] = useState(false);

  // 아이디/비밀번호 찾기 저장하는 state 변수
  const [findData, setFindData] = useState({
    'userName' : '',
    'userId' : '',
    'userEmail' : ''
  });

  //입력한 데이터를 저장하는 함수
  const handleFindChange = (e) => {
    setFindData({
      ...findData,
      [e.target.name] : e.target.value
    });
  };

  // 서버에 아이디 찾기 확인 요청하는 함수
  const handleFindId = () => {
    axios
    .post('/api/user/findId', findData)
    .then(res => {
      console.log(res.data);

      if(!res.data){
        alert("입력하신 정보와 일치하는 회원이 없습니다.")
      }
      else{
        
      }

      setFindData({
        'userName' : '',
        'userEmail' : ''
      });
    })
    .catch(error => console.log(error))
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.normal_login}>
          <div className={errorMsg.userId ? styles.input_error : ''}>
            <p className={styles.form_title}>아이디</p>
            <Input
              type = 'text'
              size = '100%'
              name = 'userId'
              value = {loginData.userId}
              onChange = {e => handleChange(e)}
            />
            <p className={styles.error}>{errorMsg.userId}</p>
          </div>

          <div className={errorMsg.userId ? styles.input_error : ''}>
            <p className={styles.form_title}>비밀번호</p>
            <div className={styles.pw_wrap}>
              <Input
                type = {showPw ? 'text' : 'password'}
                size = '100%'
                name = 'userPw'
                value = {loginData.userPw}
                onChange = {e => handleChange(e)}          
              />
              <i 
                className = {`bi ${showPw ? 'bi-eye' : 'bi-eye-slash-fill'}
                ${styles.pw_icon}`}
                onClick = {() => setShowPw(!showPw)}
              />
            </div>
            <p className={styles.error}>{errorMsg.userPw}</p>
          </div>

          <div className={styles.checkbox}>
            <input
              type = 'checkbox'
              checked = {saveId}
              onChange = {() => handleSaveId()}
            />
            <p>아이디 저장</p>
          </div>

          <div className={styles.btn}>
            <Button
              content = '로그인'
              size = '100%'
              color = 'blue'
              onClick = {() => login()}
            />
          </div>

          <div className={styles.link_wrap}>
            <p
              onClick={() => nav('/join')}
            >
              회원가입
            </p>

            <p
              onClick={() => setShowFindId(true)}
            >
              아이디 찾기
            </p>
            
            <p
              onClick={() => setShowFindPw(true)}
            >
              비밀번호 찾기
            </p>
          </div>
        </div>

        <div className={styles.social_login}>
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

      <Modal
        title='아이디 찾기'
        isOpen={showFindId}
        onClose={() => setShowFindId(false)}
      >
        <div>
          <div>
            <p>이름</p>
            <Input 
              type = 'text'
              size = '100%'
              name = 'userName'
              value = {findData.userName}
              onChange = {e => handleFindChange(e)}
            />
          </div>
          <div>
            <p>이메일</p>
            <Input 
              type = 'text'
              size = '100%'
              name = 'userEmail'
              value = {findData.userEmail}
              onChange = {e => handleFindChange(e)}
            />
          </div>
          <Button 
            content = '확인'
            size = '20%'
            onClick = {() => handleFindId()}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Login