import "./Feed.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContract } from '../context/ContractContext';
import { useEffect, useState, useCallback } from 'react';
import useProfile from "../stores/profilestore";
import useLoadingScreen from "../stores/loadingstore";



function Feed() {
  const { contract, address } = useContract();
  const navigate = useNavigate();
  const { nickie, setNickie, setBirthday, uploadfile, setUploadfile} = useProfile();
  const [loginstate, setLoginstate] = useState<boolean>(false)
  const { state, setState } = useLoadingScreen();


  console.log("nickie in Feed:", nickie);  // <-- ADD HERE

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
      <nav>
        <input type="search" className='searchbar' />
        <ul>
          <NavLink to="/profile"><li><img src={uploadfile} width={40} className="smallprofilepic"/></li></NavLink>
        </ul>
      </nav>

      <div className='downroot'>
        <div className='buttondiv'>
          <div className='buttondiv1'>
            <ul>
              <li><NavLink to="mostpopular">Most Popular</NavLink></li>
              <li><NavLink to="latest">Latest</NavLink></li>
              <li><NavLink to="trending">Trending</NavLink></li>
            </ul>
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
