import React, { useState } from 'react'
import styles from './Join.module.css'
import axios from 'axios'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Select from '../../common/Select'
import { handleErrorMsg } from '../../utils/validation.jsx'

const Join = () => {
  //회원가입 시, 입력하는 모든 데이터를 저장하는 변수
  const[userData, setUserData] = useState({
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

  //입력한 데이터를 저장하는 함수
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
  };

  //유효성 검사 결과 에러 메세지를 저장하는 변수
  const[errorMsg, setErrorMsg] = useState({
    'userName' : '',
    'userId' : '',
    'userPw' : '',
    'userPwConfirm' : '',
    'userTelArr' : ''
  });

  //서버에 아이디 중복 확인 요청하는 함수
  const handleCheckId = () => {
    axios
    .get(`/api/users/${userData.userId}`)
    .then(res => {
      console.log(res.data)
      
      if(!res.data){
        alert("사용 가능한 아이디입니다.")
      }
      else{
        alert("입력하신 아이디는 이미 사용 중입니다.\n다시 입력해 주세요.")
      }
    })
    .catch(error => console.log(error))
  };
  
  //연락처 입력할 때 실행하는 함수
  const handleChangeTel = (e, i) => {
    //기존 연락처 배열을 복사
    const newTelArr = [...userData.userTelArr];
    //i번째 위치의 값을 새로운 값으로 교체
    newTelArr.splice(i, 1, e.target.value);

    setUserData({
      ...userData,
      'userTelArr' : newTelArr
    })
  };

  //서버에 회원가입 정보를 전송하는 함수
  const signup = () => {
    axios
    .post('/api/users', userData)
    .then(res => {
      console.log(res.data);
      setUserData(res.data);

      //회원가입 완료 후 모든 입력 데이터 초기화
      setUserData({
        'userName' : '',
        'userId' : '',
        'userPw' : '',
        'userPwConfirm' : '',
        'userTelArr' : ['010', '', ''],
        'firstEmail' : '',
        'secondEmail' : '',
        'userEmail' : ''
      })
    })
    .catch(error => console.log(error))
  };

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
                'userName' : handleErrorMsg(e, userData)
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
                handleChange(e)
                setErrorMsg({
                  ...errorMsg,
                  'userId' : handleErrorMsg(e, userData)
                })
              }}
            />
            <Button
              content='중복확인'
              size='20%'
              color='blue'
              onClick={() => handleCheckId()}
            />
          </div>
          <p className="error">{errorMsg.userId}</p>
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
                  'userPw' : handleErrorMsg(e, userData)
                })
            }}
          />
          <p className="error">{errorMsg.userPw}</p>
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
                'userPwConfirm' : handleErrorMsg(e, userData)
              })
            }}
          />
          <p className="error">{errorMsg.userPwConfirm}</p>
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
                'userTelArr' : handleErrorMsg(e, userData)
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
                'userTelArr' : handleErrorMsg(e, userData)
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
                'userTelArr' : handleErrorMsg(e, userData)
                })
              }}
            />
          </div>
          <p className="error">{errorMsg.userTelArr}</p>
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
              name=''
              value={userData.firstEmail}
              onChange={e => handleChange(e)}
            />
            <span>@</span>
            <Input
              type="text"
              size='100%'
              name=''
              value={userData.secondEmail}
              onChange={e => handleChange(e)}
            />
            <Select
              size='100%'
              name=''
              value={userData.secondEmail}
              onChange={e => handleChange(e)}
            >
              <option value="">직접입력</option>
              <option value="@naver.com">naver.com</option>
              <option value="@gmail.com">gmail.com</option>
              <option value="@daum.net">daum.net</option>
            </Select>
          </div>
        </div>
      </div>

      <div className={styles.btn}>
        <Button
          content='취소하기'
          size='15%'
        />
        <Button
          content='가입완료'
          size='15%'
          color='blue'
          onClick={() => signup()}
        />
      </div>

    </div>
  )
}

export default Join