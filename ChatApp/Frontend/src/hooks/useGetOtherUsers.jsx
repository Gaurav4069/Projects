import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {

 const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        //kyuki humne user route pe middleware lagya hai isliye hme withcredentials true rakhana otherwise vo not authenticated error hi dega
        axios.defaults.withCredentials = true;
       const res = await axios.get(`http://localhost:8080/api/v1/user/` );
        dispatch(setOtherUsers(res.data));
     } catch (error) {
       console.log(error);
     }
    }
    fetchOtherUsers();
 },[])
}

export default useGetOtherUsers