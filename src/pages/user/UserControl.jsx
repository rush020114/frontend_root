import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserControl.module.css'
import WeatherWidget from '../../component/widgets/WeatherWidget'

const UserControl = () => {
  const [temper, setTemper] = useState([])
  const [humidity, setHumidity] = useState([])
  const [soilHumidity, setSoilHumidity] = useState([])
  const [illumination, setIllumination] = useState([])

  useEffect(() => {
    axios.get('/api/growings')
      .then(res => {
        const data = res.data
        setTemper(data.map(d => d.temper))
        setHumidity(data.map(d => d.humidity))
        setSoilHumidity(data.map(d => d.soilHumidity))
        setIllumination(data.map(d => d.illumination))
      })
      .catch(error => console.error(error))
  }, [])

  // 최신 데이터만 추출
  const latestTemper = temper[temper.length - 1]
  const latestHumidity = humidity[humidity.length - 1]
  const latestSoil = soilHumidity[soilHumidity.length - 1]
  const latestIllum = illumination[illumination.length - 1]

  // test
  const testTemper = 28

  return (
    <div className={styles.container}>
      {/* 온도 */}
      <div 
        className={`${styles.card} ${styles.sensor} ${
          latestTemper >= 25 
            ? styles.temHigh
            : latestTemper >= 20 
              ? styles.temNormal 
              : styles.temCold
        }`}
      >
        {/* 조건부 날씨 아이콘 */}
        {latestTemper >= 25 && (
          <img src="/temHigh.png" alt="temHigh" className={styles.iconTemHigh} />
        )}
        {latestTemper >= 20 && latestTemper < 25 && (
          <img src="/temNormal.png" alt="temNormal" className={styles.iconTemNormal} />
        )}
        {latestTemper < 20 && (
          <img src="/temCold.png" alt="temCold" className={styles.iconTemCold} />
        )}
        <div>
          <h3 className={styles.title}>온도</h3>
          <p className={styles.temperature}>
            {latestTemper !== undefined ? Number(latestTemper).toFixed(1) : '-'}°
          </p>
        </div>
      </div>


      {/* 습도 */}
      <div className={`${styles.card} ${styles.sensor}`}>
        <div>
          <img src="/humidity.png" alt="humidity" className={styles.backgroundHumidity} />
          <h3 className={styles.title}>습도</h3>
          <p className={styles.humidity}>
            {latestHumidity !== undefined ? Number(latestHumidity).toFixed(1) : '-'}%
          </p>

          {/* 세로 습도 바 */}
          <div className={styles.humidityBar}>
            <div
              className={styles.humidityFill}
              style={{ height: `${latestHumidity}%` }}  // DB 값 반영
            ></div>
          </div>
        </div>
      </div>

      {/* 토양 습도 */}
      <div className={`${styles.card} ${styles.sensor} ${styles.soilCard}`}>
        <div>
          <h3 className={styles.title}>토양 습도</h3>
          <p className={styles.soil}>{latestSoil !== undefined ? Number(latestSoil).toFixed(1) : '-'}%</p>
        </div>
      </div>

      {/* 조도 */}
      <div className={`${styles.card} ${styles.sensor} ${styles.lightCard} `}>
        <div>
          <img src="/sun.png" alt="sun" className={styles.sunny} />
          <h3 className={styles.title}>조도</h3>
          <p className={styles.illum}>{latestIllum !== undefined ? Number(latestIllum).toFixed(0) : '-'}</p>
        </div>
      </div>

      {/* 날씨 위젯 */}
      <div className={styles.card}>
        <WeatherWidget 
          width="100%" 
          height="100%" 
          customColors={{
            background: 'linear-gradient(135deg, #66ea71ff 0%, #ffb169ff 100%)'
          }}
        />
      </div>

      {/* 보안 모션 감지 */}
      <div className={`${styles.card} ${styles.sensor}`}>
        <div>
          <img src="/siren.png" alt="siren" className={styles.siren} />
          <h3 className={styles.title}>모션 감지</h3>
        </div>
      </div>

    </div>
  )
}

export default UserControl
