import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';

const Signup = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/register", input, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  }


  return (
    <div className='flex items-center justify-center w-screen pt-10 h-screen'>
      <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
        <h1 className='font-bold text-2xl uppercase my-2'>Signup</h1>
        <input value={input.fullname} name='fullname' onChange={changeHandler} type='text' placeholder='Name' className='border border-gray-400 rounded-md px-2 py-1' />
        <input value={input.email} name='email' onChange={changeHandler} type='email' placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1' />
        <input value={input.password} name='password' onChange={changeHandler} type='password' placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1' />
        <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>Signup</button>
        <p>Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup
