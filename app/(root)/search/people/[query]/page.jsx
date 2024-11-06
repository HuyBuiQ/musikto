"use client";

import { useUser } from "@clerk/nextjs";
import UserCard from "../../../../../components/layout/UserCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPeople = () => {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchedPeople, setSearchedPeople] = useState([]);


  const getSearchedPeople = async () => {
    const response = await fetch(`/api/user/search/${query}`);
    const data = await response.json();
    setSearchedPeople(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedPeople();
  }, [query]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className="border-b-2" href={`/search/posts/${query}`} >
          <p className="text-black">Posts</p>
        </Link>
        <Link className="border-black border-b-2" href={`/search/people/${query}`}>
          <p className="text-black">People</p>
        </Link>
      </div>
      
      {searchedPeople.length === 0 ? (
        <p>No results found</p>
      ) : (
        searchedPeople.map((person) => (
          <UserCard key={person._id} userData={person} />
        ))
      )}
    </div>
  );
};

export default SearchPeople;
