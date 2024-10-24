import { connectToDB } from "../../../../lib/mongodb/mongoose";
import User from "../../../../lib/models/User";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    // Await `req.query.id` to ensure the ID is available before using it
    const id = await req.query.id;

    const user = await User.findOne({ clerkId: id })
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return res.status(200).json(user); // Use res.json for JSON responses
  } catch (err) {
    console.error(err);
    return res.status(500).json("Failed to get user");
  }
};