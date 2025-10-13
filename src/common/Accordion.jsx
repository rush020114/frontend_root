import React from 'react'
import styles from './Accordion.module.css'

const Accordion = ({ isOpen, onToggle, title, children }) => {
  return (
    <div className={styles.accordion}>
      <div
        className = {styles.header} 
        onClick = {onToggle}
      >
        <span>{title}</span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`} />
      </div>
      { isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion