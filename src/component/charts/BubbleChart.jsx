{/* 
  -- 사용 예시 --
  chart가 안 보일 땐 부모 태그에 height 명시
  datasets엔 라즈베리 파이 database조회 데이터
  <BubbleChart
    title="센서 분포"
    datasets={[
      {
        label: '센서 그룹 A',
        data: [
          { x: 10, y: 20, r: 8 },
          { x: 15, y: 10, r: 12 },
          { x: 25, y: 30, r: 6 },
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
      },
    ]}
  />  
*/}

import React from 'react';
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title);

const BubbleChart = ({ title, datasets }) => {
  const data = { datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title || 'Chart.js Bubble Chart',
        font: {
          size: 18,
        },
      },
      legend: {
        position: 'bottom',
      },
    },
      scales: {
        x: {
          title: {
            display: true,
            text: 'X축',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Y축',
          },
        },
      },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bubble data={data} options={options} />
    </div>
  );
};

export default BubbleChart;