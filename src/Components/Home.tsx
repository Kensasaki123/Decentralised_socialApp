import { useContract } from "../context/ContractContext";
import "./Home.css"



function Home() {
  const { connectWallet } = useContract();

  return (
   <>
   <div className="bgimagediv"> 
    <h2>The Solidity hub</h2>
    <button onClick={connectWallet} className="connectbtn">Connect</button>
   </div>
   
   </>
  )
}

export default Home