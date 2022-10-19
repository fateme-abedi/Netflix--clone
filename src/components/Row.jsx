import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

function Row({ title, fetchUrl, rowId }) {
  const [movies, setMovies] = useState([])
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user } = UserAuth()

  const movieId = doc(db, 'users', `${user?.email}`)
  const savedShow = async () => {
    if (user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieId, {
        savedShows: arrayUnion,
        id: item.id,
        title: item.title,
        img: item.backdrop_path,
      })
    } else {
      alert('Please logIn to save a mivie')
    }
  }

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((response) => {
        setMovies(response.data.results)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }, [fetchUrl])

  const scrollLeft = () => {
    const slider = document.getElementById('slider' + rowId)
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const scrollRight = () => {
    const slider = document.getElementById('slider' + rowId)
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <h1 className="p-5 my-2 font-bold text-white md:text-xl">{title}</h1>
      <div className="relative flex items-center gap-1 group">
        <MdChevronLeft
          onClick={scrollLeft}
          className="left-0 z-10 hidden text-white rounded-full opacity-50 hover:opacity-100 group-hover:block"
          size={40}
        />
        <div
          id={'slider' + rowId}
          className="relative w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="block w-full h-auto"
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item.title}
              />
              <div className="absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/60 hover:opacity-100">
                <p className="flex items-center justify-center h-full text-xs font-bold text-center white-space-normal md:text-sm ">
                  {item.title}
                </p>

                <p onClick={savedShow}>
                  {like ? (
                    <FaHeart className="absolute text-gray-300 top-4 left-4" />
                  ) : (
                    <FaRegHeart className="absolute text-gray-300 top-4 left-4" />
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={scrollRight}
          className="right-0 z-10 hidden text-white rounded-full opacity-50 hover:opacity-100 group-hover:block"
          size={40}
        />
      </div>
    </>
  )
}

export default Row
