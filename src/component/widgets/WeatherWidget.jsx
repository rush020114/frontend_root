{/*
높이 지정 시 - 내용이 균등하게 분산됨
<WeatherWidget height="500px" />

크기와 높이 조합
<WeatherWidget 
  size="large"
  height="600px"
  backgroundColor="purple"
/>

폭과 높이 모두 지정
<WeatherWidget 
  width="400px"
  height="450px"
  backgroundColor="teal" // teal은 그라데이션 기본색
/>

// 커스텀 색상/그라데이션
<WeatherWidget 
  customColors={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}
/>
*/}

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Eye, Wind, Droplets, Thermometer } from 'lucide-react';
import styles from './WeatherWidget.module.css';

const WeatherWidget = ({ 
  size = 'medium', 
  backgroundColor = 'blue',
  customColors = null,
  width = null,
  height = null,
  className = ''
}) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 크기별 스타일 설정
  const sizeConfig = {
    small: {
      containerClass: styles.weatherContainerSmall,
      temperatureClass: styles.temperatureSmall,
      headerClass: styles.headerSmall,
      iconSize: 48,
      detailIconSize: 20
    },
    medium: {
      containerClass: styles.weatherContainer,
      temperatureClass: styles.temperature,
      headerClass: styles.locationTitle,
      iconSize: 64,
      detailIconSize: 24
    },
    large: {
      containerClass: styles.weatherContainerLarge,
      temperatureClass: styles.temperatureLarge,
      headerClass: styles.headerLarge,
      iconSize: 80,
      detailIconSize: 28
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

  // OpenWeatherMap API를 사용한 실제 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        
        if (!API_KEY) {
          throw new Error('API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
        }
        
        const city = 'Ulsan';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const realTimeData = {
          location: data.name,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 10) / 10,
          visibility: Math.round(data.visibility / 100) / 10, // m를 km로 변환
          icon: getIconType(data.weather[0].main),
          date: new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          }),
          time: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        
        setWeather(realTimeData);
      } catch (err) {
        console.error('날씨 데이터 가져오기 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // OpenWeatherMap 날씨 상태를 아이콘 타입으로 변환하는 함수
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

    fetchWeatherData();
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
        return <CloudRain style={{...iconStyle, color: '#3b82f6'}} />;
      case 'snow':
        return <CloudSnow style={{...iconStyle, color: '#bfdbfe'}} />;
      default:
        return <Sun style={{...iconStyle, color: '#eab308'}} />;
    }
  };

  // 새로고침 함수
  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    // useEffect를 다시 실행시키기 위해 페이지 새로고침
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
        <div className={styles.loadingText}>실시간 날씨 정보를 가져오는 중...</div>
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
        <h3 className={styles.errorTitle}>날씨 정보 오류</h3>
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

  // 높이가 지정된 경우 flex 레이아웃 클래스 추가
  const containerClasses = height 
    ? `${currentSize.containerClass} ${styles.flexContainer} ${className}`
    : `${currentSize.containerClass} ${className}`;

  return (
    <div 
      className={containerClasses}
      style={containerStyle}
    >
      {/* 헤더 */}
      <div className={styles.header}>
        <div>
          <h2 className={currentSize.headerClass}>{weather.location}</h2>
          <p className={styles.date}>{weather.date}</p>
          <p className={styles.time}>{weather.time}</p>
        </div>
        <div className={styles.iconContainer}>
          {getWeatherIcon(weather.icon)}
        </div>
      </div>

      {/* 온도 */}
      <div className={height ? styles.temperatureSectionFlex : styles.temperatureSection}>
        <div className={currentSize.temperatureClass}>{weather.temperature}°</div>
        <div className={styles.description}>{weather.description}</div>
      </div>

      {/* 상세 정보 */}
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Droplets 
            style={{ width: `${currentSize.detailIconSize}px`, height: `${currentSize.detailIconSize}px` }}
            className={styles.detailIcon} 
          />
          <div className={styles.detailLabel}>습도</div>
          <div className={styles.detailValue}>{weather.humidity}%</div>
        </div>
        
        <div className={styles.detailItem}>
          <Wind 
            style={{ width: `${currentSize.detailIconSize}px`, height: `${currentSize.detailIconSize}px` }}
            className={styles.detailIcon} 
          />
          <div className={styles.detailLabel}>바람</div>
          <div className={styles.detailValue}>{weather.windSpeed}m/s</div>
        </div>
        
        <div className={styles.detailItem}>
          <Eye 
            style={{ width: `${currentSize.detailIconSize}px`, height: `${currentSize.detailIconSize}px` }}
            className={styles.detailIcon} 
          />
          <div className={styles.detailLabel}>가시거리</div>
          <div className={styles.detailValue}>{weather.visibility}km</div>
        </div>
      </div>

      {/* 새로고침 버튼 */}
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

export default WeatherWidget;