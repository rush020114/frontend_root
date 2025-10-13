{/* 
  -- 사용 예시 --
  chart가 안 보일 땐 부모 태그에 height 명시
  datasets엔 라즈베리 파이 database조회 데이터
  tension : 꺾임 정도 높을수록 많이 꺾임
  <LineChart
    title="센서 변화 추이"
    labels={['1월', '2월', '3월', '4월']}
    datasets={[
      {
        label: '온도',
        data: [22, 24, 19, 23],
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
        tension: 0.4,
      },
    ]}
  />  
*/}

import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ title, labels, datasets }) => {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title || 'Chart.js Line Chart',
        font: {
          size: 18,
        },
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;