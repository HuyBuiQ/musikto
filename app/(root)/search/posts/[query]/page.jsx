"use client"

import { useUser } from "@clerk/nextjs";

import Post from "../../../../../components/layout/Post";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPost = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedPosts, setSearchedPosts] = useState([]);

  const getSearchedPosts = async () => {
    const response = await fetch(`/api/post/search/${query}`);
    const data = await response.json();
    setSearchedPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedPosts();
  }, [query]);



  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className=" text-black-2 border-b-2 border-black" href={`/search/posts/${query}`}>
        <p className="text-black">Posts</p>
        </Link>
        <Link className=" border-b-2" href={`/search/people/${query}`}>
        <p className="text-black">People</p>
        </Link>
      </div>
      {searchedPosts.length === 0 ? (
        <p>No results found</p>
      ) : (
        searchedPosts.map((post) => (
          <Post key={post._id} post={post}/>
        ))
      )}

      
    </div>
  );
};

export default SearchPost;
