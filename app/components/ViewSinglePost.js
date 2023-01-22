import React, { useEffect, useState } from "react";
import Page from "./Page";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";
import ReactMarkdown from "react-markdown";
import { Tooltip as ReactTooltip } from 'react-tooltip'


function ViewSinglePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const { id } = useParams();
  const [tooltip, showTooltip] = useState(true);
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}/`, { cancelToken: ourRequest.token });
        setIsLoading(false);
        setPost(response.data);
      } catch (error) {
        console.log("There was a problem or the request was cancelled.");
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };

  }, []);
  if (isLoading) return <Page title="..."><LoadingDotsIcon /></Page>;
  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <Link to={`/post/${post._id}/edit`} className="text-primary mr-2" data-tip="Edit" data-for="edit">
            <i className="fas fa-edit"></i>
          </Link>
          <ReactTooltip  id="edit" className="custom-tooltip" />{""}        
          
          <Link data-tip="Delete" data-for="delete" className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </Link>
          <ReactTooltip id="delete" className="custom-tooltip" />{""}   
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body} allowElements={["p", "br", "strong", "h1", "ol", "ul"]} />
        </div>
    </Page>
  );
}

export default ViewSinglePost;
