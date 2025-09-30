import React from 'react';

//유효성 검사 결과에 따라 에러 메세지를 결정하는 함수
export const handleErrorMsg = (e, userData) => {
  //아이디 정규 표현식 (4~10자 / 영문, 숫자만 허용)
  const idRegex = /^[a-zA-Z0-9]{4,10}$/;

  //비밀번호 정규 표현식 (6~12자 / 영문 + 숫자 + 특수문자 포함 허용)
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,12}$/;

  //연락처 정규 표현식 (4자리 숫자만 허용)
  const numberRegex = /^\d{4}$/;

  switch(e.target.name){
    case 'userName':
      return e.target.value === '' ? (
        <span>
          <i className="bi bi-info-circle-fill"></i> 이름을 입력해 주세요.
        </span>
      ) : '';

    case 'userId':
      return !idRegex.test(e.target.value) ? (
        <span>
          <i className="bi bi-info-circle-fill"></i> 아이디는 4~10자까지 영문, 숫자만 허용됩니다.
        </span>
      ) : '';

    case 'userPw':
      return !pwRegex.test(e.target.value) ? (
        <span>
          <i className="bi bi-info-circle-fill"></i> 비밀번호는 6~12자까지 영문, 숫자, 특수문자만 허용됩니다.
        </span>
      ) : '';
        
    case 'userPwConfirm':
      return userData && userData.userPw && e.target.value && userData.userPw !== e.target.value ? (
        <span>
          <i className="bi bi-info-circle-fill"></i> 비밀번호와 동일하게 입력해 주세요.
        </span>
      ) : '';

    case 'userTelArr':
      if(e.target.value === ''){
        return (
          <span>
            <i className="bi bi-info-circle-fill"></i> 연락처를 입력해 주세요.
          </span>
        );
      }
      if(!numberRegex.test(e.target.value)){
        return (
          <span>
            <i className="bi bi-info-circle-fill"></i> 4자리 숫자만 입력해 주세요.
          </span>
        );
      }
      return '';
      
    default:
      return '';
  }
};