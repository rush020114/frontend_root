import React, { useEffect, useState } from 'react'
import styles from './AdminQnADetail.module.css'
import Textarea from '../../common/Textarea'
import Button from '../../common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

const AdminQnADetail = () => {

  const nav = useNavigate();

  // url로 문의 번호를 받아올 params
  const {qstId} = useParams();

  // 답변 데이터를 저장할 state 변수
  const [ansContent, setAnsContent] = useState('');

  // 문의 상세 데이터를 저장할 state 변수
  const [qstDetail, setQstDetail] = useState({});

  // 문의 상세 데이터를 조회할 useEffect
  useEffect(() => {
    axios.get('/api/questions/detail', {params: {qstId}})
    .then(res => setQstDetail(res.data))
    .catch(e => console.log(e));
  }, []);

  // 이미지 개수 계산 함수
  const getImgCnt = () => {
    // 초기 렌더링을 위한 조건문
    if(!qstDetail.questionImgDTOList || !Array.isArray(qstDetail.questionImgDTOList)){
      return 0;
    }
    return qstDetail.questionImgDTOList.filter(img => img.imgNum !== 0).length;
  }

  // 유효한 이미지 가져오기
  const getValidImg = () => {
    if(!qstDetail.questionImgDTOList || !Array.isArray(qstDetail.questionImgDTOList)){
      return [];
    }
    return qstDetail.questionImgDTOList.filter(img => img.imgNum !== 0);
  };

  const regAns = () => {
    axios.post('/api/answers', {
      ansContent
      , qstId
      , userId: 'admin'
    })
    .then(res => alert('답변 완료'))
    .catch(e => console.log(e));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          💬 문의 답변하기
        </h1>
      </div>
      <div className={styles.content}>
        <div className={styles.qst_title}>
          <h2>{qstDetail.qstTitle}</h2>
          <div className={styles.qst_status}>
            {qstDetail.qstStatus}
          </div>
        </div>
        <div className={styles.qst_info}>
          <div className={styles.user_info}>
            <p>{`👤 진짜이름(${qstDetail.userId})`}</p>
            <p>{`📅 ${dayjs(qstDetail.qstDate).format('YYYY-MM-DD HH:mm:ss')}`}</p>
            <p>{`📞 전화번호`}</p>
            <p>{`✉️ 이메일`}</p>
          </div>
        </div>
        <div className={styles.content_div}>
          {qstDetail.qstContent}
        </div>
        <div className={styles.img_div}>
          <h3>
            📎 첨부 이미지
            ({getImgCnt()}개)
          </h3>
          <div className={styles.img}>
          {
            getImgCnt() > 0
            ?
            getValidImg().map((img, i) => {
              return(
                <div 
                  key={i}
                  className={styles.img_info}
                >
                  <img src={`http://localhost:8080/question_upload/${img.attachedImgName}`} />
                  <p>{img.originImgName}</p>
                </div>
              )
            })
            :
            <div className={styles.no_img}>
              첨부된 이미지가 없습니다.
            </div>
          }
          </div>
        </div>
      </div>
      <div className={styles.answer_div}>
        <h2>✍️ 답변 작성</h2>
        <div className={styles.ans_content}>
          <Textarea
            size='100%'
            rows='10'
            placeholder='답변을 작성해주세요.'
            value={ansContent}
            onChange={e => setAnsContent(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.btn_div}>
        <Button 
          content='답변'
          
          onClick={() => regAns()}
        />
      </div>
    </div>
  )
}

export default AdminQnADetail