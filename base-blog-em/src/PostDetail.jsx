import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  const { isError, isLoading, error, data } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  if (isError) return <div>{error.toString()}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error Deleting The Post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting The Post...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has been deleted</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error Updating The Post</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Updating The Post...</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has been updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
