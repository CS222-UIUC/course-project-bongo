import { useRef } from 'react';
import Card from '@components/ui/Card';
import styles from './LoginForm.module.css';
import LoginButton from '@components/LoginLogoutButton';


export default function LoginForm(props) {
  // created reference object of react // use for read only 
  // usually for one time purpose like submitting a form
  const accountInputRef = useRef();
  const passwordInputRef = useRef();

  // react will auto pass through a event
  function submitHandler(event) {
    event.preventDefault(); // vanilla js, supported by react

    const enteredAccount = accountInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    const loginData = {
      account: enteredAccount,
      password: enteredPassword
    }

    props.onAddMeetup(loginData);
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>

        <div className={styles.control}>
          <label htmlFor='account'>
            Account
          </label>
          <input type='text' required id='account' ref={accountInputRef}/>
        </div>

        <div className={styles.control}>
          <label htmlFor='password'>
            Password
          </label>
          <textarea type='text' required id='password' ref={passwordInputRef}/>
        </div>

        <div className={styles.actions}>
          <LoginButton form>Login</LoginButton>
        </div>

      </form>
    </Card>
  )
}