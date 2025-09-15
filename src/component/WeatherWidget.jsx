import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Eye, Wind, Droplets, Thermometer } from 'lucide-react';

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
    switch(iconType) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-blue-200" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-500" />;
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
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 text-white shadow-lg max-w-md">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-300 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-blue-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-blue-300 rounded w-2/3"></div>
        </div>
        <div className="mt-4 text-center text-blue-100">실시간 날씨 정보를 가져오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500 rounded-lg p-6 text-white shadow-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">날씨 정보 오류</h3>
        <p className="mb-4">{error}</p>
        <button 
          onClick={handleRefresh}
          className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-lg py-2 px-4 text-sm font-medium"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 text-white shadow-lg max-w-md">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">{weather.location}</h2>
          <p className="text-blue-100">{weather.date}</p>
          <p className="text-blue-100 text-sm">{weather.time}</p>
        </div>
        <div className="text-right">
          {getWeatherIcon(weather.icon)}
        </div>
      </div>

      {/* 온도 */}
      <div className="mb-6">
        <div className="text-5xl font-light mb-2">{weather.temperature}°</div>
        <div className="text-xl text-blue-100">{weather.description}</div>
      </div>

      {/* 상세 정보 */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <Droplets className="w-6 h-6 mx-auto mb-1 text-blue-200" />
          <div className="text-sm text-blue-100">습도</div>
          <div className="font-semibold">{weather.humidity}%</div>
        </div>
        
        <div className="text-center">
          <Wind className="w-6 h-6 mx-auto mb-1 text-blue-200" />
          <div className="text-sm text-blue-100">바람</div>
          <div className="font-semibold">{weather.windSpeed}m/s</div>
        </div>
        
        <div className="text-center">
          <Eye className="w-6 h-6 mx-auto mb-1 text-blue-200" />
          <div className="text-sm text-blue-100">가시거리</div>
          <div className="font-semibold">{weather.visibility}km</div>
        </div>
      </div>

      {/* 새로고침 버튼 */}
      <button 
        className="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 rounded-lg py-2 px-4 text-sm font-medium"
        onClick={handleRefresh}
      >
        새로고침
      </button>
    </div>
  );
};

export default WeatherWidget;