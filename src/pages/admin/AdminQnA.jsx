import React, { useEffect, useState } from 'react'
import styles from './AdminQnA.module.css'
import Select from '../../common/Select'
import Input from '../../common/Input'
import Button from '../../common/Button'
import axios from 'axios'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const AdminQnA = () => {
  const nav = useNavigate();

  // 문의 목록을 받아올 state 변수
  const [qstList, setQstList] = useState([]);

  // 문의 목록을 세팅할 useEffect
  useEffect(() => {
    axios.get('/api/questions')
    .then(res => setQstList(res.data))
    .catch(e => console.log(e));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>📝 문의 관리</h1>
      </div>
      <div className={styles.qna_info}>
        <div>
          <h1>23</h1>
          <p>전체 관리</p>
        </div>
        <div>
          <h1>2</h1>
          <p>진행중</p>
        </div>
        <div>
          <h1>21</h1>
          <p>답변완료</p>
        </div>
      </div>
      <div className={styles.search_qna}>
        <div>
          <p>문의 상태</p>
          <Select 
            size='100%'
          />
        </div>
        <div>
          <p>제목</p>
          <Input 
            size='100%'
          />
        </div>
        <div>
          <p>작성자</p>
          <Input 
            size='100%'
          />
        </div>
        <div>
          <p>문의 날짜</p>
          <Input 
            type='date'
            size='100%'
            padding='6px'
          />
        </div>
        <div className={styles.search_btn}>
          <Button
            size='100%'
            content='검 색'
            padding='4px'
          />
        </div>
      </div>
      <div className={styles.qna_list}>
        <table className={styles.qna_table}>
          <colgroup>
            <col width='5%' />
            <col width='35%' />
            <col width='10%' />
            <col width='20%' />
            <col width='10%' />
            <col width='10%' />
          </colgroup>
          <thead>
            <tr>
              <td>No</td>
              <td>제목</td>
              <td>작성자</td>
              <td>등록일</td>
              <td>상태</td>
              <td>관리</td>
            </tr>
          </thead>
          <tbody>
          {
            qstList.map((qst, i) => {
              return(
                <tr>
                  <td>{qstList.length - i}</td>
                  <td>{qst.qstTitle}</td>
                  <td>{qst.userId}</td>
                  <td>{dayjs(qst.qstDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>{qst.qstStatus}</td>
                  <td>
                    <div>
                      <Button 
                        content='답 변'
                        onClick={() => nav(`/admin/qna/${qst.qstId}`)}
                      />
                    </div>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminQnA