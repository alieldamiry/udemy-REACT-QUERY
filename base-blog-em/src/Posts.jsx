import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  console.log(pageNum, response.data);
  return response.data;
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  //  useQuery
  const { data, isError, isLoading, error } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    { staleTime: 2000 }
  );

  if (isLoading) return <h3>loading...</h3>;
  if (isError) return <h3>{error.toString()}</h3>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage < 2}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
