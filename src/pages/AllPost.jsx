import React from 'react';
import service from '../Appwrite/Config';
import { Container, PostCard } from '../components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AllPost() {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        console.log(posts);
      }
    });
  }, [slug]);

  return (
    <div className='min-h-screen w-full p-3 bg-gradient-to-r from-teal-100 to-blue-100'>
        
      <Container>
        <div className='grid pt-6 grid-cols-1 md:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <div key={post.$id} className='w-full'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
