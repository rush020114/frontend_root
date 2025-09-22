import React from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import Select from '../../common/Select'
import styles from './Join.module.css'

const Join = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p>기본정보</p>
        <div>
          <p>이름</p>
          <Input
            size='100%'
          />
        </div>

        <div>
          <p>아이디</p>
          <Input
            size='100%'
          />
          <Button
            content='중복 확인'
            size='100%'
          />
        </div>

        <div>
          <p>비밀번호</p>
          <Input
            size='100%'
          />
        </div>

        <div>
          <p>비밀번호 확인</p>
          <Input 
            size='100%'/>
        </div>

        <div>
          <p>연락처</p>
          <div>
            <Select
              size='100%'>
              <option value=""></option>
            </Select>
            <span>-</span>
            <Input 
              size='100%'/>
            <span>-</span>
            <Input 
              size='100%'/>
          </div>
        </div>

        <div>
          <p>이메일</p>
          <Input 
            size='100%'/>
          <span>@</span>
          <Select 
            size='100%'>
            <option value=""></option>
          </Select>
        </div>
      </div>
      <div>
        <Button />
        <Button />
      </div>
    </div>
  )
}

export default Join