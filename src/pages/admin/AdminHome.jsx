import React, { useEffect, useState } from 'react'
import styles from './AdminHome.module.css'
import BubbleChart from '../../component/charts/BubbleChart'
import Button from '../../common/Button'
import axios from 'axios';
import dayjs from 'dayjs';

/*
  방문자 카운터 컴포넌트
  - 페이지로드 시 자동으로 방문 카운트
  - 오늘 방문자 수와 총 방문자 수를 표시
 */
const AdminHome = () => {

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
    방문자 카운트 API 호출 함수
    페이지 로드 시 한 번만 실행
    */
  const recordVisit = () => {
      axios.post(`/api/visitor/count`)
      .then(res => console.log(res.data))
      .catch(e => console.log(e));
    
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

  /*
  useEffect: 컴포넌트가 마운트될 때 한 번만 실행
  페이지가 로드되면 자동으로 방문 카운트
  */
  useEffect(() => {
    recordVisit();
    
    // 컴포넌트 언마운트 시 정리 작업 (필요시)
    return () => {
      // cleanup 작업 (현재는 없음)
    };
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

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
              {formatNumber(todayCount)}
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Total Visitors</span>
          <div className={styles.data}>
            <i className="bi bi-currency-exchange"></i>
            <p>
              {formatNumber(totalCount)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.third_row}>
        <div className={styles.title}>
          <span>업체별 Root스마트팜 시스템 정상구동 모니터링</span>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>업체명</td>
             
                <td>대기온도(도)</td>
                <td>대기습도(%)</td>
                <td>토양습도(%)</td>
                <td>조도(lux)</td>
                <td>구동현황</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ROOT</td>
               
                <td>{growingData[0]?.temper}°C</td>
                <td>{growingData[0]?.humidity}%</td>
                <td>{growingData[0]?.soilHumidity}%</td>
                <td>{growingData[0]?.illumination}</td>
                <td>
                  <Button 
                    content={isOptimalCondition(growingData[0]) ? '정상' : '불안정'} 
                    color={isOptimalCondition(growingData[0]) ? "green" : "brown"} 
                    padding='5px' 
                    fontSize='0.7rem' 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <>
                  <div className={styles.request}>
                    <i class="bi bi-file-earmark-text"></i>
                    <div className={styles.memo}>
                      <p>{qst.userId}</p>
                      <p>{qst.qstTitle}</p>
                      <p>{dayjs(qst.qstDate).format('YYYY-MM-DD')}</p>
                    </div>
                  </div>
                </>
              )
            })
          }

          
        </div>

      </div>

    </div>

  )
}

export default AdminHome