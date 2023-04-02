import LoginForm from '@components/meetups/LoginForm'

export default function LoginPage() {
    function addLoginHandler(loginData) {

    }
    
    return (
      <div>
        <h1>Login</h1>
        {/* can pass function in props as well! */}
        <LoginForm onAddMeetup={addLoginHandler}/>
      </div>
    )
  }