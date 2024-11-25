import { HiArrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import Post from '../../../../../components/layout/Post';
import FollowButton from '../../../../../components/layout/FollowButton';
import UserCard from '../../../../../components/layout/UserCard';
import RightSideBar from '../../../../../components/layout/RightSideBar';



export default async function UserPostsPage({ params }) {
  let data = null;
  try {
    const result = await fetch(process.env.URL + '/api/user/get', {
      method: 'POST',
      body: JSON.stringify({ username: params.username }),
      cache: 'no-store',
    });
    data = await result.json();
    const userPosts = await fetch(process.env.URL + '/api/post/user/get', {
      method: 'POST',
      body: JSON.stringify({ userId: data._id }),
      cache: 'no-store',
    });
    data.posts = await userPosts.json();

    if (data.following && data.following.length) {
      const followingDetails = await Promise.all(
        data.following.map(async (followId) => {
          const response = await fetch(`${process.env.URL}/api/user/getByID`, {
            method: 'POST',
            body: JSON.stringify({ id: followId }),
            headers: {
              'Content-Type': 'application/json', 
            },
          });
          return response.json();
        })
      );
      data.following = followingDetails;
    }


  } catch (error) {
    console.error('Failed to fetch post', error);
  }

  return (
    <div className='max-w-xl mx-auto min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5' />
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      {!data && <h2 className='text-center mt-5 text-lg'>User not found</h2>}
      {data && (
        <div className='flex items-center space-x-2 p-3 border-b border-gray-200'>
          <div className='p-4'>
            <div className='flex items-center space-x-4'>
              <img
                src={data.profilePhoto}
                alt='Profile'
                className='h-16 w-16 rounded-full'
              />
              <div>
                <h2 className='text-xl font-bold'>
                  {data.firstName + ' ' + data.lastName}
                </h2>
                <p className='text-gray-500'>@{data.username}</p>
              </div>
            </div>

            <div className='mt-4 mb-8 flex space-x-4'>
              <Link href={`/users/${data.username}/posts`}>
                <div className='border-b-2  hover:border-black'>
                  <span className='font-bold'>{data.posts.length}</span> Posts
                </div>
              </Link>
              <Link href={`/users/${data.username}/following`}>
                <div className='border-b-2 border-black hover:border-black'>
                  <span className='font-bold'>{data.following.length}</span>{' '}
                  Following
                </div></Link>
              <Link href={`/users/${data.username}/followers`}>
                <div className='border-b-2 hover:border-black'>
                  <span className='font-bold'>{data.followers.length}</span>{' '}
                  Followers
                </div>
              </Link>
            </div>
            <div className='mt-4 flex-1'>
              <FollowButton user={data} />
            </div>
          </div>
        </div>
      )}
      <div className='mt-4 flex flex-col gap-6'>{data &&
        data.following &&
        data.following.map((person) => {
          return <div className='border-b-1'><UserCard key={person._id} userData={person} /></div>;
        })}</div>
    </div>
  );
}
