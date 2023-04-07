import { useSelector } from "react-redux"



const HomePage = () => {
  const user = useSelector((state)=> state.user);
  const token = useSelector((state)=> state.token);
  return (
    <div>HomePage {user}
    <h1>{token}</h1>
    </div>
  )
}

export default HomePage