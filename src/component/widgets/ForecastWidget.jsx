{/*
사용 예시:

// 기본 사용
<ForecastWidget />

// 크기 조정
<ForecastWidget size="small" />
<ForecastWidget size="large" />

// 배경색 변경
<ForecastWidget backgroundColor="purple" />
<ForecastWidget backgroundColor="green" />

// 폭/높이 지정
<ForecastWidget 
  width="500px"
  height="400px"
/>

// 커스텀 색상
<ForecastWidget 
  customColors={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}
/>

// 조합
<ForecastWidget 
  size="large"
  backgroundColor="teal"
  width="600px"
/>
*/}

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';
import styles from './ForecastWidget.module.css';

const ForecastWidget = ({ 
  size = 'medium',
  backgroundColor = 'blue',
  customColors = null,
  width = null,
  height = null,
  className = ''
}) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 크기별 스타일 설정
  const sizeConfig = {
    small: {
      containerClass: styles.forecastContainerSmall,
      titleClass: styles.titleSmall,
      iconSize: 32,
      fontSize: 'small'
    },
    medium: {
      containerClass: styles.forecastContainer,
      titleClass: styles.title,
      iconSize: 40,
      fontSize: 'medium'
    },
    large: {
      containerClass: styles.forecastContainerLarge,
      titleClass: styles.titleLarge,
      iconSize: 48,
      fontSize: 'large'
    }
  };

  // 배경색 설정
  const backgroundConfig = {
    blue: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    purple: 'linear-gradient(135deg, #8b5cf6, #5b21b6)',
    green: 'linear-gradient(135deg, #10b981, #047857)',
    orange: 'linear-gradient(135deg, #f97316, #c2410c)',
    pink: 'linear-gradient(135deg, #ec4899, #be185d)',
    gray: 'linear-gradient(135deg, #6b7280, #374151)',
    indigo: 'linear-gradient(135deg, #6366f1, #3730a3)',
    teal: 'linear-gradient(135deg, #14b8a6, #0f766e)',
    red: 'linear-gradient(135deg, #ef4444, #dc2626)'
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;
  const currentBackground = customColors 
    ? (customColors.background || customColors.gradient)
    : backgroundConfig[backgroundColor] || backgroundConfig.blue;

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        
        if (!API_KEY) {
          throw new Error('API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
        }
        
        const city = 'Ulsan';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 매일 정오(12시) 데이터만 추출하여 5일치 가져오기
        const dailyData = data.list
          .filter(item => item.dt_txt.includes('12:00:00'))
          .slice(0, 5)
          .map(day => ({
            date: new Date(day.dt * 1000).toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            }),
            temp: Math.round(day.main.temp),
            icon: getIconType(day.weather[0].main),
            description: day.weather[0].description
          }));
        
        setForecast(dailyData);
      } catch (err) {
        console.error('예보 데이터 가져오기 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getIconType = (weatherMain) => {
      switch(weatherMain) {
        case 'Clear':
          return 'clear';
        case 'Clouds':
          return 'clouds';
        case 'Rain':
        case 'Drizzle':
          return 'rain';
        case 'Snow':
          return 'snow';
        case 'Thunderstorm':
          return 'rain';
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Fog':
        case 'Sand':
        case 'Ash':
        case 'Squall':
        case 'Tornado':
          return 'clouds';
        default:
          return 'clear';
      }
    };

    fetchForecast();
  }, []);

  const getWeatherIcon = (iconType) => {
    const iconStyle = {
      width: `${currentSize.iconSize}px`,
      height: `${currentSize.iconSize}px`
    };
    
    switch(iconType) {
      case 'clear':
        return <Sun style={{...iconStyle, color: '#eab308'}} />;
      case 'clouds':
        return <Cloud style={{...iconStyle, color: '#eaeaea'}} />;
      case 'rain':
        return <CloudRain style={{...iconStyle, color: '#eaeaea'}} />;
      case 'snow':
        return <CloudSnow style={{...iconStyle, color: '#bfdbfe'}} />;
      default:
        return <Sun style={{...iconStyle, color: '#eab308'}} />;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  // 컨테이너 스타일 동적 생성
  const containerStyle = {
    background: currentBackground,
    ...(width && { maxWidth: width, width: width }),
    ...(height && { height: height })
  };

  if (loading) {
    return (
      <div 
        className={`${styles.loading} ${className}`}
        style={containerStyle}
      >
        <div className={styles.loadingContent}>
          <div className={styles.loadingBar}></div>
          <div className={styles.loadingBar}></div>
          <div className={styles.loadingBar}></div>
        </div>
        <div className={styles.loadingText}>5일 예보를 가져오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`${styles.error} ${className}`}
        style={{ 
          background: backgroundConfig.red,
          ...(width && { maxWidth: width, width: width }),
          ...(height && { height: height })
        }}
      >
        <h3 className={styles.errorTitle}>예보 정보 오류</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          onClick={handleRefresh}
          className={styles.errorButton}
        >
          다시 시도
        </button>
      </div>
    );
  }

  const containerClasses = height 
    ? `${currentSize.containerClass} ${styles.flexContainer} ${className}`
    : `${currentSize.containerClass} ${className}`;

  return (
    <div 
      className={containerClasses}
      style={containerStyle}
    >
      <h3 className={currentSize.titleClass}>5일 날씨 예보</h3>
      
      <div className={styles.forecastList}>
        {forecast.map((day, index) => (
          <div key={index} className={styles.dayCard}>
            <div className={styles.date}>{day.date}</div>
            <div className={styles.iconContainer}>
              {getWeatherIcon(day.icon)}
            </div>
            <div className={styles.temp}>{day.temp}°</div>
            <div className={styles.description}>{day.description}</div>
          </div>
        ))}
      </div>

      <button 
        className={styles.refreshButton}
        onClick={handleRefresh}
      >
        <span><i className="bi bi-arrow-counterclockwise"></i></span>
        &nbsp;새로고침
      </button>
    </div>
  );
};

export default ForecastWidget;