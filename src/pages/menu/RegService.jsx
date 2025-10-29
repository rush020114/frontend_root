import React, { useEffect, useRef, useState } from 'react'
import styles from './RegService.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Textarea from '../../common/Textarea'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegService = () => {
  const nav = useNavigate();

  // 다음 주소록 팝업 생성 함수
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 회원 정보를 받아올 state 변수
  const [userInfo, setUserInfo] = useState({});

  // 약관 체크박스 데이터를 저장할 state 변수
  const[checkData, setCheckData] = useState([]);

  // 장바구니의 모든 데이터를 저장할 useRef
  const checkAllData = useRef(['N', 'Y']);

  // 버튼 활성화 여부를 결정할 state 변수
  const [isDisable, setIsDisable] = useState(true);

  // 서비스 신청 등록 데이터를 저장할 state 변수
  const [serviceData, setServiceData] = useState({
    applRole: ''
    , farmName: ''
    , businessTelArr: ['', '', '']
    , applAddr: ''
    , addrDetail: ''
    , applContent: ''
  });
  
  // 회원 정보를 받아올 useEffect
  useEffect(() => {
    axios.get(`/api/users/userInfo/${loginData.userId}`)
    .then(res => setUserInfo(res.data))
    .catch(e => console.log(e));
  }, []);

  // 서비스 신청 등록 데이터를 세팅할 함수
  const handleService = e => {
    setServiceData({
      ...serviceData
      , [e.target.name]: e.target.value
    });
  };

  // 서비스 신청 전화번호 데이터를 세팅할 함수
  const handleServiceTel = (index, e) => {
    serviceData.businessTelArr.splice(index, 1, e.target.value);
    setServiceData({
      ...serviceData
      , businessTelArr: serviceData.businessTelArr
    });
  };

  // 주소록 띄우기 및 검색 기능 함수
  const handlePost = () => {
    open({onComplete: data => {
      setServiceData({
        ...serviceData
        , applAddr: data.address
      });
    }});
  };

  // 체크박스 값 변경 시 실행 함수
  const handleCheckbox = e => {
    if(e.target.checked){
      setCheckData([
        ...checkData
        , e.target.value
      ])
    }
    else{
      setCheckData(checkData.filter(check => check !== e.target.value))
    };
  };

  // 버튼 활성화를 결정할 useEffect
  useEffect(() => {
    if(serviceData.applRole &&
      serviceData.farmName &&
      serviceData.businessTelArr[0] &&
      serviceData.businessTelArr[1] &&
      serviceData.businessTelArr[2] &&
      serviceData.applAddr &&
      serviceData.addrDetail &&
      checkData.includes('Y')
    ){
      setIsDisable(false);
    }
    else{
      setIsDisable(true);
    };
  }, [serviceData, checkData]);

  // 서비스 신청 함수
  const regService = () => {
    axios.post('/api/applications', {...serviceData, userId: loginData.userId})
    .then(res => {
      alert(res.data);
      nav('/user')
    })
    .catch(e => {
      console.log(e);
      alert('신청 진행 중입니다.');
      nav('/user')
    });
  }

  console.log(userInfo)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title_div}>
          <h2>🌱 스마트팜 서비스 신청</h2>
          <div>
            <span className={styles.span}>* </span>
            &#40;필수입력사항&#41;
          </div>
        </div>
        <div className={styles.flex_div}>
          <div className={styles.flex2_div}>
            <div className={styles.table_div}>
              <h3>
                📋 회원 기본 정보 
              </h3>
              <table className={styles.table}>
                <colgroup>
                  <col width='20%' />
                  <col width='80%' />
                </colgroup>
                <tbody>
                  <tr>
                    <td>이름</td>
                    <td>{userInfo.userName}</td>
                  </tr>
                  <tr>
                    <td>아이디</td>
                    <td>{userInfo.userId}</td>
                  </tr>
                  <tr>
                    <td>이메일</td>
                    <td>{userInfo.userEmail}</td>
                  </tr>
                  <tr>
                    <td>연락처</td>
                    <td>{userInfo.userTel}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.terms_div}>
              <h3>📜 약관 동의</h3>
              <div className={styles.terms_title}>
                <input 
                  type="checkbox" 
                  checked={checkData.length === checkAllData.current.length}
                  onChange={e => e.target.checked ? setCheckData(checkAllData.current) : setCheckData([])}
                />
                전체 동의하기
              </div>
              <span style={{fontSize: '0.86rem'}}>
                위 모든 약관에 동의하며, 스마트팜 서비스 이용을 신청합니다.
              </span>
              <div className={styles.terms_title}>
                <input 
                  type="checkbox" 
                  value={'Y'}
                  checked={checkData.includes('Y')}
                  onChange={e => handleCheckbox(e)}
                />
                <span>&#91;필수&#93; </span> 
                 서비스 이용약관
              </div>
              <div className={styles.terms}>
                당사는 스마트팜 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다. <br />
                - 수집목적: 딸기 재배 스마트팜 서비스 제공, 고객 상담, 서비스 이용료 정산, 딸기 재배 관리 지원 <br />
                - 수집항목: 성명, 연락처(휴대폰, 이메일), 주소, 농장이름, 서비스 이용기록 <br />
                - 제공서비스: 온도·습도·조도·토양습도 센서 모니터링, 물펌프·선풍기 자동제어, 모션감지 알림 기능 <br />
                - 거부권리: 개인정보 수집에 거부하실 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다. <br />
                개인정보 처리방침에 따라 안전하게 관리되며, 목적 외 용도로는 사용되지 않습니다.
              </div>
              <div className={styles.terms_title}>
                <input 
                  type="checkbox" 
                  value={'N'}
                  checked={checkData.includes('N')}
                  onChange={e => handleCheckbox(e)}
                />
                <span style={{color: '#777777'}}>&#91;선택&#93; </span> 
                마케팅 정보 수신 동의
              </div>
              <div className={styles.terms}>
                더 나은 농업 정보와 혜택을 제공하기 위한 마케팅 정보 발송에 동의합니다. <br />
                - 발송    내용: 신규 서비스 안내, 할인 이벤트, 농업 기술 정보, 수확 시기 알림, 계절별 재배 팁 <br />
                - 발송 방법: SMS, 이메일, 카카오톡, 앱 푸시알림 <br />
                - 발송 주기: 주 1-2회 (중요 정보는 수시), 이벤트성 정보는 월 2-3회 <br />
                - 철회 방법: 언제든지 수신거부 가능 (문자 수신거부, 이메일 구독취소, 고객센터 연락) <br />
                - 위탁 업체: 마케팅 발송을 위해 전문 업체에 위탁할 수 있으며, 개인정보 보호를 위한 계약을 체결합니다. <br />
                동의하지 않으셔도 서비스 이용에는 전혀 제한이 없습니다.
              </div>
            </div>
          </div>
          <div className={styles.form_div}>
            <div className={styles.radio_div}>
              <b>
                신청자 유형
                <span className={styles.span}> *</span>
              </b>
              <div>
                <div>
                  <input type="radio" 
                    name='applRole'
                    value={'COPORATE'}
                    onChange={e => handleService(e)}
                  />
                  <p>법인</p>
                </div>
                <div>
                  <input type="radio" 
                    name='applRole'
                    value={'PERSONAL'}
                    onChange={e => handleService(e)}
                  />
                  <p>개인</p>
                </div>
              </div>
            </div>
            <div>
              <b>
                농장 이름
                <span className={styles.span}> *</span>
              </b>
              <div>
                <Input 
                  size='100%'
                  name='farmName'
                  value={serviceData.farmName}
                  onChange={e => handleService(e)}
                />
              </div>
            </div>
            <div className={styles.tel_div}>
              <b>
                실무자 연락처
                <span className={styles.span}> *</span>
              </b>
              <div>
                <Input
                  size='30%'
                  name='businessTelArr'
                  value={serviceData.businessTelArr[0]}
                  onChange={e => handleServiceTel(0, e)}
                  maxLength={3}
                />
                -
                <Input 
                  size='30%'
                  name='businessTelArr'
                  value={serviceData.businessTelArr[1]}
                  onChange={e => handleServiceTel(1, e)}
                  maxLength={4}
                />
                -
                <Input 
                  size='30%'
                  name='businessTelArr'
                  value={serviceData.businessTelArr[2]}
                  onChange={e => handleServiceTel(2, e)}
                  maxLength={4}
                />
              </div>
            </div>
            <div className={styles.addr_div}>
              <b>
                주소
                <span className={styles.span}> *</span>
              </b>
              <div>
                <div>
                  <Input 
                    size='75%'
                    readOnly={true}
                    onClick={() => handlePost()}
                    name='applAddr'
                    value={serviceData.applAddr}
                    onChange={e => {
                      handleService(e)
                    }}
                  />
                  <Button
                    content='주 소'
                    size='25%'
                    padding=''
                    onClick={() => handlePost()}
                  />
                </div>
                <Input 
                  size='100%'
                  name='addrDetail'
                  value={serviceData.addrDetail}
                  onChange={e => handleService(e)}
                  maxLength={50}
                />
              </div>
            </div>
            <div>
              <b>상담 내용</b>
              <Textarea
                size='100%'
                name='applContent'
                  value={serviceData.applContent}
                  onChange={e => handleService(e)}
                  maxLength={100}
              />
            </div>
            <div >
              <Button 
                content='신청하기'
                size='100%'
                disabled={isDisable}
                onClick={() => isDisable ? alert('약관 또는 필수입력사항을 확인하십시오.') : regService()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegService