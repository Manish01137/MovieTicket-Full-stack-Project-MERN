import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className='relative pt-28 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 min-h-[80vh]'>
      

      <BlurCircle top="150px" left="0px"/>
      <BlurCircle buttom="50px" right="50px"/>
      <h1 className='text-2xl font-semibold mb-8'>Now Showing</h1>

      <div className='grid 
        grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-4 
        gap-8'>
        
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
    </div>
  )
}

export default Movies
