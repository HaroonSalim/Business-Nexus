import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, MessageCircle, TrendingUp, Briefcase } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { mockInvestors, mockUsers } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

export default function InvestorProfile() {
  const { id } = useParams<{ id: string }>()
  const { user: currentUser } = useAuth()
  
  const investor = mockInvestors.find(inv => inv.id === id) || 
                  mockUsers.find(u => u.id === id && u.role === 'investor')
  
  if (!investor) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Investor not found</h2>
          <p className="text-gray-600 mt-2">The investor profile you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  const isOwnProfile = currentUser?.id === investor.id

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const investorData = 'investmentInterests' in investor ? investor : {
    ...investor,
    investmentInterests: ['Technology', 'Healthcare'],
    portfolio: ['Various Startups'],
    investmentRange: { min: 50000, max: 1000000 },
    totalInvestments: 5
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={investor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(investor.name)}&size=128`}
              alt={investor.name}
              className="h-24 w-24 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{investor.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{investor.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined {new Date(investor.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
                  Investor
                </span>
              </div>
            </div>
            {!isOwnProfile && currentUser?.role === 'entrepreneur' && (
              <div className="flex space-x-2">
                <Link to={`/chat/${investor.id}`}>
                  <Button>
                    <MessageCircle size={16} className="mr-2" />
                    Message
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {investor.bio || 'This investor hasn\'t added a bio yet.'}
              </p>
            </Card>

            {/* Investment Interests */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Interests</h2>
              <div className="flex flex-wrap gap-2">
                {investorData.investmentInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </Card>

            {/* Portfolio */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase size={20} className="mr-2" />
                Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {investorData.portfolio.map((company, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{company}</h3>
                    <p className="text-sm text-gray-600 mt-1">Investment portfolio company</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Investment Stats */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2" />
                Investment Stats
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Total Investments</span>
                  <p className="text-2xl font-bold text-primary-600">{investorData.totalInvestments}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Investment Range</span>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(investorData.investmentRange.min)} - {formatCurrency(investorData.investmentRange.max)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Focus Stage</span>
                  <p className="font-semibold text-gray-900">Seed to Series A</p>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{investor.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{investor.location}</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Active investor on platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Looking for new opportunities</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 