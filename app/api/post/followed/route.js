import Post from "../../../../lib/models/Post";
import User from "../../../../lib/models/User";
import { connectToDB } from "../../../../lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
  try {
    await connectToDB();

    // Lấy thông tin người dùng hiện tại từ Clerk
    const user = await currentUser();

    // Kiểm tra nếu không có người dùng hiện tại
    if (!user || !user.publicMetadata.userMongoId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Lấy userId từ Clerk metadata
    const userId = user.publicMetadata.userMongoId;

    // Lấy thông tin người dùng từ MongoDB và truy vấn danh sách "following"
    const userFromDB = await User.findById(userId);

    if (!userFromDB) {
      return new Response("User not found", { status: 404 });
    }

    // Lấy các bài post của những người trong danh sách "following"
    const feedPosts = await Post.find({
      userId: { $in: userFromDB.following },
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(feedPosts), {
      status: 200,
    });
  } catch (error) {
    console.log("Error getting posts:", error);
    return new Response("Error getting posts", {
      status: 500,
    });
  }
};
