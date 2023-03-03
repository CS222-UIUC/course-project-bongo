import styles from './MainNavigation.module.css'
import Link from 'next/link'

export default function MainNavigation(props) {
  return (
    <header className={styles.header}>
    <div className={styles.logo}>React Meetups</div>
    <nav>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/all-meet-up'>All Meetups</Link>
        </li>
        <li>
          <Link href='/new-meetup'>Add New Meetup</Link>
        </li>
        <li>
          <Link href='/favorites'>My Favorites</Link>
        </li>
        <li>
          <Link href='/CS-222'>CS 222</Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}