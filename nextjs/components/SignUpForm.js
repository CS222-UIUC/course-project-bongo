import { useRef } from 'react';
import Card from '@components/ui/Card';
import styles from './SignUpForm.module.css';

export default function SignupForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const signupData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onSignup(signupData);
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailInputRef} />
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input type="password" required id="password" ref={passwordInputRef} />
        </div>

        <div className={styles.actions}>
          <button>Sign up</button>
        </div>
      </form>
    </Card>
  );
}
