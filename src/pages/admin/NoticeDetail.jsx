import React, { useEffect, useState } from 'react'
import styles from './NoticeDetail.module.css'
import dayjs from 'dayjs';
import Button from '../../common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Textarea from '../../common/Textarea';
import Modal from '../../component/modal/Modal';

const NoticeDetail = () => {

  const nav = useNavigate();

  // 모달을 실행해줄 state 변수
  const [isOpen, setIsOpen] = useState(false);

  // 모달에 들어갈 이미지 경로를 저장할 state 변수
  const [modalImgUrl, setModalImgUrl] = useState('');

  // 모달에 들어갈 이미지 제목
  const [modalImgTitle, setModalImgTitle] = useState('');

  // 로그인 정보를 저장할 state 변수
  const loginInfo = sessionStorage?.getItem('loginInfo');

  // 로그인 정보 객체화
  const loginData = loginInfo ? JSON.parse(loginInfo) : null;

  // url로 문의 번호를 받아올 params
  const {noticeId} = useParams();

  // 리렌더링을 도와줄 state 변수
  const [reload, setReload] = useState(0);

  // 공지 수정을 판단할 state 변수
  const [isEditing, setIsEditing] = useState(false);

  // 공지 수정을 저장할 state 변수
  const [updateNoticeData, setUpdateNoticeData] = useState({});

  // 문의 상세 데이터를 저장할 state 변수
  const [noticeDetail, setNoticeDetail] = useState({});

  // 이미지 수정 시 삭제 이미지 번호를 저장할 state 변수
  const [imgNumArr, setImgNumArr] = useState([]);

  // 공지 수정 데이터를 세팅할 useEffect
  useEffect(() => {
    setUpdateNoticeData({
      noticeTitle: noticeDetail.noticeTitle
      , noticeContent: noticeDetail.noticeContent
      , isImportant: noticeDetail.isImportant
      , deleteImgNumArr: noticeDetail?.noticeImgDTOList?.map(d => d.imgNum)
    });
  }, [noticeDetail])

  // 문의 상세 데이터를 조화할 useEffect
  useEffect(() => {
    axios.get('/api/notices/detail', {params: {noticeId}})
    .then(res => setNoticeDetail(res.data))
    .catch(e => console.log(e));
  }, [reload]);

  // 공지 수정 함수
  const handleUpdateNotice = e => {
    setUpdateNoticeData({
      ...updateNoticeData
      , [e.target.name]: e.target.value
    });
  };

  // 이미지 계산 함수
  const getImgCnt = () => {
    if(!noticeDetail.noticeImgDTOList || !Array.isArray(noticeDetail.noticeImgDTOList)){
      return 0;
    };

    if(isEditing && updateNoticeData.deleteImgNumArr){
      return noticeDetail.noticeImgDTOList.filter(
        img => updateNoticeData.deleteImgNumArr.includes(img.imgNum)
      ).length
    }

    return noticeDetail.noticeImgDTOList.filter(img => img.imgNum !== 0).length
  };

  // 유효한 이미지 가져오기
  const getValidImg = () => {
    if(!noticeDetail.noticeImgDTOList || !Array.isArray(noticeDetail.noticeImgDTOList)){
      return [];
    };
  
    // isEditing일 때는 deleteImgNumArr에 있는 것만 보여주기
    if(isEditing && updateNoticeData.deleteImgNumArr) {
      return noticeDetail.noticeImgDTOList.filter(
        img => updateNoticeData.deleteImgNumArr.includes(img.imgNum)
      );
    }

    return noticeDetail.noticeImgDTOList.filter(img => img.imgNum !== 0);
  }

  // 문의 수정
  const updateQst = () => {
    if(!updateNoticeData.noticeTitle.trim()){
      alert('제목을 입력해주세요.');
      return;
    };

    if(!updateNoticeData.noticeContent.trim()){
      alert('내용을 입력해주세요.');
      return;
    };
    axios.put(`/api/notices/${noticeId}`, {...updateNoticeData, imgNumArr})
    .then(res => {
      window.scrollTo(0, 0);
      alert(res.data);
      setReload(reload + 1);
      setIsEditing(false);
    })
    .catch(e => console.log(e));
  };

  // 공지 삭제
  const delNotice = () => {
    if(!confirm('삭제하시겠습니까?')){
      return;
    }
    axios.delete(`/api/notices/${noticeId}`)
    .then(res => {
      alert(res.data);
      nav('/admin/notice')
    })
    .catch(e => console.log(e));
  };

  // 이미지 모달 실행 함수
  const handleModalData = (isOpenModal, url, title) => {
    setIsOpen(isOpenModal);
    setModalImgUrl(url);
    setModalImgTitle(title);
  }

  console.log(updateNoticeData)
  console.log(imgNumArr)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
        {
          isEditing
          ?
          <>
            <input 
              className={styles.input_title}
              type="text" 
              name='noticeTitle'
              value={updateNoticeData.noticeTitle}
              onChange={e => handleUpdateNotice(e)}
            />
            <div className={styles.important}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkboxInput} 
                  value={updateNoticeData.isImportant}
                  checked={updateNoticeData.isImportant === 'Y'}
                  onChange={e => {
                      setUpdateNoticeData({
                        ...updateNoticeData,
                        isImportant: e.target.checked ? 'Y' : 'N'
                      })
                    }
                  }
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.labelText}>중요</span>
              </label>
            </div>
          </>
          :
          noticeDetail.noticeTitle
        }
        </h1>
        <div className={styles.notice_info}>
          <div className={styles.user_info}>
            <p>{`👤 ${noticeDetail.userId}`}</p>
            <p>{`📅 ${dayjs(noticeDetail.noticeDate).format('YYYY-MM-DD HH:mm:ss')}`}</p>
          </div>
          <div className={styles.notice_status}>
            {noticeDetail.isImportant === 'Y' ? '중요' : '일반'}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content_div}>
        {
          isEditing
          ?
          <Textarea 
            size='100%'
            rows='10'
            name='noticeContent'
            value={updateNoticeData.noticeContent}
            onChange={e => handleUpdateNotice(e)}
          />
          :
          noticeDetail.noticeContent
        }
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
                  <div
                    onClick={() => handleModalData(
                      true
                      , `http://localhost:8080/upload_files/notice/${img.attachedImgName}`
                      , img.originImgName
                    )}
                  >
                    <img src={`http://localhost:8080/upload_files/notice/${img.attachedImgName}`} />
                  </div>
                  <p
                    onClick={() => handleModalData(
                      true
                      , `http://localhost:8080/upload_files/notice/${img.attachedImgName}`
                      , img.originImgName
                    )}
                  >{img.originImgName}</p>
                  {
                    isEditing
                    &&
                    <span 
                      className={styles.img_del}
                      onClick={() => {
                        setUpdateNoticeData({
                          ...updateNoticeData
                          , deleteImgNumArr: updateNoticeData.deleteImgNumArr.filter(item => item !== img.imgNum)
                        });
                        setImgNumArr([
                          ...imgNumArr
                          , img.imgNum
                        ]);
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </span>
                  }
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
      <div className={styles.btn_div}>
        <Button 
          color='blue'
          content='목 록'
          onClick={() => nav(!loginData || loginData?.userRole !== 'ADMIN' ? '/customer-service' : '/admin/notice')}
        />
        {
          loginData?.userRole === 'ADMIN'
          &&
          <Button 
            content={isEditing ? '저 장' : '수 정'}
            onClick={() => {
              isEditing
              ?
              updateQst()
              :
              setIsEditing(true);
              window.scrollTo(0, 0);
            }}
          />
        }   
        {
          loginData?.userRole === 'ADMIN'
          &&
          (isEditing
          ?
          <Button 
            color='red'
            content='취 소'
            onClick={() => {
              setIsEditing(false);
              window.scrollTo(0, 0);
            }}
          />
          :
          <Button 
            color='red'
            content='삭 제'
            onClick={() => delNotice()}
          />)
        }
      </div>
      <Modal
        size='800px'
        color='black'
        title={modalImgTitle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <img 
          src={modalImgUrl} 
          style={{
            width: '100%',
            maxHeight: '80vh',  // 이미지 자체도 제한
            objectFit: 'contain'
          }}
        />
      </Modal>
    </div>
  )
}

export default NoticeDetail