import styles from './MeetupList.module.css'
import MeetupItem from './MeetupItem'


export default function MeetupList(props) {
    return (
      <ul className={styles.list}>
        {props.meetups.map(meetup => ( ///???? why is it this
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
            description={meetup.description}
          />

        ))}
      </ul>
    )
}