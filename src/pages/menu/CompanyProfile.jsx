import React, { useRef, useState, useEffect } from "react";
import styles from "./CompanyProfile.module.css";

// 값 제한 함수 (스크롤 비율 등 0~1 사이 값으로 보정)
const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

const CompanyProfile = () => {
  // 참조용 ref (전체, 섹션2, 섹션3, 섹션5)
  const containerRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section5Ref = useRef(null);

  // 각 섹션의 스크롤 진행 비율 (0~1)
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [progress5, setProgress5] = useState(0);

  // 스크롤 시 섹션별 위치를 계산해서 애니메이션 진행도 업데이트
  useEffect(() => {
    const handleScroll = () => {
      // === 섹션2 ===
      if (section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const ratio = 1 - clamp01(rect.top / vh);
        setProgress2(ratio);
      }
      // === 섹션3 ===
      if (section3Ref.current) {
        const rect = section3Ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const ratio = 1 - clamp01(rect.top / vh);
        setProgress3(ratio);
      }
      // === 섹션5 ===
      if (section5Ref.current) {
        const rect = section5Ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const ratio = 1 - clamp01(rect.top / vh);
        setProgress5(ratio);
      }
    };

    // 초기 실행 및 이벤트 등록
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 언마운트 시 이벤트 해제
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* --------------------------------------------------------------- */}
      {/* 섹션 1: 브랜드 인트로 영역 */}
      <div className={styles.section}>
        {/* 왼쪽 */}
        <div className={styles.imageBox}>
          {/* 라즈베리파이 이미지 */}
          <img src="/pie.png" alt="pie" className={styles.pie} />
        </div>
        {/* 오른쪽 */}
        <div className={styles.textBox}>
          {/* 회사명 : root */}
          <h1 className={styles.companyName}>root</h1>
          {/* 키워드 5개 (도움, 성장, 기술, 발전, 공헌) */}
          <div className={styles.words}>
            <span className={styles.word}>도 움</span>
            <span className={styles.word}>성 장</span>
            <span className={styles.word}>기 술</span>
            <span className={styles.word}>발 전</span>
            <span className={styles.word}>공 헌</span>
          </div>
          {/* 하단 */}
          <h1 className={styles.abcd}>
            {/* 애니메이션 텍스트 */}
            <div className={styles.track}>
              <span>
                새싹의 시작과 협력, IoT 기술, 그리고 뿌리내린 안정적 기반으로
                이어지는 스마트팜 혁신과 성장&nbsp;
              </span>
              <span>
                새싹의 시작과 협력, IoT 기술, 그리고 뿌리내린 안정적 기반으로
                이어지는 스마트팜 혁신과 성장&nbsp;
              </span>
            </div>
          </h1>
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
      {/* 섹션 2 : 색상 박스 */}
      <div className={styles.sectionDark} ref={section2Ref}>
        <div className={styles.fourBox}>
          {/* 1. black */}
          <div
            className={`${styles.box} ${styles.left}`}
            style={{
              opacity: clamp01(progress2 / 1),
              transform: `translateX(${
                (1 - clamp01(progress2 / 1)) * 100
              }%)`,
            }}
          >
            <p>black</p>
            <p>rgb(0, 0, 0)</p>
          </div>
          {/* 2. grey */}
          <div
            className={`${styles.box} ${styles.middle}`}
            style={{
              opacity: clamp01((progress2 - 0.2) / 0.8),
              transform: `translateX(${
                (1 - clamp01((progress2 - 0.2) / 0.8)) * 100
              }%)`,
            }}
          >
            <p>grey</p>
            <p>rgb(80, 86, 64)</p>
          </div>
          {/* 3. green */}
          <div
            className={`${styles.box} ${styles.extra}`}
            style={{
              opacity: clamp01((progress2 - 0.4) / 0.6),
              transform: `translateX(${
                (1 - clamp01((progress2 - 0.4) / 0.6)) * 100
              }%)`,
            }}
          >
            <p>green</p>
            <p>rgb(114, 168, 79)</p>
          </div>
          {/* 4. brown */}
          <div
            className={`${styles.box} ${styles.right}`}
            style={{
              opacity: clamp01((progress2 - 0.6) / 0.4),
              transform: `translateX(${
                (1 - clamp01((progress2 - 0.6) / 0.4)) * 100
              }%)`,
            }}
          >
            <p>brown</p>
            <p>rgb(179, 112, 62)</p>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
      {/* 섹션 3 : 이미지 박스 + 소개 + 라즈베리파이 GIF */}
      <div className={styles.sectionGif} ref={section3Ref}>
        {/* 상단 : 이미지 박스 + 간단 소개 */}
        <div
          className={styles.whiteBox}
          style={{
            width: `${60 + progress3 * 20}%`,
            height: `600px`,
            borderWidth: `${Math.min(progress3 * 16, 16)}px`,
            marginTop: "100px",
          }}
        >
          {/* 이미지 */}
          <div className={styles.bgImage}></div>
          {/* 간단 소개 */}
          <div className={styles.focusText}>
            <h2 className={styles.typographyTitle}>모두를 위한 뿌리, root</h2>
            <p className={styles.typographyParagraph}>
              root는 농업을 더 스마트하게 만들고,<br />
              환경과 사람을 위한 새로운 가능성을 열어갑니다.
            </p>
          </div>
        </div>
        {/* 라즈베리파이 타이틀 */}
        <div className={styles.titleBox}>
          <h2 className={styles.raspberryTitle}>
            <strong>r a s p b e r r y &nbsp;P I</strong>
          </h2>
          <h1 className={styles.raspberrySubtitle}>작지만 강력한 두뇌</h1>
        </div>
        {/* 라즈베리파이 GIF */}
        <div className={styles.gifContainer}>
          <img
            src="/pie.gif"
            alt="raspberry 360 gif"
            className={styles.gifImg}
            />
        </div>
        {/* 소개 문단 */}
        <div className={styles.descBoxFirst}>
          <p>root의 중심에는 <strong>Raspberry <span style={{letterSpacing : 3}}>PI</span></strong> 가 탑재 되어있습니다.</p>
          <p><strong>손바닥만 한</strong> 크기 속에 <strong>4 코어 </strong> CPU, 고성능 <strong>GPU</strong>, 저전력 시스템이 </p>
          <p>집약되어 농장의 데이터를 <strong>순간 단위</strong> 로 처리합니다.</p>
        </div>
        {/* modules.png 이미지 */}
        <div className={styles.moduleImageBox}>
          <img src="/modules.png" alt="modules" className={styles.moduleImg} />
        </div>
        <div className={styles.descBoxSecond}>
          <p>센서에서 수집된 온도·습도·조도·토양 수분 값은 </p>
          <p>이 작은 컴퓨터를 거쳐 maria DB로 전송되며 기능을 실행합니다.</p>
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
      {/* 섹션 4 : 효율성 (흰색 배경) */}
      <div className={styles.sectionWhite}>
        <div className={styles.titleBoxFirst}>
          <h2 className={styles.efficiencySubtitleFirst}>
            <strong>M a r i a &nbsp;D B&nbsp;&nbsp;-&nbsp;&nbsp;S p r i n g&nbsp; B o o t</strong>
          </h2>
          <h1 className={styles.mainTitleHours}>24 hours</h1>
          <h1 className={styles.mainTitleSPower}>연결의 힘.</h1>
        </div>
        <div className={styles.introFirst}>
          <p><strong>모듈</strong>을 내장한 보드는 각 센서 모듈 <strong>데이터베이스 서버</strong>와</p>
          <p> 즉각적으로 통신합니다. 데이터는 <strong>MariaDB</strong>로 <strong>24h 실시간</strong> 동기화</p>
          <p> 되고, <strong>Spring Boot</strong>를 거쳐 <strong>React</strong> 대시보드로 <strong>시각화 </strong>됩니다.</p>
        </div>
        {/* -------------------------------------------------------- */}
          {/* 클라우드 동기화 로더 애니메이션 */}
          <div className={styles.loader}>
            <svg className={styles.cloudSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <defs>
                <filter id="cloudRoundness">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                  <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"></feColorMatrix>
                </filter>
                <mask id="cloudShapes">
                  <g fill="white">
                    <polygon points="50 37.5 80 75 20 75 50 37.5"></polygon>
                    <circle cx="20" cy="60" r="15"></circle>
                    <circle cx="80" cy="60" r="15"></circle>
                    <g className={styles.movingCircles}>
                      <circle cx="20" cy="60" r="15"></circle>
                      <circle cx="20" cy="60" r="15"></circle>
                      <circle cx="20" cy="60" r="15"></circle>
                    </g>
                  </g>
                </mask>
                <mask id="cloudClipping">
                  <g className={styles.cloudLines} filter="url(#cloudRoundness)">
                    <g mask="url(#cloudShapes)" stroke="white">
                      <line x1="-50" y1="-40" x2="150" y2="-40"></line>
                      <line x1="-50" y1="-31" x2="150" y2="-31"></line>
                      <line x1="-50" y1="-22" x2="150" y2="-22"></line>
                      <line x1="-50" y1="-13" x2="150" y2="-13"></line>
                      <line x1="-50" y1="-4" x2="150" y2="-4"></line>
                      <line x1="-50" y1="5" x2="150" y2="5"></line>
                      <line x1="-50" y1="14" x2="150" y2="14"></line>
                      <line x1="-50" y1="23" x2="150" y2="23"></line>
                      <line x1="-50" y1="32" x2="150" y2="32"></line>
                      <line x1="-50" y1="41" x2="150" y2="41"></line>
                      <line x1="-50" y1="50" x2="150" y2="50"></line>
                      <line x1="-50" y1="59" x2="150" y2="59"></line>
                      <line x1="-50" y1="68" x2="150" y2="68"></line>
                      <line x1="-50" y1="77" x2="150" y2="77"></line>
                      <line x1="-50" y1="86" x2="150" y2="86"></line>
                      <line x1="-50" y1="95" x2="150" y2="95"></line>
                      <line x1="-50" y1="104" x2="150" y2="104"></line>
                      <line x1="-50" y1="113" x2="150" y2="113"></line>
                      <line x1="-50" y1="122" x2="150" y2="122"></line>
                      <line x1="-50" y1="131" x2="150" y2="131"></line>
                      <line x1="-50" y1="140" x2="150" y2="140"></line>
                    </g>
                  </g>
                </mask>
              </defs>
              <rect className={styles.cloudRect} x="0" y="0" width="100" height="100" mask="url(#cloudClipping)"></rect>
              <g className={styles.cloudArrows}>
                <path d="M33.52,68.12 C35.02,62.8 39.03,58.52 44.24,56.69 C49.26,54.93 54.68,55.61 59.04,58.4 C59.04,58.4 56.24,60.53 56.24,60.53 C55.45,61.13 55.68,62.37 56.63,62.64 C56.63,62.64 67.21,65.66 67.21,65.66 C67.98,65.88 68.75,65.3 68.74,64.5 C68.74,64.5 68.68,53.5 68.68,53.5 C68.67,52.51 67.54,51.95 66.75,52.55 C66.75,52.55 64.04,54.61 64.04,54.61 C57.88,49.79 49.73,48.4 42.25,51.03 C35.2,53.51 29.78,59.29 27.74,66.49 C27.29,68.08 28.22,69.74 29.81,70.19 C30.09,70.27 30.36,70.31 30.63,70.31 C31.94,70.31 33.14,69.44 33.52,68.12Z"></path>
                <path d="M69.95,74.85 C68.35,74.4 66.7,75.32 66.25,76.92 C64.74,82.24 60.73,86.51 55.52,88.35 C50.51,90.11 45.09,89.43 40.73,86.63 C40.73,86.63 43.53,84.51 43.53,84.51 C44.31,83.91 44.08,82.67 43.13,82.4 C43.13,82.4 32.55,79.38 32.55,79.38 C31.78,79.16 31.02,79.74 31.02,80.54 C31.02,80.54 31.09,91.54 31.09,91.54 C31.09,92.53 32.22,93.09 33.01,92.49 C33.01,92.49 35.72,90.43 35.72,90.43 C39.81,93.63 44.77,95.32 49.84,95.32 C52.41,95.32 55,94.89 57.51,94.01 C64.56,91.53 69.99,85.75 72.02,78.55 C72.47,76.95 71.54,75.3 69.95,74.85Z"></path>
              </g>
            </svg>
          </div>
      </div>
      {/* -------------------------------------------------------- */}
      {/* 섹션 5 : 스마트한 농업 (흰색 배경) */}
      <div className={styles.sectionWhite} ref={section5Ref}>
        {/* -------------------------------------------------------- */}
        {/* staff.png (직원 이미지) */}
        <div 
          className={styles.staffImageWrapper}
          style={{
            width: `${300 + progress5 * 250}px`,
            height: `${100 + progress5 * 700}px`,
          }}
        >
          <img src="/staff.png" alt="staff" className={styles.staffImg} />
        </div>
      {/* -------------------------------------------------------- */}
        <div className={styles.titleBoxSecond}>
          <h2 className={styles.efficiencySubtitleSecond}>
            {/* <strong>S M A R T &nbsp;F A R M I N G</strong> */}
          </h2>
          <img src="/smart.png" alt="smart" className={styles.smartImg} />
          <h1 className={styles.farmTitle}>농장의 등장</h1>
        </div>
        <div className={styles.introSecond}>
          <p><strong> | Root Lab Engineering Specialist | @ David</strong></p>
          <br />
          <p><strong>root</strong> 의 라즈베리파이는 단순한 수집 장비가 아닙니다.</p>
          <p>입력된 코드와 모듈을 통해 누구든 손쉽게</p>
          <p><strong>웹사이트</strong>에서 <strong>토양 수분 측정</strong>, <strong>온습도 조도 측정</strong>,</p>
          <p><strong>이상움직임 감지</strong> 등의 작물의 상태를 관찰하고</p>
          <p><strong>App</strong>에서 원격으로 <strong>자동 물 펌프 기능</strong> 등을 제어할 수 있습니다.</p>
          <p>작지만 스마트한 두뇌가 <strong>'생각하는 농장'</strong>을 만드는 것이죠.</p>
        </div>
      </div>
      {/* -------------------------------------------------------- */}
      {/* 서비스 소개 (카피문구) */}
      <div className={styles.transitionText}>
        <h2 className={styles.transitionSubtitle}>어떤 곳에서든, 한번에 가능 하니까</h2>
        <h1 className={styles.transitionTitle}>스마트한 ROOT 경험</h1>
      </div>
      {/* -------------------------------------------------------- */}
      {/* 서비스 소개 (애니메이션) */}
      <div className={styles.sectionWhite}>
        {/* 이미지 슬라이더 */}
        <div 
          className={styles.slider} 
          style={{
            '--width': '1000px', 
            '--height': '700px', 
            '--quantity': 8
          }}
        >
          <div className={styles.list}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div 
                key={num} 
                className={styles.item} 
                style={{'--position': num}}
              >
                <img 
                  src={`/intro${num}.png`} 
                  alt={`service ${num}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------- */}
      {/* 섹션 6 : 지속가능한 미래 (흰색 배경) */}
      <div className={`${styles.sectionWhite} ${styles.lastSection}`}>
        <div className={styles.titleBoxWhite}>
          <h2 className={styles.efficiencySubtitleThird}>
            {/* <strong>S U S T A I N A B L E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F U T U R E</strong> */}
          </h2>
          <img src="/sus.png" alt="sus" className={styles.susImg} />
          <img src="/fu.png" alt="fu" className={styles.fuImg} />
          <h1 className={styles.futureTitleFirst}>지속가능한 미래를</h1>
          <h1 className={styles.futureTitleSecond}>위한 작은 기술</h1>
        </div>
        <div className={styles.introThird}>
          <p>기술이 모두를 이롭게 할 때, 그것은 가장 <strong>강력한 힘</strong>이 됩니다.</p>
          <p>작지만 <strong>효율적</strong>이고, 단순하지만 <strong>지능적</strong>이며, <strong>무한한 확장성</strong>을 지닌 기술.</p>
          <p><strong>root</strong> 의 철학은 단순합니다.</p>
          <p>손쉬운 사용, 모두를 위한 기술 그리고, 안정적인 성장.</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;