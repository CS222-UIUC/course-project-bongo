import Image from 'next/image';
import styles from './MeetupItem.module.css';
import Card from '@components/ui/Card'

export default function MeetupItem(props) {
  return (
    <Card>
      <li className={styles.item}>
        <div className={styles.image}>
          {/* <Image src={props.image} alt={props.title} layout='fill'/> */}
          <img src={props.image} alt={props.title} layout='auto'/>
        </div>
        <div className={styles.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={styles.actions}>
          <button>To Favorites</button>
        </div>
      </li>
    </Card>
  )
}