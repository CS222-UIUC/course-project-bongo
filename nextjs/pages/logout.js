import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

export default function LogoutPage() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  async function handleLogout() {
    // Call your API to invalidate the token (optional)
    // Then, remove the user from the context
    setUser(null);
    router.push('/login');
  }


  return (
    <div className="container mt-5">
      <h2>Oh, hello there!</h2>
      <p>Click the button below to log out:</p>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
