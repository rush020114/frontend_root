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
