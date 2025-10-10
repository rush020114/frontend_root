import React, { useEffect, useState } from 'react'
import styles from './AdminHome.module.css'
import BubbleChart from '../../component/charts/BubbleChart'
import Button from '../../common/Button'
import axios from 'axios';

/*
  방문자 카운터 컴포넌트
  - 페이지로드 시 자동으로 방문 카운트
  - 오늘 방문자 수와 총 방문자 수를 표시
 */
const AdminHome = () => {

  // 상태 관리
    const [todayCount, setTodayCount] = useState(0);      // 오늘 방문자 수
    const [totalCount, setTotalCount] = useState(0);      // 총 방문자 수
    //const [isLoading, setIsLoading] = useState(true);     // 로딩 상태
    const [error, setError] = useState(null);             // 에러 상태
  
    /*
      방문자 카운트 API 호출 함수
      페이지 로드 시 한 번만 실행
     */
    const recordVisit = () => {
        axios.post(`/api/visitor/count`)
        .then(res => console.log(res.data))
        .catch(e => console.log(e));
      
    };
  
    /*
      방문자 통계 조회 API 호출 함수
      에러 발생 시 또는 통계만 확인할 때 사용
     */
    const fetchVisitorStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/visitor/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setTodayCount(data.todayCount || 0);
        setTotalCount(data.totalCount || 0);
        
      } catch (err) {
        console.error('통계 조회 실패:', err);
      }
    };
  
    /*
      useEffect: 컴포넌트가 마운트될 때 한 번만 실행
      페이지가 로드되면 자동으로 방문 카운트
     */
    useEffect(() => {
      recordVisit();
      
      // 컴포넌트 언마운트 시 정리 작업 (필요시)
      return () => {
        // cleanup 작업 (현재는 없음)
      };
    }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행
  
    /*
      숫자 포맷팅 함수
      1000 단위로 콤마 추가 (예: 1234 -> 1,234)
     */
    const formatNumber = (num) => {
      return num.toLocaleString('ko-KR');
    };
  
  return (

    <div className={styles.container}>
      <div className={styles.first_row}>
        <div className={styles.box}>
          <span>Weekly New Customers</span>
          <div className={styles.data}>
            <i class="bi bi-person-fill-add"></i>
            <p>158</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Total Customers</span>
          <div className={styles.data}>
            <i class="bi bi-people-fill"></i>
            <p>350</p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Today Visitors </span>
          <div className={styles.data}>
            <i class="bi bi-person-circle"></i>
            <p>
              {formatNumber(todayCount)}
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <span>Total Visitors</span>
          <div className={styles.data}>
            <i class="bi bi-currency-exchange"></i>
            <p>
              {formatNumber(totalCount)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.third_row}>
        <div className={styles.title}>
          <span>업체별 Root스마트팜 시스템 정상구동 모니터링</span>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>업체명</td>
             
                <td>대기온도(도)</td>
                <td>대기습도(%)</td>
                <td>토양습도(%)</td>
                <td>조도(lux)</td>
                <td>구동현황</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>울산플랜트</td>
               
                <td>NULL</td>
                <td>25.3%</td>
                <td>NULL</td>
                <td>1000</td>
                <td> <Button content='오류' color="red" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>행복한농장</td>
               
                <td>25.3도</td>
                <td>28.5%</td>
                <td>51.2%</td>
                <td>2500</td>
                <td> <Button content='정상' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>하늘정원</td>
              
                <td>55.3도</td>
                <td>25%</td>
                <td>41.2%</td>
                <td>5500</td>
                <td><Button content='정상' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>경주인삼농장</td>
                
                <td>55.3도</td>
                <td>28.5%</td>
                <td>41.2%</td>
                <td>5500</td>
                <td><Button content='정상' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>그린Plant</td>
                
                <td>55.3도</td>
                <td>26%</td>
                <td>41.2%</td>
                <td>6500</td>
                <td><Button content='정상' color="green" padding='5px' fontSize='0.7rem' /></td>
              </tr>
              <tr>
                <td>홍길동농자</td>
              
                <td>55.3도</td>
                <td>28.5%</td>
                <td>41.2%</td>
                <td>5500</td>
                <td><Button content='정상' color="green" padding='5px' fontSize='0.7rem' /></td>
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
          <span>비지니스 문의 (1:1문의)</span>

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