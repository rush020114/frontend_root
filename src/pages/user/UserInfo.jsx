import React, { useEffect, useState } from 'react'
import styles from './UserInfo.module.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../component/pagination/Pagination';

const UserInfo = () => {
  const nav = useNavigate();

  // 문의 목록 조회를 저장할 state 변수
  const [qstList, setQstList] = useState([]);

  // 활성 페이지 세팅
  const [currentPage, setCurrentPage] = useState(0);

  // 보여줄 페이지
  const itemsPerPage = 5;

  // 현재 페이지 보여줄 데이터 계산
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQstList = qstList.slice(startIndex, endIndex);

  // 페이지를 변경시켜줄 함수
  const handlePageChange = selectedPage => {
    setCurrentPage(selectedPage);
  };

  // 문의 목록을 세팅할 useEffect
  useEffect(() => {
    axios.get('/api/questions', {params: {
      memRole: 'USER'
      , userId: 'user'
    }})
    .then(res => setQstList(res.data))
    .catch(e => console.log(e));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title_div}>
        <h1>👤 내 정보</h1>
        <p>안녕하세요, (이름)님! 스마트팜 관리 현황을 확인해보세요.</p>
      </div>
      <div className={styles.info_div}>
        <div className={styles.info_title}>
          <h2>🌱 기본 정보</h2>
        </div>
        <div className={styles.user_info}>
          <div>
            <p>이름</p>
            <p>김이름</p>
          </div>
          <div>
            <p>농장명</p>
            <p>root</p>
          </div>
          <div>
            <p>유형</p>
            <p>개인</p>
          </div>
          <div>
            <p>이메일</p>
            <p>user1111@gmail.com</p>
          </div>
          <div>
            <p>연락처</p>
            <p>010-3333-4444</p>
          </div>
          <div>
            <p>주소</p>
            <p>무슨 동 무슨 아파트</p>
          </div>
          <div>
            <p>가입일</p>
            <p>2025-09-09</p>
          </div>
          <div>
            <p>신청 상태</p>
            <p>이용중</p>
          </div>
          <div>
            <p>재배작물</p>
            <p>딸기</p>
          </div>
        </div>
      </div>
      <div className={styles.usage_div}>
        <div className={styles.usage_title}>
          <h2>📊 이용 현황</h2>
        </div>
        <div className={styles.usage_info}>
          <div
            style={{background: 'linear-gradient(135deg, #4dab28, #6bc247)'}}
          >
            <h2>1</h2>
            <p>총 이용일</p>
          </div>
          <div
            style={{background: 'linear-gradient(135deg, #2980b9, #3498db)'}}
          >
            <h2>2</h2>
            <p>연결된 센서</p>
          </div>
        </div>
      </div>
      <div className={styles.qna_div}>
        <div className={styles.qna_title}>
          <h2>💬 최근 문의 내역</h2>
        </div>
        <div className={styles.table_div}>
          <table className={styles.qna_table}>
            <colgroup>
              <col width='7%' />
              <col width='43%' />
              <col width='30%' />
              <col width='20%' />
            </colgroup>
            <thead>
              <tr>
                <td>No</td>
                <td>제목</td>
                <td>등록일</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
            {
              currentQstList.length
              ?
              currentQstList.map((qst, i) => {
                return(
                  <tr 
                    key={i}
                    onClick={() =>{
                       nav(`/user/qna/${qst.qstId}`);
                       window.scrollTo(0, 0); 
                      }}
                  >
                    <td>{currentPage * itemsPerPage + i + 1}</td>
                    <td>{qst.qstTitle}</td>
                    <td>{dayjs(qst.qstDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>{qst.qstStatus}</td>
                  </tr>
                )
              })
              :
              <tr>
                <td 
                  colSpan={4} 
                  style={{textAlign: 'center'}}
                >
                  조회된 문의 목록이 없습니다.
                </td>
              </tr>
            }
            </tbody>
          </table>
          <Pagination 
            totalItems={qstList.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            nextLabel='>'
            previousLabel='<'
            color='gray'
          />
        </div>
      </div>
    </div>
  )
}

export default UserInfo 