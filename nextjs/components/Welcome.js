import GuestWelcome from './GuestWelcome'
import UserWelcome from './UserWelcome'

export default function Welcome(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserWelcome name={props.name}/>
  } else {
    return <GuestWelcome />
  }
}