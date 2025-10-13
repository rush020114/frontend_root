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
  const [motionCnt, setMotionCnt] = useState(0);

  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/growings')
      .then(res => {
        const data = res.data
        setTemper(data.map(d => d.temper))
        setHumidity(data.map(d => d.humidity))
        setSoilHumidity(data.map(d => d.soilHumidity))
        setIllumination(data.map(d => d.illumination))
      })
      .catch(console.error)

    axios.get('/api/motions/stats')
      .then(res => setMotionStats(res.data))
      .catch(console.error)

    axios.get('/api/motions/today')
    .then(res => setMotionCnt(res.data.filter(item => item.motionDetected !== 0).length))
    .catch(e => console.log(e));

    const timer = setTimeout(() => setShowCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const latestTemper = temper.at(-1)
  const latestHumidity = humidity.at(-1)
  const latestSoil = soilHumidity.at(-1)
  const latestIllum = illumination.at(-1)

  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const isNight = (hour >= 18 || (hour <= 4 && minute <= 50))

  return (
    <div className={styles.container}>
      {/* 온도 카드 */}
      <div 
        className={`${styles.card} ${
          latestTemper >= 25 ? styles.temHigh :
          latestTemper >= 20 ? styles.temNormal : styles.temCold
        } ${showCards ? styles.showTop : ""}`}
        onClick={() => navigate('/user/temp')}
      >
        <div className={styles.cardContent}>
          {latestTemper >= 25 && <img src="/temHigh.png" alt="hot" className={styles.iconTemHigh} />}
          {latestTemper >= 20 && latestTemper < 25 && <img src="/temNormal.png" alt="normal" className={styles.iconTemNormal} />}
          {latestTemper < 20 && <img src="/temCold.png" alt="cold" className={styles.iconTemCold} />}
          <h3 className={styles.title}>온도</h3>
          <p className={styles.dataValue}>
            {latestTemper !== undefined ? Number(latestTemper).toFixed(1) : '-'}°
          </p>
        </div>
      </div>

      {/* 습도 카드 */}
      <div 
        className={`${styles.card} ${showCards ? styles.showTop : ""}`}
        onClick={() => navigate('/user/hum')}
      >
        <div className={styles.cardContent}>
          <img src="/humidity.png" alt="humidity" className={styles.backgroundHumidity} />
          <h3 className={styles.title}>습도</h3>
          <p className={styles.dataValue}>
            {latestHumidity !== undefined ? Number(latestHumidity).toFixed(1) : '-'}%
          </p>
          <div className={styles.humidityBar}>
            <div className={styles.humidityFill} style={{ height: `${latestHumidity}%` }}></div>
          </div>
        </div>
      </div>

      {/* 토양 습도 카드 */}
      <div 
        className={`${styles.card} ${styles.soilCard} ${showCards ? styles.showRight : ""}`}
        onClick={() => navigate('/user/soilHum')}
      >
        <div className={styles.cardContent}>
          <h3 className={styles.title}>토양 습도</h3>
          <p className={styles.dataValue}>
            {latestSoil !== undefined ? Number(latestSoil).toFixed(1) : '-'}%
          </p>
        </div>
      </div>

      {/* 조도 카드 */}
      <div 
        className={`${styles.card} ${styles.lightCard} ${showCards ? styles.showLeft : ""}`}
        onClick={() => navigate('/user/illum')}
      >
        <div className={styles.cardContent}>
          <img src="/sun.png" alt="sun" className={styles.sunny} />
          <div className={styles.sunRays}></div>
          <h3 className={styles.title}>조도</h3>
          <p className={styles.dataValue}>
            {latestIllum !== undefined ? Number(latestIllum).toFixed(0) : '-' }
          </p>
        </div>
      </div>

      {/* 날씨 위젯 카드 */}
      <div className={`${styles.card} ${showCards ? styles.showBottom : ""}`}>
        <div className={`${styles.cardContent} ${styles.weatherCardContent}`}>
          <WeatherWidget
            className="weather-widget"
            width="100%" height="100%"
            style={{ borderRadius: "inherit" }}
            customColors={{
              background: isNight 
                ? 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'
                : 'linear-gradient(135deg, #fcd115ff 0%, #2ab942d7 100%)'
            }}
          />

          {isNight ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => <div key={`star-${i}`} className={styles.shootingStar}></div>)}
              {Array.from({ length: 6 }).map((_, i) => <div key={`firefly-${i}`} className={styles.firefly}></div>)}
            </>
          ) : (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`bug-${i}`} className={styles.bug}
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 90 + 5}%`,
                    animationDelay: `${Math.random() * 5}s`
                  }} />
              ))}
              {Array.from({ length: 100 }).map((_, i) => {
                const w = 0.5 + Math.random() * 3
                const h = 200 + Math.random() * 150
                const delay = Math.random() * 3
                const dur = 1.5 + Math.random() * 2
                return (
                  <div key={`reed-${i}`} className={styles.reed}
                    style={{
                      left: `${Math.random() * 100}%`,
                      '--reed-w': `${w}px`,
                      '--reed-h': `${h}px`,
                      animationDelay: `${delay}s`,
                      animationDuration: `${dur}s`
                    }} />
                )
              })}
            </>
          )}
        </div>
      </div>

      {/* 모션 감지 카드 */}
      <div className={`${styles.card} ${styles.motionCard} ${showCards ? styles.showRight : ""}`}>
        <div className={styles.cardContent}>
          {/* 사이렌 사진 */}
          <img src="/siren.png" alt="siren" className={styles.siren} />
          <h3 className={styles.title}>모션 감지</h3>

          {/* 센서 작동 중 */}
          <div className={styles.sensorStatus}>
            <p className={styles.text}> 센서 작동 중 </p>
            <div className={styles.invertbox}></div>
          </div>

          {/* 누적 횟수 */}
          <p className={styles.motionInfoCenter}>
            Today : {motionCnt} 건
          </p>

          {/* 마지막 감지 시각 */}
          <div className={styles.motionTime}>
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
        </div>
      </div>
    </div>
  )
}

export default UserControl
