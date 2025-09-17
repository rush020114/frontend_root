import React from 'react'
import styles from './AdminMenu.module.css'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
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
            to={'/admin/qna'}
            className={({isActive}) => isActive ? styles.active : null}
          >
            <span>
              <i className="bi bi-question-circle-fill"></i>
            </span>
            <p>Q & A</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default AdminMenu