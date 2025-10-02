import React, { useRef, useState } from 'react'
import styles from './Join.module.css'
import axios from 'axios'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Select from '../../common/Select'
import { handleErrorMsg, checkRequired } from '../../utils/validation.jsx'
import { useNavigate } from 'react-router-dom'

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

  // 유효성 검사 결과 에러 메세지를 저장하는 state 변수
  const [errorMsg, setErrorMsg] = useState({
    'userName' : '',
    'userId' : '',
    'userPw' : '',
    'userPwConfirm' : '',
    'userTelArr' : ''
  });
  
  // 에러 메세지 표시 여부를 저장하는 state 변수 (가입 버튼 클릭 시 ture)
  const [showErrors, setShowErrors] = useState(false);
  
  // 아이디 중복 확인 완료 여부를 저장하는 state 변수
  const [idChecked, setIdChecked] = useState(false);
  
  // 비밀번호 보이기/숨기기 상태를 저장하는 state 변수
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  // 가입완료 버튼 활성화 여부를 저장하는 state 변수
  const [isDisable, setIsDisable] = useState(true);

  // 이름 Input에 접근하는 ref
  const nameInput = useRef(null);
  
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
        e.target.value + userData.secondEmail
        :
        userData.firstEmail + e.target.value
      });
    }

    else{
      setUserData({
        ...userData,
        [e.target.name] : e.target.value
      });
    }
  };
  
  // 빈 값 에러 메시지를 빨간색으로 표시하는 함수
  const showEmptyError = (fieldName) => {
    setShowErrors(true);
    setErrorMsg({
      ...errorMsg,
      [fieldName]: handleErrorMsg(
        { target: { name: fieldName, value: '' }},
        userData,
        true,
        'x-circle-fill',
        true
      )
    });
  };
  
  // 연락처 입력할 때 실행하는 함수
  const handleChangeTel = (e, i) => {
    // 기존 연락처 배열을 복사
    const newTelArr = [...userData.userTelArr];
    // i번째 위치의 값을 새로운 값으로 교체
    newTelArr.splice(i, 1, e.target.value);

    setUserData({
      ...userData,
      'userTelArr' : newTelArr
    });
  };

  // 이메일 도메인 선택 시 실행하는 함수
  const handleEmailDomin = (e) => {
    setUserData({
      ...userData,
      'secondEmail' : e.target.value,
      'userEmail' : userData.firstEmail + e.target.value
    });
  };

  // 서버에 아이디 중복 확인 요청하는 함수
  const handleCheckId = () => {
    // 아이디가 비어있으면
    if(!userData.userId){
      showEmptyError('userId');
      return;
    }

    axios
    .get(`/api/users/${userData.userId}`)
    .then(res => {
      console.log(res.data);
      
      if(!res.data){
        alert("사용 가능한 아이디입니다.");
        setIdChecked(true);
        setIsDisable(false);
      }
      else{
        alert("입력하신 아이디는 이미 사용 중입니다.\n다시 입력해 주세요.");
        setIdChecked(false);
        setIsDisable(true);
      }
    })
    .catch(error => console.log(error));
  };
  
  // 서버에 회원가입 정보를 전송하는 함수
  const handleSingup = () => {
    setShowErrors(true);

    // 필수 입력 항목 검증
    if(!checkRequired(userData)){
      return;
    }

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
  };

  //페이지 이동
  const nav = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);


  return (
    <div className={styles.container}>

      <div>
        <h3>회원가입</h3>
        <div>
          <div>
            <p>1단계</p>
            <p>약관동의</p>
          </div>
          <div>
            <p>2단계</p>
            <p>회원정보입력</p>
          </div>
          <div>
            <p>3단계</p>
            <p>회원가입완료</p>
          </div>
        </div>
      </div>

      <div className={styles.form}>
        <p>기본정보</p>
        <div>
          <div className={styles.form_title}>
            <p>이름</p>
            <span>(필수)</span>
          </div>
          <Input
            type="text"
            size='100%'
            name='userName'
            value={userData.userName}
            onChange={e => {
              handleChange(e)
              setErrorMsg({
                ...errorMsg,
                'userName' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
              })
            }}
          />
          <p className={styles.error}>{errorMsg.userName}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>아이디</p>
            <span>(필수)</span>
          </div>
          <div>
            <Input
              type="text"
              size='100%'
              name='userId'
              value={userData.userId}
              onChange={e => {
                handleChange(e);
                setIsDisable(true);
                setErrorMsg({
                  ...errorMsg,
                  'userId' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
                });
              }}
            />
            <Button
              content='중복확인'
              size='20%'
              color='blue'
              onClick={() => handleCheckId()}
            />
          </div>
          <p className={styles.error}>{errorMsg.userId}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>비밀번호</p>
            <span>(필수)</span>
          </div>
          <Input
            type="password"
            size='100%'
            name='userPw'
            value={userData.userPw}
            onChange={e => {
              handleChange(e)
              setErrorMsg({
                  ...errorMsg,
                  'userPw' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
                })
            }}
          />
          <p className={styles.error}>{errorMsg.userPw}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>비밀번호 확인</p>
            <span>(필수)</span>
          </div>
          <Input
            type="password"
            size='100%'
            name='userPwConfirm'
            value={userData.userPwConfirm}
            onChange={e => {
              handleChange(e)
              setErrorMsg({
                ...errorMsg,
                'userPwConfirm' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
              })
            }}
          />
          <p className={styles.error}>{errorMsg.userPwConfirm}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>연락처</p>
            <span>(필수)</span>
          </div>
          <div>
            <Select
              size='100%'
              name='userTelArr'
              value={userData.userTelArr[0]}
              onChange={e => {
                handleChangeTel(e, 0)
                setErrorMsg({
                ...errorMsg,
                'userTelArr' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
                })
              }}
            >
              <option value="010">010</option>
            </Select>
            <span>-</span>
            <Input
              type="text"
              size='100%'
              name='userTelArr'
              value={userData.userTelArr[1]}
              onChange={e => {
                handleChangeTel(e, 1)
                setErrorMsg({
                ...errorMsg,
                'userTelArr' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
                })
              }}
            />
            <span>-</span>
            <Input
              type="text"
              size='100%'
              name='userTelArr'
              value={userData.userTelArr[2]}
              onChange={e => {
                handleChangeTel(e, 2)
                setErrorMsg({
                ...errorMsg,
                'userTelArr' : handleErrorMsg(e, userData, true, 'info-circle-fill', showErrors)
                })
              }}
            />
          </div>
          <p className={styles.error}>{errorMsg.userTelArr}</p>
        </div>

        <div>
          <div className={styles.form_title}>
            <p>이메일</p>
            <span>(필수)</span>
          </div>

          <div>
            <Input
              type="text"
              size='100%'
              name='firstEmail'
              value={userData.firstEmail}
              onChange={e => handleChange(e)}
            />
            <span>@</span>
            <Input
              type="text"
              size='100%'
              name='secondEmail'
              value={userData.secondEmail}
              onChange={e => handleChange(e)}
            />
            <Select
              size='100%'
              name='emailDomain'
              value={userData.secondEmail}
              onChange={e => handleEmailDomin(e)}
            >
              <option value="">직접입력</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
            </Select>
          </div>
        </div>
      </div>

      <div className={styles.btn}>
        <Button
          content = '취소하기'
          size = '15%'
        />
        <Button
          content = '가입완료'
          size = '15%'
          color = 'blue'
          disabled = {isDisable}
          onClick = {() => handleSingup()}
        />
      </div>

    </div>
  )
}

export default Join