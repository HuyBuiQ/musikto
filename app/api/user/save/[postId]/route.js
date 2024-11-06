import Post from "../../../../../lib/models/Post";
import User from "../../../../../lib/models/User";
import { connectToDB } from "../../../../../lib/mongodb/mongoose";

export const PUT = async (req, { params }) => {
  try {
    await connectToDB();

    const userId = params.id;
    const postId = params.postId;

    const user = await User.findOne({ clerkId: userId }).populate("savedPosts");
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const isSaved = user.savedPosts.some((item) => item._id.toString() === postId);

    if (isSaved) {
      user.savedPosts = user.savedPosts.filter((item) => item._id.toString() !== postId);
    } else {
      user.savedPosts.push(post._id);
    }

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log("Error saving/unsaving post:", err);
    return new Response("Failed to save/unsave post", { status: 500 });
  }
};
