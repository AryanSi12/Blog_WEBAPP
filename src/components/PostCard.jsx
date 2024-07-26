import React, { useEffect, useState } from 'react';
import service from '../Appwrite/Config';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostCard({ $id, title, Image, slug, Likes, Dislikes, LikedBy, DislikedBy }) {
  // HandleLike()
  const userData = useSelector((state) => state.auth.data)
  const [likes, setLikes] = useState(Likes)
  const [dislikes, setDislikes] = useState(Dislikes)
  const [isLiked, setisLiked] = useState(false)
  const [isDisliked, setisDisliked] = useState(false)

  useEffect(() => {
    if (userData) {
      setisLiked(LikedBy.includes(userData.$id));
      setisDisliked(DislikedBy.includes(userData.$id));
    }
  }, [LikedBy, DislikedBy])

  //Hnadling a click on like button
  const handleLike = (e) => {
    e.preventDefault()
    //If its already liked then reduce the like by 1 on click and also remove the user from likedby
    if (isLiked) {
      let newLikedBy = [...LikedBy];
      newLikedBy = newLikedBy.filter(userId => userId !== userData.$id);
      service.updatePost(slug, {
        $id,
        title,
        Image,
        Likes: likes - 1,
        Dislikes,
        LikedBy: newLikedBy,
        DislikedBy,
      })
      setLikes(likes - 1)
      setisLiked(false)
    }
    else if (!isLiked) {
      //if the user has not liked it before but disliked it then change both like and dislike states
      if (isDisliked) {
        let newDislikedBy = [...LikedBy];
        newDislikedBy = newDislikedBy.filter(userId => userId !== userData.$id);

        service.updatePost(slug, {
          $id,
          title,
          Image,
          Likes: likes + 1,
          Dislikes: dislikes - 1,
          LikedBy: [...LikedBy, userData.$id],
          DislikedBy: newDislikedBy
        })
        setDislikes(dislikes - 1)
        setisDisliked(false)
      }
      else {
        service.updatePost(slug, {
          $id,
          title,
          Image,
          Likes: likes + 1,
          Dislikes: dislikes,
          LikedBy: [...LikedBy, userData.$id],
          DislikedBy
        })
      }
      setLikes(likes + 1)
      setisLiked(true)

    }
  }

  // To handle dislike action

  const handleDislike = (e) => {
    e.preventDefault()
    console.log("ll");
    if (isDisliked) {
      let newDislikedBy = [...DislikedBy]
      newDislikedBy = newDislikedBy.filter(userId => userId !== userData.$id)
      service.updatePost(slug, {
        $id,
        title,
        Image,
        Likes,
        Dislikes: dislikes - 1,
        LikedBy,
        DislikedBy: newDislikedBy,
      })
      setisDisliked(false)
      setDislikes(dislikes - 1)
    }
    else if (!isDisliked) {
      if (isLiked) {
        let nl = [...LikedBy]
        nl = nl.filter(userId => userId !== userData.$id)
        service.updatePost(slug, {
          $id,
          title,
          Image,
          Likes: likes - 1,
          Dislikes: dislikes + 1,
          LikedBy: nl,
          DislikedBy,
        })
        setLikes(likes - 1)
        setisLiked(false)
      }
      else {
        service.updatePost(slug, {
          $id,
          title,
          Image,
          Likes,
          Dislikes: dislikes + 1,
          LikedBy,
          DislikedBy: [...DislikedBy , userData.$id],
        })
      }
      setDislikes(dislikes + 1)
      setisDisliked(true)
    }
  }

  return (
    <>
  <Link to={`/post/${$id}`} className="block transform transition duration-300 hover:scale-105">
    <div className="w-full bg-gradient-to-b from-teal-100 to-blue-100 shadow-lg rounded-xl overflow-hidden">
      <div className="w-full justify-center mb-4">
        <img src={service.getFilePreview(Image)} alt={title} className="rounded-xl" />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{slug}</p>
      </div>
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`mr-4 px-3 py-1 bg-green-500 text-white rounded-full transition duration-300 ${
            isLiked ? 'bg-green-700' : 'hover:bg-green-700'
          }`}
        >
          👍 {likes}
        </button>
        <button
          onClick={handleDislike}
          className={`px-3 py-1 bg-red-500 text-white rounded-full transition duration-300 ${
            isDisliked ? 'bg-red-700' : 'hover:bg-red-700'
          }`}
        >
          👎 {dislikes}
        </button>
      </div>
    </div>
  </Link>
</>
  );
}

export default PostCard;
