import styles from './TempDetail.module.css'
import LineChart from '../../component/charts/LineChart'

const TempDetail = () => {
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
          <span>20.5 °C</span>
        </div>
        <div>
          <p>주간 최고온도</p>
          <span>29.7 °C</span>
        </div>
        <div>
          <p>주간 최저온도</p>
          <span>17.2 °C</span>         
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
          <LineChart
            title="(최근 7일간 온도 변화 추이)"
            labels={['7일전', '6일전', '5일전', '4일전', '3일전', '2일전', '1일전' ]}
            datasets={[
              {
                label: '최고온도',
                data: [32, 34, 29, 31, 38, 35, 32],
                borderColor: '#f0ddcdff',
                backgroundColor: 'rgba(212, 117, 53, 1)',
                tension: 0.4,
              },
              {
                label: '평균온도',
                data: [28, 25, 24, 25, 28, 25, 22],
                borderColor: '#c4e0c8ff',
                backgroundColor: 'rgba(31, 172, 38, 1)',
                tension: 0.4,
              },
              {
                label: '최저온도',
                data: [23, 21, 20, 21, 23, 20, 18],
                borderColor: '#c8d8f0ff',
                backgroundColor: 'rgba(60, 139, 230, 1)',
                tension: 0.4,
              },
            ]}
          /> 
      </div>

    </div>
  )
}

export default TempDetail