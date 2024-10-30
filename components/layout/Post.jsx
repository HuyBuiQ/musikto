import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import moment from 'moment';
import Icons from './Icons';

export default function Post({ post }) {
  return (
    <div className='flex p-3 border-b border-t border-gray-200 w-full hover:bg-gray-50'>
      <Link href={`/users/${post?.username}`}>
        <img
          src={post?.profilePhoto}
          alt='user-img'
          className='h-8 w-8 rounded-full mr-4 sm:h-11 sm:w-11'
        />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-xs truncate max-w-32'>
              {post?.name}
            </h4>
            <span className='text-xs truncate max-w-32'>@{post?.username}</span>
            {/* add dot space here */}
            <span className='text-xl text-gray-500'>·</span>
            <span className='text-xs text-gray-500 flex-1 truncate max-w-32'>
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          {/* <HiDotsHorizontal className='text-sm' /> */}
        </div>
        <Link href={`/posts/${post?._id}`}>
          <p className='text-gray-800 text-sm my-3 w-full'>{post?.text}</p>
        </Link>
        <Link href={`/posts/${post?._id}`}>
        {post?.fileType === 'image' ? (
            <img src={post?.image} alt="post-img" className='rounded-2xl mr-2' />
          ) : post?.fileType === 'audio' ? (
            <audio controls src={post?.image} className='w-full mt-3' />
          ) : null}
        </Link>
        <Icons post={post} id={post._id} />
      </div>
    </div>
  );
}
