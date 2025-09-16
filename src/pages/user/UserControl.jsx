import React from 'react'
import styles from './UserControl.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserControl = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Chart.js Bar Chart' },
    },
  };

  const data = {
    labels : ['상추', '배추', '딸기', '감자', '고구마', '방울토마토'],
    datasets: [
      {
        label: '재배량 (그램)',
        data: [10, 20, 5, 300, 700, 900, 150],
        backgroundColor: 'rgba(0, 255, 55, 0.7)',
      },
      {
        label: '습도 (시간)',
        data: [14, 29, 10, 200, 400, 500, 340],
        backgroundColor: 'rgba(255, 195, 67, 0.98)',
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      {/* 1열 전체: 온도 (row-span 2) */}
      <div className={`${styles.card} ${styles.tall}`}>
        <Bar options={options} data={data} />
      </div>
      {/* 2열 1행: Control 이미지 */}
      <div className={styles.card}>
        <img src="public/control.png" alt="control" />
      </div>
      {/* 3열 1행: 토양 */}
      <div className={styles.card}>
        <Bar options={options} data={data} />
      </div>
      {/* 2열~3열 2행: 조도 (col-span 2) */}
      <div className={`${styles.card} ${styles.wide}`}>
        <Bar options={options} data={data} />
      </div>
      {/* 2열~3열 2행: 조도 (col-span 2) */}
      <div className={`${styles.card} ${styles.wide}`}>
        <Bar options={options} data={data} />
      </div>     
      {/* 3열 2행: 날씨 */}
      <div className={styles.card}>
        <p>날씨 위젯</p>
      </div>
    </div>
  )
}

export default UserControl
