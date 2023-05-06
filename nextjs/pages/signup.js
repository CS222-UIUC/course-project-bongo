import { useContext } from 'react';
import SignUpForm from '@components/SignUpForm';
import UserContext from '../contexts/UserContext';
import { useRouter } from 'next/router';

export default function SignUpPage() {
  const { setUser } = useContext(UserContext);
  const router = useRouter()
  async function addSignUpHandler(signUpData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const userData = await response.json();
        setUser({ userId: userData.userId });
        router.push('/');
      } else {
        alert('Error signing up, please try again!');
      }
    } catch (error) {
      console.error('Error while signing up:', error);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm onSignUp={addSignUpHandler} />
    </div>
  );
}
