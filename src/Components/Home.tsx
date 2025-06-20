// src/components/Home.jsx
import { useState, useEffect } from 'react';
import { useContract } from "../context/ContractContext";
import "./Home.css";

function Home() {
  const { connectWallet } = useContract();
  const [isLoading, setIsLoading] = useState(true);

  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
            <h3>Initializing Solidity Hub</h3>
            <p>Loading secure environment...</p>
          </div>
        </div>
      )}
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">The Solidity Hub</span>
          </h1>
          <p className="hero-subtitle">
            A secure, collaborative space for Ethereum developers to learn, share, and build together
          </p>
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
            <div className="btn-glow"></div>
          </button>
          
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Developers</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">25K+</div>
              <div className="stat-label">Smart Contracts</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">5K+</div>
              <div className="stat-label">Discussions</div>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default Home;