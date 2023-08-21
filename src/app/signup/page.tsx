"use client"


import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Signup = () => {

  const router = useRouter()

  const [data, setData] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [disabledButton, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      console.log(data)
      const response = await axios.post("/api/users/signup", data);
      toast.success("Signin Success")
      console.log("signup success", response);
      router.push('/login')
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data.email.length > 0 && data.password.length > 0 && data.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)
    }
  }, [data])

  return (
    <div className='w-screen flex flex-col justify-center items-center h-screen'>
      <h1>
        {loading ? "signing up" : "Sign up"}
      </h1>
      <div className='flex flex-col '>
        <label htmlFor='email' className='mt-2'>Email</label>
        <input
          type='text'
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className='rounded-lg p-2 text-black outline-none '
          placeholder='Email'
        />
        <label htmlFor='email' className='mt-2'>Username</label>
        <input
          type='text'
          onChange={(e) => setData({ ...data, username: e.target.value })}
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
          onClick={onSignup}
          disabled={disabledButton}
          className={!disabledButton ? 'w-auto p-2 rounded-lg bg-white text-sm text-black mt-4 transition duration-150' : 'w-auto p-2 rounded-lg bg-gray-400 text-sm text-white mt-4 disabled transition duration-150'}>
          Signup
        </button>
      </div>
      <Link href={"/login"} className='mt-2'>
        Go to login
      </Link>
    </div>
  )
}

export default Signup