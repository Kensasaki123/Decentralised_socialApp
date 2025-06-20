import "./Feed.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContract } from '../context/ContractContext';
import { useEffect, useState, useCallback } from 'react';
import useProfile from "../stores/profilestore";
import useLoadingScreen from "../stores/loadingstore";
import { useLocation } from 'react-router-dom';




function Feed() {
  const { contract, address } = useContract();
  const navigate = useNavigate();
  const { nickie, setNickie, setBirthday, uploadfile, setUploadfile} = useProfile();
  const [loginstate, setLoginstate] = useState<boolean>(false)
  const { state, setState } = useLoadingScreen();


  console.log("nickie in Feed:", nickie);  // <-- ADD HERE

  const location = useLocation();


  const [modelstate, setModalstate] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("")
  const [postbody, setPostbody] = useState<string>("");

  const checkLogin = useCallback(async () => {
    try {
      if (!contract || !address) {
        console.warn("Contract or address not ready yet.");
        return;
      }
  
      const data = await contract.getProfile(address);
  
      const name = data[0];
      const birthdayFromContract = data[1];
      const pic = data[2];
  
      const isLoggedIn = name.trim().length > 0 && Number(birthdayFromContract) > 0;
      setLoginstate(isLoggedIn);
  
      // Also update state
      setNickie(name);
      const date = new Date(Number(birthdayFromContract) * 1000); // convert to milliseconds
      const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      setBirthday(formattedDate);
  
      setUploadfile(pic);
    } catch (err) {
      console.error("Error checking login:", err);
    }
  }, [contract, address]);

  useEffect(() => {
    console.log("loginstate changed:", loginstate);
  }, [loginstate]);
  
  
   const [contractReady, setContractReady] = useState(false);
  
  useEffect(() => {
    if (contract && address) {
      setContractReady(true);
    }
  }, [contract, address]);
  
  useEffect(() => {
    if (!contractReady) return;
    checkLogin();
  }, [contractReady, checkLogin]);
  

  useEffect(() => {
    if (!contract) {
      navigate("/")
    }
  }, [contract, navigate])

  const setModal = () => {
    setModalstate(true);
  }
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value)
  }



  const sendpostData = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!contract || typeof contract.setPost !== "function") {
    console.error("Contract or method is not available yet.");
    return;
  }

  try {
    setState(true)
    const tx = await contract.setPost(postTitle, postbody, nickie);

    await tx.wait();

    console.log("Data sent to the contract!");
    setModalstate(false);
    setState(false)
  } catch (err) {
    console.error("The error is:", err);
  }
};


  return (
    <>
      <nav className="cyber-nav">
  <input type="search" placeholder="Search..." className="searchbar neon-input" />
  <ul>
    <NavLink to="/profile">
      <li>
        <img src={uploadfile} width={40} className="smallprofilepic neon-border" />
      </li>
    </NavLink>
  </ul>
</nav>


      <div className='downroot'>
        <div className='buttondiv'>
<div className="radio-inputs">
  <label className="radio">
    <input 
      type="radio" 
      name="radio" 
      checked={location.pathname.includes('mostpopular')}
      readOnly
    />
    <span className="name">
      <NavLink 
        to="mostpopular"
        className={({ isActive }) => isActive ? "active-navlink" : ""}
      >
        Most Popular
      </NavLink>
    </span>
  </label>
  <label className="radio">
    <input 
      type="radio" 
      name="radio" 
      checked={location.pathname.includes('latest')}
      readOnly
    />
    <span className="name">
      <NavLink 
        to="latest"
        className={({ isActive }) => isActive ? "active-navlink" : ""}
      >
        Latest
      </NavLink>
    </span>
  </label>
  <label className="radio">
    <input 
      type="radio" 
      name="radio" 
      checked={location.pathname.includes('trending')}
      readOnly
    />
    <span className="name">
      <NavLink 
        to="trending"
        className={({ isActive }) => isActive ? "active-navlink" : ""}
      >
        Trending
      </NavLink>
    </span>
  </label>
</div>
    
   
          <div className="buttondiv2">
            <ul><li onClick={setModal}>Post</li></ul>
          </div>
        </div>
        {
  modelstate && (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Title</h3>
        <input type="text" onChange={setTitle}/>
        <h3>Body</h3>
        <textarea onChange={(e) => setPostbody(e.target.value)} />
        <button onClick={sendpostData}>submit</button>
        <button onClick={() => setModalstate(false)}>Close</button>
      </div>
    </div>
  )
}
{
  state && (<>
  <div className="loading-overlay">
      <div className="spinner" />
    </div></>)
}

        <div className='bottomdiv'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Feed;
