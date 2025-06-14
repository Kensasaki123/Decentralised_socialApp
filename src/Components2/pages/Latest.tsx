import { useEffect, useState } from 'react';
import { useContract } from "../../context/ContractContext";

type Post = {
  title: string;
  body: string;
  sender: string;
};

function Latest() {
  const { contract } = useContract();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = async () => {
    if (!contract || typeof contract.getAllPost !== "function") {
      console.error("Contract or method is not available yet.");
      return;
    }

    try {
      const rawPosts = await contract.getAllPost();
      
      const structuredPosts: Post[] = rawPosts.map((post: Post) => ({
        title: post.title,
        body: post.body,
        sender: post.sender
      }));

      setPosts(structuredPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contract]);

  return (
    <div>
      <h2>Latest Posts</h2>
      <div>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
            <small>by {post.sender}</small>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Latest;
