import React from 'react';

// 유효성 검사 결과에 따라 에러 메세지를 결정하는 함수
export const handleErrorMsg = (
  e
  , userData
  , checkFormat = true
  , isError = false
) => {

  // 에러 상태에 따른 아이콘과 CSS 클래스 자동 결정
  const icon = isError ? 'x-circle-fill' : 'info-circle-fill';
  const errorClass = isError ? 'error-red' : 'error-blue';

  // 아이디 정규 표현식 (4~10자 | 영문, 숫자만 허용)
  const idRegex = /^[a-zA-Z0-9]{4,10}$/;

  // 비밀번호 정규 표현식 (6~12자 | 영문 + 숫자 + 특수문자 포함 허용)
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,12}$/;

  // 연락처 정규 표현식 (4자리 숫자만 허용)
  const numberRegex = /^\d{4}$/;

  switch(e.target.name){
    case 'userName' :
      return e.target.value === '' ? (
        <span className = {errorClass}>
          <i className = {`bi bi-${icon}`}></i>
          이름을 입력해 주세요.
        </span>
      ) : '';

    case 'userId' :
      if(e.target.value === ''){
        return(
          <span className = {errorClass}>
            <i className = {`bi bi-${icon}`}></i>
            아이디를 입력해 주세요.
          </span>
        );
      }

      if(checkFormat && !idRegex.test(e.target.value)){
        return(
          <span className = {errorClass}>
            <i className = {`bi bi-${icon}`}></i>
            아이디는 4~10자까지 영문, 숫자만 허용됩니다.
          </span>
        );
      }
      return '';

    case 'userPw' :
      if(e.target.value === ''){
        return(
          <span className = {errorClass}>
            <i className = {`bi bi-${icon}`}></i>
            비밀번호를 입력해 주세요.
          </span>
        );
      }

      if(checkFormat && !pwRegex.test(e.target.value)){
        return(
          <span className = {errorClass}>
            <i className = {`bi bi-${icon}`}></i>
            비밀번호는 6~12자까지 영문, 숫자, 특수문자만 허용됩니다.
          </span>
        );
      }
      return '';
    
    case 'userPwConfirm' :
      return userData.userPw && e.target.value && userData.userPw !== e.target.value ? (
        <span className = {errorClass}>
          <i className = {`bi bi-${icon}`}></i>
          비밀번호와 동일하게 입력해 주세요.
        </span>
      ) : '';

    case 'userTelArr' :
      if(e.target.value === ''){
        return (
          <span className = {errorClass}>
            <i className = {`bi bi-${icon}`}></i>
            연락처를 입력해 주세요.
          </span>
        );
      }

      if(!numberRegex.test(e.target.value)){
        return (
          <span className = {errorClass}>
            <i className = {`bi bi-${icon}`}></i>
            4자리 숫자만 입력해 주세요.
          </span>
        );
      }
      return '';

    case 'firstEmail' :
    case 'secondEmail' :
      return e.target.value === '' ? (
        <span className = {errorClass}>
          <i className={`bi bi-${icon}`}></i>
          이메일 주소를 입력해 주세요.
        </span>
      ) : '';
      
    default :
      return '';
  }
};

// 필수 입력 항목이 모두 채워졌는지 검증하는 함수
export const checkRequired = (userData) => {
  return userData.userName && 
         userData.userId && 
         userData.userPw && 
         userData.userPwConfirm && 
         userData.userTelArr[1] && 
         userData.userTelArr[2] &&
         userData.firstEmail &&
         userData.secondEmail;
};

// 이메일 인증번호 검증하는 함수
export const validateAuthCode = (authCode, isError = false) => {
  // 인증번호 정규 표현식 (6자리 숫자만 허용)
  const authCodeRegex = /^\d{6}$/;

  const icon = isError ? 'x-circle-fill' : 'info-circle-fill';
  const errorClass = isError ? 'error-red' : 'error-blue';

  if (!authCode) {
    return (
      <span className={errorClass}>
        <i className={`bi bi-${icon}`}></i>
        인증번호를 입력해주세요.
      </span>
    );
  }

  if(!authCodeRegex.test(authCode)){
    return(
      <span className={errorClass}>
        <i className={`bi bi-${icon}`}></i>
        인증번호는 6자리 숫자만 입력 가능합니다.
      </span>
    );
  }

  return '';
};

// 서버 응답 에러 메시지 생성하는 함수
export const getAuthCodeServerError = () => {
  return (
    <span className = "error-red">
      <i className = "bi bi-x-circle-fill"></i>
      인증번호가 일치하지 않거나 만료되었습니다.
    </span>
  );
};