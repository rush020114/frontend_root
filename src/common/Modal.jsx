import React from 'react'
import styles from './Modal.module.css'

const Modal = ({
  title = '제목'
  , size = '500px'
  , isOpen = false
  , onClose
  , children
}) => {

  //모달이 열려있지 않으면 아무것도 렌더링하지 않음 
  if(!isOpen) return null;

  return (
    <>
      {/* 모달 배경 (어두운 반투명 영역, 클릭 시 모달 닫힘) */}
      <div 
        className={styles.modal_back}
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 */}
      <div className={styles.modal}>
        {/* 모달 다이얼로그 (모달 위치 및 크기 조정) */}
        <div className={styles.modal_dialog}>
          {/* 모달 컨텐츠 박스 (실제 내용이 들어가는 흰색 박스) */}
          <div 
            className={styles.modal_content}
            style={{ width: size }}
            onClick={(e) => e.stopPropagation()}  //모달 내부 클릭 시 배경의 onClose가 실행되지 않도록 이벤트 전파 중단
          >
            {/* 모달 헤더 (제목 영역) */}
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>{title}</h2>
            </div>
            
            {/* 모달 본문 (실제 내용이 표시되는 영역) */}
            <div className={styles.modal_conts}>
              {children}
            </div>
            
            {/* 닫기 버튼 */}
            <button 
              type="button"
              className={styles.btn_close}
              onClick={onClose}
            >
              <span><i className="bi bi-x"></i></span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal