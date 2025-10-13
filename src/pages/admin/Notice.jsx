import React, { useEffect, useRef, useState } from 'react'
import styles from './Notice.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import axios, { spread } from 'axios'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../component/pagination/Pagination'

const Notice = () => {
  const nav = useNavigate();

  // 리렌더링 state 변수
  const [reload, setReload] = useState(0);

  // 전체 삭제번호를 저장할 useRef
  const allCheck = useRef([]);

  // 체크박스 데이터를 저장할 state 변수
  const [checkData, setCheckData] = useState([]);

  // 공지 목록을 받아올 state 변수
  const [noticeList, setNoticeList] = useState([]);

  // 공지 삭제를 결정할 state 변수
  const [isDeleting, setIsDeleting] = useState(false);

  // 공지 목록 검색 시 목록의 길이를 변하지 않게 하기 위한 hook
  const noticeLength = useRef(0);

  // 공지 목록 검색 시 중요 공지 목록의 길이를 변하지 않게 하기 위한 hook
  const noticeImportantLength = useRef(0);

  // 활성 페이지 세팅
  const [currentPage, setCurrentPage] = useState(0);

  // 공지 검색을 저장할 state 변수
  const [searchData, setSearchData] = useState({
    noticeId: ''
    , noticeTitle: ''
    , userId: ''
    , noticeDate: ''
  })

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

  // 공지 목록을 세팅할 useEffect
  useEffect(() => {
    axios.get('/api/notices')
    .then(res => {
      setNoticeList(res.data);
      noticeLength.current = res.data.length;
      noticeImportantLength.current = res.data.filter(item => item.isImportant === 'Y').length;
      allCheck.current = res.data.map(notice => notice.noticeId);
    })
    .catch(e => console.log(e));
  }, [reload]);

  // 검색 데이터를 세팅할 함수
  const handleSearch = e => {
    setSearchData({
      ...searchData
      , [e.target.name]: e.target.value
    });
  };

  // 검색 시 실행할 함수
  const searchNoticeList = () => {
    axios.get('/api/notices', {params: searchData})
    .then(res => {
      setNoticeList(res.data);
      allCheck.current = res.data.map(d => d.noticeId);
      setIsDeleting(false);
      setCheckData([]);
      setSearchData({
        noticeId: ''
        , noticeTitle: ''
        , userId: ''
        , noticeDate: ''
      });
    })
    .catch(e => console.log(e));
  };

  // 단일 체크박스 클릭 시 실행할 함수
  const handleSingleNoticeCheck = (e) => {
    if(e.target.checked){
      setCheckData([
        ...checkData
        , parseInt(e.target.value)
      ]);
    }
    else{
      setCheckData(checkData.filter(item => item !== parseInt(e.target.value)));
    };
  };

  // 문의 목록 삭제 함수
  const delNoticeList = () => {
    if(!confirm('삭제하시겠습니까?')){
      return;
    }
    axios.post('/api/notices/delete', {noticeIdArr: checkData})
    .then(res => {
      alert(res.data);
      setReload(prev => prev + 1);
      setIsDeleting(false);
    })
    .catch(e => console.log(e));
  };

  console.log(checkData)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>📢 공지 관리</h1>
        <Button 
          content='+ 등 록'
          color='brown'
          size='120px'
          fontSize='1.2rem'
          onClick={() => nav('/admin/reg-notice')}
        />
      </div>
      <div className={styles.notice_info}>
        <div 
          style={{background: 'linear-gradient(135deg, #6c757d, #8d959e)'}}
        >
          <h1>{noticeLength.current}</h1>
          <p>전체 공지</p>
        </div>
        <div
          style={{background: 'linear-gradient(135deg, #ffc107, #ffcd39)'}}
        >
          <h1>{noticeImportantLength.current}</h1>
          <p>중요 공지</p>
        </div>
      </div>
      <div className={styles.search_notice}>
        <div>
          <p>공지 번호</p>
          <Input 
            size='100%'
            name='noticeId'
            value={searchData.noticeId}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div>
          <p>제목</p>
          <Input 
            size='100%'
            name='noticeTitle'
            value={searchData.noticeTitle}
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
          <p>공지 날짜</p>
          <Input 
            type='date'
            size='100%'
            padding='6px'
            name='noticeDate'
            value={searchData.noticeDate}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div className={styles.search_btn}>
          <Button
            size='100%'
            content='검 색'
            padding='4px'
            onClick={() => searchNoticeList()}
          />
        </div>
      </div>
      <div className={styles.notice_list}>
        <div className={styles.notice_title}>
          {
            !isDeleting
            ?
            <h2>{`🔍 총 ${noticeList.length}건 검색되었습니다.`}</h2>
            :
            <p>
              {`${allCheck.current.length}건 중 ${checkData.length}이 선택되었습니다.`}
            </p>
          }
          <div className={styles.notice_btn}>
            {
              isDeleting
              &&
              <Button
                content='취 소'
                color='blue'
                onClick={() => {
                  setIsDeleting(false);
                  setCheckData([]);
                }}
              />
            }
            <Button 
              content='삭 제'
              color='red'
              onClick={() => !isDeleting ? setIsDeleting(true) : delNoticeList()}
            />
          </div>
        </div>
        <table className={styles.notice_table}>
          <colgroup>
            <col width='5%' />
            <col width='45%' />
            <col width='10%' />
            <col width='25%' />
            <col width='15%' />
          </colgroup>
          <thead>
            <tr>
              <td>
                {
                  !isDeleting
                  ?
                  'No'
                  :
                  <input type="checkbox" 
                    value={checkData}
                    checked={checkData.length === allCheck.current.length}
                    onChange={e => setCheckData(e.target.checked ? allCheck.current : [])}
                  />
                }
              </td>
              <td>제목</td>
              <td>첨부파일</td>
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
                  onClick={() => !isDeleting && nav(`/notice/${notice.noticeId}`)}
                  className={isDeleting ? styles.no_hover : null}
                >
                  <td>
                    {
                      !isDeleting
                      ?
                      (notice.isImportant === 'Y'
                      ?
                      '⭐'
                      :
                      currentPage * itemsPerPage + i + 1 - importantCount)
                      :
                      <input type="checkbox" 
                        value={notice.noticeId}
                        checked={checkData.includes(notice.noticeId)}
                        onChange={e => handleSingleNoticeCheck(e)}
                      />
                    }
                  </td>
                  <td>{notice.noticeTitle}</td>
                  <td>
                    {
                      notice.noticeImgDTOList[0].imgNum !== 0
                      &&
                      '🖼️'
                    }
                  </td>
                  <td>{notice.userId}</td>
                  <td>{dayjs(notice.noticeDate).format('YYYY-MM-DD')}</td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan={5}>
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

export default Notice