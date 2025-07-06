import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'


function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const[user,setUser]=useState({
    username:"",
    password:"",
  })
  
  
  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      dispatch(setAuthUser(res.data));

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
    setUser({
      username:"",
      password:"",
    })
  }
  

  return (
    <>
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-4/6 p-4">
  <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
    <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
      <div>
        <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
          Welcome to our registration page! Get started by creating your account.
        </p>
      </div>
      <div>
        <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
          Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.
        </p>
      </div>
    </div>

    <form onSubmit={onSubmitHandler} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
      <div className="mb-6">
        <h3 className="text-gray-800 text-2xl font-bold">Login to your account</h3>
      </div>

      <div className="space-y-6">

        <div>
          <label className="text-gray-800 text-sm mb-2 block">Username</label>
          <input
          value={user.username}
        onChange={(e)=>setUser({...user,username:e.target.value})}
          name="username" type="text" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter username" />
        </div>
        
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Password</label>
          <input 
          value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
          name="password" type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
        </div>


       
      </div>
      <Link to="/register" className='font-light text-blue-500'>Don't have an account?????</Link>

      <div className="!mt-5">
        <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
          Login
        </button>
      </div>

    </form>
  </div>
</div>

    </>
  )
}

export default Login