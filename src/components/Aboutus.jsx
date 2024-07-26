import React from 'react';
import Container from './Container';

function Aboutus() {
  return (
    
    <section className="flex items-start justify-start min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 p-10">
     <Container>
      <div className="max-w-4xl">
        <h1 className="text-4xl pt-5 font-extrabold text-gray-500 mb-6">Welcome to Bloggerrr</h1>
        <p className="text-lg  text-black mb-4">
          At Bloggerrr, we believe in the power of words and the impact of sharing stories. Our platform is designed to bring together passionate writers and eager readers, creating a vibrant community where ideas thrive.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Whether you're an experienced blogger or just starting out, BlogMaster offers the tools and support you need to create and share your unique voice. Join us and become a part of a dynamic network of content creators who are making a difference one post at a time.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Discover diverse content, connect with like-minded individuals, and elevate your blogging experience. With BlogMaster, your words matter.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Start your journey with us today and see how BlogMaster can transform your blogging life. From insightful articles to inspiring stories, there's something for everyone on BlogMaster.
        </p>
      </div>
      </Container>
    </section>
   
  );
}

export default Aboutus;
