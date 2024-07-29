import React from 'react';
import service from '../Appwrite/Config';
import { Container, PostCard } from '../components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
            <motion.div
            initial={{opacity:0 ,y:-100 ,rotate:-3}}
          whileInView = {{opacity:1 , y:0 ,rotate:0}}
          transition={{ ease: "easeOut", duration: 1 }}
            key={post.$id} className='w-full'>
              <PostCard {...post} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
