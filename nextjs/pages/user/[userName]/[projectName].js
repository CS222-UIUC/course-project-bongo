import { useRouter } from 'next/router';

export default function TeamMember({member}) {
  const router = useRouter();

  console.log("router.pathname =", router.pathname);
  console.log("router.query =", router.query);
  console.log("router.query.member =", router.query.userName);
  console.log("router.query.member =", router.query.projectName);
  // console.log(member);
  

  return (
    <div>
      <h1>{member}</h1>
    </div>
  )
}
