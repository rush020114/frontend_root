import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserControl.module.css'
import VerticalBarChart from '../../component/charts/VerticalBarChart'
import LineChart from '../../component/charts/LineChart'
import DoughnutChart from '../../component/charts/DoughnutChart'
import WeatherWidget from '../../component/widgets/WeatherWidget'

const UserControl = () => {
  const [labels, setLabels] = useState([])
  const [temper, setTemper] = useState([])
  const [humidity, setHumidity] = useState([])
  const [soilHumidity, setSoilHumidity] = useState([])
  const [illumination, setIllumination] = useState([])

  useEffect(() => {
    axios.get('/api/growings')
      .then(res => {
        const data = res.data

        // X축 라벨 (시간만 추출 HH:mm)
        setLabels(data.map(d => d.createDate.substring(11, 16)))

        // Y축 데이터
        setTemper(data.map(d => d.temper))
        setHumidity(data.map(d => d.humidity))
        setSoilHumidity(data.map(d => d.soilHumidity))
        setIllumination(data.map(d => d.illumination))
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className={styles.container}>
      {/* 1열 전체: 사진 */}
      <div className={`${styles.card} ${styles.tall}`}>
        <img src="/control.png" alt="control" />
      </div>

      {/* 온도 (Line) 그래프 */}
      <div className={`${styles.card} ${styles.wide}`}>
        <LineChart
          title="온도"
          labels={labels}
          datasets={[
            {
              label: '온도 (℃)',
              data: temper,
              borderColor: '#f87171',
              backgroundColor: 'rgba(248, 113, 113, 0.2)',
              tension: 0.4,
            },
          ]}
        /> 
      </div>

      {/* 날씨 위젯 */}
      <div className={styles.card}>
        <WeatherWidget />
      </div>

      {/* 토양 (Doughnut) 그래프 */}
      <div className={styles.card}>
        {soilHumidity.length > 0 && ( // 데이터가 있을 때만 렌더
          <DoughnutChart
            key={soilHumidity[soilHumidity.length - 1]} // 값이 바뀌면 차트 다시 그림
            title="토양 습도"
            labels={['토양습도']}
            value={soilHumidity[soilHumidity.length - 1].toFixed(1)} // 소수점 1자리
            datasets={[
              {
                data: [
                  soilHumidity[soilHumidity.length - 1],
                  100 - soilHumidity[soilHumidity.length - 1],
                ],
                backgroundColor: ['#60a5fa', '#a56e1cff'],
                borderColor: ['#60a5fa', '#a56e1cff'],
                borderWidth: 1,
              },
            ]}
          />
        )}
      </div>


      {/* 조도 (Bar) 그래프 */}
      <div className={`${styles.card} ${styles.wide}`}>
        <VerticalBarChart
          title="조도"
          labels={labels}
          datasets={[
            {
              label: '조도 (lx)',
              data: illumination,
              backgroundColor: 'rgba(255, 240, 108, 1)',
            },
          ]}
        /> 
      </div>     

      {/* 습도 (Bar) 그래프 */}
      <div className={styles.card}>
        <VerticalBarChart
          title="습도"
          labels={labels}
          datasets={[
            {
              label: '습도 (%)',
              data: humidity,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ]}
        /> 
      </div>
    </div>
  )
}

export default UserControl
