import React from 'react';
import Link from 'next/link';
import HamburgerMenu from './hamburger-spin';
import Mobilnav from './mobilnav';




function Navbar() {
  return (
    <header className='bg-cover bg-center'>
        <nav className="flex justify-between items-center text-white backdrop-blur-sm bg-black bg-opacity-40 p-6 rounded-bl-3xl rounded-br-3xl overflow-hidden border-b border-white/30">

            <div className="flex">
                <Link href="/" className="m-4 text-2xl">
                    AstroTour
                </Link>
            </div>

            <div className="flex justify-center flex-grow">
                <div className='hidden md:block'>
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
            </div>

            <div className='hidden md:block'>
                <Link href="/registration/login" className="m-4 flex justify-between  rounded-xl border p-1">
                    Bejelentkezés
                </Link>
            </div>
        </nav>

        <div className='md:hidden m-auto p-0'>
            <Mobilnav />
        </div>

        <div className='hidden md:block'>
            <HamburgerMenu />
        </div>
    </header>
  )
}

export default Navbar;