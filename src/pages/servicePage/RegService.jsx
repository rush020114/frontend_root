import React, { useEffect, useState } from 'react'
import styles from './RegService.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Textarea from '../../common/Textarea'
import { useDaumPostcodePopup } from 'react-daum-postcode'

const RegService = () => {

  // 다음 주소록 팝업 생성 함수
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  // 유효성 검사 메시지를 저장할 state 변수
  const [errorMsg, setErrorMsg] = useState({
    businessTel: ''
    , addrDetail: ''
  })

  // 버튼 활성화 여부를 결정할 state 변수
  const [isDisable, setIsDisable] = useState(true);

  // 서비스 신청 등록 데이터를 저장할 state 변수
  const [serviceData, setServiceData] = useState({
    applRole: ''
    , businessTel: ['', '', '']
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
    serviceData.businessTel.splice(index, 1, e.target.value);
    setServiceData({
      ...serviceData
      , businessTel: serviceData.businessTel
    })
  }

  // 주소록 띄우기 및 검색 기능 함수
  const handlePost = () => {
    open({onComplete: data => {
      setServiceData({
        ...serviceData
        , applAddr: data.address
      });
    }});
  };

  // 버튼 활성화를 결정할 useEffect
  useEffect(() => {
    if(serviceData.applRole &&
      serviceData.businessTel[0] &&
      serviceData.businessTel[1] &&
      serviceData.businessTel[2] &&
      serviceData.applAddr &&
      serviceData.addrDetail
    ){
      setIsDisable(false);
    }
    else{
      setIsDisable(true);
    };
  }, [serviceData])

  console.log(serviceData)

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
        <div className={styles.table_div}>
          <h3>
            <i className="bi bi-person-fill"></i> 회원 기본 정보 
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
        </div>
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
              name='businessTel'
              value={serviceData.businessTel[0]}
              onChange={e => {
                handleServiceTel(0, e)
                setErrorMsg({
                  ...errorMsg
                  , businessTel: e.target.value 
                  ? 
                  '' 
                  : 
                  '전화번호는 필수입력입니다.'
                })
              }}
              maxLength={3}
            />
            -
            <Input 
              size='30%'
              name='businessTel'
              value={serviceData.businessTel[1]}
              onChange={e => {
                handleServiceTel(1, e)
                setErrorMsg({
                  ...errorMsg
                  , businessTel: e.target.value 
                  ? 
                  '' 
                  : 
                  '전화번호는 필수입력입니다.'
                })
              }}
              maxLength={4}
            />
            -
            <Input 
              size='30%'
              name='businessTel'
              value={serviceData.businessTel[2]}
              onChange={e => {
                handleServiceTel(2, e)
                setErrorMsg({
                  ...errorMsg
                  , businessTel: e.target.value 
                  ? 
                  '' 
                  : 
                  '전화번호는 필수입력입니다.'
                })
              }}
              maxLength={4}
            />
          </div>
          <p className='error'>{errorMsg.businessTel}</p>
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
              onChange={e => {
                handleService(e)
                setErrorMsg({
                  ...errorMsg
                  , addrDetail: e.target.value 
                  ? 
                  '' 
                  : 
                  '주소는 필수입력입니다.'
                })
              }}
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
        <div>
          <Button 
            content='신청하기'
            size='100%'
            disabled={isDisable}
          />
        </div>
      </div>
    </div>
  )
}

export default RegService