import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, MessageCircle, ExternalLink, Briefcase, Target, TrendingUp } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { mockEntrepreneurs, mockUsers } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

export default function EntrepreneurProfile() {
  const { id } = useParams<{ id: string }>()
  const { user: currentUser } = useAuth()
  
  const entrepreneur = mockEntrepreneurs.find(ent => ent.id === id) || 
                      mockUsers.find(u => u.id === id && u.role === 'entrepreneur')
  
  if (!entrepreneur) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Entrepreneur not found</h2>
          <p className="text-gray-600 mt-2">The entrepreneur profile you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  const isOwnProfile = currentUser?.id === entrepreneur.id

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const entrepreneurData = 'startupName' in entrepreneur ? entrepreneur : {
    ...entrepreneur,
    startupName: 'Startup Company',
    startupDescription: 'Building innovative solutions',
    industry: 'Technology',
    fundingNeed: 500000,
    fundingStage: 'seed' as const,
    website: ''
  }

  const getFundingStageColor = (stage: string) => {
    switch (stage) {
      case 'seed': return 'bg-green-100 text-green-800'
      case 'series-a': return 'bg-blue-100 text-blue-800'
      case 'series-b': return 'bg-purple-100 text-purple-800'
      case 'series-c': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={entrepreneur.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(entrepreneur.name)}&size=128`}
              alt={entrepreneur.name}
              className="h-24 w-24 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{entrepreneur.name}</h1>
              <h2 className="text-xl font-semibold text-primary-600 mt-1">{entrepreneurData.startupName}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{entrepreneur.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined {new Date(entrepreneur.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  Entrepreneur
                </span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getFundingStageColor(entrepreneurData.fundingStage)}`}>
                  {entrepreneurData.fundingStage.charAt(0).toUpperCase() + entrepreneurData.fundingStage.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
            {!isOwnProfile && currentUser?.role === 'investor' && (
              <div className="flex space-x-2">
                <Link to={`/chat/${entrepreneur.id}`}>
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
                {entrepreneur.bio || 'This entrepreneur hasn\'t added a bio yet.'}
              </p>
            </Card>

            {/* Startup Description */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase size={20} className="mr-2" />
                Startup Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {entrepreneurData.startupDescription}
              </p>
              {entrepreneurData.website && (
                <a
                  href={entrepreneurData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Visit Website
                  <ExternalLink size={16} className="ml-1" />
                </a>
              )}
            </Card>

            {/* Funding Information */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target size={20} className="mr-2" />
                Funding Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Funding Need</h3>
                  <p className="text-2xl font-bold text-primary-600">{formatCurrency(entrepreneurData.fundingNeed)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Stage</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFundingStageColor(entrepreneurData.fundingStage)}`}>
                    {entrepreneurData.fundingStage.charAt(0).toUpperCase() + entrepreneurData.fundingStage.slice(1).replace('-', ' ')}
                  </span>
                </div>
              </div>
            </Card>

            {/* Pitch Deck */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pitch Deck</h2>
              {entrepreneurData.pitchDeck ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Pitch deck available for interested investors</p>
                  <Button className="mt-2" disabled>
                    Request Access
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No pitch deck uploaded yet</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2" />
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Industry</span>
                  <p className="font-semibold text-gray-900">{entrepreneurData.industry}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Funding Stage</span>
                  <p className="font-semibold text-gray-900">
                    {entrepreneurData.fundingStage.charAt(0).toUpperCase() + entrepreneurData.fundingStage.slice(1).replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Target Funding</span>
                  <p className="font-semibold text-gray-900">{formatCurrency(entrepreneurData.fundingNeed)}</p>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{entrepreneur.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{entrepreneur.location}</span>
                </div>
                {entrepreneurData.website && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Website</span>
                    <a
                      href={entrepreneurData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      Visit
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Actively fundraising</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Looking for strategic investors</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 