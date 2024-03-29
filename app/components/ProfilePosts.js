import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfilePosts() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token });
        console.log(response.data);
        setIsLoading(false);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <div className="list-group">
      {posts.map((posts) => {
        const date = new Date(posts.createdDate);
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return (
          <Link key={posts._id} to={`/post/${posts._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={posts.author.avatar} /> <strong>{posts.title}</strong> <span className="text-muted small">on {dateFormatted}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
