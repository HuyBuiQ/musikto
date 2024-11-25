'use client';

import { useUser } from '@clerk/nextjs';
import { HiOutlinePhotograph, HiOutlineMusicNote } from 'react-icons/hi';
import { useRef, useState, useEffect } from 'react';
import { app } from '../../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { CloudUploadOutlined, BackupOutlined } from '@mui/icons-material';

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [text, setText] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [fileType, setFileType] = useState(null);
  const filePickRef = useRef(null);

  const addFileToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
      setFileType(file.type.startsWith('audio') ? 'audio' : 'image');
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadFileToStorage();
    }
  }, [selectedFile]);

  const uploadFileToStorage = async () => {
    setFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        setFileUploading(false);
        setSelectedFile(null);
        setFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          setFileUploading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text,
        profilePhoto: user.imageUrl,
        image: fileUrl,
        fileType,
      }),
    });
    setPostLoading(false);
    setText('');
    setSelectedFile(null);
    setFileUrl(null);
    location.reload();
    // console.log(fileType)
  };

  if (!isSignedIn || !isLoaded) {
    return null;
  }

  return (
    <div className='flex border-gray-200 border-2 p-4 space-x-3 w-full rounded-lg'>

      <div className='w-full '>
        <textarea
          className='w-full border-none outline-none tracking-wide min-h-[100px] text-gray-700 mb-4 '
          placeholder='What’s happening?'
          rows='2'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {selectedFile && (
          fileType === 'image' ? (
            <img
              onClick={() => {
                setSelectedFile(null);
                setFileUrl(null);
              }}
              src={fileUrl}
              alt='selected-img'
              className={`w-full object-cover cursor-pointer ${fileUploading ? 'animate-pulse' : ''
                }`}
            />
          ) : (
            <audio controls src={fileUrl} className='mt-2 w-full' />
          )
        )}

        <div className='flex items-center justify-between pt-2.5 m-4'>
        <button><BackupOutlined
            className='h-12 w-12 p-2 text-black hover:bg-sky-100 rounded-full cursor-pointer'
            onClick={() => filePickRef.current.click()}
          /></button>

          
          <input
            type='file'
            ref={filePickRef}
            accept='image/*,audio/*'
            hidden
            onChange={addFileToPost}
          />
          <button
            disabled={text.trim() === '' || postLoading || fileUploading}
            className='bg-black-1 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
