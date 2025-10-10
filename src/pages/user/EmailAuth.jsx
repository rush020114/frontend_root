import React, { useEffect, useState } from 'react'
import styles from './EmailAuth.module.css'
import axios from 'axios';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { validateAuthCode, getAuthCodeServerError } from '../../utils/validation';

const EmailAuth = ({ email, onVerified }) => {
  // 이메일 인증 모달창 숨기기/보이기 여부를 저장하는 state 변수
  const [isOpen, setIsOpen] = useState(false);
  
  // 이메일 인증번호를 저장하는 state 변수
  const [authCode, setAuthCode] = useState('');

  // 이메일 인증번호 타이머를 저장하는 state 변수
  const [timer, setTimer] = useState(0);

  // 이메일 인증번호 에러 메시지를 저장하는 state 변수
  const [errorMsg, setErrorMsg] = useState('');

  // 로딩 상태를 저장하는 state 변수
  const [loading, setLoading] = useState({
    sending : false,
    verifying : false
  });

  // 타이머를 "분:초" 형식으로 변환하는 함수
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // 이메일 인증번호 전송 요청 함수
  const handleSend = () => {
    if(!email){
      alert('이메일을 먼저 입력해주세요');
      return;
    }

    setLoading({
      ...loading,
      sending : true
    });

    axios
    .post('/api/email/send', { 'userEmail' : email })
    .then(res => {
      alert('인증번호가 전송되었습니다.')
      setTimer(300);
      setIsOpen(true);
    })
    .catch(error => console.log(error))
    .finally(() => setLoading({
      ...loading,
      sending : false
    }));
  };

  // 이메일 인증번호 검증 요청 함수
  const handleVerify = () => {
    const error = validateAuthCode(authCode, true);

    if(error){
      setErrorMsg(error);
      return;
    }

    setLoading({
      ...loading,
      verifying : true
    });

    axios
    .post('/api/email/verify', {
      'userEmail' : email,
      'authCode' : authCode
    })
    .then(res => {
      console.log(res.data);
      alert('이메일 인증이 완료되었습니다!');
      setErrorMsg('');
      setTimer(0);
      setIsOpen(false);
      onVerified();
    })
    .catch(error => {
      setErrorMsg(getAuthCodeServerError());
      console.log(error);
    })
    .finally(() => setLoading({
      ...loading,
      verifying : false
    }));
  };

  // 모달 닫고 입력값을 초기화하는 함수
  const handleClose = () => {
    setIsOpen(false);
    setAuthCode('');
  };

  // 타이머 카운트다운 및 만료 처리
  useEffect(() => {
    if(timer > 0){
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }

    if(timer === 0 && isOpen){
      alert('인증 시간이 만료되었습니다. 다시 시도해주세요.');
      handleClose();
    }
  }, [timer, isOpen]);

  return (
    <>
      {
        email && (
          <Button 
            content = {loading.sending ? '전송 중...' : '인증번호 전송'}
            size = '100%'
            color = 'blue'
            onClick = {() => handleSend()}
            disabled = {loading.sending}
          />
      )}

      <Modal
        title = '이메일 인증'
        size = '400px'
        isOpen = {isOpen}
        onClose = {() => handleClose()}
      >
        <div className={styles.input_wrap}>
          <Input
            type = 'text'
            size = '100%'
            placeholder = '인증번호 입력'
            value = {authCode}
            onChange = {e => {
              setAuthCode(e.target.value);
  
              if(e.target.value) {
                const error = validateAuthCode(e.target.value, true);
                setErrorMsg(error);
              } else {
                setErrorMsg('');
              }
            }}
          />
          {timer > 0 && (
            <span className={styles.timer}>
              {formatTimer()}
            </span>
          )}
        </div>
        <p className={styles.error}>{errorMsg}</p>
  
        <div className={styles.button_wrap}>
          <Button
            content = {loading.verifying ? '확인 중...' : '인증 확인'}
            size = '35%'
            color = 'blue'
            onClick = {() => handleVerify()}
            disabled = {!authCode || timer === 0 || loading.verifying}
          />
          <Button
            content = '취소'
            size = '35%'
            onClick = {() => handleClose()}
          />
        </div>
      </Modal>
    </>
  )
}

export default EmailAuth