import React, { useState } from 'react'
import styles from './userQnA.module.css'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Textarea from '../../common/Textarea'
import Select from '../../common/Select'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserQnA = () => {
  const nav = useNavigate();

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 등록할 파일들을 저장할 state 변수 
  const [fileList, setFileList] = useState([]);

  // 문의 데이터를 저장할 state 변수
  const [qstData, setQstData] = useState({
    qstTitle: ''
    , qstContent: ''
    , qstType: '일반문의'
  });

  // 환경 체크박스 데이터 저장할 state 변수
  const [selectedSensors, setSelectedSensors] = useState([]);

  // 체크박스 데이터를 세팅할 함수
  const handleSensorCheck = e => {
    if(e.target.checked){
      setSelectedSensors([
        ...selectedSensors
        , e.target.value
      ])
    }
    else{
      setSelectedSensors(selectedSensors.filter(item => item !== e.target.value))
    }
  }

  // 파일 제목을 반환할 함수
  const getFileName = files => {
    return files.length === 1 
           ? files[0].name 
           : `${files[0].name} 외 ${files.length - 1}개의 첨부파일`
  }

  // 문의 등록 함수
  const regQst = () => {
    if(qstData.qstType === '환경문의' && selectedSensors.length === 0){
      alert('환경문의 등록을 위해 문제 발생 센서를 선택해주세요.');
      return;
    }
    if(!qstData.qstTitle.trim()){
      alert('제목을 입력해주세요.');
      return;
    };
    if(!qstData.qstContent.trim()){
      alert('내용을 입력해주세요.')
      return;
    };
    const fileConfig = {'Content-Type': 'multipart/form-data'}

    const formData = new FormData();
    for(const img of fileList){
      formData.append('questionImgs', img);
    };
    formData.append('qstTitle', qstData.qstTitle);
    formData.append('qstContent', qstData.qstContent);
    formData.append('qstType', qstData.qstType);
    formData.append('alertSensors', selectedSensors.join(',')); // 추가
    formData.append('userId', loginData.userId);

    axios.post('/api/questions', formData, fileConfig)
    .then(res => {
      alert('등록완료');
      nav('/user')
    })
    .catch(e => {
      const errorCode = e.status;
      if(errorCode === 400 || errorCode === 500){
        alert(`오류 메시지 : ${e.response.data}`);
      }
      else{
        console.log(e);
      };
    });
  };

  // 문의 데이터를 세팅할 함수
  const handleQstData = e => {
    setQstData({
      ...qstData
      , [e.target.name]: e.target.value
    });
    if(e.target.name === 'qstType' && e.target.value === '일반문의'){
      setSelectedSensors([]);
    };
  };

  console.log(selectedSensors)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          <span>
            📝
          </span>
          문의하기
        </h1>
        <p>
          스마트팜 서비스에 대한 궁금한 점이나 문의사항을 남겨주세요.<br />
          전문 상담팀이 빠르고 정확한 답변을 드리겠습니다.
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.qst_type}>
          <div className={styles.qst_type2}>
            <Select
              size='10%'
              name='qstType'
              value={qstData.qstType}
              onChange={e => handleQstData(e)}
            >
              <option value="일반문의">일반문의</option>
              <option value="환경문의">환경문의</option>
            </Select>
          </div>
          
          {
          qstData.qstType === '환경문의'
          &&
          <div className={styles.alert_sensors}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                className={styles.checkboxInput}
                value='온도' 
                checked={selectedSensors.includes('온도')}
                onChange={e => handleSensorCheck(e)}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.labelText}>온도</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                className={styles.checkboxInput} 
                value='습도' 
                checked={selectedSensors.includes('습도')}
                onChange={e => handleSensorCheck(e)}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.labelText}>습도</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                className={styles.checkboxInput} 
                value='토양습도' 
                checked={selectedSensors.includes('토양습도')}
                onChange={e => handleSensorCheck(e)}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.labelText}>토양습도</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                className={styles.checkboxInput} 
                value='조도' 
                checked={selectedSensors.includes('조도')}
                onChange={e => handleSensorCheck(e)}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.labelText}>조도</span>
            </label>
          </div>
          }
        </div>
        <div>
          <p>제목</p>
          <Input 
            size='100%'
            name='qstTitle'
            value={qstData.qstTitle}
            onChange={e => handleQstData(e)}
          />
        </div>
        <div>
          <p>내용</p>
          <Textarea 
            size='100%'
            rows='10'
            name='qstContent'
            value={qstData.qstContent}
            onChange={e => handleQstData(e)}
          />
        </div>
        <div className={styles.file}>
          <p>관련파일 첨부</p>
          <input 
            type="file" 
            id='qna-file-upload'
            multiple
            style={{display: 'none'}}
            onChange={e => setFileList(Array.from(e.target.files))}
          />
          <label htmlFor="qna-file-upload">
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
            onClick={() => regQst()}
          />
        </div>
      </div>
    </div>
  )
}

export default UserQnA