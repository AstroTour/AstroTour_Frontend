import React from 'react';
import Link from 'next/link';



function Navbar() {
  return (
    <header className='bg-cover bg-center'>
        <nav className="flex justify-between items-center text-white backdrop-blur-sm bg-opacity-30 p-6 rounded-bl-3xl rounded-br-3xl overflow-hidden border-b border-white/30">

        <div className="flex">
          <Link href="/" className="m-4">
            AstroTour
          </Link>
        </div>

        <div className="flex justify-center flex-grow">
          <Link href="/about" className="m-4">
            Rólunk
          </Link>
          <Link href="/reservation" className="m-4">
            Foglalás
          </Link>
          <Link href="/planets" className="m-4">
            Bolygók
          </Link>
        </div>

        <div>
          <Link href="/registration/login" className="m-4 flex justify-between">
            Login
          </Link>
        </div>
        <div>
         
        </div>
      </nav>
    </header>
  )
}

export default Navbar;