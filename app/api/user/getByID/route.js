import User from '../../../../lib/models/User';
import { connectToDB } from '../../../../lib/mongodb/mongoose';

export const POST = async (req) => {
  try {
    await connectToDB();

    const data = await req.json();

    const user = await User.findById(data.id); // Access the ID from data.id

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Failed to fetch the user data', { status: 500 });
  }
};
