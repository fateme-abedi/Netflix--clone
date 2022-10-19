import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Navbar(props) {
  const { user, logOut } = UserAuth()
  const navigate = useNavigate()

  const logOutHandler = async (e) => {
    e.preventDefault()
    try {
      await logOut()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  console.log(user)
  return (
    <div className="flex items-center justify-between p-4 w-full absolute z-[100]">
      <Link to="/">
        <h1 className="text-4xl font-bold text-red-700 cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="pr-4 text-white rounded cursor-pointer">
              Account
            </button>
          </Link>

          <button
            onClick={logOutHandler}
            className="px-6 py-2 text-white bg-red-600 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="pr-4 text-white rounded cursor-pointer">
              Sing In
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-6 py-2 text-white bg-red-600 rounded cursor-pointer">
              Sing Up
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
