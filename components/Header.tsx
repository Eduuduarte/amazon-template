import Image from 'next/image'
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header>
        {/* Top nav */}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div className='mt-2 mr-2 flex items-center flex-grow sm:flex-grow-0'>
                <Image 
                    src="https://links.papareact.com/f90"
                    alt=''
                    width={150}
                    height={40}
                    className='cursor-pointer'
                />
            </div>
            {/* Search */}
            <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
                <MagnifyingGlassIcon className='h-12 p-4'/>

            </div>
        </div>

        {/* Bottom nav */}
        <div>

        </div>
    </header>
  )
}

export default Header