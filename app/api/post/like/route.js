import Post from '../../../../lib/models/Post';
import User from '../../../../lib/models/User';
import { connectToDB } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const PUT = async (req) => {
  const user = await currentUser();

  try {
    await connectToDB();
    const data = await req.json();

    if (!user) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const userMongoId = user.publicMetadata.userMongoId;
    const postId = data.postId;

    // Find the post and the user
    const post = await Post.findById(postId);
    const userDoc = await User.findById(userMongoId);

    if (!post || !userDoc) {
      return new Response(JSON.stringify({ message: 'Post or User not found' }), { status: 404 });
    }

    // Check if the post is already liked by the user
    const isLiked = post.likes.includes(userMongoId);

    if (isLiked) {
      // Unlike the post: remove the user's ID from post.likes and post ID from user.likedPosts
      post.likes.pull(userMongoId);
      userDoc.likedPosts.pull(postId);
    } else {
      // Like the post: add the user's ID to post.likes and post ID to user.likedPosts
      post.likes.addToSet(userMongoId);
      userDoc.likedPosts.addToSet(postId);
    }

    // Save the updated user and post
    await post.save();
    await userDoc.save();

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('Error liking/unliking post:', error);
    return new Response(JSON.stringify({ message: 'Error liking/unliking post' }), { status: 500 });
  }
};
