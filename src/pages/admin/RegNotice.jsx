import React, { useEffect, useState } from 'react'
import styles from './RegNotice.module.css'
import Input from '../../common/Input'
import Textarea from '../../common/Textarea'
import Button from '../../common/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegNotice = () => {
  
  const nav = useNavigate();

  // 등록할 파일들을 저장할 state 변수
  const [fileList, setFileList] = useState([]);
  
  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 공지 데이터를 담을 state 변수
  const [noticeData, setNoticeData] = useState({
    noticeTitle: ''
    , noticeContent: ''
    , isImportant: 'N'
  });

  // 공지 데이터를 저장할 함수
  const handleNotice = e => {
    setNoticeData({
      ...noticeData
      , [e.target.name]: e.target.value
    });
  };

  // 공지를 등록할 함수
  const regNotice = () => {
    if(!noticeData.noticeTitle.trim()){
      alert('제목을 입력해주세요.');
      return;
    };
    if(!noticeData.noticeContent.trim()){
      alert('내용을 입력해주세요.')
      return;
    };
    const fileConfig = {'Content-Type': 'multipart/form-data'};

    const formData = new FormData();

    for(const img of fileList){
      formData.append('noticeImgs', img);
    };
    formData.append('noticeTitle', noticeData.noticeTitle);
    formData.append('noticeContent', noticeData.noticeContent);
    formData.append('isImportant', noticeData.isImportant);
    formData.append('userId', loginData.userId);

    axios.post('/api/notices', formData, fileConfig)
    .then(res => {
      alert(res.data);
      nav('/admin/notice')
    })
    .catch(e => console.log(e));
  };

  // 파일 제목을 반환할 함수
  const getFileName = files => {
    return files.length === 1
          ? files[0].name
          : `${files[0].name} 외 ${files.length - 1}개의 첨부파일`
  };

  console.log(noticeData)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          <span>
            📝
          </span>
          공지
        </h1>
        <div className={styles.important}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              className={styles.checkboxInput} 
              value={noticeData.isImportant}
              checked={noticeData.isImportant === 'Y'}
              onChange={e => {
                  setNoticeData({
                    ...noticeData,
                    isImportant: e.target.checked ? 'Y' : 'N'
                  })
                }
              }
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.labelText}>중요</span>
          </label>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <p>제목</p>
          <Input 
            size='100%'
            name='noticeTitle'
            onChange={e => handleNotice(e)}
          />
        </div>
        <div>
          <p>내용</p>
          <Textarea 
            size='100%'
            rows='10'
            name='noticeContent'
            onChange={e => handleNotice(e)}
          />
        </div>
        <div className={styles.file}>
          <p>관련파일 첨부</p>
          <input 
            type="file" 
            id='notice-file-upload'
            multiple
            style={{display: 'none'}}
            onChange={e => setFileList(Array.from(e.target.files))}
          />
          <label htmlFor="notice-file-upload">
            <span className={styles.icon_span}>
              <i className="bi bi-paperclip"></i>
            </span>
            {
            fileList.length
            ?
            '📁 ' + getFileName(fileList)
            :
            <div>
              파일을 선택해주세요.
              <span className={styles.file_info}> (사진, 문서 파일 / 최대 10MB)</span>
            </div>
            }
          </label>
        </div>
        <div className={styles.btn_div}>
          <Button 
            content='등 록'
            onClick={() => regNotice()}
          />
        </div>
      </div>
    </div>
  )
}

export default RegNotice