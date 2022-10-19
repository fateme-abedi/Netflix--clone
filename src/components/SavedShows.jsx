import React, { useState, useEffect } from 'react'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'
import { onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { AiOutlineClose } from 'react/icons/ai'

function SavedShows(props) {
  const [movies, setMovies] = useState([])
  const { user } = UserAuth()
  const scrollLeft = () => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const scrollRight = () => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  useEffect(() => {
    onSnapshot(
      doc(db, 'users', `${user?.email}`, (doc) => {
        setMovies(doc.data()?.savedShows)
      }),
    )
  }, [user?.email])

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteShows = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id !== passedId)
      await updateDoc(movieRef, {
        savedShows: result,
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <div className="relative flex items-center gap-1 group">
        <MdChevronLeft
          onClick={scrollLeft}
          className="left-0 z-10 hidden text-white rounded-full opacity-50 hover:opacity-100 group-hover:block"
          size={40}
        />
        <div
          id={'slider'}
          className="relative w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="block w-full h-auto"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item.title}
              />
              <div className="absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/60 hover:opacity-100">
                <p className="flex items-center justify-center h-full text-xs font-bold text-center white-space-normal md:text-sm ">
                  {item.title}
                </p>

                <p
                  onClick={() => deleteShows(item.id)}
                  className="absolute top-4 right-4 text-gray-300"
                >
                  <AiOutlineClose />
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

export default SavedShows
