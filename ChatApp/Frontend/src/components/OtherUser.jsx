import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

function OtherUser({user}) {
  const dispatch = useDispatch();

  const {selectedUser,onlineUsers} = useSelector(store=>store.user)
  const isOnline = onlineUsers?.includes(user._id);
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
}

  return (
    <>
      <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id===user?._id?'bg-slate-800':''} flex gap-2 items-center hover:text-zinc-100 hover:bg-slate-800 rounded p-2 cursor-pointer`}>
        <div className={`avatar ${isOnline? 'online':''}`}>
          <div className="w-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="userprofile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between  gap-2  ">
            <p>{ user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider m-0 divider-info"></div>
    </>
  )
}

export default OtherUser