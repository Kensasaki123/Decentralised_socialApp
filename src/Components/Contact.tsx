import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-container">
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--size': `${Math.random() * 8 + 2}px`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${Math.random() * 10 + 5}s`
          }}></div>
        ))}
      </div>
      
      <div className="contact-header">
        <h1 className="neon-title">Get In Touch</h1>
        <p className="neon-subtitle">Connect with me through any channel below</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <h3>Twitter</h3>
            <p>Follow for updates and insights</p>
            <a href="https://x.com/study53010" target="_blank" rel="noopener noreferrer" className="neon-link">
              @study53010
              <span className="link-glow"></span>
            </a>
          </div>
          
          <div className="info-card">
            <div className="info-icon github">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </div>
            <h3>GitHub</h3>
            <p>Explore my projects and contributions</p>
            <a href="https://github.com/Kensasaki123" target="_blank" rel="noopener noreferrer" className="neon-link">
              Kensasaki123
              <span className="link-glow"></span>
            </a>
          </div>
          
          <div className="info-card">
            <div className="info-icon email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3>Email</h3>
            <p>Reach out directly for inquiries</p>
            <a href="mailto:ostudy590@gmail.com" className="neon-link">
              ostudy590@gmail.com
              <span className="link-glow"></span>
            </a>
          </div>
        </div>
        
        <div className="contact-form-container">
          <div className="form-header">
            <h2 className="form-title">Send a Message</h2>
            <p className="form-subtitle">I'll get back to you as soon as possible</p>
          </div>
          
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll respond soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your name"
                />
                <div className="input-glow"></div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your email"
                />
                <div className="input-glow"></div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder="Type your message here"
                  rows={5}
                ></textarea>
                <div className="input-glow"></div>
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
                <div className="btn-glow"></div>
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="contact-footer">
        <p>© {new Date().getFullYear()} Solidity Hub. All rights reserved.</p>
        <p>Designed and developed with ❤️ for the blockchain community</p>
      </div>
    </div>
  );
}

export default Contact;