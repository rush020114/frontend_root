import React from 'react'
import styles from './Input.module.css'

const Input = ({
  type='text'
  , size='80px'
  , padding='7px'
  , ...props
}) => {
  return (
    <input
     className={styles.input}
     type={type}
     style={{
      width: size,
      padding: padding
     }}
     {...props}
    ></input>
  )
}

export default Input