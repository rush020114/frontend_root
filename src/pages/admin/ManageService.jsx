import React, { useEffect, useState } from 'react'
import styles from './ManageService.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import axios from 'axios'

const ManageService = () => {
  //서비스 신청 목록 state 변수
  const [serviceList, setServiceList] = useState([]);

  // 전체 선택 상태
  const [selectAll, setSelectAll] = useState(false); 

  // 개별 체크 상태
  const [checkedItems, setCheckedItems] = useState([]); 

  //검색어 state
  const [searchName, setSearchName] = useState('');
  
  //필터링된 회원 목록 state
  const [filteredAppList, setFilteredAppList] = useState([])

  // 전체 목록 조회 함수 추가
  const fetchAppList = () => {
    axios.get('/api/applications/list')
    .then(res => {
      console.log(res.data);
      setServiceList(res.data);
      setFilteredAppList(res.data); //초기에는 전체 목록 표시
      setCheckedItems(new Array(res.data.length).fill(false));
    })
    .catch(e => console.log(e))
  };

  //서비스 신청 목록을 조회
  useEffect(() => {
    fetchAppList(); //중복되는 url 함수 호출
  },[])

  // 전체 선택/해제
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckedItems(new Array(filteredAppList.length).fill(newSelectAll))
  };

  // 개별 체크박스 선택
  const handleCheckItem = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    
    // 모든 항목이 체크되었는지 확인
    setSelectAll(newCheckedItems.every(item => item === true));
  };


  //이름으로 검색 기능
  const handleSearch = () => {
    if (searchName.trim() === '') {
      fetchAppList(); // 전체 목록 조회
    } else {
      axios.get(`/api/applications/appList/${searchName}`)
      .then(res => {
        setFilteredAppList(res.data);
        setCheckedItems(new Array(res.data.length).fill(false));
        setSelectAll(false);
      })
      .catch(e => console.log(e));
    }
  };

  // Enter 키로도 검색 가능하도록
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  //승인 버튼 클릭 핸들러
    const handleApprove = (applNum) => {
    if (window.confirm('승인하시겠습니까?')) {
      axios.put(`/api/applications/approve/${applNum}`)
      .then(res => {
        alert('승인되었습니다.');
        // 목록 새로고침
        axios.get('/api/applications/list')
        .then(res => {
          setServiceList(res.data);
          fetchAppList();
        })
      })
      .catch(e => {
        console.log(e);
        alert('승인 중 오류가 발생했습니다.');
      })
    }
  };

  return (
    <div  className={styles.container}>
      <h2>서비스 신청 현황</h2>
      <p className={styles.total_sv}>총 신청 수: {serviceList.length}건</p>
      <div className={styles.search_div}>
        <Input
          size='200px'
          placeholder='이름을 입력하세요'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          content='검 색'
          size='60px'
          fontSize='0.9rem'
          onClick={handleSearch}
        />
      </div>
      <div>
        <table className={styles.sv_table}>
          <thead className={styles.sv_thead}>
            <tr>
              <td><input 
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              /></td>
              <td>신청자 ID</td>
              <td>회원명</td>
              <td>이메일</td>
              <td>전화번호</td>
              <td>유형</td>
              <td>상태</td>
              <td>신청일</td>
              <td>승인일</td>
              <td>관리</td>
            </tr>
          </thead>
          <tbody>
            {filteredAppList.map((service, i) => {
              return (
                <tr key={i}>
                  <td><input 
                        type="checkbox"
                        checked={checkedItems[i] || false}  // 해당 행의 체크 상태
                        onChange={() => handleCheckItem(i)} // 클릭 시 해당 행 토글
                  /></td>
                  <td>{service.userId}</td>
                  <td>{service.userDTO.userName}</td>
                  <td>{service.userDTO.userEmail}</td>
                  <td>{service.businessTel}</td>
                  <td>{service.applRole === 'PERSONAL' ? '개인' : '법인'}</td>
                  <td>{service.apprDate ? '승인 완료' : '대기 중'}</td>
                   <td>{service.regDate.split('T')[0]}</td>
                  <td>{service.apprDate ? service.apprDate.split('T')[0] : '-'}</td>
                  <td>
                    <Button
                      content='승 인'
                      onClick={() => handleApprove(service.applNum)}
                      disabled={service.apprDate !== null}
                  /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default ManageService