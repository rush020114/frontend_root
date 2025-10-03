import React, { useEffect, useState } from 'react'
import styles from './CustomerService.module.css'
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Pagination from '../../component/pagination/Pagination';
import axios from 'axios';
import dayjs from 'dayjs';

const CustomerService = () => {
  const nav = useNavigate();

  // 공지 목록을 받아올 state 변수
  const [noticeList, setNoticeList] = useState([]);

  // 활성 페이지 세팅
  const [currentPage, setCurrentPage] = useState(0);

  // 보여줄 페이지
  const itemsPerPage = 10;

  // 현재 페이지 보여줄 데이터 계산
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNoticeList = noticeList.slice(startIndex, endIndex);

  // isImportant개수를 받을 변수
  const importantCount = currentNoticeList.filter(item => item.isImportant === 'Y').length;

  // 페이지를 변경시켜줄 함수
  const handlePageChange = selectPage => {
    setCurrentPage(selectPage);
  };

  // 공지를 세팅할 useEffect
  useEffect(() => {
    axios.get('/api/notices')
    .then(res => setNoticeList(res.data))
    .catch(e => console.log(e));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>📢 공지사항</h1>
      </div>
      <div className={styles.search_notice}>
        <div>
          <p>문의 번호</p>
          <Input 
            size='100%'
            name='qstId'
            onChange={e => handleSearch(e)}
          />
        </div>
        <div>
          <p>제목</p>
          <Input 
            size='100%'
            name='qstTitle'
            onChange={e => handleSearch(e)}
          />
        </div>
        <div>
          <p>작성자</p>
          <Input 
            size='100%'
            name='userId'
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
      <div className={styles.notice_list}>
        <h2>{`🔍 총 ${noticeList.length}건 검색되었습니다.`}</h2>
        <table className={styles.notice_table}>
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
            currentNoticeList.length
            ?
            currentNoticeList.map((notice, i) => {
              return(
                <tr 
                  key={i}
                  onClick={() => nav(`/notice/${notice.noticeId}`)}
                >
                  <td>
                    {
                      notice.isImportant === 'Y'
                      ?
                      '⭐'
                      :
                      currentPage * itemsPerPage + i + 1 - importantCount
                    }
                  </td>
                  <td>{notice.noticeTitle}</td>
                  <td>{notice.userId}</td>
                  <td>{dayjs().format('YYYY-MM-DD')}</td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan={4}>
                조회된 공지가 없습니다.
              </td>
            </tr>
          }
          </tbody>
        </table>
        <Pagination
          totalItems={noticeList.length}
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

export default CustomerService