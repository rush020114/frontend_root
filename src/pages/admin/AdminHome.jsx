import React, { useEffect, useState } from 'react'
import styles from './AdminHome.module.css'
import BubbleChart from '../../component/charts/BubbleChart'
import Button from '../../common/Button'
import axios from 'axios';
import dayjs from 'dayjs';
import GaugeChart from '../../component/charts/GaugeChart';
import Buton from '../../common/Button';

/*
  방문자 카운터 컴포넌트
  - 페이지로드 시 자동으로 방문 카운트
  - 오늘 방문자 수와 총 방문자 수를 표시
 */
const AdminHome = ({countCustomer}) => {

  // 환경 데이터를 받아올 state 변수
  const [growingData, setGrowingData] = useState([]);

  // 서비스 신청 목록 조회
  const [applList, setApplList] = useState([]);

  // 문의 목록을 받아올 state변수
  const [qstList, setQstList] = useState([]);

  // 상태 관리
  const [todayCount, setTodayCount] = useState(0);      // 오늘 방문자 수
  const [totalCount, setTotalCount] = useState(0);      // 총 방문자 수
  //const [isLoading, setIsLoading] = useState(true);     // 로딩 상태
  const [error, setError] = useState(null);             // 에러 상태

 

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
      setTodayCount(data.todayCount || 0);
      setTotalCount(data.totalCount || 0);
      
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

  const isOptimalCondition = (data) => {
    if (!data) return false;
    
    const { temper, humidity, soilHumidity, illumination } = data;
    
    // 적정 범위 체크
    const isTemperOk = temper >= 18 && temper <= 25;
    const isHumidityOk = humidity >= 60 && humidity <= 80;
    const isSoilHumidityOk = soilHumidity >= 30 && soilHumidity <= 40;
    const isIlluminationOk = illumination >= 10000 && illumination <= 30000;
    
    return isTemperOk && isHumidityOk && isSoilHumidityOk && isIlluminationOk;
  };

  // 상태별 스타일 반환 함수
  const getStatusStyle = (status) => {
    if (status === 'normal') {
      return {
        color: '#166534',
        backgroundColor: '#dcfce7',
        border: '2px solid #22c55e'
      };
    }
    if (status === 'low') {
      return {
        color: '#1e40af',
        backgroundColor: '#dbeafe',
        border: '2px solid #3b82f6'
      };
    }
    return {
      color: '#991b1b',
      backgroundColor: '#fee2e2',
      border: '2px solid #ef4444'
    };
  };

  // 센서별 상태 텍스트
  const getTemperStatusText = (status) => {
    if (status === 'low') return '낮음';
    if (status === 'high') return '높음';
    if (status === 'normal') return '적정';
    return '-';
  };

  const getHumidityStatusText = (status) => {
    if (status === 'low') return '부족';
    if (status === 'high') return '과다';
    if (status === 'normal') return '적정';
    return '-';
  };

  const getSoilStatusText = (status) => {
    if (status === 'low') return '부족';
    if (status === 'high') return '과다';
    if (status === 'normal') return '적정';
    return '-';
  };

  const getIlluminationStatusText = (status) => {
    if (status === 'low') return '부족';
    if (status === 'high') return '과량';
    if (status === 'normal') return '적정';
    return '-';
  };

  // 개별 센서 상태 판단 함수
  const getTemperStatus = (temp) => {
    if (!temp) return 'unknown';
    if (temp < 18) return 'low';
    if (temp <= 25) return 'normal';
    return 'high';
  };

  const getHumidityStatus = (humidity) => {
    if (!humidity) return 'unknown';
    if (humidity < 60) return 'low';
    if (humidity <= 80) return 'normal';
    return 'high';
  };

  const getSoilHumidityStatus = (soilHumidity) => {
    if (!soilHumidity) return 'unknown';
    if (soilHumidity < 30) return 'low';
    if (soilHumidity <= 40) return 'normal';
    return 'high';
  };

  const getIlluminationStatus = (illumination) => {
    if (!illumination) return 'unknown';
    if (illumination < 10000) return 'low';
    if (illumination <= 30000) return 'normal';
    return 'high';
  };

  // 상태 텍스트 변환
  const getStatusText = (status) => {
    if (status === 'low') return '부족';
    if (status === 'high') return '초과';
    if (status === 'normal') return '적정';
    return '-';
  };

  // 상태 색상 반환
  const getStatusColor = (status) => {
    if (status === 'normal') return '#22c55e';
    return '#ef4444';
  };


  /*
    숫자 포맷팅 함수
    1000 단위로 콤마 추가 (예: 1234 -> 1,234)
    */
  const formatNumber = (num) => {
    return num.toLocaleString('ko-KR');
  };
  
  console.log(qstList)

  return (

    <div className={styles.container}>
      <div className={styles.first_row}>
        <div className={styles.box}>
          <span>Weekly New Customers</span>
          <div className={styles.data}>
            <i className="bi bi-person-fill-add"></i>
            <p>158</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Total Customers</span>
          <div className={styles.data}>
            <i className="bi bi-people-fill"></i>
            <p>350</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Today Visitors </span>
          <div className={styles.data}>
            <i className="bi bi-person-circle"></i>
            <p>
              {countCustomer.current.todayCount}
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Total Visitors</span>
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
                <p>🌱 업체명 : <span style={{fontWeight: 800}}>ROOT</span></p>
                <div className={styles.dashboard_status}>
                  <div>
                    <p>온도</p>
                    <div style={{
                      ...getStatusStyle(getTemperStatus(growingData[0]?.temper)),
                    }}>
                      {getTemperStatusText(getTemperStatus(growingData[0]?.temper))}
                    </div>
                  </div>
                  <div>
                    <p>습도</p>
                    <div style={{
                      ...getStatusStyle(getHumidityStatus(growingData[0]?.humidity)),
                    }}>
                      {getHumidityStatusText(getHumidityStatus(growingData[0]?.humidity))}
                    </div>
                  </div>
                  <div>
                    <p>토양습도</p>
                    <div style={{
                      ...getStatusStyle(getSoilHumidityStatus(growingData[0]?.soilHumidity)),
                    }}>
                      {getSoilStatusText(getSoilHumidityStatus(growingData[0]?.soilHumidity))}
                    </div>
                  </div>
                  <div>
                    <p>조도</p>
                    <div style={{
                      ...getStatusStyle(getIlluminationStatus(growingData[0]?.illumination)),
                    }}>
                      {getIlluminationStatusText(getIlluminationStatus(growingData[0]?.illumination))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.danger}
                style={{
                  backgroundColor: isOptimalCondition(growingData[0]) ? '#dcfce7' : '#fee2e2',
                  border: `2px solid ${isOptimalCondition(growingData[0]) ? '#22c55e' : '#ef4444'}`,
                }}
              >
                <p 
                  className={styles.danger_status}
                  style={{
                    fontSize: '2rem',
                    marginBottom: '30px',
                    color: isOptimalCondition(growingData[0]) ? '#22c55e' : '#ef4444',
                    fontWeight: 700
                  }}
                >
                  {isOptimalCondition(growingData[0]) ? '✓ 정상' : '⚠️ 불안정'}
                </p>
                {!isOptimalCondition(growingData[0]) && (
                  <p className={styles.danger_cnt} style={{ 
                    fontSize: '1.2rem'
                    , color: '#dc2626' 
                    , marginBottom: '0px'
                  }}>
                    조치 필요: {
                      [
                        getTemperStatus(growingData[0]?.temper),
                        getHumidityStatus(growingData[0]?.humidity),
                        getSoilHumidityStatus(growingData[0]?.soilHumidity),
                        getIlluminationStatus(growingData[0]?.illumination)
                      ].filter(s => s !== 'normal').length
                    }개 항목
                  </p>
                )}
              </div>
            </div>
            <div className={styles.dashboard_content}>
              <div>
                <GaugeChart
                  title="온도"
                  value={growingData[0]?.temper || 0}
                  min={0}
                  max={40}
                  unit="°C"
                  thresholds={{ low: 18, high: 25 }}
                />
              </div>
  
              <div>
                <GaugeChart
                  title="습도"
                  value={growingData[0]?.humidity || 0}
                  min={0}
                  max={100}
                  unit="%"
                  thresholds={{ low: 60, high: 80 }}
                />
              </div>
  
              <div>
                <GaugeChart
                  title="토양습도"
                  value={growingData[0]?.soilHumidity || 0}
                  min={0}
                  max={100}
                  unit="%"
                  thresholds={{ low: 30, high: 40 }}
                />
              </div>
  
              <div>
                <GaugeChart
                  title="조도"
                  value={growingData[0]?.illumination || 0}
                  min={0}
                  max={50000}
                  unit=" lux"
                  thresholds={{ low: 10000, high: 30000 }}
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
                      <td>{dayjs(appl.regDate).format('YYYY-MM-DD')}</td>
                      <td>
                        {
                          !appl.apprDate
                          ?
                          '대기'
                          :
                          '승인'
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