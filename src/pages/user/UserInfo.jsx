import React, { useEffect, useState } from 'react'
import styles from './UserInfo.module.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../component/pagination/Pagination';
import ForecastWidget from '../../component/widgets/ForeCastWidget';

const UserInfo = () => {
  const nav = useNavigate();

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 서비스 기본 정보를 저장할 state 변수
  const [serviceInfo, setServiceInfo] = useState({});

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
      userRole: 'USER'
      , userId: loginData.userId
    }})
    .then(res => setQstList(res.data))
    .catch(e => console.log(e));
  }, []);

  // 서비스 기본 정보 조회 useEffect
  useEffect(() => {
    axios.get(`/api/applications/${loginData.userID}`)
    .then(res => setServiceInfo(res.data))
    .catch(e => console.log(e));
  }, []);

  console.log(serviceInfo)
  

  return (
    <div className={styles.container}>
      <div className={styles.title_div}>
        <h1>👤 내 정보</h1>
        <p>안녕하세요. {loginData.userId}님! 스마트팜 관리 현황을 확인해보세요.</p>
      </div>
      <div className={styles.info_div}>
        <div className={styles.info_title}>
          <h2>🌱 기본 정보</h2>
        </div>
        <div className={styles.user_info}>
          <div>
            <p>이름</p>
            <p>{`${serviceInfo.userDTO ? serviceInfo.userDTO.userName : '-'} (${loginData.userId})`}</p>
          </div>
          <div>
            <p>농장명</p>
            <p>
              {
                serviceInfo.farmName
                ?
                serviceInfo.farmName
                :
                '-'
              }
            </p>
          </div>
          <div>
            <p>유형</p>
            <p>
              {
                serviceInfo.applRole
                ?
                (serviceInfo.applRole === 'corporate'
                ?
                '법인'
                :
                '개인')
                :
                '-'
              }
            </p>
          </div>
          <div>
            <p>이메일</p>
            <p>{serviceInfo.userDTO && serviceInfo.userDTO.userEmail}</p>
          </div>
          <div>
            <p>실무자 연락처</p>
            <p>
              {
                serviceInfo.businessTel
                ?
                serviceInfo.businessTel
                :
                '-'
              }
            </p>
          </div>
          <div>
            <p>주소</p>
            <p>
              {
                serviceInfo.applAddr
                ?
                serviceInfo.applAddr
                :
                '-'
              }
            </p>
          </div>
          <div>
            <p>
              {
                serviceInfo.apprDate
                ?
                '가입일'
                :
                '신청일'
              }
            </p>
            <p>
              {
                serviceInfo.apprDate
                ?
                dayjs(serviceInfo.apprDate).format('YYYY-MM-DD')
                :
                dayjs(serviceInfo.regDate).format('YYYY-MM-DD')
              }
            </p>
          </div>
          <div>
            <p>신청 상태</p>
            <p>
              {
                serviceInfo.apprDate
                ?
                '이용 중'
                :
                '진행 중'
              }
            </p>
          </div>
          <div>
            <p>재배작물</p>
            <p>
              {
                serviceInfo.apprDate
                ?
                '딸기'
                :
                '승인 시 이용 가능'
              }
            </p>
          </div>
        </div>
      </div>
      <div className={styles.usage_div}>
        <div className={styles.usage_title}>
          <h2>ℹ️ 이용 정보</h2>
        </div>
        <div className={styles.usage_info}>
          <div
            style={{background: 'linear-gradient(135deg, #4dab28, #6bc247)'}}
          >
            <h2>
            {
              serviceInfo.apprDate
              ?
              'dd'
              :
              '-'
            }
            </h2>
            <p>총 이용일</p>
          </div>
          <div>
            <ForecastWidget 
              backgroundColor='teal'
            />
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