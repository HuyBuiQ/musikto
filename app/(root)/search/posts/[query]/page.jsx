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

  const { user, isLoaded } = useUser();
  console.log(searchedPosts)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className="tab bg-black-2" href={`/search/posts/${query}`}>
          Posts
        </Link>
        <Link className="tab bg-light-2" href={`/search/people/${query}`}>
          People
        </Link>
      </div>

      {searchedPosts.map((post) => (
        <Post key={post._id} post={post}/>
      ))}
    </div>
  );
};

export default SearchPost;
