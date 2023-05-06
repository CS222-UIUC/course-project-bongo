import { useRef } from 'react';
import Card from '@components/ui/Card';
import styles from './LoginForm.module.css';

export default function LoginForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onLogin(loginData);
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input type="text" required id="email" ref={emailInputRef} />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input type="password" required id="password" ref={passwordInputRef} />
          </div>

          <div className={styles.actions}>
            <button>Login</button>
          </div>
      </form>
    </Card>
  );
}
