import Link from 'next/link';
import { useState } from "react";
// import Welcome from "@components/Welcome";
import LoginLogoutButton from '@components/LoginLogoutButton'
import Todo from "@components/Todo"
import Clock from "@components/Clock"

// import Clock from "@components/clock";

// this is the home page "./", despite being index.js
export default function Hello() {
  const [count, setCount] = useState(null);

  function onClick() {
    fetch("/api/count", { method: "POST" })
      .then((response) => response.text())
      .then(setCount);
  }

  return (
    <div className="App">
      <div>
        {/* passing props */}
        <LoginLogoutButton isLoggedIn={true} name="Brad"/> 
      </div>

      <div id="buttons">
        <Todo text="Learn React"/>
        <Todo text="Learn Nextjs"/>
        <Todo text="Learn Redux maybe"/>

      </div>

      <div> 
        <Clock />
      </div>

			<div>
				<h1>Celescribe</h1>
				<h2>Language learning, optimized for fun.</h2>
				<ul>
					<li>
						<Link href="/vocabulary">Vocabulary</Link>
					</li>
				</ul>


			</div>
      
			
			{count && <p>You clicked me {count} times!!!</p>}
      <button onClick={onClick}>Click Me!</button>




    </div>
  );











}


