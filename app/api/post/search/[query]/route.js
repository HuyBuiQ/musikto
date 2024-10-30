import Post from "../../../../../lib/models/Post";
import { connectToDB } from "../../../../../lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  const { query } = params;

  try {
    await connectToDB();

    const searchedPosts = await Post.find({
      $or: [
        
        { text: { $regex: query, $options: "i" } }
      ],
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(searchedPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get posts by search", { status: 500 })
  }
};
