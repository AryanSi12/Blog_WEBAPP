import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { Logo, Container } from './index'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { name: 'Home', slug: '/', active: true },
    { name: 'About us', slug: '/About', active: !authStatus },
    { name: 'Sign up', slug: '/Signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus }
  ]

  return (
    <header className="bg-gradient-to-r from-teal-100 to-blue-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            
            <Logo width="70px" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {nav.map((item) => 
            item.active ? (
              <NavLink 
                key={item.name} 
                to={item.slug} 
                className={({isActive})=>`font-medium text-xl ${isActive ? "text-teal-500" : "text-slate-700"} text-lg font-semibold leading-6 transition duration-200 hover:text-teal-600`}
              >
                {item.name}
              </NavLink>
            ) : null
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {authStatus ? (
            <>
              <button
                onClick={() => navigate('/account')}
                className="inline-block px-6 py-2 text-lg font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-full transition duration-200"
              >
                My Account
              </button>
              <LogoutBtn />
            </>
          ) : (
            <Link 
              to="/Login" 
              className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700 transition duration-200"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Logo width="70px" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {nav.map((item) =>
                    item.active ? (
                      <Link
                        key={item.name}
                        to={item.slug}
                        className="block rounded-lg py-2 pl-6 pr-3 text-lg font-semibold leading-7 text-gray-900 bg-gradient-to-r from-teal-100 to-blue-100 hover:from-teal-200 hover:to-blue-200 transition duration-200"
                      >
                        {item.name}
                      </Link>
                    ) : null
                  )}
                </div>
                <div className="py-6">
                  {authStatus ? (
                    <button
                      onClick={() => navigate('/account')}
                      className="block w-full rounded-lg py-2 px-3 text-lg font-semibold leading-7 text-gray-900 bg-gradient-to-r from-teal-100 to-blue-100 hover:from-teal-200 hover:to-blue-200 transition duration-200"
                    >
                      My Account
                    </button>
                  ) :  (
                    <Link 
                      to="/Login" 
                      className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700 transition duration-200"
                    >
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                  <LogoutBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
