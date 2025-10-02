import styles from './HumDetail.module.css'
import LineChart from '../../component/charts/LineChart'
import { useEffect, useState } from 'react';
import axios from 'axios';

const HumDetail = () => {

  // 주간 최고 습도
  const [weeklyMax, setWeeklyMax] = useState(0);

  // 주간 최저 습도
  const [weeklyMin, setWeeklyMin] = useState(0);

  // 주간 평균 습도
  const [weeklyAvg, setWeeklyAvg] = useState(0);

  // 그래프 데이터
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('/api/growings/weekly')
    .then(res => {
      // 받아온 전체 데이터
      const data = res.data;

      // 차트 데이터를 세팅 배열을 저장할 변수
      const dailyGrowings = [];

      // 오늘 날짜를 조회할 객체
      const today = new Date();

      // 날짜별로 데이터를 세팅하기 위한 반복문
      for(let i = 7 ; i > 0 ; i--){
        
        // 현재 날짜를 담을 변수(필요한 날짜 계산용)
        const targetDate = new Date(today);
        
        // 연산을 이용한 날짜 세팅
        targetDate.setDate(today.getDate() - i);
        
        // 'YYYY-MM-SS형식으로 표준화'
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // 조회한 센서 데이터를 필요한 날짜 센서 데이터 있는 배열로 남겨 저장할 변수        
        const dayData = data.filter(item => {
          const date = new Date(item.createDate);
          const itemYear = date.getFullYear();
          const itemMonth = String(date.getMonth() + 1).padStart(2, '0');
          const itemDay = String(date.getDate()).padStart(2, '0');
          const itemDate = `${itemYear}-${itemMonth}-${itemDay}`;
          return dateStr === itemDate
        });
        if(dayData.length > 0){
          // 필요한 날짜의 센서 데이터 중 습도로만 구성된 배열을 담을 변수
          const hums = dayData.map(d => d.humidity);

          // 차트 데이터 세팅 배열
          dailyGrowings.push({
            date: dateStr,
            max: Math.max(...hums),
            min: Math.min(...hums),
            avg: (hums.reduce((a, b) => a + b, 0) / hums.length).toFixed(1)
          })
        }
        else{
          dailyGrowings.push({
            date: dateStr,
            max: 0,
            min: 0,
            avg: 0
          })
        }
      };

      // 주간의 모든 습도값을 저장할 state 변수
      const allHums = data.map(d => d.humidity);

      // 주간 최고, 최저, 평균 습도 세팅(첫째자리까지 반올림)
      setWeeklyMax(Math.max(...allHums).toFixed(1));
      setWeeklyMin(Math.min(...allHums).toFixed(1));
      const sum = allHums.reduce((a, b) => a + b, 0)
      setWeeklyAvg((sum / allHums.length).toFixed(0));

      // 차트 데이터 세팅
      setChartData({
        labels: dailyGrowings.map(d => {
          const date = new Date(d.date);
          return `${date.getMonth() + 1}/${date.getDate()}`
        }),

        datasets: [
          {
            label: '최고 습도',  // 범례에 표시될 이름
            data: dailyGrowings.map(d => d.max),  // Y축 값들
            borderColor: '#f87171',  // 선 색상
            backgroundColor: 'rgba(248, 113, 113, 0.2)',  // 영역 색상
            tension: 0.4,  // 선 곡률 (0=직선, 1=곡선)
          },
          {
            label: '평균 습도',
            data: dailyGrowings.map(d => d.avg),
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.2)',
            tension: 0.4,
          },
          {
            label: '최저 습도',
            data: dailyGrowings.map(d => d.min),
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
            tension: 0.4,
          }
        ]
      })
    })
    .catch(e => console.log(e));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <i className="bi bi-droplet"></i>
          <h2>root스마트팜 <span>딸기농장 </span>실내<span>습도</span> 환경 모니터링</h2>
        </div>  
        <p>최근 7일간 하우스실내 습도데이터</p>
      </div>

      <div className={styles.box}>
        <div>
          <p>주간 평균 습도</p>
          <span>{weeklyAvg}</span>
        </div>
        <div>
          <p>주간 최고 습도</p>
          <span>{weeklyMax}</span>
        </div>
        <div>
          <p>주간 최저 습도</p>
          <span>{weeklyMin}</span>         
        </div>
      </div>

      <div className={styles.chart}>
          {chartData && ( 
            <LineChart
              title="(최근 7일간 습도 변화 추이)"
              labels={chartData.labels}
              datasets={chartData.datasets}
            />
          )} 
      </div>

    </div>
  )
}

export default HumDetail