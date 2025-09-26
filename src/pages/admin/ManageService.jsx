import React from 'react'
import styles from './ManageService.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'

const ManageService = () => {
  return (
    <div  className={styles.container}>
      <h2>서비스 신청 현황</h2>
      <p className={styles.total_sv}>총 신청 수: ??건</p>
      <div className={styles.search_div}>
        <Input
          size='200px'
        />
        <Button
          content='검 색'
          size='60px'
          fontSize='0.9rem'
        />
      </div>
      <div>
        <table className={styles.sv_table}>
          <thead className={styles.sv_thead}>
            <tr>
              <td><input type="checkbox" /></td>
              <td>신청자 ID</td>
              <td>회원명</td>
              <td>이메일</td>
              <td>전화번호</td>
              <td>유형</td>
              <td>상태</td>
              <td>신청일</td>
              <td>관리</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>user12</td>
              <td>동길홍</td>
              <td>user12@gmail.com</td>
              <td>010-9876-5432</td>
              <td>법인</td>
              <td>대기 중</td>
              <td>2025-09-19</td>
              <td>
                <Button
                content='관리' 
                />
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>user12</td>
              <td>동길홍</td>
              <td>user12@gmail.com</td>
              <td>010-9876-5432</td>
              <td>개인</td>
              <td>대기 중</td>
              <td>2025-09-19</td>
              <td>
                <Button 
                content='관리' 
                />
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>user12</td>
              <td>동길홍</td>
              <td>user12@gmail.com</td>
              <td>010-9876-5432</td>
              <td>법인</td>
              <td>대기 중</td>
              <td>2025-09-19</td>
              <td>
                <Button 
                content='관리' 
                />
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>user12</td>
              <td>동길홍</td>
              <td>user12@gmail.com</td>
              <td>010-9876-5432</td>
              <td>개인</td>
              <td>대기 중</td>
              <td>2025-09-19</td>
              <td>
                <Button 
                content='관리' 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default ManageService