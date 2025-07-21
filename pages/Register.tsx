import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'
import InputField from '../components/InputField'
import Card from '../components/Card'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'entrepreneur' as 'investor' | 'entrepreneur',
    bio: '',
    location: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await register(formData)
      if (success) {
        const redirectPath = formData.role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur'
        navigate(redirectPath)
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-primary-600">Business Nexus</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Enter your full name"
            />
            
            <InputField
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="Enter your email"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a...
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="entrepreneur"
                    checked={formData.role === 'entrepreneur'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="mr-2"
                  />
                  Entrepreneur
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="investor"
                    checked={formData.role === 'investor'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="mr-2"
                  />
                  Investor
                </label>
              </div>
            </div>
            
            <InputField
              label="Location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State/Country"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
} 