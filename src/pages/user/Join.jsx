import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Join.module.css'
import axios from 'axios'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Select from '../../common/Select'
import Accordion from '../../common/Accordion'
import { handleErrorMsg, checkRequired } from '../../utils/validation'
import EmailAuth from './EmailAuth'
import useAgreements from '../../hooks/useAgreements'

const Join = () => {
  // 회원가입 시 입력하는 모든 데이터를 저장하는 state 변수
  const [userData, setUserData] = useState({
    'userName' : '',
    'userId' : '',
    'userPw' : '',
    'userPwConfirm' : '',
    'userTelArr' : ['010', '', ''],
    'firstEmail' : '',
    'secondEmail' : '',
    'userEmail' : ''
  });

  console.log(userData);

  // 유효성 검사 결과 에러 메시지를 저장하는 state 변수
  const [errorMsg, setErrorMsg] = useState({
    'userName' : '',
    'userId' : '',
    'userPw' : '',
    'userPwConfirm' : '',
    'userTelArr' : '',
    'firstEmail' : '',
    'secondEmail' : ''
  });
  
  // 에러 메시지 표시 여부를 저장하는 state 변수 (가입 버튼 클릭 시 true)
  const [showErrors, setShowErrors] = useState(false);
  
  // 아이디 중복 확인 완료 여부를 저장하는 state 변수
  const [idChecked, setIdChecked] = useState(false);
  
  // 비밀번호 보이기/숨기기 상태를 저장하는 state 변수
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  // 가입완료 버튼 활성화 여부를 저장하는 state 변수
  const [isDisable, setIsDisable] = useState(true);

  // 이메일 인증 완료 여부를 저장하는 state 변수
  const [emailVerified, setEmailVerified] = useState(false);

  // 약관 동의 커스텀 훅 사용
  const { agreeAll, agreements, handleAgreeAll, handleAgreement, isRequiredAgreed } = useAgreements();

  // 약관동의 아코디언 열림/닫힘 상태를 저장하는 state 변수
  const [isOpenAgree, setIsOpenAgree] = useState(false);

  // 로딩 상태를 저장하는 state 변수
  const [loading, setLoading] = useState({
    checkingId : false,
    submitting : false
  });

  //페이지 이동
  const nav = useNavigate();

  // 에러 메시지 업데이트하는 함수
  const updateErrorMsg = (name, e, isError) => {
    setErrorMsg(prev => ({
      ...prev,
      [name] : handleErrorMsg(e, userData, true, isError)
    }));
  };

  // 가입완료 버튼 활성화 조건을 체크하는 함수
  const validateButton = () => {
    const isValid = idChecked &&              // 아이디 중복 확인 완료
                  emailVerified &&            // 이메일 인증 완료
                  isRequiredAgreed;           // 필수 약관 동의 완료
  
    setIsDisable(!isValid);
  };

  // 아이디 중복 확인, 이메일 인증, 약관 동의 상태 변경 시 버튼 활성화 조건 자동 재검증
  useEffect(() => {
    validateButton();
  }, [idChecked, emailVerified, isRequiredAgreed]);

  // Input Focus 시 파란색 안내 메시지 표시 함수
  const handleInputFocus = (e) => {
    updateErrorMsg(
      e.target.name
      , e
      , false
    );
  };

  // Input Blur 시 빈 값일 때 빨간색 에러 메시지 표시 함수
  const handleInputBlur = (e) => {
    updateErrorMsg(
      e.target.name
      , e
      , true
    );
  };

  // 입력한 데이터를 변경 시 유효성 검사 함수
  const handleInputChange = (e) => {
    handleChange(e);
    updateErrorMsg(
      e.target.name
      , e
      , showErrors
    );
  };

  // 입력한 데이터를 저장하는 함수
  const handleChange = (e) => {
    // 아이디 수정 시 중복 확인 상태 초기화
    if(e.target.name === 'userId'){
      setIdChecked(false);
      setIsDisable(true);
    }
    
    // 이메일 입력 시 자동으로 조합
    if(e.target.name === 'firstEmail' || e.target.name === 'secondEmail'){
      setUserData({
        ...userData,
        [e.target.name] : e.target.value,
        'userEmail' : e.target.name === 'firstEmail'
        ?
        e.target.value + '@' + userData.secondEmail
        :
        userData.firstEmail + '@' + e.target.value
      });
    }

    else{
      setUserData({
        ...userData,
        [e.target.name] : e.target.value
      });
    }
  };
  
  // 연락처 입력할 때 실행하는 함수
  const handleChangeTel = (e, i) => {
    const newTelArr = [...userData.userTelArr];
    newTelArr.splice(i, 1, e.target.value);

    setUserData({
      ...userData,
      'userTelArr' : newTelArr
    });
  };

  // 연락처 Focus 시 파란색 안내 메시지 표시 함수
  const handleTelFocus = (e) => {
    updateErrorMsg(
      'userTelArr'
      , e
      , false
    );
  };

  // 연락처 Blur 시 빈 값일 때 빨간색 에러 메시지 표시 함수
  const handleTelBlur = (e) => {
    updateErrorMsg(
      'userTelArr'
      , e
      , true
    );
  };

  // 연락처 변경 시 유효성 검사 함수
  const handleTelChange = (e, i) => {
    handleChangeTel(e, i);
    updateErrorMsg(
      'userTelArr'
      , e
      , showErrors
    );
  };

  // 이메일 도메인 선택 시 실행하는 함수
  const handleEmailDomain = (e) => {
    setUserData({
      ...userData,
      'secondEmail' : e.target.value,
      'userEmail' : userData.firstEmail + '@' + e.target.value
    });
  };

  // 서버에 아이디 중복 확인 요청하는 함수
  const handleCheckId = () => {
    if(!userData.userId){
      setShowErrors(true);
      updateErrorMsg(
        'userId'
        , { target : { name : 'userId', value : '' }}
        , true
      );
      return;
    }

    setLoading({
      ...loading,
      checkingId : true
    });

    axios
    .get(`/api/users/${userData.userId}`)
    .then(res => {
      console.log(res.data);
      
      if(!res.data){
        alert("사용 가능한 아이디입니다.");
        setIdChecked(true);
      }
      else{
        alert("입력하신 아이디는 이미 사용 중입니다.\n다시 입력해 주세요.");
        setIdChecked(false);
      }
    })
    .catch(error => console.log(error))
    .finally(() => setLoading({
      ...loading,
      checkingId : false
    }));
  };
  
  // 서버에 회원가입 정보를 전송하는 함수
  const handleSignup = () => {
    setShowErrors(true);
    
    // 필수 입력 항목 검증
    if(!checkRequired(userData)){
      const nameInput = document.querySelector('input[name = "userName"]');

      if(nameInput){
        nameInput.focus();
      }
      return;
    }
    
    if(!emailVerified){
      alert('이메일 인증을 완료해주세요')
      return;
    }

    setLoading({
      ...loading,
      submitting : true
    });

    axios
    .post('/api/users', userData)
    .then(res => {
      console.log(res.data);
      alert('회원가입이 완료되었습니다.')

      // 회원가입 완료 후 모든 입력 데이터 초기화
      setUserData({
        'userName' : '',
        'userId' : '',
        'userPw' : '',
        'userPwConfirm' : '',
        'userTelArr' : ['010', '', ''],
        'firstEmail' : '',
        'secondEmail' : '',
        'userEmail' : ''
      });

      setIdChecked(false);
      setIsDisable(true);
      setShowErrors(false);

      nav('/');
    })
    .catch(error => console.log(error))
    .finally(() => setLoading({
      ...loading,
      submitting : false
    }));
  };


  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div>
          <div className={styles.form_title}>
            <p>이름</p>
            <span>(필수)</span>
          </div>
          <div className={errorMsg.userName ? styles.input_error : ''}>
            <Input
              type = 'text'
              size = '100%'
              name = 'userName'
              value = {userData.userName}
              onFocus = {e => handleInputFocus(e)}
              onBlur = {e => handleInputBlur(e)}
              onChange = {e => handleInputChange(e)}
            />
          </div>
          <p className={styles.error}>{errorMsg.userName}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>아이디</p>
            <span>(필수)</span>
          </div>
          <div className={errorMsg.userId ? styles.input_error : ''}>
            <Input
              type = 'text'
              size = '75%'
              name = 'userId'
              value = {userData.userId}
              onFocus = {e => handleInputFocus(e)}
              onBlur = {e => handleInputBlur(e)}
              onChange = {e => handleInputChange(e)}
            />
            <Button
              content = '중복확인'
              size = '25%'
              color = 'blue'
              onClick={() => handleCheckId()}
              disabled = {loading.checkingId}
            />
          </div>
          <p className={styles.error}>{errorMsg.userId}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>비밀번호</p>
            <span>(필수)</span>
          </div>
          <div className={`${styles.pw_wrap} ${errorMsg.userPw ? styles.input_error : ''}`}>
            <Input
              type = {showPw ? 'text' : 'password'}
              size = '100%'
              name = 'userPw'
              value = {userData.userPw}
              onFocus = {e => handleInputFocus(e)}
              onBlur = {e => handleInputBlur(e)}
              onChange = {e => handleInputChange(e)}
            />
            <i 
              className = {`bi ${showPw ? 'bi-eye' : 'bi-eye-slash-fill'}
              ${styles.pw_icon}`}
              onClick = {() => setShowPw(!showPw)}
            />
          </div>
          <p className={styles.error}>{errorMsg.userPw}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>비밀번호 확인</p>
            <span>(필수)</span>
          </div>
          <div className={`${styles.pw_wrap} ${errorMsg.userPwConfirm ? styles.input_error : ''}`}>
            <Input
              type = {showPwConfirm ? 'text' : 'password'}
              size = '100%'
              name = 'userPwConfirm'
              value = {userData.userPwConfirm}
              onFocus = {e => handleInputFocus(e)}
              onBlur = {e => handleInputBlur(e)}
              onChange = {e => handleInputChange(e)}
            />
            <i 
              className = {`bi ${showPwConfirm ? 'bi-eye' : 'bi-eye-slash-fill'}
              ${styles.pw_icon}`}
              onClick = {() => setShowPwConfirm(!showPwConfirm)}
            />
          </div>
          <p className={styles.error}>{errorMsg.userPwConfirm}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>연락처</p>
            <span>(필수)</span>
          </div>
          <div className={errorMsg.userTelArr ? styles.input_error : ''}>
            <Select
              size = '100%'
              name = 'userTelArr'
              value = {userData.userTelArr[0]}
              onChange = {e => handleChangeTel(e, 0)}
            >
              <option value="010">010</option>
            </Select>
            <span>-</span>
            <Input
              type = 'text'
              size = '100%'
              name = 'userTelArr'
              value = {userData.userTelArr[1]}
              onFocus = {e => handleTelFocus(e)}
              onBlur = {e => handleTelBlur(e)}
              onChange = {e => handleTelChange(e, 1)}
            />
            <span>-</span>
            <Input
              type = 'text'
              size = '100%'
              name = 'userTelArr'
              value = {userData.userTelArr[2]}
              onFocus = {e => handleTelFocus(e)}
              onBlur = {e => handleTelBlur(e)}
              onChange = {e => handleTelChange(e, 2)}
            />
          </div>
          <p className={styles.error}>{errorMsg.userTelArr}</p>
        </div>

        <div className={styles.email}>
          <div className={styles.form_title}>
            <p>이메일</p>
            <span>(필수)</span>
          </div>
          <div>
            <div className={errorMsg.firstEmail ? styles.input_error : ''}>
              <Input
                type = 'text'
                size = '140px'
                name = 'firstEmail'
                value = {userData.firstEmail}
                onFocus = {e => handleInputFocus(e)}
                onBlur = {e => handleInputBlur(e)}
                onChange = {e => handleInputChange(e)}
              />
            </div>
            <span>@</span>
            <div className={errorMsg.secondEmail ? styles.input_error : ''}>
              <Input
                type = 'text'
                size = '140px'
                name = 'secondEmail'
                value = {userData.secondEmail}
                onFocus = {e => handleInputFocus(e)}
                onBlur = {e => handleInputBlur(e)}
                onChange = {e => handleInputChange(e)}
              />
            </div>
            <Select
              size = '140px'
              name = 'emailDomain'
              value = {userData.secondEmail}
              onChange = {e => handleEmailDomain(e)}
            >
              <option value = "">직접입력</option>
              <option value = "naver.com">naver.com</option>
              <option value = "gmail.com">gmail.com</option>
              <option value = "daum.net">daum.net</option>
            </Select>
          </div>
          <p className={styles.error}>{errorMsg.firstEmail || errorMsg.secondEmail}</p>
          {
            !emailVerified && (
            <EmailAuth 
              email = {userData.userEmail}
              onVerified = {() => setEmailVerified(true)}
            />
            )
          }
        </div>

        <div className={styles.agreements}>
          <Accordion
            isOpen = {isOpenAgree}
            onToggle = {() => setIsOpenAgree(!isOpenAgree)}
            title = {
              <label>
                <input
                  type = "checkbox"
                  checked = {agreeAll}
                  onChange = {() => handleAgreeAll()}
                  />
                  모두 동의합니다.
              </label>
            }
            >
            <div>
              <label>
                <input
                  type = "checkbox"
                  name = "terms"
                  checked = {agreements.terms}
                  onChange = {e => handleAgreement(e)}
                  />
                <div className={styles.text_wrap}>
                  <span>[필수] 이용약관 동의</span>
                  <span className={styles.view_link}>내용보기</span>
                </div>
              </label>
            </div>

            <div>
              <label>
                <input
                  type = "checkbox"
                  name = "privacy"
                  checked = {agreements.privacy}
                  onChange = {e => handleAgreement(e)}
                  />
                <div className={styles.text_wrap}>
                  <span>[필수] 개인정보 수집 및 이용 동의</span>
                  <span className={styles.view_link}>내용보기</span>
                </div>
              </label>
            </div>

            <div>
              <label>
                <input
                  type = "checkbox"
                  name = "marketing"
                  checked = {agreements.marketing}
                  onChange = {e => handleAgreement(e)}
                  />
                <div className={styles.text_wrap}>
                  <span>[선택] 마케팅 및 홍보성 정보 수신 동의</span>
                  <span className={styles.view_link}>내용보기</span>
                </div>
              </label>
            </div>
          </Accordion>
        </div>
      </div>

      <div className={styles.btn}>
        <Button
          content = '취소하기'
          size = '20%'
        />
        <Button
          content = '가입완료'
          size = '20%'
          color = 'blue'
          disabled = {isDisable || loading.submitting}
          onClick = {() => handleSignup()}
        />
      </div>

    </div>
  )
}

export default Join