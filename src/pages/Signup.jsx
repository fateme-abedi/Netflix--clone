import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Signup(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')
  const { user, signUp } = UserAuth()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email, password)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="w-full h-full object-cover hidden sm:block absolute"
          src="https://avatars.dzeninfra.ru/get-zen_doc/1718701/pub_5e3444e8d310cc6ad4ea9f27_5e344b3b7caf8e37796ba462/scale_1200"
          alt=""
        />
        <div className="w-full h-screen top-0 left-0 bg-black/40  fixed"></div>
        <div className="py-24 px-4 w-full fixed z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="font-bold text-3xl">Sign Up</h1>
              {error ? <p className="p-4 bg-red-400 my-3">{error}</p> : null}
              <form className="w-full flex flex-col" onSubmit={submitHandler}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="p-3 my-4 bg-gray-700 rounded"
                  autoComplete="email"
                  placeholder="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="p-3 my-4 bg-gray-700 rounded"
                  autoComplete="password"
                  placeholder="password"
                />
                <button className="bg-red-700 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-gray-500">
                  <p>
                    <input type="checkbox" className="mr-2" /> Remember me
                  </p>
                  <p>Need help?</p>
                </div>
                <p className="py-8 mx-auto">
                  <span className="text-gray-500">Already have account?</span>
                  <Link to="/login"> Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
