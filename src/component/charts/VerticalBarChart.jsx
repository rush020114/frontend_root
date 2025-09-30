{/* 
  -- 사용 예시 --
  chart가 안 보일 땐 부모 태그에 height 명시
  datasets엔 라즈베리 파이 database조회 데이터
  <VerticalBarChart
  title="조도 vs 습도"
  labels={['10시', '11시', '12시', '13시', '14시', '15시', '16시']}
  datasets={[
    {
      label: '조도',
      data: [300, 450, 500, 600, 550, 480, 430],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '습도',
      data: [70, 65, 60, 58, 55, 53, 50],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ]}
  /> 
*/}

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = ({ labels, datasets, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: title || 'Chart.js Bar Chart',
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return <Bar options={options} data={data} />;
};

export default VerticalBarChart;