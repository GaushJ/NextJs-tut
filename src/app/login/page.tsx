"use client"


import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'

const Login = () => {
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const onLogin = async () => {
    try {
      console.log("hello")
      setLoading(true)
      const response = await axios.post('api/users/login', data)
      console.log(response.data)
      toast.success("login successfull")
      router.push(`/profile/${response.data.user.username}`)
    } catch (error) {
      toast.error("login unsuccessfull")
      console.log("an error occurred", error)
      setLoading(false)
    }
  }
  return (
    <div className='w-screen flex flex-col justify-center items-center h-screen'>
      <h1>
        {loading ? "logging in" : "Login"}
      </h1>
      <div className='flex flex-col '>
        <label htmlFor='email' className='mt-2'>Email</label>
        <input
          type='text'
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className='rounded-lg p-2 text-black outline-none '
          placeholder='Email'
        />
        <label htmlFor='email' className='mt-2'>password</label>
        <input
          type='password'
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className='rounded-lg p-2 text-black outline-none '
          placeholder='password'
        />
        <button
          onClick={onLogin}
          className='w-auto p-2 rounded-lg bg-white text-sm text-black mt-4'>
          Login
        </button>
      </div>
      <Link href={"/signup"} className='mt-2'>
        Go to Signup
      </Link>
    </div>
  )
}

export default Login