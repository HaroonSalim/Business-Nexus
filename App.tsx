import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import InvestorDashboard from './pages/InvestorDashboard'
import EntrepreneurDashboard from './pages/EntrepreneurDashboard'
import InvestorProfile from './pages/InvestorProfile'
import EntrepreneurProfile from './pages/EntrepreneurProfile'
import Chat from './pages/Chat'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard/investor" 
              element={
                <ProtectedRoute requiredRole="investor">
                  <InvestorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/entrepreneur" 
              element={
                <ProtectedRoute requiredRole="entrepreneur">
                  <EntrepreneurDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/investor/:id" 
              element={
                <ProtectedRoute>
                  <InvestorProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/entrepreneur/:id" 
              element={
                <ProtectedRoute>
                  <EntrepreneurProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat/:userId" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App 