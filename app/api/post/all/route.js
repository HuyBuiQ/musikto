import Post from "../../../../lib/models/Post"
import {connectToDB} from "../../../../lib/mongodb/mongoose"
export const POST = async (req) => {
    try {
      await connectToDB();
      const feedPosts = await Post.find().sort({ createdAt: -1 });
      return new Response(JSON.stringify(feedPosts), {
        status: 200,
      });
    } catch (error) {
      console.log('Error getting posts:', error);
      return new Response('Error getting posts', {
        status: 500,
      });
    }
  };
  