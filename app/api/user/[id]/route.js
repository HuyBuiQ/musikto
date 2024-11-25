
import Post from "../../../../lib/models/Post"
import User from '../../../../lib/models/User';
import { connectToDB } from "../../../../lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const user = await User.findOne({ clerkId: params.id })
      
      .exec();

    // console.log("USER ĐÂY",user)
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to get user", { status: 500 });
  }
};
