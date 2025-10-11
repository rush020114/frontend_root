/* 
  -- 사용 예시 --
  <GaugeChart
    title="온도"
    value={27.5}
    min={0}
    max={40}
    unit="°C"
  />
*/

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const GaugeChart = ({ title, value, min = 0, max = 100, unit = '', thresholds }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  // 색상 결정 (thresholds: { low, high })
  const getColor = () => {
    if (!thresholds) return '#22c55e';
    if (value < thresholds.low) return '#3b82f6';      // 낮음
    if (value <= thresholds.high) return '#22c55e';    // 적정
    return '#ef4444';                                   // 높음
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
        <PieChart width={350} height={200}>  {/* 200 -> 300, 120 -> 180 */}
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