import React, { useEffect, useRef, useState } from 'react'
import styles from './Notice.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import axios, { spread } from 'axios'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../component/pagination/Pagination'

const AdminQnA = () => {
  const nav = useNavigate();

  // 문의 목록을 받아올 state 변수
  const [qstList, setQstList] = useState([]);

  // 문의 목록 검색 시 목록의 길이를 변하지 않게 하기 위한 hook
  const qstLength = useRef(0);

  // 활성 페이지 세팅
  const [currentPage, setCurrentPage] = useState(0);

  // 문의 세팅을 저장할 state 변수
  const [searchData, setSearchData] = useState({
    qstId: ''
    , qstStatus: ''
    , qstTitle: ''
    , userId: ''
    , qstDate: ''
    , userRole: 'ADMIN'
  });

  // 보여줄 페이지
  const itemsPerPage = 5;

  // 현재 페이지 보여줄 데이터 계산
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQstList = qstList.slice(startIndex, endIndex);

  // 페이지를 변경시켜줄 함수
  const handlePageChange = selectPage => {
    setCurrentPage(selectPage);
  };

  // 진행중 상태를 조회할 state 변수
  const [qstStatusCnt, setQstStatusCnt] = useState(0);

  // 문의 목록을 세팅할 useEffect
  useEffect(() => {
  }, []);

  // 검색 데이터를 세팅할 함수
  const handleSearch = e => {
    setSearchData({
      ...searchData
      , [e.target.name]: e.target.value
    });
  };

  // 검색 시 실행할 함수
  const searchQstList = () => {
    axios.get('/api/questions', {params: searchData})
    .then(res => {
      setQstList(res.data);
      setSearchData({
        qstId: ''
        , qstStatus: ''
        , qstTitle: ''
        , userId: ''
        , qstDate: ''
        , userRole: 'ADMIN'
      });
    })
    .catch(e => console.log(e));
  };

  console.log(searchData)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>📝 문의 관리</h1>
      </div>
      <div className={styles.qna_info}>
        <div 
          style={{background: 'linear-gradient(135deg, #6c757d, #8d959e)'}}
        >
          <h1>{qstLength.current}</h1>
          <p>전체 공지</p>
        </div>
        <div
          style={{background: 'linear-gradient(135deg, #ffc107, #ffcd39)'}}
        >
          <h1>{qstLength.current - qstStatusCnt}</h1>
          <p>중요 공지</p>
        </div>
      </div>
      <div className={styles.search_qna}>
        <div>
          <p>문의 번호</p>
          <Input 
            size='100%'
            name='qstId'
            value={searchData.qstId}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div>
          <p>제목</p>
          <Input 
            size='100%'
            name='qstTitle'
            value={searchData.qstTitle}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div>
          <p>작성자</p>
          <Input 
            size='100%'
            name='userId'
            value={searchData.userId}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div>
          <p>문의 날짜</p>
          <Input 
            type='date'
            size='100%'
            padding='6px'
            name='qstDate'
            value={searchData.qstDate}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div className={styles.search_btn}>
          <Button
            size='100%'
            content='검 색'
            padding='4px'
            onClick={() => searchQstList()}
          />
        </div>
      </div>
      <div className={styles.qna_list}>
        <h2>{`🔍 총 ${qstList.length}건 검색되었습니다.`}</h2>
        <table className={styles.qna_table}>
          <colgroup>
            <col width='5%' />
            <col width='55%' />
            <col width='25%' />
            <col width='15%' />
          </colgroup>
          <thead>
            <tr>
              <td>No</td>
              <td>제목</td>
              <td>작성자</td>
              <td>등록일</td>
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
                  onClick={() => nav(`/admin/qna/${qst.qstId}`)}
                >
                  <td>{currentPage * itemsPerPage + i + 1}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan={4}>
                조회된 문의가 없습니다.
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
          color='green'
        />
      </div>
    </div>
  )
}

export default AdminQnA