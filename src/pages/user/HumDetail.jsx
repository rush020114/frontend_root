import styles from './HumDetail.module.css'
import LineChart from '../../component/charts/LineChart'

const HumDetail = () => {
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
          <p>주간 평균습도</p>
          <span>46.8 °C</span>
        </div>
        <div>
          <p>주간 최고습도</p>
          <span>53.2 °C</span>
        </div>
        <div>
          <p>주간 최저습도</p>
          <span>33.8 °C</span>         
        </div>
{/*        
        <div>
          <p>자동제어장치 작동</p>
          <div className={styles.number}>
            <span>17회</span>
            <p>( 모터 구동수 : 17 ) </p>  
          </div>  
        </div>
 */}       
      </div>

      <div className={styles.chart}>
          <LineChart
            title="(최근 7일간 평균습도 변화 추이)"
            labels={['7일전', '6일전', '5일전', '4일전', '3일전', '2일전', '1일전' ]}
            datasets={[
              {
                label: '최고습도',
                data: [52, 54, 49, 51, 58, 55, 52],
                borderColor: '#f0ddcdff',
                backgroundColor: 'rgba(212, 117, 53, 1)',
                tension: 0.4,
              },
              {
                label: '평균습도',
                data: [48, 45, 44, 45, 48, 45, 42],
                borderColor: '#c4e0c8ff',
                backgroundColor: 'rgba(31, 172, 38, 1)',
                tension: 0.4,
              },
              {
                label: '최저습도',
                data: [43, 41, 40, 41, 43, 40, 38],
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

export default HumDetail