import React from 'react'
import styles from './AdminHome.module.css'
import BubbleChart from '../../component/charts/BubbleChart'
import Button from '../../common/Button'


const AdminHome = () => {
  return (

    <div className={styles.container}>
      <div className={styles.first_row}>
        <div className={styles.box}>
          <span>New Customers</span>
          <div className={styles.data}>
            <i class="bi bi-person-fill-add"></i>
            <p>158</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Total Customers</span>
          <div className={styles.data}>
            <i class="bi bi-people-fill"></i>
            <p>3650</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Today Visitors</span>
          <div className={styles.data}>
            <i class="bi bi-person-circle"></i>
            <p>1882</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Monthly Sales Rate</span>
          <div className={styles.data}>
            <i class="bi bi-currency-exchange"></i>
            <p>65%</p>
          </div>
        </div>
      </div>
      <div className={styles.second_row}>
          <p>지역별 식물 생육환경 모니터링 (온도기준) </p>
          <BubbleChart
            title="."
            datasets={[
              {
                label: '울산광역시',
                data: [
                  { x: 10, y: 20, r: 22 },
                  { x: 15, y: 35, r: 12 },
                  { x: 25, y: 30, r: 15 },
                ],
                backgroundColor: 'rgba(170, 85, 5, 0.6)',
                borderColor: 'rgba(170, 85, 5, 0.8)',
              },
              {
                label: '경상도',
                data: [
                  { x: 22, y: 40, r: 20 },
                  { x: 35, y: 33, r: 15 },
                  { x: 15, y: 40, r: 16 },
                ],
                backgroundColor: 'rgba(5, 170, 27, 0.6)',
                borderColor: 'rgba(5, 170, 27, 0.8)',
              },
              {
                label: '충청도',
                data: [
                  { x: 10, y: 30, r: 10 },
                  { x: 25, y: 23, r: 20 },
                  { x: 17, y: 33, r: 16 },
                ],
                backgroundColor: 'rgba(170, 7, 156, 0.6)',
                borderColor: 'rgba(170, 7, 156, 0.8)',
              },
              {
                label: '제주도',
                data: [
                  { x: 14, y: 25, r: 10 },
                  { x: 27, y: 10, r: 20 },
                  { x: 17, y: 23, r: 16 },
                ],
                backgroundColor: 'rgba(7, 170, 192, 0.6)',
                borderColor: 'rgba(7, 170, 192, 0.8)',
              },
              {
                label: '경기도',
                data: [
                  { x: 13, y: 25, r: 20 },
                  { x: 23, y: 10, r: 20 },
                  { x: 19, y: 20, r: 16 },
                ],
                backgroundColor: 'rgba(189, 221, 8, 0.6)',
                borderColor: 'rgba(189, 221, 8, 0.8)',
              },
              {
                label: '경기도',
                data: [
                  { x: 14, y: 15, r: 15 },
                  { x: 20, y: 15, r: 20 },
                  { x: 32, y: 20, r: 16 },
                ],
                backgroundColor: 'rgba(238, 3, 74, 0.6)',
                borderColor: 'rgba(238, 3, 74, 0.8)',
              },
              {
                label: '전라도',
                data: [
                  { x: 12, y: 15, r: 15 },
                  { x: 17, y: 18, r: 20 },
                  { x: 34, y: 20, r: 16 },
                ],
                backgroundColor: 'rgba(23, 21, 150, 0.6)',
                borderColor: 'rgba(23, 21, 150, 0.8)',
              },
            ]}
          /> 

      </div>

      <div className={styles.third_row}>
        <div className={styles.title}>
          <span>업체별 생육환경 상세 모니터링 (온도/습도/토양습도/조도)</span>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>업체명</td>
             
                <td>대기온도(도)</td>
                <td>대기습도(%)</td>
                <td>토양습도(%)</td>
                <td>조도(lux)</td>
                <td>최적화 현황</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>울산플랜트</td>
               
                <td>25도</td>
                <td>25.3%</td>
                <td>45%</td>
                <td>1000</td>
                <td> <Button content='최적화' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>행복한농장</td>
               
                <td>25.3도</td>
                <td>28.5%</td>
                <td>51.2%</td>
                <td>2500</td>
                <td> <Button content='최적화' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>하늘정원</td>
              
                <td>55.3도</td>
                <td>25%</td>
                <td>41.2%</td>
                <td>5500</td>
                <td><Button content='최적화' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>경주인삼농장</td>
                
                <td>55.3도</td>
                <td>28.5%</td>
                <td>41.2%</td>
                <td>5500</td>
                <td><Button content='경 보' color="red" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>그린Plant</td>
                
                <td>55.3도</td>
                <td>26%</td>
                <td>41.2%</td>
                <td>6500</td>
                <td><Button content='주 의' color="orange" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>홍길동농자</td>
              
                <td>55.3도</td>
                <td>28.5%</td>
                <td>41.2%</td>
                <td>5500</td>
                <td><Button content='최적화' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.title}>
          <span>신규업체 서비스가입 신청현황</span>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>업체명</td>
                <td>신청일</td>
                <td>처리현황</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>하나버섯농장</td>
                <td>2025-09-25</td>
                <td><Button content='대기' color="brown" padding='5px' fontSize='0.7rem' size='40px' /></td>
              </tr>
              <tr>
                <td>Fine농장</td>
                <td>2025-09-20</td>
                <td><Button content='대기' color="brown" padding='5px' fontSize='0.7rem' size='40px' /></td>
              </tr>
              <tr>
                <td>삼산하우스</td>
                <td>2025-08-15</td>
                <td><Button content='대기' color="brown" padding='5px' fontSize='0.7rem' size='40px' /></td>
              </tr>
              <tr>
                <td>ABC브로커리</td>
                <td>2025-08-13</td>
                <td><Button content='대기' color="brown" padding='5px' fontSize='0.7rem' size='40px' /></td>
              </tr>
              <tr>
                <td>상황버섯농장</td>
                <td>2025-08-10</td>
                <td><Button content='완료' color="green" padding='5px' fontSize='0.7rem' size='40px' /></td>
              </tr>
              <tr>
                <td>왕방울토마토</td>
                <td>2025-08-05</td>
                <td><Button content='완료' color="green" padding='5px' fontSize='0.7rem' size='40px' /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.qna}>
          <span>Q&A 게시판</span>

          <div className={styles.request}>
            <i class="bi bi-file-earmark-text"></i>
            <div className={styles.memo}>
              <p>하늘농장주</p>
              <p>성장촉진 자동제어 시스템 견적문의 합니다.</p>
              <p>2025-09-17 15:25</p>
            </div>
          </div>
          <div className={styles.request}>
            <i class="bi bi-file-earmark-text"></i>
            <div className={styles.memo}>
              <p>파인하우스</p>
              <p>시스템개발 문의 및 견적문의 합니다.</p>
              <p>2025-09-16 10:28</p>
            </div>
          </div>
          <div className={styles.request}>
            <i class="bi bi-file-earmark-text"></i>
            <div className={styles.memo}>
              <p>경주행복플랜트</p>
              <p>제어시스템 개발 견적문의합니다.</p>
              <p>2025-09-15 10:28</p>
            </div>
          </div>
          <div className={styles.request}>
            <i class="bi bi-file-earmark-text"></i>
            <div className={styles.memo}>
              <p>왕방울토마토</p>
              <p>비즈니스 견적문의, 신속회신 부탁합니다.</p>
              <p>2025-09-14 10:28</p>
            </div>
          </div>
          
        </div>

      </div>

    </div>

  )
}

export default AdminHome