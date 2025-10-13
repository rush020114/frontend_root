/* 
  -- 사용 예시 --
  <GaugeChart
    title="온도"
    value={27.5}
    min={0}
    max={40}
    unit="°C"
    hasAlert={true}  // ⭐ 추가
  />
*/

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const GaugeChart = ({ title, value, min = 0, max = 100, unit = '', thresholds, hasAlert }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  // ⭐ 색상 결정 - hasAlert 기준으로 변경
  const getColor = () => {
    return hasAlert ? '#ef4444' : '#22c55e';  // 알림 있으면 빨강, 없으면 초록
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h3 style={{ fontSize: '35px', fontWeight: '600' }}>
        {title}
      </h3>
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
        <PieChart width={350} height={200}>
          <Pie
            data={data}
            cx={175}  
            cy={175}  
            startAngle={180}
            endAngle={0}
            innerRadius={105}  
            outerRadius={140} 
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={getColor()} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
        <div style={{
          position: 'absolute',
          top: '125px',  
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '32px', 
          fontWeight: 'bold'
        }}>
          {value}{unit}
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;