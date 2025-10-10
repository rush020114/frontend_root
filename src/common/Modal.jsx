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
            <h2 className={styles.title}>
              {title}
            </h2>
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