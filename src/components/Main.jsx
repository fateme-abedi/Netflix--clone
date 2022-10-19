import React, { useEffect, useState } from 'react'
import axios from 'axios'
import requests from '../Requests'

function Main(props) {
  const [movies, setMovies] = useState([])
  const movie = movies[Math.floor(Math.random() * movies.length)]
  useEffect(() => {
    axios
      .get(requests.requestPopular)
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
  }, [])

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>

        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movies?.title}
          className="w-full h-[550px]"
        />

        <div className="absolute top-[20%] w-full p-4 md:p-8">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            {movie?.title}
          </h1>
          <div className="my-5">
            <button className="px-5 py-2 text-black bg-gray-300 border border-gray-300">
              Play
            </button>
            <button className="px-5 py-2 ml-4 text-white border border-gray-300">
              Watch later
            </button>
          </div>
          <p className="my-2 text-sm tetxt-gray-400">
            Released:{movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 155)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
