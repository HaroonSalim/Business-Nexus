import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, Clock, MessageCircle, User, TrendingUp } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { mockCollaborationRequests, mockUsers, mockInvestors } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { CollaborationRequest } from '../types'

export default function EntrepreneurDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'requests' | 'stats'>('requests')

  // Get collaboration requests for current user
  const userRequests = mockCollaborationRequests.filter(
    req => req.entrepreneurId === user?.id
  )

  const getInvestorById = (id: string) => {
    return mockUsers.find(u => u.id === id)
  }

  const getStatusColor = (status: CollaborationRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'accepted': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: CollaborationRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock size={16} />
      case 'accepted': return <CheckCircle size={16} />
      case 'rejected': return <XCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const stats = {
    totalRequests: userRequests.length,
    pending: userRequests.filter(r => r.status === 'pending').length,
    accepted: userRequests.filter(r => r.status === 'accepted').length,
    rejected: userRequests.filter(r => r.status === 'rejected').length
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrepreneur Dashboard</h1>
          <p className="text-gray-600">Manage your collaboration requests and track your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.totalRequests}</div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <div className="text-sm text-gray-600">Accepted</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Collaboration Requests
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Collaboration Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {userRequests.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No collaboration requests yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Investors will reach out to you through the platform when they're interested in your startup.
                  </p>
                  <div className="mt-6">
                    <Link to={`/profile/entrepreneur/${user?.id}`}>
                      <Button>Update Your Profile</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              userRequests.map((request) => {
                const investor = getInvestorById(request.investorId)
                return (
                  <Card key={request.id} className="hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={investor?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(investor?.name || '')}`}
                          alt={investor?.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{investor?.name}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}
                              <span>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{investor?.location}</p>
                          <div className="mt-2">
                            <p className="text-gray-800">{request.message}</p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Received {formatDate(request.createdAt)}
                            </span>
                            <div className="flex space-x-2">
                              <Link to={`/profile/investor/${investor?.id}`}>
                                <Button variant="outline" size="sm">
                                  <User size={16} className="mr-1" />
                                  View Profile
                                </Button>
                              </Link>
                              <Link to={`/chat/${investor?.id}`}>
                                <Button size="sm">
                                  <MessageCircle size={16} className="mr-1" />
                                  Message
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Acceptance Rate</span>
                  <span className="font-medium">
                    {stats.totalRequests > 0 
                      ? `${Math.round((stats.accepted / stats.totalRequests) * 100)}%`
                      : '0%'
                    }
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ 
                      width: `${stats.totalRequests > 0 ? (stats.accepted / stats.totalRequests) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Optimization Tips</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm">Add a compelling startup description</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm">Upload your pitch deck</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-yellow-600" />
                  <span className="text-sm">Add testimonials or case studies</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
} 