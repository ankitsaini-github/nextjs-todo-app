import { useRouter } from "next/router";

const details = [
  { id : 1, name: 'Yash', role: 'Senior Developer'},
  { id : 2, name: 'Vaibhav', role: 'Backend Developer'},
  { id : 3, name: 'Suresh', role: 'Frontend Developer'},
  ];

export default function DeveloperPage(){
  const router =useRouter();
  const dev=details.find((i)=>i.id==router.query.devId)
  return <>
    {
      dev ? <h1>{dev.name} : {dev.role}</h1> : <h1>Developer doesn't exist</h1>
    }
  </>
}