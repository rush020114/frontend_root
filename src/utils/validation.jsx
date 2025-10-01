import React from 'react';

//유효성 검사 결과에 따라 에러 메세지를 결정하는 함수
//checkFormat : true(기본값) = 형식 검사 0, false = 빈 값만 검사
//emptyIcon : 빈 값일 때 표시할 아이콘 (기본값 : 'info-circle-fill')
export const handleErrorMsg = (
                                e
                                , userData
                                , checkFormat = true
                                , emptyIcon = 'info-circle-fill'
) => {

  //아이디 정규 표현식 (4~10자 / 영문, 숫자만 허용)
  const idRegex = /^[a-zA-Z0-9]{4,10}$/;

  //비밀번호 정규 표현식 (6~12자 / 영문 + 숫자 + 특수문자 포함 허용)
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,12}$/;

  //연락처 정규 표현식 (4자리 숫자만 허용)
  const numberRegex = /^\d{4}$/;

  switch(e.target.name){
    //이름
    case 'userName':
      return e.target.value === '' ? (
        <span>
          <i className={`bi bi-${emptyIcon}`}></i>
          이름을 입력해 주세요.
        </span>
      ) : '';

    //아이디
    case 'userId':
      //빈 값 체크
      if(e.target.value === ''){
        return(
          <span>
            <i className={`bi bi-${emptyIcon}`}></i>
            아이디를 입력해 주세요.
          </span>
        );
      }
      //정규식 검사 (checkFormat이 true일 때만 실행)
      if(checkFormat && !idRegex.test(e.target.value)){
        return(
          <span>
            <i className={`bi bi-${emptyIcon}`}></i>
            아이디는 4~10자까지 영문, 숫자만 허용됩니다.
          </span>
        );
      }
      return '';

    //비밀번호
    case 'userPw':
      //빈 값 체크
      if(e.target.value === ''){
        return(
          <span>
            <i className={`bi bi-${emptyIcon}`}></i>
            비밀번호를 입력해 주세요.
          </span>
        );
      }
      //정규식 검사 (checkFormat이 true일 때만 실행)
      if(checkFormat && !pwRegex.test(e.target.value)){
        return(
          <span>
            <i className={`bi bi-${emptyIcon}`}></i>
            비밀번호는 6~12자까지 영문, 숫자, 특수문자만 허용됩니다.
          </span>
        );
      }
      return '';
    
    //비밀번호와 비밀번호 확인이 일치하는지
    case 'userPwConfirm':
      return userData && userData.userPw && e.target.value && userData.userPw !== e.target.value ? (
        <span>
          <i className={`bi bi-${emptyIcon}`}></i>
          비밀번호와 동일하게 입력해 주세요.
        </span>
      ) : '';

    //연락처
    case 'userTelArr':
      //빈 값 체크
      if(e.target.value === ''){
        return (
          <span>
            <i className={`bi bi-${emptyIcon}`}></i>
            연락처를 입력해 주세요.
          </span>
        );
      }
      //숫자만 입력 허용
      if(!numberRegex.test(e.target.value)){
        return (
          <span>
            <i className={`bi bi-${emptyIcon}`}></i>
            4자리 숫자만 입력해 주세요.
          </span>
        );
      }
      return '';
      
    default :
      return '';
  }
};