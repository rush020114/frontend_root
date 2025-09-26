import React, { useState, useEffect, useRef } from 'react';
import styles from './PlantChatbot.module.css';

const PlantChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const API_BASE_URL = 'http://localhost:8080/api/chat';

  // 컴포넌트 마운트 시 세션 생성
  useEffect(() => {
    createSession();
  }, []);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createSession = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        loadSessionMessages(data.sessionId);
      } else {
        console.error('세션 생성 실패');
        addBotMessage('죄송합니다. 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('세션 생성 오류:', error);
      addBotMessage('연결 중 오류가 발생했습니다. 네트워크를 확인해주세요.');
    }
  };

  const loadSessionMessages = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/session/${sessionId}/messages`);
      
      if (response.ok) {
        const messages = await response.json();
        const formattedMessages = messages.map(msg => ({
          type: msg.type || 'bot',
          content: msg.content,
          imageUrl: msg.imageUrl,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('메시지 로드 오류:', error);
    }
  };

  const addBotMessage = (content) => {
    const newMessage = {
      type: 'bot',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content, imageUrl = null) => {
    const newMessage = {
      type: 'user',
      content,
      imageUrl,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendTextMessage = async () => {
    if (!inputText.trim() || !sessionId || isLoading) return;

    const userMessage = inputText.trim();
    addUserMessage(userMessage);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/session/${sessionId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        addBotMessage(data.content);
      } else {
        addBotMessage('죄송합니다. 메시지 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      addBotMessage('메시지 전송에 실패했습니다. 네트워크를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !sessionId || isLoading) return;

    if (file.size > 5 * 1024 * 1024) {
      addBotMessage('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      addBotMessage('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      addUserMessage('', e.target.result);
    };
    reader.readAsDataURL(file);

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/session/${sessionId}/image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        addBotMessage(data.content);
      } else {
        addBotMessage('이미지 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      addBotMessage('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

    return (
    <div className={styles.plant_chatbot_main}>
      {/* 헤더 */}
      <header className={styles.main_header}>
        <div className={styles.header_content}>
          <span className={styles.header_icon}>🌿</span>
          <h1 className={styles.header_title}>식물 박사 AI</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className={styles.main_content}>
        
        {/* 웰컴 섹션 - 메시지가 없을 때만 표시
        {messages.length === 0 && (
          <div className={styles.welcome_section}>
            <div className={styles.welcome_icon}>
              <span>🌱</span>
            </div>
            <h2 className={styles.welcome_title}>어떤 식물이 궁금하신가요?</h2>
            <p className={styles.welcome_description}>
              식물 사진을 업로드하시면 AI가 식물의 종류를 알려드립니다
            </p>
            <div className={styles.feature_tags}>
              <div className={styles.feature_tag}>📸 사진 업로드</div>
              <div className={styles.feature_tag}>🔍 AI 분석</div>
              <div className={styles.feature_tag}>📋 상세 정보</div>
            </div>
          </div>
        )} */}

        {/* 채팅 메시지 영역 */}
        {messages.length > 0 && (
          <div className={styles.chat_container}>
            <div className={styles.messages_area}>
              {messages.map((message, index) => (
                <div key={index} className={`${styles.message} ${styles[message.type]}`}>
                  <div className={styles.message_avatar}>
                    <span>{message.type === 'bot' ? '🌱' : '👤'}</span>
                  </div>
                  <div className={styles.message_bubble}>
                    {message.imageUrl && (
                      <img 
                        src={message.imageUrl} 
                        alt="업로드된 이미지" 
                        className={styles.message_image}
                      />
                    )}
                    {message.content && (
                      <div 
                        className={styles.message_content}
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    )}
                    <div className={styles.message_time}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.message_avatar}>
                    <span>🌱</span>
                  </div>
                  <div className={styles.message_bubble}>
                    <div className={styles.typing_indicator}>
                      <div className={styles.typing_dot}></div>
                      <div className={styles.typing_dot}></div>
                      <div className={styles.typing_dot}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* 입력 영역 */}
        <div className={styles.input_container}>
          <div className={styles.input_wrapper}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하거나 사진을 업로드해주세요..."
              className={styles.text_input}
              rows="1"
              disabled={isLoading}
            />
            <div className={styles.input_buttons}>
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className={`${styles.input_btn} ${styles.photo_btn}`}
                title="사진 업로드"
              >
                📷
              </button>
              <button 
                onClick={sendTextMessage}
                disabled={isLoading || !inputText.trim()}
                className={`${styles.input_btn} ${styles.send_btn}`}
                title="전송"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </main>

      {/* 푸터 */}
      <footer className={styles.main_footer}>
        <p>식물 박사 AI - 당신의 식물 친구 🌿</p>
      </footer>
    </div>
  );
}
export default PlantChatbot;