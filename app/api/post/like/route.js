import Post from '../../../../lib/models/Post';
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

    const post = await Post.findById(data.postId);

    if (post.likes.includes(user.publicMetadata.userMongoId)) {
      const updatedPost = await Post.findByIdAndUpdate(
        data.postId,
        { $pull: { likes: user.publicMetadata.userMongoId } },
        { new: true }
      );
      return new Response(JSON.stringify(updatedPost), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        data.postId,
        { $addToSet: { likes: user.publicMetadata.userMongoId } },
        { new: true }
      );
      return new Response(JSON.stringify(updatedPost), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.log('Error liking post:', error);
    return new Response(JSON.stringify({ message: 'Error liking post' }), { status: 500 });
  }
};