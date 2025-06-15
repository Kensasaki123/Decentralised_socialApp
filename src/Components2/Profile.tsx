import React, { useState, useEffect, type ChangeEvent, useCallback } from 'react';
import './Profile.css';
import { useContract } from '../context/ContractContext';
import useProfile from '../stores/profilestore';
import useLoadingScreen from '../stores/loadingstore';

function Profile() {
  const [profilepic, setProfilePic] = useState<File | null>(null);
  const { contract, address } = useContract();
  const [loginstate, setLoginstate] = useState<boolean>(false)
  const { state, setState } = useLoadingScreen();

  const { nickie, setNickie, birthday, setBirthday, uploadfile, setUploadfile} = useProfile();
  

  useEffect(() => {
  const debugCall = async () => {
    if(contract) {
    try {
      const data = await contract.getProfile(address);
      console.log("Profile Data:", data);
    } catch (err) {
      console.error("Direct call error:", err);
    }}
  }

  if (contract && address) debugCall();
}, [contract, address]);

  
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


  

  const setPic = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handlebirthdaydate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickie(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!contract || typeof contract.setProfile !== "function") {
    console.error("Contract or method is not available yet.");
    return;
  }

  try {
    setState(true);
const birthdayTimestamp = birthday ? Math.floor(new Date(birthday).getTime() / 1000) : 0;
console.log("About to send:", {
  nickie,
  birthdayTimestamp,
  uploadfile
});

const tx = await contract.setProfile(nickie, birthdayTimestamp, uploadfile || "");
    await tx.wait();
    console.log("Profile updated!");
    setState(false)
  } catch (err) {
    console.error("Error setting profile:", err);
    setState(false)
  }
};




  const handleProfilePic = async () => {
  if (!profilepic) return;

  const formData = new FormData();
  formData.append("file", profilepic); 

  const pinataJWT = import.meta.env.VITE_PINATA_JWT;
  if (!pinataJWT) {
    console.error("Missing Pinata JWT");
    return;
  }



  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${pinataJWT}`, 
      },
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    const data = await res.json();
    const fileUrl = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    console.log("Uploaded to:", fileUrl);

    if (fileUrl) {
    setUploadfile(fileUrl);
    }
  } catch (err) {
    console.error("Upload error:", err);
  }
};

const handleClick = async (e: React.FormEvent) => {
  await handleSubmit(e);
  await checkLogin();
};


  return (
    <>
      <div className='root1'>
        <div className='infodiv'>
          <div className='imgdiv'>
            <div className='img'>
              {!uploadfile ? (
                <>
                 <input type="file" accept='image/*' onChange={setPic} />
                 <button onClick={handleProfilePic}>Confirm</button>
                </>  
              ) : (
                <img src={uploadfile} alt="Uploaded profile" width="100" className='profilepic' />
              )}

              
            </div>
          </div>
         <div className='infodivchild'>
  {loginstate ? (
    <>
      <div className='infodiv1'>{nickie}</div>
      <div className='infodiv2'>{birthday}</div>
      
    </>
  ) : (
    <>
      <div className='infodiv1'>Nickname: <input type="text" value={nickie} onChange={handleNameChange} /></div>
      <div className='infodiv2'>Date-of-birth: <input type="date" value={birthday} onChange={handlebirthdaydate}/></div>
      <button onClick={handleClick}>Confirm</button>
    </>
  )}
  {
  state && (<>
  <div className="loading-overlay">
      <div className="spinner" />
    </div></>)
}
  <div className='moreinfo'>Last joined: </div>
</div>

        </div>
      </div>
    </>
  );
}

export default Profile;