import styles from './index.module.scss'
import { history } from 'umi';
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerView}>
        <div className={styles.logo} onClick={() => {
          history.push('/')
        }}>
          <img src="/images/logoo.png" alt="" />
        </div>
      </div>
    </div>
  )
}
