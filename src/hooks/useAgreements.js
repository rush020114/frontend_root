import { useState } from "react";

const useAgreements = () => {
  // 전체 약관 동의 여부를 저장하는 state 변수
  const [agreeAll, setAgreeAll] = useState(false);

  // 개별 약관 동의 여부를 저장하는 state 변수
  const [agreements, setAgreements] = useState({
    'terms' : false,                // 이용약관 (필수)
    'privacy' : false,              // 개인정보 처리방침 (필수)
    'marketing' : false             // 마케팅 정보 수신 (선택)
  });

  // 전체 약관 동의 함수
  const handleAgreeAll = () => {
    const newValue = !agreeAll;

    setAgreeAll(newValue);

    const newAgreements = {
      'terms' : newValue,
      'privacy' : newValue,
      'marketing' : newValue
    };
    setAgreements(newAgreements);
  };

  // 개별 약관 동의 함수
  const handleAgreement = (e) => {
    const newAgreements = {
      ...agreements,
      [e.target.name] : e.target.checked
    };

    setAgreements(newAgreements);

    // 모든 약관이 동의되었는지 확인하여 전체 동의 체크박스 업데이트
    const allChecked = newAgreements.terms && 
                       newAgreements.privacy &&
                       newAgreements.marketing;

    setAgreeAll(allChecked);
  };

  // 필수 약관(이용약관, 개인정보) 동의 완료 여부
  const isRequiredAgreed = agreements.terms && agreements.privacy;

  return {
    agreeAll,
    agreements,
    handleAgreeAll,
    handleAgreement,
    isRequiredAgreed
  };
};

export default useAgreements;