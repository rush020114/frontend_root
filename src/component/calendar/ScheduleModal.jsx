import React, { useState, useEffect } from 'react';
import styles from './ScheduleModal.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

const ScheduleModal = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    schedDate: new Date(),
    schedContent: '',
    category: '파종'
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        title: '',
        schedDate: new Date(),
        schedContent: '',
        category: '파종'
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{editData ? '일정 수정' : '일정 등록'}</h2>
        
        <div className={styles.form}>
          <label>제목</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="일정 제목"
          />

          <label>날짜</label>
          <DatePicker
            selected={formData.schedDate}
            onChange={(date) => setFormData({...formData, schedDate: date})}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />

          <label>카테고리</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="파종">파종</option>
            <option value="수확">수확</option>
            <option value="비료">비료</option>
            <option value="방제">방제</option>
          </select>

          <label>내용</label>
          <textarea
            style={{resize: 'none'}}
            value={formData.schedContent}
            onChange={(e) => setFormData({...formData, schedContent: e.target.value})}
            placeholder="일정 내용"
            rows="4"
          />

          <div className={styles.buttons}>
            <button onClick={handleSubmit}>저장</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;