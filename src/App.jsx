import { useEffect, useState } from 'react'
import { Header,Footer } from './components/index'
import { Outlet } from 'react-router-dom'
import authservice from './Appwrite/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { login,logout } from './store/authSlice';
function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch()
  const stat=useSelector((state)=>state.auth.status)
  async function GetUser(){

    await authservice.getCurrentUser().
    then((data)=>{
      if(data){
        dispatch(login({data}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
    
  }
  useEffect(()=>{
    GetUser()
  },[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between '>
      <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>

    </div>
    </div>
  ) : null
}

export default App
