"use client"
import Post from "../../../components/layout/Post"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const LikedPosts = () => {
    const { user, isLoaded } = useUser();
    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLikedPosts = async () => {
        try {
            const response = await fetch(`/api/user/${user.id}`);
            const userData = await response.json();

            // Assuming userData.likedPosts contains post IDs
            const likedPostIds = userData?.likedPosts || [];

            // Fetch detailed information for each liked post
            const postDetailsPromises = likedPostIds.map(postId =>
                fetch('/api/post/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId })
                }).then(res => res.json())
            );

            const detailedPosts = await Promise.all(postDetailsPromises);
            setLikedPosts(detailedPosts);
        } catch (error) {
            console.error("Error fetching liked posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            getLikedPosts();
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='flex flex-col mx-16'>
            {likedPosts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default LikedPosts;
