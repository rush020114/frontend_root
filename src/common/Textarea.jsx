import React from 'react'
import styles from './Textarea.module.css'

const Textarea = ({
  rows='5'
  , size= '80px'
  , ...props
}) => {
  return (
    <textarea
      className={styles.textarea}
      style={{width: size}}
      rows={rows}
      {...props}
    >

    </textarea>
  )
}

export default Textarea