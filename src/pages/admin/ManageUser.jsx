import React from 'react'
import styles from './ManageUser.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'

const ManageUser = () => {
  return (
    <>
      <h2>회원 목록</h2>
        <p className={styles.totalUsers}>총 회원 수 : ??명</p>
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
        <table className={styles.userTable}>
          <thead className={styles.userThead}>
            <tr>
              <td><input type="checkbox" /></td>
              <td>권한</td>
              <td>이름</td>
              <td>아이디</td>
              <td>이메일</td>
              <td>전화번호</td>
              <td>서비스</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>관리자</td>
              <td>홍길동</td>
              <td>admin97</td>
              <td>admin970@gmail.com</td>
              <td>01012345678</td>
              <td>이용 중</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>관리자</td>
              <td>홍길동</td>
              <td>admin97</td>
              <td>admin970@gmail.com</td>
              <td>01012345678</td>
              <td>이용 중</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>관리자</td>
              <td>홍길동</td>
              <td>admin97</td>
              <td>admin970@gmail.com</td>
              <td>01012345678</td>
              <td>이용 중</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.btn_div}>
          <Button
            size='60px'
            content='생성'
            fontSize='0.9rem'
            color='green'
          ></Button>
          <Button
            size='60px'
            content='수정'
            fontSize='0.9rem'
            color='orange'
          ></Button>
          <Button
            size='60px'
            content='삭제'
            fontSize='0.9rem'
            color='red'
          ></Button>
        </div>
      </div>
    </>
  )
}

export default ManageUser