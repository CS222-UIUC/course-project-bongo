import styles from './Layout.module.css'

export default function Layout(props) {
  return (
    <div>
      <main className={styles.main}>
        {props.children}
      </main>
    </div>
  )
}