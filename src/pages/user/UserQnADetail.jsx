import React, { useEffect, useState } from 'react'
import styles from './UserQnADetail.module.css'
import Button from '../../common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

const UserQnADetail = () => {
  const nav = useNavigate();

  // url로 문의 번호를 받아올 params
  const {qstId} = useParams();

  // 답변 데이터를 받아올 state 변수
  const [ansData, setAnsData] = useState({});

  // 문의 상세 데이터를 저장할 state 변수
  const [qstDetail, setQstDetail] = useState({});

  // 문의 상세 데이터를 조회할 useEffect
  useEffect(() => {
    axios.all([axios.get('/api/questions/detail', {params: {qstId}}), axios.get(`/api/answers/${qstId}`)])
    .then(axios.spread((res1, res2) => {
      setQstDetail(res1.data);
      if(!res2.data.ansId){
        return;
      };
      setAnsData(res2.data);
    }))
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
  }

  console.log(qstDetail)
  console.log(ansData)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          {qstDetail.qstTitle}
        </h1>
        <div className={styles.qst_info}>
          <div className={styles.user_info}>
            <p>{`👤 ${qstDetail.userId}`}</p>
            <p>{`📅 ${dayjs(qstDetail.qstDate).format('YYYY-MM-DD HH:mm:ss')}`}</p>
          </div>
          <div className={styles.qst_status}>
            {qstDetail.qstStatus}
          </div>
        </div>
      </div>
      <div className={styles.content}>
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
        <h3>💬 관리자 답변</h3>
        {
        qstDetail.qstStatus === '진행중'
        ?
        <div className={styles.ans_content}>
          <span>⏳</span>
          관리자 답변이 등록되지 않았습니다. <br />
          빠른 시일 내에 답변 드리겠습니다.
        </div>
        :
        <div className={styles.ans_complete}>
          <div className={styles.ans_title}>
            <p>👨‍💻 {ansData.userId}</p>
            <p>📅 {dayjs(ansData.ansDate).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
          <div className={styles.complete_content}>
            {ansData.ansContent}
          </div>
        </div>
        }
      </div>
      <div className={styles.btn_div}>
        <Button 
          color='blue'
          content='목 록'
        />
        <Button 
          content='수 정'
        />
        <Button 
          color='red'
          content='삭 제'
        />
      </div>
    </div>
  )
}

export default UserQnADetail