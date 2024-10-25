import Post from '../../../../lib/models/Post.js';
import { connectToDB } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connectToDB();
    const data = await req.json();
    // console.log("data:",data)

    if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    const newPost = await Post.create({
      user: data.userMongoId,
      name: data.name,
      username: data.username,
      text: data.text,
      profilePhoto: data.profilePhoto,
      image: data.image,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response('Error creating post', {
      status: 500,
    });
  }
};
