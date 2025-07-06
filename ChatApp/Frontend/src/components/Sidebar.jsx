import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { otherUsers} = useSelector(store => store.user);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
 
  const logoutHandler = async () => {
     try {
       const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
       navigate('/login')
       toast.success(res.data.message);
       dispatch(setAuthUser(null));
     } catch (error) {
       console.log(error);
     }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase())); 
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]))
    } else {
      toast.error("user not found")
    }
  }
   
  return (
    <div className='border-r border-slate-800 p-3 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action=" " className='flex gap-1'>
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          
          className='input input-bordered rounded-md'
          placeholder='Search...........' type="text" />
        <button type='submit' className='btn btn-ghost bg-gray-800'> 
          <FaSearch size="20px"/>
        </button>
      </form>
      <div className="divider divider-info m-0"></div>
      <OtherUsers />
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm '>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar