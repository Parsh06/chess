"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { CastleIcon, Menu, X } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-800/20 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <CastleIcon className="h-6 w-6 text-amber-400" />
          <span className="text-xl font-bold text-white">
            Chess<span className="text-amber-400">Predictor</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-amber-400 ${isActive("/") ? "text-amber-400" : "text-gray-300"}`}
          >
            Home
          </Link>
          <Link
            to="/options"
            className={`text-sm font-medium transition-colors hover:text-amber-400 ${isActive("/options") ? "text-amber-400" : "text-gray-300"}`}
          >
            Prediction Tools
          </Link>
          <a href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-amber-400">
            About
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-amber-400">
            Contact
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-900/20">
            Sign In
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-500 text-YELLOW">Sign Up</Button>
        </div>

        <button className="md:hidden text-gray-300 hover:text-amber-400" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className={`text-sm font-medium py-2 transition-colors hover:text-amber-400 ${isActive("/") ? "text-amber-400" : "text-gray-300"}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/options"
              className={`text-sm font-medium py-2 transition-colors hover:text-amber-400 ${isActive("/options") ? "text-amber-400" : "text-gray-300"}`}
              onClick={closeMenu}
            >
              Prediction Tools
            </Link>
            <a
              href="#"
              className="text-sm font-medium py-2 text-gray-300 transition-colors hover:text-amber-400"
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-medium py-2 text-gray-300 transition-colors hover:text-amber-400"
              onClick={closeMenu}
            >
              Contact
            </a>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-800">
              <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-900/20">
                Sign In
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-500 text-white">Sign Up</Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

