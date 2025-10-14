import React, { useEffect, useState } from 'react'
import styles from './AdminHome.module.css'
import axios from 'axios';
import dayjs from 'dayjs';
import GaugeChart from '../../component/charts/GaugeChart';
import Button from '../../common/Button';

const AdminHome = ({countCustomer, alerts, setAlerts}) => {

  // 환경 데이터를 받아올 state 변수
  const [growingData, setGrowingData] = useState([]);

  // 서비스 신청 목록 조회
  const [applList, setApplList] = useState([]);

  // 문의 목록을 받아올 state변수
  const [qstList, setQstList] = useState([]);

  // 최신 7일기준 카운팅 고객(가입자)수를 받아올 state 변수
  const [weeklyUsers, setWeeklyUsers] = useState([]);

  // 총 고객(가입자)수 카운팅 수를 받아올 state 변수
  const [totalUsers, setTotalUsers] = useState([]);

  // ⭐ 센서별로 체크
  const hasAlert = (sensorName) => {
    return alerts.some(alert => alert.sensor === sensorName);
  };

  // ⭐ 알림 확인 (삭제) 함수
  const handleConfirmAlert = (sensorName) => {
    // ⭐ 센서별로 삭제
    setAlerts(prev => {
      const updatedAlerts = prev.filter(alert => 
        alert.sensor !== sensorName  // ⭐ 해당 센서만 제거
      );
      setAlerts(updatedAlerts);
      localStorage.setItem('admin_alerts', JSON.stringify(updatedAlerts));
      console.log(`✅ ${sensorName} 알림 확인 완료`);
      return updatedAlerts;
    })
  };

  /*
    방문자 통계 조회 API 호출 함수
    에러 발생 시 또는 통계만 확인할 때 사용
    */
  const fetchVisitorStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/visitor/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
    } catch (err) {
      console.error('통계 조회 실패:', err);
    }
  };

  // 서비스 신청 목록을 조회할 useEffect
  useEffect(() => {
    axios.get('/api/applications/list')
    .then(res => setApplList(res.data.slice(0, 6)))
    .catch(e => console.log(e));
  }, []);

  // 문의 목록을 받아올 useEffect
  useEffect(() => {
    axios.get('/api/questions', {params: {userRole: 'ADMIN'}})
    .then(res => {setQstList(res.data.slice(0, 4))})
    .catch(e => console.log(e));
  }, [])

  // 환경 데이터를 받아올 useEffect
  useEffect(() => {
    axios.get('/api/growings/rev')
    .then(res => setGrowingData(res.data))
    .catch(e => console.log(e));
  }, []);

  // 최신 7일기준 카운팅 고객(가입자)수를 뿌려줄 useEffect
  useEffect(()=>{
    axios.get('/api/users/weekly')
    .then(res => setWeeklyUsers(res.data))
    .catch(e => console.log(e));
  }, []);

  // 총 고객(가입자)수 카운팅 수를 뿌려줄 useEffect
  useEffect(()=>{
    axios.get('/api/users/total')
    .then(res => setTotalUsers(res.data))
    .catch(e => console.log(e));
  }, []);
  console.log(applList)

  return (

    <div className={styles.container}>
      <div className={styles.first_row}>
        <div className={styles.box}>
          <span>최근7일간 가입고객수</span>
          <div className={styles.data}>
            <i className="bi bi-person-fill-add"></i>
            <p> {weeklyUsers} </p>
          </div>
        </div>
        <div className={styles.box}>
          <span>총 가입고객수</span>
          <div className={styles.data}>
            <i className="bi bi-people-fill"></i>
            <p> {totalUsers} </p>
          </div>
        </div>
        <div className={styles.box}>
          <span>오늘 방문객수 </span>
          <div className={styles.data}>
            <i className="bi bi-person-circle"></i>
            <p>
              {countCustomer.current.todayCount}
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <span>총 방문객수</span>
          <div className={styles.data}>
            <i className="bi bi-currency-exchange"></i>
            <p>
              {countCustomer.current.totalCount}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.dashboard_title}>
          <p>업체별 Root스마트팜 시스템 정상구동 모니터링</p>
          <div className={styles.dashboard_container}>
            <div className={styles.dashboard_info}>
              <div>
                <p>🚚 업체명 : <span style={{fontWeight: 800}}>ROOT</span></p>
                
                {/* ⭐ 센서별 상태 표시 - 버튼으로 변경 */}
                <div className={styles.dashboard_status}>
                  <div>
                    <p>🌡️ 온도</p>
                    <button 
                      onClick={() => handleConfirmAlert('온도')}
                      style={{
                        padding: '5px 15px',
                        borderRadius: '20px',
                        border: hasAlert('온도') ? '2px solid #ef4444' : '2px solid #78c469ff',
                        backgroundColor: hasAlert('온도') ? '#fee2e2' : '#e5fcdcff',
                        color: hasAlert('온도') ? '#991b1b' : '#166534',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {hasAlert('온도') ? '이상' : '적정'}
                    </button>
                  </div>
                  
                  <div>
                    <p>💧 습도</p>
                    <button 
                      onClick={() => handleConfirmAlert('습도')}
                      style={{
                        padding: '5px 15px',
                        borderRadius: '20px',
                        border: hasAlert('습도') ? '2px solid #ef4444' : '2px solid #78c469ff',
                        backgroundColor: hasAlert('습도') ? '#fee2e2' : '#e5fcdcff',
                        color: hasAlert('습도') ? '#991b1b' : '#166534',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {hasAlert('습도') ? '이상' : '적정'}
                    </button>
                  </div>
                  
                  <div>
                    <p>🌱 토양습도</p>
                    <button 
                      onClick={() => handleConfirmAlert('토양습도')}
                      style={{
                        padding: '5px 15px',
                        borderRadius: '20px',
                        border: hasAlert('토양습도') ? '2px solid #ef4444' : '2px solid #78c469ff',
                        backgroundColor: hasAlert('토양습도') ? '#fee2e2' : '#e5fcdcff',
                        color: hasAlert('토양습도') ? '#991b1b' : '#166534',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {hasAlert('토양습도') ? '이상' : '적정'}
                    </button>
                  </div>
                  
                  <div>
                    <p>☀️ 조도</p>
                    <button 
                      onClick={() => handleConfirmAlert('조도')}
                      style={{
                        padding: '5px 15px',
                        borderRadius: '20px',
                        border: hasAlert('조도') ? '2px solid #ef4444' : '2px solid #78c469ff',
                        backgroundColor: hasAlert('조도') ? '#fee2e2' : '#e5fcdcff',
                        color: hasAlert('조도') ? '#991b1b' : '#166534',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {hasAlert('조도') ? '이상' : '적정'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* ⭐ 불안정 박스 */}
              <div className={styles.danger}
                style={{
                  backgroundColor: alerts.length > 0 ? '#fee2e2' : '#d4f1d7ff',
                  border: alerts.length > 0 ? '2px solid #ef4444' : '2px solid #78c469ff',
                }}
              >
                <p 
                  className={styles.danger_status}
                  style={{
                    fontSize: '2rem',
                    marginBottom: '30px',
                    color: alerts.length > 0 ? '#ef4444' : '#78c469ff',
                    fontWeight: 700
                  }}
                >
                  {alerts.length > 0 ? '⚠️ 불안정' : '✓ 정상'}
                </p>
                {alerts.length > 0 ? (
                  <p className={styles.danger_cnt} style={{ 
                    fontSize: '1.2rem',
                    color: '#dc2626',
                    marginBottom: '0px'
                  }}>
                    조치 필요: {alerts.length}개 항목
                  </p>
                ) : (
                  <p className={styles.danger_cnt} style={{ 
                    fontSize: '1.2rem',
                    color: '#16a34a',
                    marginBottom: '0px'
                  }}>
                    모든 센서 정상 가동 중
                  </p>
                )}
              </div>
            </div>
            <div className={styles.dashboard_content}>
              {/* ⭐ 온도 게이지 - 버튼 제거, 테두리만 */}
              <div>
                <GaugeChart
                  title="온도"
                  value={growingData[0]?.temper || 0}
                  min={0}
                  max={40}
                  unit="°C"
                  hasAlert={hasAlert('온도')}
                />
              </div>
  
              {/* ⭐ 습도 게이지 - 버튼 제거, 테두리만 */}
              <div>
                <GaugeChart
                  title="습도"
                  value={growingData[0]?.humidity || 0}
                  min={0}
                  max={100}
                  unit="%"
                  hasAlert={hasAlert('습도')}
                />
              </div>
  
              {/* ⭐ 토양습도 게이지 - 버튼 제거, 테두리만 */}
              <div>
                <GaugeChart
                  title="토양습도"
                  value={growingData[0]?.soilHumidity || 0}
                  min={0}
                  max={100}
                  unit="%"
                  hasAlert={hasAlert('토양습도')}
                />
              </div>
  
              {/* ⭐ 조도 게이지 - 버튼 제거, 테두리만 */}
              <div>
                <GaugeChart
                  title="조도"
                  value={growingData[0]?.illumination || 0}
                  min={0}
                  max={1000}
                  hasAlert={hasAlert('조도')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.third_row}>
        <div className={styles.title}>
          <span>신규업체 서비스가입 신청현황</span>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>회원 아이디</td>
                <td>농장이름</td>
                <td>신청자 연락처</td>
                <td>신청자 이메일</td>
                <td>신청일</td>
                <td>처리현황</td>
              </tr>
            </thead>
            <tbody>
              {
                applList.map((appl, i) => {
                  return(
                    <tr key={i}>
                      <td>{appl.userDTO.userId}</td>
                      <td>{appl.userDTO.userName}</td>
                      <td>{appl.businessTel}</td>
                      <td>{appl.userDTO.userEmail}</td>
                      <td>{dayjs(appl.regDate).format('YYYY-MM-DD')}</td>
                      <td>
                        {
                          !appl.apprDate
                          ?
                          <Button size='80px' content='대기' color='brown' />
                          :
                          <Button size='80px' content='등록' color='green' />
                        } 
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className={styles.qna}>
          <span>비지니스 문의 (1:1문의)</span>
          {
            qstList.map((qst, i) => {
              return(
                <div className={styles.request} key={i}>
                  <i className="bi bi-file-earmark-text"></i>
                  <div className={styles.memo}>
                    <p>{qst.userId}</p>
                    <p>{qst.qstTitle}</p>
                    <p>{dayjs(qst.qstDate).format('YYYY-MM-DD')}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AdminHome