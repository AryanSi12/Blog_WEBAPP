import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from '../Appwrite/Config';

function MyAcc() {
  const userData = useSelector((state) => state.auth.data);
  const stat = useSelector((state) => state.auth.status);
  const [cnt, setCount] = useState(0);
  const [posts, setPost] = useState([]);
  
  useEffect(() => {
    if (stat) {
      service.getPosts().then((posts) => {
        const userPosts = posts.documents.filter(post => post.UserId === userData.$id);
        setCount(userPosts.length);
        setPost(userPosts);
      });
    }
  }, [userData]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex items-start justify-center py-12">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 font-sans">My Account</h1>
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-semibold">Name:</label>
          <p className="text-2xl text-gray-900 font-light">{userData.name}</p>
        </div>
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-semibold">Email:</label>
          <p className="text-2xl text-gray-900 font-light">{userData.email}</p>
        </div>
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-semibold">Total Posts:</label>
          <p className="text-2xl text-gray-900 font-light">{cnt}</p>
        </div>
      </div>
    </section>
  );
}

export default MyAcc;
