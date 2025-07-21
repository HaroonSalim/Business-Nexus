import { Home, Users, MessageCircle, User, TrendingUp, Briefcase } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()

  const investorNavItems = [
    { name: 'Dashboard', href: '/dashboard/investor', icon: Home },
    { name: 'Entrepreneurs', href: '/entrepreneurs', icon: Users },
    { name: 'Portfolio', href: '/portfolio', icon: TrendingUp },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Profile', href: `/profile/investor/${user?.id}`, icon: User },
  ]

  const entrepreneurNavItems = [
    { name: 'Dashboard', href: '/dashboard/entrepreneur', icon: Home },
    { name: 'Investors', href: '/investors', icon: Users },
    { name: 'My Startup', href: '/startup', icon: Briefcase },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Profile', href: `/profile/entrepreneur/${user?.id}`, icon: User },
  ]

  const navItems = user?.role === 'investor' ? investorNavItems : entrepreneurNavItems

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium border-l-4 rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 