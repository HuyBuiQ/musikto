"use client"
import Feed from '../../../components/layout/Feed';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

export default function Followed() {
  const { user, isLoaded } = useUser();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFilteredPosts = async () => {
    try {
      const result = await fetch('/api/post/all', {
        method: 'POST',
        cache: 'no-store',
      });
      const allPosts = await result.json();
    //   console.log("ALLPOST",allPosts)

      const userResponse = await fetch(`/api/user/${user.id}`);
      const userData = await userResponse.json();
      const followingIds = userData?.following || [];

      
      const postsFromFollowedUsers = allPosts.filter(post => 
        followingIds.includes(post.user)  
      );

      setFilteredPosts(postsFromFollowedUsers);
    } catch (error) {
      console.error('Error fetching or filtering posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchFilteredPosts();
    }
  }, [isLoaded, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='min-h-screen max-w-xl mx-auto'>      
      <Feed data={filteredPosts} />
    </div>
  );
}
