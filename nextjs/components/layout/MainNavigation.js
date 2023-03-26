import styles from './MainNavigation.module.css'
import Link from 'next/link'

export default function MainNavigation(props) {
  return (
    <header className={styles.header}>
    <div href='/' className={styles.logo}>Liquid Productivity</div>
    <nav>
      <ul>
        <li>
          <Link href='/'>Timer</Link>
        </li>
        <li>
          <Link href='/all-meet-up'>Visualization</Link>
        </li>
        <li>
          <Link href='/new-meetup'>Settings</Link>
        </li>
        <li>
          <Link href='/CS-222'>CS 222</Link>
        </li>
        <li>
          <Link href='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}