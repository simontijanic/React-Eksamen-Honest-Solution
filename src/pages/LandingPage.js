import React, { useState, useEffect, useRef } from "react";

function LandingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const postsPerPage = 5;
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchedOnce.current = true;
      fetchPosts(0);
    }
  }, []);

  const fetchPosts = (start) => {
    fetch(`${process.env.REACT_APP_API_URL}indexPage?start=${start}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts((prev) => [...prev, ...data.posts]);
          if (data.posts.length < postsPerPage) {
            setNoMorePosts(true);
          }
        } else {
          setNoMorePosts(true);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const handleLoadMore = () => {
    fetchPosts(posts.length);
  };

  return (
    <div>
      <h1>Landing Page</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <p>Laster...</p>}
      {!noMorePosts && !loading && (
        <button onClick={handleLoadMore}>...</button>
      )}
      {noMorePosts && <p>Ingen flere poster å laste inn.</p>}
    </div>
  );
}

export default LandingPage;
