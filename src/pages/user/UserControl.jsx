import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserControl.module.css'
import VerticalBarChart from '../../component/charts/VerticalBarChart'
import LineChart from '../../component/charts/LineChart'
import DoughnutChart from '../../component/charts/DoughnutChart'
import WeatherWidget from '../../component/widgets/WeatherWidget'

const UserControl = () => {
  // labels : 표 정보 담기
  const [labels, setLabels] = useState([])
  const [temper, setTemper] = useState([])
  const [humidity, setHumidity] = useState([])
  const [soilHumidity, setSoilHumidity] = useState([])
  const [illumination, setIllumination] = useState([])

  useEffect(() => {
    axios.get('/api/growings')
      .then(res => {
        const data = res.data
        setLabels(data.map(d => d.createDate.substring(11, 16)))
        setTemper(data.map(d => d.temper))
        setHumidity(data.map(d => d.humidity))
        setSoilHumidity(data.map(d => d.soilHumidity))
        setIllumination(data.map(d => d.illumination))
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className={styles.container}>
      {/* 온도 (LineChart) */}
      <div className={styles.card}>
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

      {/* 토양 습도 */}
      <div className={styles.card}>
        {soilHumidity.length > 0 && (
          <DoughnutChart
            title="[ 최신 ] 토양 습도"
            labels={['토양습도']}
            value={(soilHumidity[soilHumidity.length - 1]).toFixed(1)}
            datasets={[
              {
                data: [
                  soilHumidity[soilHumidity.length - 1],
                  100 - soilHumidity[soilHumidity.length - 1],
                ],
                backgroundColor: ['#60a5fa', '#e9c38aff'],
                borderColor: ['#60a5fa', '#e9c38aff'],
                borderWidth: 1,
              },
            ]}
          />
        )}
      </div>

      {/* 조도 */}
      <div className={styles.card}>
        <VerticalBarChart
          title="조도"
          labels={labels}
          datasets={[
            {
              label: '',
              data: illumination,
              backgroundColor: 'rgba(255, 240, 108, 1)',
            },
          ]}
        /> 
      </div>

      {/* 보안 모션 감지 (가로 2칸) */}
      <div className={`${styles.card} ${styles.wide}`}>
      </div>
    </div>
  )
}

export default UserControl
