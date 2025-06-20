// src/components/Latest.tsx
import { useEffect, useState } from 'react';
import { useContract } from "../../context/ContractContext";
import './combined.css';

type Post = {
  title: string;
  body: string;
  sender: string;
};

function Latest() {
  const { contract } = useContract();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!contract || typeof contract.getAllPost !== "function") {
      console.error("Contract or method is not available yet.");
      return;
    }

    try {
      setLoading(true);
      const rawPosts = await contract.getAllPost();
      
      const structuredPosts: Post[] = rawPosts.map((post: Post) => ({
        title: post.title,
        body: post.body,
        sender: post.sender
      }));

      setPosts(structuredPosts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contract]);

  return (
    <div className="latest-container">
      <div className="section-header">
        <h3 className="neon-title">
          <p>Trending</p>
        </h3>
        <div className="neon-divider"></div>
      </div>
      
      {loading ? (
        <div className="loading-cards">
          {[...Array(6)].map((_, i) => (
            <div className="card-skeleton" key={i}>
              <div className="skeleton-image shimmer"></div>
              <div className="skeleton-content">
                <div className="skeleton-title shimmer"></div>
                <div className="skeleton-text shimmer"></div>
                <div className="skeleton-text shimmer"></div>
                <div className="skeleton-author shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-grid">
          {posts.map((post, index) => (
            <div className="neon-card" key={index}>
              <div className="card-glow"></div>
              <div className="card-image"></div>
              <div className="card-content">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-body">{post.body}</p>
                <div className="card-footer">
                  <div className="author-badge">
                    <span className="author-icon">👤</span>
                    <span className="author-name">{post.sender}</span>
                  </div>
                  <div className="card-stats">
                    <span className="stat">❤️ 24</span>
                    <span className="stat">💬 8</span>
                    <span className="stat">🔁 3</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Latest;