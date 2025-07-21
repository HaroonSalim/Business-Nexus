import { User, Investor, Entrepreneur, CollaborationRequest, ChatMessage } from '../types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'investor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b34e4022?w=100',
    bio: 'Experienced investor focused on early-stage tech startups with 10+ years in venture capital.',
    location: 'San Francisco, CA',
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    role: 'entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    bio: 'Serial entrepreneur with a passion for sustainable technology and green energy solutions.',
    location: 'Austin, TX',
    joinedDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    role: 'investor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    bio: 'Angel investor and former tech executive specializing in fintech and AI startups.',
    location: 'New York, NY',
    joinedDate: '2023-01-08'
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david.park@email.com',
    role: 'entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    bio: 'Founder of multiple successful startups, currently working on revolutionizing healthcare delivery.',
    location: 'Seattle, WA',
    joinedDate: '2023-03-10'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    role: 'entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    bio: 'EdTech entrepreneur focused on making quality education accessible to underserved communities.',
    location: 'Chicago, IL',
    joinedDate: '2023-02-28'
  }
]

export const mockInvestors: Investor[] = [
  {
    ...mockUsers[0],
    role: 'investor',
    investmentInterests: ['FinTech', 'AI/ML', 'SaaS', 'Healthcare'],
    portfolio: ['TechCorp', 'DataFlow', 'MedTech Solutions', 'AI Innovations'],
    investmentRange: { min: 50000, max: 2000000 },
    totalInvestments: 15
  } as Investor,
  {
    ...mockUsers[2],
    role: 'investor',
    investmentInterests: ['FinTech', 'Blockchain', 'Cybersecurity'],
    portfolio: ['CryptoSecure', 'PaymentFlow', 'SecureNet'],
    investmentRange: { min: 100000, max: 5000000 },
    totalInvestments: 22
  } as Investor
]

export const mockEntrepreneurs: Entrepreneur[] = [
  {
    ...mockUsers[1],
    role: 'entrepreneur',
    startupName: 'GreenTech Solutions',
    startupDescription: 'Developing renewable energy management systems for residential and commercial use. Our AI-powered platform optimizes energy consumption and reduces costs by up to 40%.',
    industry: 'CleanTech',
    fundingNeed: 1500000,
    fundingStage: 'series-a',
    website: 'https://greentech-solutions.com'
  } as Entrepreneur,
  {
    ...mockUsers[3],
    role: 'entrepreneur',
    startupName: 'HealthConnect',
    startupDescription: 'Telemedicine platform connecting patients with healthcare providers through AI-driven triage and personalized care recommendations.',
    industry: 'Healthcare',
    fundingNeed: 2500000,
    fundingStage: 'series-b',
    website: 'https://healthconnect.io'
  } as Entrepreneur,
  {
    ...mockUsers[4],
    role: 'entrepreneur',
    startupName: 'EduBridge',
    startupDescription: 'Online learning platform providing personalized education experiences using adaptive learning algorithms and gamification.',
    industry: 'EdTech',
    fundingNeed: 800000,
    fundingStage: 'seed',
    website: 'https://edubridge.org'
  } as Entrepreneur
]

export const mockCollaborationRequests: CollaborationRequest[] = [
  {
    id: 'req-1',
    investorId: '1',
    entrepreneurId: '2',
    status: 'pending',
    message: 'Hi Michael, I\'m interested in learning more about GreenTech Solutions. Your approach to renewable energy management aligns well with my investment thesis. Would love to discuss further.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'req-2',
    investorId: '3',
    entrepreneurId: '4',
    status: 'accepted',
    message: 'David, your HealthConnect platform shows great potential. I\'d like to schedule a meeting to discuss investment opportunities.',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z'
  },
  {
    id: 'req-3',
    investorId: '1',
    entrepreneurId: '5',
    status: 'rejected',
    message: 'Lisa, while EduBridge is a promising concept, it falls outside my current investment focus. Best of luck with your venture!',
    createdAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-09T11:20:00Z'
  }
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: '1',
    receiverId: '2',
    message: 'Hi Michael! I\'ve reviewed your pitch deck and I\'m impressed with your renewable energy solution.',
    timestamp: '2024-01-16T09:30:00Z',
    read: true
  },
  {
    id: 'msg-2',
    senderId: '2',
    receiverId: '1',
    message: 'Thank you, Sarah! I\'d love to discuss the technical details and our go-to-market strategy.',
    timestamp: '2024-01-16T09:45:00Z',
    read: true
  },
  {
    id: 'msg-3',
    senderId: '1',
    receiverId: '2',
    message: 'Perfect! Let\'s schedule a call for this Thursday at 2 PM. I have some questions about your scalability plans.',
    timestamp: '2024-01-16T10:15:00Z',
    read: false
  }
] 