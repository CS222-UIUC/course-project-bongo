import { useRef } from 'react';
import Card from '@components/ui/Card';
import styles from './NewMeetupForm.module.css';


export default function NewMeetupForm(props) {
  // created reference object of react // use for read only 
  // usually for one time purpose like submitting a form
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  // react will auto pass through a event
  function submitHandler(event) {
    event.preventDefault(); // vanilla js, supported by react

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    
    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription
    }

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>

        <div className={styles.control}>
          <label htmlFor='title'>
            Meetup Title
          </label>
          <input type='text' required id='title' ref={titleInputRef}/>
        </div>

        <div className={styles.control}>
          <label htmlFor='image'>
            Display Image
          </label>
          <input type='url' placeholder="https://www.google.com" required id='image' ref={imageInputRef}/>
        </div>

        <div className={styles.control}>
          <label htmlFor='address'>
            Address
          </label>
          <input type='text' required id='address' ref={addressInputRef}/>
        </div>

        <div className={styles.control}>
          <label htmlFor='description'>
            Description
          </label>
          <textarea type='text' id='description' ref={descriptionInputRef}/>
        </div>

        <div className={styles.actions}>
          <button>Add Meetup</button>
        </div>

      </form>
    </Card>
  )
}