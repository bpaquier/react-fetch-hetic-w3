import { useState, useEffect } from "react";

import axios from "axios";
import "./styles.css";

export default function PostsList() {
  const [posts, setPosts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/posts`,
      responseType: "json",
    }).then((resp) => {
      setPosts(resp?.data);
      setIsLoading(false);
    });
  };

  return (
    <div className="postsWrapper">
      <h2 className="title">All posts</h2>
      {isLoading && <div>loading</div>}
      {posts &&
        posts?.map((post: any, i: number) => (
          <div className="post" key={i}>
            <h3>{post?.title}</h3>
            <p>{post?.content}</p>
            <p>{post?.user}</p>
          </div>
        ))}
    </div>
  );
}
