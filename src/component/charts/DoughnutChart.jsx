{/* -- 사용 예시 -- 
chart가 안 보일 땐 부모 태그에 height 명시
datasets엔 스마트팜 센서 데이터나 작물 현황 데이터 사용

<DoughnutChart 
  title="토양 습도 현황"
  value={75}
  labels={['정상', '주의', '위험']}
  datasets={[
    {
      data: [75, 15, 10],
      backgroundColor: [
        '#4CAF50',  // 초록 - 정상
        '#FF9800',  // 주황 - 주의  
        '#F44336'   // 빨강 - 위험
      ],
      borderColor: [
        '#45a049',
        '#f57c00', 
        '#d32f2f'
      ],
      borderWidth: 2,
    }
  ]}
/>
*/}

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ title, labels, datasets, value }) => {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%', // 도넛 두께
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: title || 'Doughnut Chart',
        font: { size: 18 },
        color: '#111',
      },
    },
  };

  // 중앙 퍼센트 표시 플러그인
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.save();

      const fontSize = (height / 100).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#111';

      const text = `${value}%`; // props로 받은 값 표시
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default DoughnutChart;
