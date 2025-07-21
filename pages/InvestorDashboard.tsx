import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, MessageCircle, User, ExternalLink } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { mockEntrepreneurs } from '../data/mockData'
import { Entrepreneur } from '../types'

export default function InvestorDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterStage, setFilterStage] = useState('')

  const filteredEntrepreneurs = mockEntrepreneurs.filter(entrepreneur => {
    const matchesSearch = entrepreneur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrepreneur.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrepreneur.startupDescription.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesIndustry = !filterIndustry || entrepreneur.industry === filterIndustry
    const matchesStage = !filterStage || entrepreneur.fundingStage === filterStage
    
    return matchesSearch && matchesIndustry && matchesStage
  })

  const industries = [...new Set(mockEntrepreneurs.map(e => e.industry))]
  const fundingStages = [...new Set(mockEntrepreneurs.map(e => e.fundingStage))]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investor Dashboard</h1>
          <p className="text-gray-600">Discover promising entrepreneurs and startups</p>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search entrepreneurs, companies, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Stages</option>
                {fundingStages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Entrepreneurs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntrepreneurs.map((entrepreneur) => (
            <Card key={entrepreneur.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={entrepreneur.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(entrepreneur.name)}`}
                      alt={entrepreneur.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{entrepreneur.name}</h3>
                      <p className="text-sm text-gray-600">{entrepreneur.location}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    entrepreneur.fundingStage === 'seed' ? 'bg-green-100 text-green-800' :
                    entrepreneur.fundingStage === 'series-a' ? 'bg-blue-100 text-blue-800' :
                    entrepreneur.fundingStage === 'series-b' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {entrepreneur.fundingStage.charAt(0).toUpperCase() + entrepreneur.fundingStage.slice(1).replace('-', ' ')}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-primary-700">{entrepreneur.startupName}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {entrepreneur.startupDescription.length > 120 
                      ? `${entrepreneur.startupDescription.substring(0, 120)}...` 
                      : entrepreneur.startupDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded">{entrepreneur.industry}</span>
                  <span className="font-medium">{formatCurrency(entrepreneur.fundingNeed)} needed</span>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/profile/entrepreneur/${entrepreneur.id}`}>
                    <Button size="sm" className="flex-1">
                      <User size={16} className="mr-1" />
                      View Profile
                    </Button>
                  </Link>
                  <Link to={`/chat/${entrepreneur.id}`}>
                    <Button variant="outline" size="sm">
                      <MessageCircle size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEntrepreneurs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No entrepreneurs match your filters.</p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('')
                setFilterIndustry('')
                setFilterStage('')
              }}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
} 