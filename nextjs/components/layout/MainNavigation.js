import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import styles from './MainNavigation.module.css';
import Link from 'next/link';

export default function MainNavigation() {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <div href="/" className={styles.logo}>
        Liquid Productivity
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Timer</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
