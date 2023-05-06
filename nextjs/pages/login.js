import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@components/LoginForm';
import LoginControl from '@components/LoginLogoutButton';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import styles from './login.module.css';

export default function LoginPage() {
  const { setUser } = useContext(UserContext);

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function addLoginHandler(loginData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.status === 200) {
        const userData = await response.json();
        setUser({ userId: userData.userId });
        router.push('/');
      } else {
        alert('Wrong credentials, please try again!');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
    }
  }

  async function addSignupHandler(signupData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        body: JSON.stringify(signupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const userData = await response.json();
        alert('User registered successfully! Please log in.');
      } else if (response.status === 409) {
        alert('Email already exists, please try another one!');
      } else {
        alert('Error during registration, please try again!');
      }
    } catch (error) {
      console.error('Error while registering:', error);
    }
  }
  

  
  async function handleLogout() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (response.status === 200) {
        setUser(null);
        router.push('/login');
      } else {
        alert('Error while logging out, please try again!');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
    
  }
  
  

  return (
    <div>
      <h1>Login</h1>
      {isLoggedIn ? (
        <LoginControl onLogout={() => {
          setIsLoggedIn(false)
          handleLogout()
        }
        } />
      ) : (
        <>
          <LoginForm onLogin={addLoginHandler} />

            <p className={styles.centerText}>
              Don't have an account? Register <a href="/signup">here</a>
            </p>

        </>
        
      )}
    </div>
  );
}
