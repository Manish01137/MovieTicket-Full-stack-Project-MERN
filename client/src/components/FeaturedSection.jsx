import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'
import BlurCircle from './BlurCircle'

const FeaturedSection = () => {
    return (
        <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <BlurCircle top='0px' left='-100px' />
            <BlurCircle bottom='0px' right='-100px' />

            <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
            <h2 className='text-3xl font-semibold mt-1 mb-10'>Featured Movies</h2>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {dummyShowsData.slice(0, 8).map((movie) => (
                    <MovieCard movie={movie} key={movie._id} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedSection
