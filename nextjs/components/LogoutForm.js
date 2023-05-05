export default function LogoutForm(props) {
  return (
    <div>
      <p>User email: {props.email}</p>
      <button onClick={props.onLogout}>Logout</button>
    </div>
  );
}
