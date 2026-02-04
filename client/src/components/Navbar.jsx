/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Theaters', path: '/' },
  { name: 'Releases', path: '/' },
  { name: 'Favorites', path: '/favorite' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Glass Background */}
      <div className="mx-4 mt-4 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="w-36" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative text-white/80 hover:text-white transition group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Search className="hidden md:block w-5 h-5 text-white/80 hover:text-white cursor-pointer transition" />

            <button className="px-5 py-2 rounded-full bg-primary text-black font-medium
              hover:bg-primary-dull hover:scale-105 transition-all duration-300">
              Login
            </button>

            {/* Mobile Menu Icon */}
            <Menu
              onClick={() => setOpen(true)}
              className="md:hidden w-7 h-7 text-white cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
          >
            <div className="absolute top-6 right-6">
              <X
                onClick={() => setOpen(false)}
                className="w-7 h-7 text-white cursor-pointer"
              />
            </div>

            <div className="h-full flex flex-col items-center justify-center gap-8 text-xl font-medium">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-primary transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
