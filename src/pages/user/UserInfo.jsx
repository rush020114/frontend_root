import React, { useEffect, useState } from 'react'
import styles from './UserInfo.module.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../component/pagination/Pagination';
import ForecastWidget from '../../component/widgets/ForeCastWidget';
import DatePicker from 'react-datepicker'; // 추가: 캘린더 라이브러리
import 'react-datepicker/dist/react-datepicker.css'; // 추가: 캘린더 스타일
import { ko } from 'date-fns/locale'; // 추가: 한글 로케일
import ScheduleModal from '../../component/calendar/ScheduleModal'; // 추가: 일정 등록/수정 모달

const UserInfo = ({notiCnt}) => {
  const nav = useNavigate();

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 리렌더링을 도와줄 state 변수
  const [reload, setReload] = useState(0);

  // 총 이용일을 저장할 state 변수
  const [totalDays, setTotalDays] = useState(0);

  // 서비스 기본 정보를 저장할 state 변수
  const [serviceInfo, setServiceInfo] = useState({});

  // 문의 목록 조회를 저장할 state 변수
  const [qstList, setQstList] = useState([]);
  
  // 추가: 일정 목록을 저장할 state 변수
  const [scheduleList, setScheduleList] = useState([]);

  // 추가: 선택된 날짜를 저장할 state 변수
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 추가: 모달 open/close를 저장할 state 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추가: 수정할 일정 데이터를 저장할 state 변수
  const [editData, setEditData] = useState(null);

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

  // 추가: 일정 등록/수정 함수
  const handleSaveSchedule = (formData) => {
    if(!formData.title.trim()){
      alert('제목을 입력해주세요.');
      return;
    };

    const scheduleData = {
      ...formData,
      userId: loginData.userId,
      schedDate: dayjs(formData.schedDate).format('YYYY-MM-DD')
    };

    if (editData) {
      // 수정
      axios.put('/api/schedules', scheduleData)
      .then(() => {
        alert('일정이 수정되었습니다.');
        setEditData(null);
        setReload(prev => prev + 1);
      })
      .catch(e => console.log(e));
    } else {
      // 등록
      axios.post('/api/schedules', scheduleData)
      .then(() => {
        alert('일정이 등록되었습니다.');
        setReload(prev => prev + 1);
      })
      .catch(e => console.log(e));
    }
  };

  // 추가: 일정 삭제 함수
  const handleDeleteSchedule = (schedId) => {
    if (window.confirm('일정을 삭제하시겠습니까?')) {
      axios.delete('/api/schedules', {params: {schedId}})
      .then(() => {
        alert('일정이 삭제되었습니다.');
        setReload(prev => prev + 1);
      })
      .catch(e => console.log(e));
    }
  };

  // 추가: 완료 처리 함수
  const handleCompleteSchedule = (schedule) => {
    const completeData = {
      schedId: schedule.schedId,
      isCompleted: schedule.isCompleted === 'Y' ? 'N' : 'Y'
    };

    axios.put('/api/schedules/complete', completeData)
    .then(() => setReload(prev => prev + 1))
    .catch(e => console.log(e));
  };

  // 추가: 선택된 날짜의 일정 필터링
  const filteredSchedules = scheduleList.filter(schedule => 
    dayjs(schedule.schedDate).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD')
  );

  // 문의 목록과 서비스 기본 정보, 총 이용일을 세팅할 useEffect
  useEffect(() => {
    axios.all([axios.get('/api/questions', {params: {
      userRole: 'USER'
      , userId: loginData.userId
    }}), 
    axios.get(`/api/applications/${loginData.userId}`),
    axios.get(`/api/applications/total-day/${loginData.userId}`),
    axios.get(`/api/schedules/${loginData.userId}`)
  ])
    .then(axios.spread((res1, res2, res3, res4) => {
      setQstList(res1.data);
      setServiceInfo(res2.data);
      setTotalDays(res3.data)
      setScheduleList(res4.data);
    }))
    .catch(e => console.log(e));
  }, [notiCnt, reload]);

  console.log(qstList)
    
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
        {
        serviceInfo.farmName
        ?
        <>
          <div>
            <p>이름</p>
            <p>{`${loginData.userName} (${loginData.userId})`}</p>
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
        </>
        :
        <>
          <div>
            <p>이름</p>
            <p>{`${loginData.userName} (${loginData.userId})`}</p>
          </div>
        </>
        }
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
              totalDays
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
      {/* ===== 추가: 일정 관리 섹션 ===== */}
      <div className={styles.schedule_div}>
        <div className={styles.schedule_title}>
          <h2>📅 일정 관리</h2>
          <button onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}>+ 일정 등록</button>
        </div>
        <div className={styles.schedule_content}>
          <div className={styles.calendar_wrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              locale={ko}
              dayClassName={(date) => {
                const hasSchedule = scheduleList.some(schedule => 
                  dayjs(schedule.schedDate).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
                );
                return hasSchedule ? styles.hasSchedule : undefined;
              }}
            />
          </div>
          <div className={styles.schedule_list}>
            <h3>{dayjs(selectedDate).format('YYYY년 MM월 DD일')} 일정</h3>
            {
              filteredSchedules.length > 0
              ?
              filteredSchedules.map((schedule, i) => (
                <div key={i} className={styles.schedule_item}>
                  <div className={styles.schedule_header}>
                    <span className={`${styles.category} ${styles[schedule.category]}`}>
                      {schedule.category}
                    </span>
                    <input
                      type="checkbox"
                      checked={schedule.isCompleted === 'Y'}
                      onChange={() => handleCompleteSchedule(schedule)}
                    />
                  </div>
                  <h4 className={schedule.isCompleted === 'Y' ? styles.completed : ''}>
                    {schedule.title}
                  </h4>
                  <p>{schedule.schedContent}</p>
                  <div className={styles.schedule_buttons}>
                    <button onClick={() => {
                      setEditData({
                        ...schedule,
                        schedDate: new Date(schedule.schedDate)
                      });
                      setIsModalOpen(true);
                    }}>수정</button>
                    <button onClick={() => handleDeleteSchedule(schedule.schedId)}>삭제</button>
                  </div>
                </div>
              ))
              :
              <p className={styles.no_schedule}>등록된 일정이 없습니다.</p>
            }
          </div>
        </div>
      </div>
      {/* ===== 일정 관리 섹션 끝 ===== */}
      <div className={styles.qna_div}>
        <div className={styles.qna_title}>
          <h2>💬 최근 문의 내역</h2>
        </div>
        <div className={styles.table_div}>
          <table className={styles.qna_table}>
            <colgroup>
              <col width='7%' />
              <col width='47%' />
              <col width='7%' />
              <col width='12%' />
              <col width='15%' />
              <col width='12%' />
            </colgroup>
            <thead>
              <tr>
                <td>No</td>
                <td>제목</td>
                <td>첨부파일</td>
                <td>유형</td>
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
                    <td>
                      {
                        qst.questionImgDTOList[0].imgNum !== 0
                        &&
                        '🖼️'
                      }
                    </td>
                    <td>{qst.qstType}</td>
                    <td>{dayjs(qst.qstDate).format('YYYY-MM-DD')}</td>
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
      {/* 추가: 일정 등록/수정 모달 */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSave={handleSaveSchedule}
        editData={editData}
      />
    </div>
  )
}

export default UserInfo 