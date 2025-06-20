import { useState, useEffect } from 'react';
import './About.css';

function About() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const topics = [
    {
      title: "Smart Contract Development",
      description: "Deep dives into Solidity patterns, gas optimization, and contract architecture",
      icon: "💻"
    },
    {
      title: "Security & Auditing",
      description: "Vulnerability analysis, best practices, and security tooling discussions",
      icon: "🔒"
    },
    {
      title: "DeFi Protocols",
      description: "Decentralized finance innovations, tokenomics, and yield strategies",
      icon: "📊"
    },
    {
      title: "NFT Ecosystems",
      description: "NFT standards, marketplace development, and creative applications",
      icon: "🖼️"
    },
    {
      title: "DAO Governance",
      description: "Decentralized governance models, voting mechanisms, and treasury management",
      icon: "🗳️"
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`about-container ${isVisible ? 'visible' : ''}`}>
      
      {/* Particle Animation Layer */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--size': `${Math.random() * 8 + 2}px`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${Math.random() * 10 + 5}s`,
            } as React.CSSProperties}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">About</span> Solidity Forum
          </h1>
          <p className="hero-subtitle">
            Where Ethereum developers connect, collaborate, and innovate
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-content">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-statement">
            At Solidity Forum, we're building a premier hub for blockchain developers to share knowledge,
            solve complex problems, and push the boundaries of decentralized technology. Our mission is to
            foster a community where both beginners and experts can grow together in a secure, collaborative
            environment.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">15K+</div>
              <div className="stat-label">Developers</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">45K+</div>
              <div className="stat-label">Discussions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">120+</div>
              <div className="stat-label">Countries</div>
            </div>
          </div>
        </div>
        <div className="mission-image">
          <div className="glowing-orb"></div>
          <div className="floating-elements">
            <div className="element element-1">ETH</div>
            <div className="element element-2">SOL</div>
            <div className="element element-3">DAO</div>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h2 className="section-title">Discussion Topics</h2>
        <p className="section-subtitle">Explore the cutting-edge conversations happening daily</p>
        <div className="topics-grid">
          <div className="topic-card">
  <div className="topic-icon">{topics[activeSlide].icon}</div>
  <h3 className="topic-title">{topics[activeSlide].title}</h3>
  <p className="topic-description">{topics[activeSlide].description}</p>
</div>

        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to Join the Future of Blockchain Development?</h2>
        <p>Connect with thousands of Solidity developers worldwide</p>
      </div>
    </div>
  );
}

export default About;
