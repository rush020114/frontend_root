import React, { useEffect, useRef, useState } from 'react'
import styles from './RegService.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Textarea from '../../common/Textarea'
import { useDaumPostcodePopup } from 'react-daum-postcode'

const RegService = () => {

  // 다음 주소록 팝업 생성 함수
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  // 약관 체크박스 데이터를 저장할 state 변수
  const[checkData, setCheckData] = useState([]);

  // 장바구니의 모든 데이터를 저장할 useRef
  const checkAllData = useRef(['N', 'Y']);

  // 버튼 활성화 여부를 결정할 state 변수
  const [isDisable, setIsDisable] = useState(true);

  // 서비스 신청 등록 데이터를 저장할 state 변수
  const [serviceData, setServiceData] = useState({
    applRole: ''
    , businessTelArr: ['', '', '']
    , applAddr: ''
    , addrDetail: ''
    , content: ''
  });

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title_div}>
          <h2>스마트팜 서비스 신청</h2>
          <div>
            <span className={styles.span}>* </span>
            &#40;필수입력사항&#41;
          </div>
        </div>
        <div className={styles.flex_div}>
          <div className={styles.table_div}>
            <h3>
              <span><i className="bi bi-person-fill"></i></span> 회원 기본 정보 
            </h3>
            <table>
              <colgroup>
                <col width='20%' />
                <col width='80%' />
              </colgroup>
              <tbody>
                <tr>
                  <td>이름</td>
                  <td>홍길동</td>
                </tr>
                <tr>
                  <td>아이디</td>
                  <td>hong1234</td>
                </tr>
                <tr>
                  <td>이메일</td>
                  <td>hong1234@gmail.com</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>010-1234-1234</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.terms_div}>
              <h3><span><i className="bi bi-person-fill"></i></span> 약관</h3>
              <div className={styles.terms_title}>
                <input 
                  type="checkbox" 
                  checked={checkData.length === checkAllData.current.length}
                  onChange={e => e.target.checked ? setCheckData(checkAllData.current) : setCheckData([])}
                />
                전체 동의하기
              </div>
              <span style={{fontSize: '0.86rem'}}>
                실명 인증된 아이디로 가입 동의를 포함합니다.
              </span>
              <div className={styles.terms_title}>
                <input 
                  type="checkbox" 
                  value={'Y'}
                  checked={checkData.includes('Y')}
                  onChange={e => handleCheckbox(e)}
                />
                <span>&#91;필수&#93; </span> 
                이용약관
              </div>
              <div className={styles.terms}>
                이용약관
                1. 약관의 동의  
                본 사이트를 이용함으로써 이용자는 본 약관에 동의하는 것으로 간주됩니다.
                2. 이용자의 의무  
                이용자는 불법적이거나 금지된 행위로 사이트를 이용해서는 안 됩니다.
                3. 지적재산권  
                본 사이트의 모든 콘텐츠는 회사에 귀속되며 저작권법의 보호를 받습니다.
                4. 책임의 제한  
                회사는 사이트 이용으로 인한 손해에 대해 책임지지 않습니다.
                5. 약관의 변경  
                회사는 사전 통지 없이 언제든지 약관을 변경할 수 있습니다.
              </div>
              <div className={styles.terms_title}>
                <input 
                  type="checkbox" 
                  value={'N'}
                  checked={checkData.includes('N')}
                  onChange={e => handleCheckbox(e)}
                />
                <span style={{color: '#777777'}}>&#91;선택&#93; </span> 
                수집
              </div>
              <div className={styles.terms}>
                이용약관
                1. 서문  
                본 서비스를 이용함으로써 이용자는 본 이용약관에 동의하는 것으로 간주됩니다.
                2. 이용 자격  
                본 서비스는 만 18세 이상의 이용자만 사용할 수 있습니다.
                3. 계정 보안  
                이용자는 자신의 계정 정보에 대한 보안 유지 책임이 있습니다.
                4. 금지 행위  
                이용자는 서비스나 다른 이용자에게 피해를 주는 행위를 해서는 안 됩니다.
                5. 서비스 이용 제한  
                약관 위반 시 회사는 계정을 정지하거나 이용을 제한할 수 있습니다.
                6. 개인정보  
                본 서비스의 이용은 개인정보 처리방침에도 따릅니다.
                7. 준거법  
                본 약관은 [관할지역] 법률에 따라 해석되고 적용됩니다.
                8. 문의  
                약관에 관한 문의는 support@example.com 으로 연락해 주시기 바랍니다.
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
                    value={'personal'}
                    onChange={e => handleService(e)}
                  />
                  <p>법인</p>
                </div>
                <div>
                  <input type="radio" 
                    name='applRole'
                    value={'corporate'}
                    onChange={e => handleService(e)}
                  />
                  <p>개인</p>
                </div>
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
                name='content'
                  value={serviceData.content}
                  onChange={e => handleService(e)}
                  maxLength={100}
              />
            </div>
            <div >
              <Button 
                content='신청하기'
                size='100%'
                disabled={isDisable}
                onClick={() => isDisable ? alert('약관 또는 필수입력사항을 확인하십시오.') : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegService