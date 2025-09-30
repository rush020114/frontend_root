import React from 'react'
import styles from './AdminMenu.module.css'
import { NavLink } from 'react-router-dom'

const AdminMenu = ({notiCnt, onResetCnt}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.admin_menu}>
        <li>
          <NavLink
            to={'/admin/home'}
            className={({isActive}) => isActive ? styles.active : null}
          >
            <span>
              <i className="bi bi-house-fill"></i>
            </span>
            <p>관리자 홈</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/admin/manage-user'}
            className={({isActive}) => isActive ? styles.active : null}
          >
            <span>
              <i className="bi bi-person-fill"></i>
            </span>
            <p>회원관리</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/admin/manage-service'}
            className={({isActive}) => isActive ? styles.active : null}
          >
            <span>
              <i className="bi bi-clipboard-fill"></i>
            </span>
            <p>신청자</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/admin/qna'}
            end
            className={({isActive}) => isActive ? styles.active : null}
            style={{position: 'relative'}}
            onClick={() => onResetCnt(true)}
          >
            <span>
              <i className="bi bi-question-circle-fill"></i>
            </span>
            <p>
              Q & A
              {
                notiCnt > 0 && (
                  <span 
                    className='badge'
                    style={{top: '0px', right: '0px'}}
                  >
                    {notiCnt > 99 ? '99+' : notiCnt}
                  </span>
                )
              }
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default AdminMenu