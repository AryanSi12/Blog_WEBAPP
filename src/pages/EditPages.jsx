import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../Appwrite/Config';
import { Container,PostForm } from '../components';

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
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ):null;
}

export default EditPages