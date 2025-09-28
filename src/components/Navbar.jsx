import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
  isActive
    ? "px-3 py-2 rounded font-semibold text-red-500 bg-red-500/10 border border-red-500/40"
    : "px-3 py-2 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
     <header className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Logo + Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            GeoExplorer
          </Link>
          <div className="flex gap-4">
            <NavLink to="/countries" className={linkClass}>Countries</NavLink>
            <NavLink to="/collection" className={linkClass}>Collection</NavLink>
            <NavLink to="/quiz" className={linkClass}>Quiz</NavLink>
            <NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink>
          </div>
        </div>
        {/* Right side: Theme toggle */}
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Navbar;