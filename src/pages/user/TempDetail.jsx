import styles from './TempDetail.module.css'
import LineChart from '../../component/charts/LineChart'
import { useEffect, useState } from 'react'
import axios from 'axios';

const TempDetail = () => {

  // 주간 최고 온도
  const [weeklyMax, setWeeklyMax] = useState(0);

  // 주간 최저 온도
  const [weeklyMin, setWeeklyMin] = useState(0);

  // 주간 평균 온도
  const [weeklyAvg, setWeeklyAvg] = useState(0);

  // 그래프 데이터
  const [chartData, setChartData] = useState(null);

  // 7일 간의 센서 데이터를 받아올 useEffect
  useEffect(() => {
    axios.get('/api/growings/weekly')
    .then(res => {
      // 받아온 전체 데이터
      const data = res.data; 

      // 날짜별로 나누기
      const dailyGrowings = [];
      const today = new Date(); // 오늘 날짜

      // 7일 전부터 1일 전까지 반복
      // 7일 간의 날짜가 존재하면 dayData 안에 날짜별로 담을 반복문
      for (let i = 7 ; i > 0 ; i--){
        // i일 전 날짜 계산
        // 오늘 날짜를 복사하여 필요한 날짜를 게산하기 위한 변수
        const targetDate = new Date(today);
        // 오늘 날짜를 이용하여 필요한 날짜를 세팅
        // 현재 데이터에서 숫자를 빼면 자동으로 하루가 당겨짐
        targetDate.setDate(today.getDate() - i);
        // 데이터 'YYYY-MM-DD형식으로 자르기
        // toISOString(): "2025-10-01T12:30:00.000Z" 형태로 변환
        // split('T')[0]: "2025-10-01"만 추출
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // 조회한 전체 센서 데이터의 원하는 날짜 정보의 데이터 배열을 반환값을 저장하기 위한 변수
        const dayData = data.filter(item => {
          const date = new Date(item.createDate);
          const itemYear = date.getFullYear();
          const itemMonth = String(date.getMonth() + 1).padStart(2, '0');
          const itemDay = String(date.getDate()).padStart(2, '0');
          const itemDate = `${itemYear}-${itemMonth}-${itemDay}`;
          return itemDate === dateStr;
        });
        if(dayData.length > 0){
          // 필요한 날짜의 배열 중 온도 배열만 반환
          const temps = dayData.map(d => d.temper);

          dailyGrowings.push({
            date: dateStr,
            max: Math.max(...temps),
            min: Math.min(...temps),
            // a : 누적값(초기값) : 이전까지의 결과
            // b : 현재값 : 지금 처리 중인 배열 항목
            // 두번째 매개변수 : 초기값(처음 a의 값)
            avg: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
          })
        }
        else{
          dailyGrowings.push({
            date: dateStr,
            max: 0,
            min: 0,
            avg: 0
          });
        };
      };
      // 전체 주간 통계
      const allTemps = data.map(d => d.temper);

      // 주간 최고, 최저 온도 세팅
      setWeeklyMax(Math.max(...allTemps).toFixed(1));
      setWeeklyMin(Math.min(...allTemps).toFixed(1));

      // 주간 평균 세팅
      const sum = allTemps.reduce((a, b) => a + b, 0);
      setWeeklyAvg((sum / allTemps.length).toFixed(1));

      // 차트 데이터 세팅
      setChartData({
        labels: dailyGrowings.map(d => {
          const date = new Date(d.date);

          // getMonth는 0월 ~ 11월 형식이라서 +1
          return `${date.getMonth() + 1}/${date.getDate()}`
        }),

        datasets: [
          {
            label: '최고온도',  // 범례에 표시될 이름
            data: dailyGrowings.map(d => d.max),  // Y축 값들
            borderColor: '#f87171',  // 선 색상
            backgroundColor: 'rgba(248, 113, 113, 0.2)',  // 영역 색상
            tension: 0.4,  // 선 곡률 (0=직선, 1=곡선)
          },
          {
            label: '평균온도',
            data: dailyGrowings.map(d => d.avg),
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.2)',
            tension: 0.4,
          },
          {
            label: '최저온도',
            data: dailyGrowings.map(d => d.min),
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
            tension: 0.4,
          }
        ]
      });
    })
    .catch(e => console.log(e));
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <i className="bi bi-thermometer-sun"></i>
          <h2>root스마트팜 <span>딸기농장 </span>실내<span>온도</span> 환경 모니터링</h2>
        </div>  
        <p>최근 7일간 하우스실내 온도데이터</p>
      </div>

      <div className={styles.box}>
        <div>
          <p>주간 평균온도</p>
          <span>{weeklyAvg}°C</span>
        </div>
        <div>
          <p>주간 최고온도</p>
          <span>{weeklyMax}°C</span>
        </div>
        <div>
          <p>주간 최저온도</p>
          <span>{weeklyMin}°C</span>         
        </div>
        <div>
          <p>자동제어장치 작동</p>
          <div className={styles.number}>
            <span>27회</span>
            <p>( 환기팬 구동수 : 27 ) </p>  
          </div>  
        </div>
      </div>

      <div className={styles.chart}>
          {chartData && ( 
            <LineChart
              title="(최근 7일간 온도 변화 추이)"
              labels={chartData.labels}
              datasets={chartData.datasets}
            />
          )} 
      </div>

    </div>
  )
}

export default TempDetail