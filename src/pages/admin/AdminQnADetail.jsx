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

  // 리렌더링을 도와줄 state 변수
  const [reload, setReload] = useState();

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = JSON.parse(loginInfo);

  // 답변 수정을 판단할 state 변수
  const [isEditing, setIsEditing] = useState(false);

  // 답변 수정 데이터를 저장할 state 변수
  const [editAns, setEditAns] = useState('');

  // 답변 데이터 조회를 저장할 state 변수
  const [ansData, setAnsData] = useState({});

  // 답변 데이터를 저장할 state 변수
  const [ansContent, setAnsContent] = useState('');

  // 문의 상세 데이터를 저장할 state 변수
  const [qstDetail, setQstDetail] = useState({});

  // 회원 기본 정보를 세팅할 useEffect
  useEffect(() => {
    axios.get()
    .then()
    .catch();
  }, [])

  // 수정 데이터를 세팅할 useEffect
  useEffect(() => {
    setEditAns(ansData.ansContent);
  }, [ansData]);

  // 문의 상세 데이터와 답변 데이터를 조회할 useEffect
  useEffect(() => {
    axios.all([axios.get('/api/questions/detail', {params: {qstId}}), axios.get(`/api/answers/${qstId}`)])
    .then(axios.spread((res1, res2) => {
      setQstDetail(res1.data);
      setAnsData(res2.data);
    }))
    .catch(e => console.log(e));
  }, [reload]);

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

  // 답변 등록
  const regAns = () => {
    if(!ansContent.trim()){
      alert('답변을 작성해주세요');
      return;
    }
    axios.post('/api/answers', {
      ansContent
      , qstId
      , userId: loginData.userId
    })
    .then(res => {
      alert(res.data);
      nav('/admin/qna');
    })
    .catch(e => console.log(e));
  };
  
  // 답변 수정
  const updateAns = () => {
    if(!editAns.trim()){
      alert('답변을 작성해주세요.');
      return;
    }
    axios.put('/api/answers', {
      ansContent: editAns
      , ansId: ansData.ansId
    })
    .then(res => {
      alert(res.data);
      setReload(reload + 1);
      setIsEditing(false);
    })
    .catch(e => console.log(e));
  };

  console.log(ansContent)
  console.log(isEditing)

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
            <p>{`👤 ${qstDetail.userDTO && qstDetail.userDTO.userName}(${qstDetail.userId})`}</p>
            <p>{`📅 ${dayjs(qstDetail.qstDate).format('YYYY-MM-DD HH:mm:ss')}`}</p>
            <p>{`📞 ${qstDetail.userDTO && qstDetail.userDTO.userTel}`}</p>
            <p>{`✉️ ${qstDetail.userDTO && qstDetail.userDTO.userEmail}`}</p>
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
                  <img src={`http://localhost:8080/upload_files/question/${img.attachedImgName}`} />
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
        {
          qstDetail.qstStatus === '진행중' || isEditing
          ?
          <Textarea
            size='100%'
            rows='10'
            placeholder='답변을 작성해주세요.'
            value={
              isEditing
              ?
              editAns
              :
              ansContent
            }
            onChange={e => {
              isEditing
              ?
              setEditAns(e.target.value)
              :
              setAnsContent(e.target.value)
            }}
          />
          :
          <div className={styles.complete_ans}>
            {ansData.ansContent}
          </div>
        }
        </div>
      </div>
      <div className={styles.btn_div}>
        <Button 
          content={
            qstDetail.qstStatus === '진행중' || isEditing
            ?
            '답 변'
            :
            '수 정'
          }
          onClick={() => {
            qstDetail.qstStatus === '진행중'
            ?
            regAns()
            :
            (
              isEditing
              ?
              updateAns()
              :
              setIsEditing(true)
            );
          }}
        />
      </div>
    </div>
  )
}

export default AdminQnADetail