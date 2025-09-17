{/* 
  -- 사용 예시 --
  chart가 안 보일 땐 부모 태그에 height 명시
  datasets엔 라즈베리 파이 database조회 데이터
  <DoughnutChart
    title="센서 비율"
    labels={['온도', '습도', '조도']}
    datasets={[
      {
        data: [30, 40, 30],
        backgroundColor: ['#f87171', '#60a5fa', '#34d399'],
        borderColor: ['#ef4444', '#3b82f6', '#10b981'],
        borderWidth: 1,
      },
    ]}
  /> 
*/}

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ title, labels, datasets }) => {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%', // 내부에서 고정 처리
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: title || 'Chart.js Bar Chart',
        font: {
          size: 18,
        },
        color: '#111',
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;