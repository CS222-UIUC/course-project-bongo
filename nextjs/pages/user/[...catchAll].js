
// catch if nothing matches, return an array of dynamic size.
import { useRouter } from 'next/router';

export default function TeamMember({member}) {
  const router = useRouter();

  console.log("router.pathname =", router.pathname);
  console.log("router.query =", router.query);



  return (
    <div>
      <h1>{member}</h1>
    </div>
  )
}
