import React from 'react'
import styles from './Modal.module.css'

const Modal = ({
  title = '제목'
  , size = '500px'
  , isOpen = false
  , onClose
  , children
}) => {

  if(!isOpen) return null;

  return (
    <>
      <div 
        className={styles.overlay}
        onClick={onClose}
      />
      
      <div className={styles.container}>
        <div 
          className={styles.content}
          style={{ width : size }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <p className={styles.title}>
              {title}
            </p>
            <button 
              type="button"
              className={styles.close}
              onClick={onClose}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
          
          <div className={styles.body}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal