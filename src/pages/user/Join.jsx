import React from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Select from '../../common/Select'
import styles from './Join.module.css'

const Join = () => {
  //회원가입 데이터를 저장할 state 변수
  const[userData, setUserData] = useState({
    'userName' : '',
    'userId' : '',
    'userPw' : '',
    'userPwConfirm' : '',
    'userTelArr' : ['', '', ''],
    'firstEmail' : '',
    'secondEmail' : '',
    'userEmail' : ''
  });

  console.log(userData);

  //입력값 변경 처리 함수
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
  };

  //회원가입 요청 실행 함수
  const signup = () => {
    axios
    .post('/api/users', userData)
    .then(res => {
      console.log(res.data);
      setUserData(res.data);

      //입력 데이터 초기화
      setUserData({
        'userName' : '',
        'userId' : '',
        'userPw' : '',
        'userPwConfirm' : '',
        'userTelArr' : ['', '', ''],
        'firstEmail' : '',
        'secondEmail' : '',
        'userEmail' : ''
      })
    })
    .catch(error => console.log(error))
  };

  //유효성 검사
  const[errorMsg, setErrorMsg] = useState();

  return (
    <div className={styles.container}>

      <div className={styles.form}>
        <p>기본정보</p>
        <div>
          <p>이름</p>
          <Input
            type="text"
            size='100%'
            name='userName'
            value={userData.userName}
            onChange={e => handleChange(e)}
          />
        </div>

        <div>
          <p>아이디</p>
          <div>
            <Input
              type="text"
              size='100%'
              name='userId'
              value={userData.userId}
              onChange={e => handleChange(e)}
            />
            <Button
              title='중복확인'
              size='20%'
            />
          </div>
        </div>

        <div>
          <p>비밀번호</p>
          <Input
            type="password"
            size='100%'
            name='userPw'
            value={userData.userPw}
            onChange={e => handleChange(e)}
          />
        </div>

        <div>
          <p>비밀번호 확인</p>
          <Input
            type="password"
            size='100%'
            name='userPwConfirm'
            value={userData.userPwConfirm}
            onChange={e => handleChange(e)}
          />
        </div>

        <div>
          <p>연락처</p>
          <div>
            <Select
              size='100%'
              name=''
              value={userData.userTelArr[0]}
              onChange={e => handleChange(e)}
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </Select>
            <span>-</span>
            <Input
              type="text"
              size='100%'
              name=''
              value={userData.userTelArr[1]}
              onChange={e => handleChange(e)}
            />
            <span>-</span>
            <Input
              type="text"
              size='100%'
              name=''
              value={userData.userTelArr[2]}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <p>이메일</p>
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
          title='취소하기'
            size='15%'
        />
        <Button
          title='가입완료'
          size='15%'
          onClick={() => signup()}
        />
      </div>

    </div>
  )
}

export default Join