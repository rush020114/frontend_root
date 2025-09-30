import React, { useEffect, useState } from 'react'
import styles from './ManageUser.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import axios from 'axios'

const ManageUser = () => {
  //회원 목록 state
  const [userList, setUserList] = useState([]);

  // 전체 선택 상태
  const [selectAllUsers, setSelectAllUsers] = useState(false); 

  // 개별 체크 상태
  const [checkedUsers, setCheckedUsers] = useState([]); 

  //회원 목록 정보를 조회 (url이 중복되기 때문에 fetchUserList 함수를 생성해서 중복 방지)
  const fetchUserList = () => {
    axios.get('/api/users/userList')
    .then(res => {
      console.log(res.data);
      setUserList(res.data);
      setCheckedUsers(new Array(res.data.length).fill(false));
    })
    .catch(e => console.log(e))
  };

  //fetchUserList 함수 호출
  useEffect(() => {
    fetchUserList();
  },[])

  // 전체 선택/해제
  const handleSelectAllUsers = () => {
    const newSelectAll = !selectAllUsers;
    setSelectAllUsers(newSelectAll);
    setCheckedUsers(new Array(userList.length).fill(newSelectAll));
  };

  // 개별 체크박스 선택
  const handleCheckUser = (index) => {
    const newCheckedUsers = [...checkedUsers];
    newCheckedUsers[index] = !newCheckedUsers[index];
    setCheckedUsers(newCheckedUsers);
    
    setSelectAllUsers(newCheckedUsers.every(item => item === true));
  };

  //삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    const selectedUsers = userList.filter((user, index) => checkedUsers[index]);
    
    if (selectedUsers.length === 0) {
      alert('삭제할 회원을 선택해주세요.');
      return;
    }

    if (window.confirm(`${selectedUsers.length}명의 회원을 삭제하시겠습니까?`)) {
      const deletePromises = selectedUsers.map(user => 
        axios.delete(`/api/users/${user.userId}`)
      );

      Promise.all(deletePromises)
      .then(() => {
        alert('삭제되었습니다.');
        setSelectAllUsers(false);
        fetchUserList();
      })
      .catch(e => {
        console.log(e);
        alert('삭제 중 오류가 발생했습니다.');
      });
    }
  };


  return (
    <>
      <h2>회원 목록</h2>
        <p className={styles.totalUsers}>총 회원 수 : {userList.length}명</p>
        <div className={styles.search_div}>
        <Input
          size='200px'
          placeholder='이름을 입력하세요'
        />
        <Button
          content='검 색'
          size='60px'
          fontSize='0.9rem'
        />
      </div>
      <div>
        <table className={styles.user_table}>
          <thead className={styles.user_thead}>
            <tr>
              <td><input 
                type="checkbox"
                checked={selectAllUsers}
                onChange={handleSelectAllUsers}
              /></td>
              <td>권한</td>
              <td>이름</td>
              <td>아이디</td>
              <td>이메일</td>
              <td>전화번호</td>
              <td>서비스</td>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, i) => {
              return (
                <tr key={i}>
                  <td><input 
                    type="checkbox" 
                    checked={checkedUsers[i] || false}
                    onChange={() => {handleCheckUser(i)}}
                  /></td>
                  <td>{user.userRole}</td>
                  <td>{user.userName}</td>
                  <td>{user.userId}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.userTel}</td>
                  <td>{user.serviceUse}</td>
                </tr>
              )
            })}
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
            onClick={handleDelete}
          ></Button>
        </div>
      </div>
    </>
  )
}

export default ManageUser