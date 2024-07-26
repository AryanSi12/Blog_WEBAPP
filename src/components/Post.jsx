import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import service from '../Appwrite/Config';
import parse from 'html-react-parser';
import { Button, Container } from './index';
import HTMLReactParser from 'html-react-parser/lib/index';
function Post() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector((state) => state.auth.data);
    const [post, setPost] = useState(null);

    // To check whether the user is the owner of the particular post
    const isAuthor = post && userData ? userData.$id === post.UserId : false;

    // Fetching the post data when the component mounts
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate('/');
                }
            });
        }
    }, [slug, navigate]);

    // Deleting the post
    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.Image);
                navigate('/');
            }
        });
    };

    return post ? (
        
        <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-100">
            <Container>
                <div className="py-8">
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl overflow-hidden">
                        <img
                            src={service.getFilePreview(post.Image)}
                            alt={post.title}
                            className="rounded-xl object-cover object-center w-auto h-full"
                        />
                        {isAuthor && (
                            <div className="absolute top-2 right-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-2">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    onClick={deletePost}
                                    className="hover:bg-red-600"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-3xl text-center font-bold text-gray-800">{post.title}</h1>
                    </div>
                    <div className=" bg-slate-200 text-xl leading-relaxed">
                    <div className=' browser-css'>{HTMLReactParser(post.content)}</div>
                    
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;
