import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './UserControl.module.css'
import WeatherWidget from '../../component/widgets/WeatherWidget'

const UserControl = () => {
  const [temper, setTemper] = useState([])
  const [humidity, setHumidity] = useState([])
  const [soilHumidity, setSoilHumidity] = useState([])
  const [illumination, setIllumination] = useState([])
  const [motionStats, setMotionStats] = useState({
    detectedCount: 0,
    lastDetected: null
  })

  const navigate = useNavigate()

  // -----------------------------
  // 서버에서 데이터 가져오기
  // -----------------------------
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

    axios.get('/api/motions/stats')
      .then(res => setMotionStats(res.data))
      .catch(err => console.error(err))
  }, [])

  // -----------------------------
  // 최신 데이터
  // -----------------------------
  const latestTemper = temper[temper.length - 1]
  const latestHumidity = humidity[humidity.length - 1]
  const latestSoil = soilHumidity[soilHumidity.length - 1]
  const latestIllum = illumination[illumination.length - 1]

  // -----------------------------
  // 시간대 판별
  // -----------------------------
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const isNight = (hour >= 18 || (hour <= 4 && minute <= 50))

  return (
    <div className={styles.container}>
      {/* 온도 카드 */}
      <div 
        className={`${styles.card} ${styles.sensor} ${
          latestTemper >= 25 
            ? styles.temHigh
            : latestTemper >= 20 
              ? styles.temNormal 
              : styles.temCold
        }`}
        onClick={() => navigate('/user/temp')}
        style={{ cursor: 'pointer' }}
      >
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

      {/* 습도 카드 */}
      <div 
        className={`${styles.card} ${styles.sensor}`}
        onClick={() => navigate('/user/hum')}
        style={{ cursor: 'pointer' }}
      >
        <div>
          <img src="/humidity.png" alt="humidity" className={styles.backgroundHumidity} />
          <h3 className={styles.title}>습도</h3>
          <p className={styles.humidity}>
            {latestHumidity !== undefined ? Number(latestHumidity).toFixed(1) : '-'}%
          </p>
          <div className={styles.humidityBar}>
            <div
              className={styles.humidityFill}
              style={{ height: `${latestHumidity}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 토양 습도 카드 */}
      <div 
        className={`${styles.card} ${styles.sensor} ${styles.soilCard}`}
        onClick={() => navigate('/user/soilHum')}
        style={{ cursor: 'pointer' }}
      >
        <div>
          <h3 className={styles.title}>토양 습도</h3>
          <p className={styles.soil}>
            {latestSoil !== undefined ? Number(latestSoil).toFixed(1) : '-'}%
          </p>
        </div>
      </div>

      {/* 조도 카드 */}
      <div 
        className={`${styles.card} ${styles.sensor} ${styles.lightCard}`}
        onClick={() => navigate('/user/illum')}
        style={{ cursor: 'pointer' }}
      >
        <div>
          <img src="/sun.png" alt="sun" className={styles.sunny} />
          <h3 className={styles.title}>조도</h3>
          <p className={styles.illum}>
            {latestIllum !== undefined ? Number(latestIllum).toFixed(0) : '-'}
          </p>
        </div>
      </div>

      {/* 날씨 위젯 */}
      <div className={styles.card}>
        <WeatherWidget 
          width="100%" 
          height="100%" 
          customColors={{
            background: isNight 
              ? 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'
              : 'linear-gradient(135deg, #567aeec2 0%, #40df82d7 100%)'
          }}
        />

        {isNight ? (
          <>
            {/* 별똥별 */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`star-${i}`} className={styles.shootingStar}></div>
            ))}
            {/* 반딧불이 */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`firefly-${i}`} className={styles.firefly}></div>
            ))}
          </>
        ) : (
          <>
            {/* 풀벌레 (6개) */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`bug-${i}`}
                className={styles.bug}
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 90 + 5}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
            {/* 갈대 (얇고 수북하게 100개) */}
            {Array.from({ length: 100 }).map((_, i) => {
              const w = 0.5 + Math.random() * 3
              const h = 200 + Math.random() * 150
              const delay = Math.random() * 3
              const dur = 1.5 + Math.random() * 2
              return (
                <div
                  key={`reed-${i}`}
                  className={styles.reed}
                  style={{
                    left: `${Math.random() * 100}%`,
                    '--reed-w': `${w}px`,
                    '--reed-h': `${h}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${dur}s`,
                  }}
                />
              )
            })}
          </>
        )}
      </div>

      {/* 모션 감지 카드 */}
      <div className={`${styles.card} ${styles.sensor} ${styles.motionCard}`}>
        <div>
          <img src="/siren.png" alt="siren" className={styles.siren} />
          <h3 className={styles.motionTitle}>모션 감지</h3>
          <div className={styles.motionInfoHighlight}>
            {motionStats.lastDetected ? (
              <>
                <div>
                  {new Date(motionStats.lastDetected).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div>
                  {new Date(motionStats.lastDetected).toLocaleTimeString("ko-KR", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </div>
              </>
            ) : (
              "-"
            )}
          </div>
          <p className={styles.motionInfo}>
            누적 횟수: {motionStats.detectedCount}회
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserControl