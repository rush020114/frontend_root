import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleErrorMsg } from '../../utils/validation'

const Login = ({onLogin}) => {
  //회원 로그인 시, 입력하는 아이디와 비밀번호를 저장하는 변수
  const[loginData, setLoginData] = useState({

    'userId' : '',
    'userPw' : ''
  });

  console.log(loginData);

  // 유효성 검사 에러 메세지를 저장하는 state 변수
  const [errorMsg, setErrorMsg] = useState({
    'userId' : '',
    'userPw' : ''
  });

  // 비밀번호 표시 상태를 저장하는 state 변수
  const [showPw, setShowPw] = useState(false);

  // 회원 아이디 저장 체크 상태를 저장하는 state 변수
  const [saveId, setSaveId] = useState(false);

  // 아이디/비밀번호 찾기 모달창 표시 여부를 저장하는 state 변수
  const [showFind, setShowFind] = useState(false);

  // 현재 활성화된 탭을 저장하는 state 변수
  const [activeTab, setActiveTab] = useState('id');

  // 아이디 찾기 결과 저장하는 state 변수
  const [foundId, setFoundId] = useState(null);

  // 비밀번호 찾기 성공 여부를 저장하는 state 변수
  const [pwSent, setPwSent] = useState(false);

  // 아이디/비밀번호 찾기 입력 데이터를 저장하는 state 변수
  const [findData, setFindData] = useState({
    'userName' : '',
    'userId' : '',
    'userEmail' : ''
  });

  // 찾기 기능 에러 메시지를 저장하는 state 변수
  const [findError, setFindError] = useState('');

  // 로딩 상태를 저장하는 state 변수
  const [loading, setLoading] = useState(false);

  // 페이지 이동
  const nav = useNavigate();

  // 페이지 로드 시 저장된 아이디 불러오기
  useEffect(() => {
    const saveId = localStorage.getItem('saveId');

    if(saveId){
      setLoginData(prev => ({
        ...prev,
        'userId' : saveId
      }));

      setSaveId(true);
    }
  }, []);
  
  // 로그인 입력 데이터를 저장하는 함수
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    });
    
    // 실시간 유효성 검사
    setErrorMsg({
      ...errorMsg,
      [e.target.name] : handleErrorMsg(
        e
        , loginData
        , false
        , 'x-circle-fill'
      )
    })
  };

  // 서버에 회원 로그인 데이터를 요청하는 함수
  const login = () => {
    // 아이디 유효성 검사
    const idError = handleErrorMsg({
      target : {
        name : 'userId',
        value : loginData.userId
      }
    }, loginData, false, 'x-circle-fill');

    // 비밀번호 유효성 검사
    const pwError = handleErrorMsg({
      target : {
        name : 'userPw',
        value : loginData.userPw
      }
    }, loginData, false, 'x-circle-fill');

    // 유효성 검사 실패 시 에러 표시 후 중단
    if (idError || pwError){
      setErrorMsg({
        'userId' : idError,
        'userPw' : pwError
      });
      return;
    }

    axios
    .post('/api/users/login', loginData)
    .then(res => {
      console.log(res.data);

      if(res.data && res.data.userId){
        alert('정상적으로 로그인되었습니다.')

        // 아이디 저장 처리
        if(saveId){
          localStorage.setItem('saveId', loginData.userId)
        }

        else{
          localStorage.removeItem('saveId');
        }
        
        // 로그인 정보를 세션 스토리지에 저장
        const loginInfo = {
          'userId' : res.data.userId,
          'userName' : res.data.userName,
          'userRole' : res.data.userRole
        };
        
        console.log(loginInfo);
        console.log(JSON.stringify(loginInfo));

        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
        
        // 메인 페이지로 이동
        nav('/')

        onLogin();
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
  
  // 아이디/비밀번호 찾기 입력 데이터를 변경하는 함수
  const handleFindChange = (e) => {
    setFindData({
      ...findData,
      [e.target.name] : e.target.value
    });
  };
  
  // 회원 아이디 마스킹 처리 함수
  const maskUserId = (userId) => {
    if(!userId) return '';

    const length = userId.length;

    if(length <= 2){
      return userId[0] + '*';
    }
    else if (length <= 4) {
      return userId[0] + '*'.repeat(length - 1);
    }
    else {
      return userId.substring(0, 3) + '*'.repeat(length - 3);
    }
  };

  // 찾기 모달을 초기화하는 함수
  const resetFindModal = () => {
    setShowFind(false);
    setActiveTab('id');
    setFoundId(null);
    setPwSent(false);
    setFindError('');
    setFindData({
      userName: '',
      userId: '',
      userEmail: ''
    });
  };

  // 서버에 아이디 찾기를 요청하는 함수
  const handleFindId = () => {
    axios
    .post('/api/users/findId', findData)
    .then(res => {
      if (!res.data) {
        setFindError('입력하신 정보와 일치하는 회원정보를 찾을 수 없습니다.');
        setFoundId(null);
      } else {
        setFoundId(res.data);
        setFindError('');
      }
    })
    .catch(error => {
      setFindError('아이디 찾기 중 오류가 발생했습니다.');
    });
  };
  
  // 서버에 비밀번호 찾기를 요청하는 함수
  const handleFindPw = () => {
    setLoading(true);

    axios
    .post('/api/users/findPw', findData)
    .then(res => {
      if (!res.data) {
        setFindError('입력하신 정보와 일치하는 회원정보를 찾을 수 없습니다.');
        setPwSent(false);
      }
      
      else {
        setPwSent(true);
        setFindError('');
      }
    })
    .catch(error => {
      setFindError('비밀번호 찾기 중 오류가 발생했습니다.');
    })
    .finally(() => setLoading(false));
  };

  // 비밀번호 찾기 탭으로 이동하는 함수
  const goToPasswordTab = () => {
    setActiveTab('pw');
    setFindData({
      ...findData,
      userId: foundId
    });
    setFoundId(null);
    setFindError('');
  };

  // 회원가입 페이지로 이동하는 함수
  const goToJoin = () => {
    resetFindModal();
    nav('/join');
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.normal_login}>
          <div className={errorMsg.userId ? styles.input_error : ''}>
            <p className={styles.form_title}>아이디</p>
            <Input
              type = "text"
              size = "100%"
              name = "userId"
              value = {loginData.userId}
              onChange = {e => handleChange(e)}
            />
            <p className={styles.error}>{errorMsg.userId}</p>
          </div>

          <div className={errorMsg.userPw ? styles.input_error : ''}>
            <p className={styles.form_title}>비밀번호</p>
            <div className={styles.pw_wrap}>
              <Input
                type = {showPw ? 'text' : 'password'}
                size = "100%"
                name = "userPw"
                value = {loginData.userPw}
                onChange = {e => handleChange(e)}
              />
              <i
                className={`bi ${showPw ? 'bi-eye' : 'bi-eye-slash-fill'} ${styles.pw_icon}`}
                onClick={() => setShowPw(!showPw)}
              />
            </div>
            <p className={styles.error}>{errorMsg.userPw}</p>
          </div>

          <div className={styles.checkbox}>
            <input
              type = "checkbox"
              checked = {saveId}
              onChange = {() => {
                setSaveId(!saveId);

                if(saveId){
                  localStorage.removeItem('saveId');
                }
              }}
            />
            <p>아이디 저장</p>
          </div>

          <div className={styles.btn}>
            <Button
              content = "로그인"
              size = "100%"
              color = "blue"
              onClick = {() => login()}
            />
          </div>

          <div className={styles.link_wrap}>
            <p
              onClick={() => nav('/join')}>
                회원가입
            </p>
            <p
              onClick={() => {
                setActiveTab('id');
                setShowFind(true);
            }}>
              아이디 찾기
            </p>
            <p onClick={() => {
              setActiveTab('pw');
              setShowFind(true);
            }}>
              비밀번호 찾기
            </p>
          </div>
        </div>

        <div className={styles.social_login}>
          <div className={styles.btn}>
            <Button
              content = "카카오로 로그인"
              size = "100%"
            />
            <Button
              content = "네이버로 로그인"
              size="100%"
            />
            <Button
              content = "구글로 로그인"
              size="100%"
            />
          </div>
        </div>
      </div>

      <Modal
        title = "아이디/비밀번호 찾기"
        size = "500px"
        padding = "30px"
        isOpen = {showFind}
        onClose = {resetFindModal}
      >
        <div className={styles.tab_area}>
          <ul
            role ="tablist"
            className={styles.tab_list}
          >
            <li
              role="tab"
              className={activeTab === 'id' ? styles.active : ''}
            >
              <button
                type = "button"
                className = {styles.btn_tab}
                onClick = {() => setActiveTab('id')}
              >
                아이디 찾기
              </button>
            </li>
            <li
              role="tab"
              className={activeTab === 'pw' ? styles.active : ''}
            >
              <button
                type = "button"
                className = {styles.btn_tab}
                onClick = {() => setActiveTab('pw')}
              >
                비밀번호 찾기
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.tab_conts_wrap}>
          {
            activeTab === 'id' && (
              <div className={styles.tab_conts}>
                {foundId ? (
                  <div className={styles.result}>
                    <p>
                      회원님의 아이디는 <strong>{maskUserId(foundId)}</strong> 입니다.
                    </p>
                    <div className={styles.result_btn}>
                      <Button
                        content = "로그인"
                        size = "35%"
                        color = "blue"
                        onClick = {resetFindModal}
                      />
                      <Button
                        content = "비밀번호 찾기"
                        size = "35%"
                        onClick = {goToPasswordTab}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Input
                      type = "text"
                      size = "100%"
                      placeholder = "이름"
                      name = "userName"
                      value = {findData.userName}
                      onChange = {e => handleFindChange(e)}
                    />
                    <Input
                      type = "email"
                      size = "100%"
                      placeholder = "이메일"
                      name = "userEmail"
                      value = {findData.userEmail}
                      onChange = {e => handleFindChange(e)}
                    />
                    
                    {findError && (
                      <p className={styles.find_error}>{findError}</p>
                    )}
                    
                    <Button
                      content = {findError ? "회원가입" : "확인"}
                      size = "35%"
                      color = "blue"
                      onClick = {findError ? goToJoin : handleFindId}
                    />
                  </div>
                )}
              </div>
          )}

          {
            activeTab === 'pw' && (
            <div className={styles.tab_conts}>
              {
                pwSent ? (
                <div className={styles.result}>
                  <p>임시 비밀번호가 이메일로 발송되었습니다.</p>
                  <Button
                    content = "확인"
                    size = "35%"
                    color = "blue"
                    onClick = {resetFindModal}
                  />
                </div>
                ) : findError ? (
                <div className={styles.result}>
                  <p>{findError}</p>
                  <Button
                    content = "회원가입"
                    size = "35%"
                    color = "blue"
                    onClick = {() => goToJoin()}
                  />
                </div>
                ) : (
                <div>
                  <Input
                    type = "text"
                    size = "100%"
                    placeholder = "아이디"
                    name = "userId"
                    value = {findData.userId}
                    onChange = {e => handleFindChange(e)}
                  />
                  <Input
                    type = "email"
                    size = "100%"
                    placeholder = "이메일"
                    name = "userEmail"
                    value = {findData.userEmail}
                    onChange = {e => handleFindChange(e)}
                  />
                  <Button
                    content = { loading ? "발송 중..." : "확인" }
                    size = "35%"
                    color = "blue"
                    disabled={loading}
                    onClick = {() => handleFindPw()}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Login