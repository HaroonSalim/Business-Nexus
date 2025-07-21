import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { mockChatMessages, mockUsers } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { ChatMessage } from '../types'

export default function Chat() {
  const { userId } = useParams<{ userId: string }>()
  const { user: currentUser } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const otherUser = mockUsers.find(u => u.id === userId)

  useEffect(() => {
    if (currentUser && userId) {
      // Filter messages between current user and the other user
      const conversationMessages = mockChatMessages.filter(
        msg => (msg.senderId === currentUser.id && msg.receiverId === userId) ||
               (msg.senderId === userId && msg.receiverId === currentUser.id)
      )
      setMessages(conversationMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()))
    }
  }, [currentUser, userId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !currentUser || !userId) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: userId,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate typing indicator and auto-response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const autoReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: userId,
        receiverId: currentUser.id,
        message: getAutoReply(newMessage.trim()),
        timestamp: new Date(Date.now() + 1000).toISOString(),
        read: false
      }
      setMessages(prev => [...prev, autoReply])
    }, 2000)
  }

  const getAutoReply = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! Thanks for reaching out. I'm interested in learning more about your ${currentUser?.role === 'investor' ? 'investment opportunities' : 'startup'}.`
    }
    if (lowerMessage.includes('meeting') || lowerMessage.includes('call')) {
      return "I'd be happy to schedule a call. What times work best for you this week?"
    }
    if (lowerMessage.includes('investment') || lowerMessage.includes('funding')) {
      return "That sounds interesting! Could you share more details about your funding requirements and timeline?"
    }
    return "Thanks for your message! I'll get back to you soon with more details."
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!otherUser) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <p className="text-gray-600 mt-2">The user you're trying to chat with doesn't exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card padding={false} className="h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Link to={currentUser?.role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur'}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} />
                </Button>
              </Link>
              <img
                src={otherUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&size=40`}
                alt={otherUser.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-gray-900">{otherUser.name}</h2>
                <p className="text-sm text-gray-500">
                  {otherUser.role === 'investor' ? 'Investor' : 'Entrepreneur'} • {otherUser.location}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Video size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Start the conversation with {otherUser.name}</p>
              </div>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === currentUser?.id
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isOwnMessage
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isOwnMessage ? 'text-primary-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${otherUser.name}...`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send size={16} />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
} 