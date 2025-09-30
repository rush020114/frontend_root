{/*
  -- 사용 예시 --
  chart가 안 보일 땐 부모 태그에 height 명시
  datasets엔 라즈베리 파이 database조회 데이터
  <RadarChart
    title="센서 성능 비교"
    labels={['정확도', '반응속도', '내구성', '에너지 효율', '가격']}
    datasets={[
      {
        label: '센서 A',
        data: [80, 70, 90, 60, 50],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
      },
    ]}
  />  
*/}

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const RadarChart = ({ title, labels, datasets }) => {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title || 'Chart.js Radar Chart',
        font: {
          size: 18,
        },
      },
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;