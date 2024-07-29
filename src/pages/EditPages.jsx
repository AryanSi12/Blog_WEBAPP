import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../Appwrite/Config';
import { Container,PostForm } from '../components';
import { motion } from 'framer-motion';
function EditPages() {
    const navigate=useNavigate();
    const {slug}=useParams();
    const [post,setPost]=useState(null);
    useEffect(()=>{
        service.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
            else{
                navigate('/')
            }
        })
    },[slug,navigate])
  return post ? (
    <motion.div
    initial={{opacity:0 ,x:-100 }}
          whileInView = {{opacity:1 , x:0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
    className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </motion.div>
  ):null;
}

export default EditPages