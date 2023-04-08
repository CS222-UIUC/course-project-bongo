import LoginForm from '@components/meetups/LoginForm'
import LoginButton from '@components/LoginLogoutButton'

export default function LoginPage() {
    function addLoginHandler(loginData) {

    }
    
    return (
      <div>
        <h1>Login</h1>
        {/* <LoginButton button>Login</LoginButton> */}
        {/* can pass function in props as well! */}
        <LoginForm onAddMeetup={addLoginHandler}/>
      </div>
    )
  }