export interface User {
  id: string;
  name: string;
  email: string;
  role: 'investor' | 'entrepreneur';
  avatar?: string;
  bio?: string;
  location?: string;
  joinedDate: string;
}

export interface Investor extends User {
  role: 'investor';
  investmentInterests: string[];
  portfolio: string[];
  investmentRange: {
    min: number;
    max: number;
  };
  totalInvestments: number;
}

export interface Entrepreneur extends User {
  role: 'entrepreneur';
  startupName: string;
  startupDescription: string;
  industry: string;
  fundingNeed: number;
  fundingStage: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'ipo';
  pitchDeck?: string;
  website?: string;
}

export interface CollaborationRequest {
  id: string;
  investorId: string;
  entrepreneurId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage: ChatMessage;
  updatedAt: string;
} 