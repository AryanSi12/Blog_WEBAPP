import React, { useEffect, useState } from 'react';
import { Container, PostCard } from './index';
import service from '../Appwrite/Config';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
function Home() {
  const navigate=useNavigate()
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const Location=useLocation()
  const stat=useSelector((state)=>state.auth.status)
  const [cnt,setCnt]=useState(0)
  // As soon as page loads we will check in our database for posts
  console.log(userData);
  let sortedPosts=[]
  let three=[]
  const [disp,setdisp]=useState([])
  const [rec,setRec]=useState([])
  const [noResults,setNoResults]=useState(false)
  //To setInput
  const [inp,setInp]=useState('')
  //Suggestion
  const [suggestion,setSuggestion]=useState([])
  //When input changes show suggestion
  const HandleInputChange=(e)=>{
    const query=e.target.value;
    setNoResults(false)
    setInp(e.target.value)
    if(query.length > 0){
      const sugg=posts.filter(post=>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestion(sugg)
    }
    else{
      setSuggestion([])
    }
  }
  //When User clicks on search button
  const HandLeSubmit = () =>{

    posts.forEach((post)=>{
      if(post.title.trim().toLowerCase() == inp.trim().toLowerCase()){
        navigate(`/post/${post.$id}`)
        setNoResults(false)
      }
      else{
        setNoResults(true)
      }
    })
  }
  
  useEffect(() => {

    if(!userData && stat)window.location.reload()
    service.getPosts().then((posts) => {
      if (posts){
       setPosts(posts.documents);
        console.log(posts.documents[0].Likes);
        sortedPosts= posts.documents.slice().sort((a, b) => b.Likes - a.Likes);
        three=sortedPosts.slice(0,3)
        let recPosts = posts.documents.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        recPosts=recPosts.slice(0,3)  
        setRec(recPosts);
        setdisp(three)
      }
    });
    console.log(posts);
  }, []);

  // Conditional Rendering based on whether we have a post or not
  if (stat == false) {
    return (
      <section className="flex pt-32 justify-center bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen">
        <motion.div
        initial={{opacity:0 ,x:-100 }}
        whileInView = {{opacity:1 , x:0 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Blogerrr
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover the best content and connect with others. Join us today and start your journey!<br></br>
            Join now to create your own blog today!!
          </p>
          <Link
            to="/Signup"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-full transition duration-200"
          >
            Get Started
          </Link>
          <img className="w-96 ml-32 mt-24 hidden lg:block" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />

          <div className='block'></div>
          <div className="flex mt-8 flex-col items-center mb-6">
        <p className="text-2xl font-semibold mb-8 mt-20 text-teal-700">Search for an existing posts:</p>
        <div className="flex w-full max-w-md">
        <input 
            type="text" 
            placeholder="Search posts..." 
            onChange={HandleInputChange}
            className="px-4 py-2 rounded-l border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none w-full"
          />
          <button className="px-4 py-2 rounded-r bg-teal-500 text-white font-bold uppercase border-teal-500 hover:bg-teal-600 transition duration-300"
          onClick={HandLeSubmit}
          >
            Search
          </button>
          
        
        </div>
        {noResults && (
              <p className=" block text-3xl mt-4 text-red-600">No Results!!</p>
            )}
        <ul className='max-w-md rounded-md shadow-slate-800 w-full bg-slate-50 flex flex-col box-decoration-slice mt-1 max-h-72 overflow-y-scroll hover:max-h-80 transition-all duration-300'>
          {!noResults && suggestion && suggestion.map((suggest)=>(
            <motion.li
            initial={{opacity:0 ,x:-100 }}
          whileInView = {{opacity:1 , x:0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
            key={suggest.title}   className={"ml-3 py-2 "}>
                
                <Link to={`/post/${suggest.$id}`}>
                {suggest.title}
                </Link>
            </motion.li>
          ))}
          </ul>
        
      </div>
          <div className="text-3xl font-semibold ml-10 mt-24 text-black-900 mb-8">
        Most Popular Posts
          </div>
          <div className="flex flex-col items-center">
          <div className="py-8">
          <motion.div
          
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
          { disp && disp.map((post) =>
            <motion.div 
            initial={{opacity:0 ,x:-100 ,rotate:-3}}
            whileInView = {{opacity:1 , x:0 ,rotate:0}}
            transition={{ ease: "easeOut", duration: 0.5 }}
             key={post.$id} className="w-full">
              <PostCard {...post} />
            </motion.div>
          )}

          </motion.div>
        </div>
      </div>
      <div className="text-3xl font-semibold ml-10 mt-24 text-black-900 mb-8">
        Oldest Posts
      </div>
      <div className="flex flex-col items-center">
      <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
          { rec && rec.map((post) =>
            <motion.div
            initial={{opacity:0 ,x:-100 ,rotate:-3}}
            whileInView = {{opacity:1 , x:0 ,rotate:0}}
            transition={{ ease: "easeOut", duration: 0.5 }}
            key={post.$id} className="w-full">
              <PostCard {...post} />
            </motion.div>
)}

          </div>
        </div>
      </div>
    
        </motion.div>
      </section>
    );
    
  }
  console.log(userData);
  return (
    <div className="min-h-screen bg-gradient-to-r pt-12 from-teal-100 to-blue-100 flex flex-col items-center">
  <Container>
  <motion.div
  initial={{opacity:0 ,x:-100 }}
  whileInView = {{opacity:1 , x:0 }}
  transition={{ ease: "easeOut", duration: 1 }}
  className="container mx-auto px-4">
  <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center mt-4 text-teal-700">
    Welcome to Bloggerrr
  </h1>
  <p className="text-lg sm:text-xl mb-6 text-center px-4 text-gray-700">
    Share your thoughts and ideas with the world. Create a post today and be part of our growing community.
  </p>
  <div className="flex justify-center mb-20">
    <Link
      to="/add-post"
      className="inline-block px-8 py-3 text-base sm:text-lg font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-full transition duration-200"
    >
      Create a Post Today
    </Link>
  </div>
  <img
    className="w-48 sm:w-72 md:w-96 mx-auto mt-12 sm:mt-16 md:mt-24 hidden lg:block"
    src="https://i.ibb.co/5BCcDYB/Remote2.png"
    alt="image1"
  />
  <div className="block"></div>
  <div className="flex flex-col items-center mb-6">
    <p className="text-xl sm:text-2xl font-semibold mb-8 mt-12 sm:mt-20 text-teal-700">
      Search for an existing posts:
    </p>
    <div className="flex w-full max-w-md">
      <input
        type="text"
        placeholder="Search posts..."
        onChange={HandleInputChange}
        className="px-4 py-2 rounded-l border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none w-full"
      />
      <button
        className="px-4 py-2 rounded-r bg-teal-500 text-white font-bold uppercase border-teal-500 hover:bg-teal-600 transition duration-300"
        onClick={HandLeSubmit}
      >
        Search
      </button>
    </div>
    {noResults && (
      <p className="block text-3xl mt-4 text-red-600">No Results!!</p>
    )}
    <ul className="max-w-md rounded-md shadow-slate-800 w-full bg-slate-50 flex flex-col box-decoration-slice mt-1 max-h-72 overflow-y-scroll hover:max-h-80 transition-all duration-300">
      {!noResults &&
        suggestion &&
        suggestion.map((suggest) => (
          <motion.li
          initial={{opacity:0 ,x:-100 }}
          whileInView = {{opacity:1 , x:0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          key={suggest.title} className={"ml-3 py-2 "}>
            <Link to={`/post/${suggest.$id}`}>{suggest.title}</Link>
          </motion.li>
        ))}
    </ul>
  </div>

  {/* Section for most liked posts */}
  <div className="text-2xl sm:text-3xl font-semibold ml-4 sm:ml-10 mt-16 sm:mt-24 text-teal-900 mb-8">
    Popular Posts
  </div>
  <div className="flex flex-col items-center">
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {disp &&
          disp.map((post) => (
            <motion.div 
            initial={{opacity:0 ,x:-100 ,rotate:-3}}
            whileInView = {{opacity:1 , x:0 ,rotate:0}}
            transition={{ ease: "easeOut", duration: 0.5 }}
            key={post.$id} className="w-full">
              <PostCard {...post} />
            </motion.div>
          ))}
      </div>
    </div>
  </div>
  <div className="text-2xl sm:text-3xl font-semibold ml-4 sm:ml-10 mt-16 sm:mt-24 text-teal-900 mb-8">
    Oldest Posts
  </div>
  <div className="flex flex-col items-center">
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rec &&
          rec.map((post) => (
            <motion.div
            initial={{opacity:0 ,x:-100 ,rotate:-3}}
            whileInView = {{opacity:1 , x:0 ,rotate:0}}
            transition={{ ease: "easeOut", duration: 0.5 }}
            key={post.$id} className="w-full">
              <PostCard {...post} />
            </motion.div>
          ))}
      </div>
    </div>
  </div>
</motion.div>

  </Container>
</div>
      );
}

export default Home;