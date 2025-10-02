import React, { useEffect, useState } from 'react'
import LineChart from '../../component/charts/LineChart';
import styles from './SoilHumDetail.module.css'
import axios from 'axios';

const SoilHumDetail = () => {

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
      // 전체 데이터
      const data = res.data;

      // 일주일 날짜별로 필요한 데이터 세팅을 위한 변수
      const dailyGrowings = [];
      const today = new Date();

      // 일주일 날짜별로 필요한 데이터를 세팅할 반복문
      for(let i = 7 ; i > 0 ; i--){
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - i);
        
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const dayData = data.filter(item => {
          const date = new Date(item.createDate);
          const itemYear = date.getFullYear();
          const itemMonth = String(date.getMonth() + 1).padStart(2, '0');
          const itemDay = String(date.getDate()).padStart(2, '0');
          const itemDate = `${itemYear}-${itemMonth}-${itemDay}`;
          return dateStr === itemDate;
        });

        if(dayData.length > 0){

          const soilHums = dayData.map(d => d.soilHumidity);

          dailyGrowings.push({
            date: dateStr,
            max: Math.max(...soilHums),
            min: Math.min(...soilHums),
            avg: (soilHums.reduce((a, b) => a + b, 0) / soilHums.length).toFixed(1)
          });
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

      // 화면에 띄워줄 데이터 세팅
      const allSoilHums = data.map(d => d.soilHumidity);

      setWeeklyMax(Math.max(...allSoilHums).toFixed(1));
      setWeeklyMin(Math.min(...allSoilHums).toFixed(1));
      const sum = allSoilHums.reduce((a, b) => a + b, 0);
      setWeeklyAvg((sum / allSoilHums.length).toFixed(1));

      setChartData({
        labels: dailyGrowings.map(d => {
          const date = new Date(d.date);
          return `${date.getMonth() + 1}/${date.getDate()}`
        }),
        datasets: [
        {
          label: '최고 토양습도',  // 범례에 표시될 이름
          data: dailyGrowings.map(d => d.max),  // Y축 값들
          borderColor: '#f87171',  // 선 색상
          backgroundColor: 'rgba(248, 113, 113, 0.2)',  // 영역 색상
          tension: 0.4,  // 선 곡률 (0=직선, 1=곡선)
        },
        {
          label: '평균 토양습도',
          data: dailyGrowings.map(d => d.avg),
          borderColor: '#4ade80',
          backgroundColor: 'rgba(74, 222, 128, 0.2)',
          tension: 0.4,
        },
        {
          label: '최저 토양습도',
          data: dailyGrowings.map(d => d.min),
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.2)',
          tension: 0.4,
        }
      ]
      })
      
    })
    .catch();
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <i className="bi bi-bullseye"></i>
          <h2>root스마트팜 <span>딸기농장 </span>실내<span>토양습도</span> 환경 모니터링</h2>
        </div>  
        <p>최근 7일간 하우스실내 온도데이터</p>
      </div>

      <div className={styles.box}>
        <div>
          <p>주간 평균 토양습도</p>
          <span>{weeklyAvg}</span>
        </div>
        <div>
          <p>주간 최고 토양습도</p>
          <span>{weeklyMax}</span>
        </div>
        <div>
          <p>주간 최저 토양습도</p>
          <span>{weeklyMin}</span>         
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
              title="(최근 7일간 토양습도 변화 추이)"
              labels={chartData.labels}
              datasets={chartData.datasets}
            />
          )} 
      </div>

    </div>
  )
}

export default SoilHumDetail