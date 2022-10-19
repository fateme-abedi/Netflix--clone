import React from 'react'
import SavedShows from '../components/SavedShows'

function Account(props) {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="w-full h-[450px] object-cover"
          src="https://avatars.dzeninfra.ru/get-zen_doc/1718701/pub_5e3444e8d310cc6ad4ea9f27_5e344b3b7caf8e37796ba462/scale_1200"
          alt=""
        />

        <div className="w-full bg-black/60 h-[500px] top-0 left-0 fixed"></div>

        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold"> My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  )
}

export default Account
