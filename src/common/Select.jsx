import React from 'react'
import styles from './Select.module.css'

const Select = ({
  size='80px'
  , children
  , ...props
}) => {
  return (
    <select
     className={styles.select}
     style={{width: size}}
     {...props}
    >
      {children}
    </select>
  )
}

export default Select