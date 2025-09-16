import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Eye, Wind, Droplets, Thermometer } from 'lucide-react';
import styles from './WeatherWidget.module.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      width: '64px',
      height: '64px'
    };
    
    switch(iconType) {
      case 'clear':
        return <Sun style={{...iconStyle, color: '#eab308'}} />;
      case 'clouds':
        return <Cloud style={{...iconStyle, color: '#6b7280'}} />;
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

  if (loading) {
    return (
      <div className={styles.loading}>
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
      <div className={styles.error}>
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

  return (
    <div className={styles.weatherContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.locationTitle}>{weather.location}</h2>
          <p className={styles.date}>{weather.date}</p>
          <p className={styles.time}>{weather.time}</p>
        </div>
        <div className={styles.iconContainer}>
          {getWeatherIcon(weather.icon)}
        </div>
      </div>

      {/* 온도 */}
      <div className={styles.temperatureSection}>
        <div className={styles.temperature}>{weather.temperature}°</div>
        <div className={styles.description}>{weather.description}</div>
      </div>

      {/* 상세 정보 */}
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Droplets className={styles.detailIcon} />
          <div className={styles.detailLabel}>습도</div>
          <div className={styles.detailValue}>{weather.humidity}%</div>
        </div>
        
        <div className={styles.detailItem}>
          <Wind className={styles.detailIcon} />
          <div className={styles.detailLabel}>바람</div>
          <div className={styles.detailValue}>{weather.windSpeed}m/s</div>
        </div>
        
        <div className={styles.detailItem}>
          <Eye className={styles.detailIcon} />
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