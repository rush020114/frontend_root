import React from 'react'
import styles from './UserQnADetail.module.css'
import Button from '../../common/Button'

const UserQnADetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          제목 제목 제목
        </h1>
        <div className={styles.qst_info}>
          <div className={styles.user_info}>
            <p>👤 이름</p>
            <p>📅 날짜 시간</p>
          </div>
          <div className={styles.qst_status}>
            답변 상태
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content_div}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, omnis eveniet optio exercitationem tempore totam ex reprehenderit perferendis necessitatibus ab voluptates id, fugiat nobis, fuga ipsum excepturi nisi deleniti eos. Necessitatibus nam quidem nemo nesciunt, doloremque dolores. Velit illo nesciunt ab modi similique distinctio dolore culpa labore laboriosam consequatur, esse voluptatum cumque quidem quo consequuntur ratione incidunt delectus, ex non blanditiis repellendus in tenetur dolores? Consectetur dolore commodi ipsam nostrum suscipit repudiandae, aperiam explicabo, ratione voluptatum modi, quisquam voluptas repellat molestias? Debitis magni dignissimos voluptate optio quasi obcaecati pariatur dolores minima, repellendus illo a officiis at? Placeat vitae asperiores porro?
        </div>
        <div className={styles.img_div}>
          <h3>📎 첨부 이미지(개수)</h3>
          <div className={styles.img}>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
        </div>
      </div>
      <div className={styles.answer_div}>
        <h3>💬 관리자 답변</h3>
        <div className={styles.ans_content}>
          <span>⏳</span>
          관리자 답변이 등록되지 않았습니다. <br />
          빠른 시일 내에 답변 드리겠습니다.
        </div>
      </div>
      <div className={styles.btn_div}>
        <Button 
          color='blue'
          content='목 록'
        />
        <Button 
          content='수 정'
        />
        <Button 
          color='red'
          content='삭 제'
        />
      </div>
    </div>
  )
}

export default UserQnADetail