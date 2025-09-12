import React from 'react'
import styles from './Button.module.css'

const Button = ({
  size='80px'
  , content='버튼'
  , color='green'
  , padding='7px'
  , fontSize='1rem'
  , onClick
  ,...props
}) => {
  return (
    <button
     type='button'
     className={`${styles.btn} ${styles[color]} ${props.disabled && styles.disabled}`}
     style={{
      width: size
      , padding: padding
      , fontSize: fontSize
     }}
     onClick={onClick}
    >
      {content}
    </button>
  )
}

export default Button