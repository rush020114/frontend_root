import React, { useState } from 'react'
import styles from './RegService.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Textarea from '../../common/Textarea'

const RegService = () => {

  // 서비스 신청 등록 데이터를 저장할 state 변수
  const [serviceData, setServiceData] = useState({
    
  })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>스마트팜 서비스 신청</h2>
        <div className={styles.table_div}>
          <h3>
            <i className="bi bi-person-fill"></i> 회원 기본 정보
          </h3>
          <table>
            <tbody>
              <tr>
                <td>이름</td>
                <td></td>
              </tr>
              <tr>
                <td>아이디</td>
                <td></td>
              </tr>
              <tr>
                <td>이메일</td>
                <td></td>
              </tr>
              <tr>
                <td>연락처</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      <div className={styles.radio_div}>
          <b>신청자 유형</b>
          <div>
            <div>
              <input type="radio" />
              <p>법인</p>
            </div>
            <div>
              <input type="radio" />
              <p>개인사업자</p>
            </div>
            <div>
              <input type="radio" />
              <p>개인</p>
            </div>
          </div>
        </div>
        <div className={styles.tel_div}>
          <b>실무자 연락처</b>
          <div>
            <Input
              size='30%'
            />
            -
            <Input 
              size='30%'
            />
            -
            <Input 
              size='30%'
            />
          </div>
        </div>
        <div className={styles.addr_div}>
          <b>주소</b>
          <div>
            <div>
              <Input 
                size='75%'
              />
              <Button
                content='주 소'
                size='25%'
                padding=''
              />
            </div>
            <Input 
              size='100%'
            />
          </div>
        </div>
        <div>
          <b>상담 내용</b>
          <Textarea
            size='100%'
          />
        </div>
        <div>
          <Button 
            content='신청하기'
            size='100%'
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}

export default RegService