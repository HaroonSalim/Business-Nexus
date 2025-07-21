# Business Nexus

A complete front-end platform connecting investors and entrepreneurs, built with React, Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication & Authorization
- Role-based registration (Investor/Entrepreneur)
- Secure login with role-based dashboard redirection
- Protected routes with role-specific access control
- Persistent user sessions with localStorage

### Dashboards
- **Investor Dashboard**: Browse entrepreneurs, filter by industry/stage, view startup details
- **Entrepreneur Dashboard**: Track collaboration requests, view analytics, manage profile

### User Profiles
- **Investor Profiles**: Investment interests, portfolio, funding ranges, contact info
- **Entrepreneur Profiles**: Startup descriptions, funding needs, pitch deck, business details
- Profile viewing with role-based interaction buttons

### Real-time Style Chat
- 1-on-1 messaging between investors and entrepreneurs
- Auto-reply simulation for demonstration
- Typing indicators and message timestamps
- Responsive chat interface with smooth scrolling

### UI/UX
- Modern, responsive design with Tailwind CSS
- Mobile-first approach with breakpoint optimization
- Beautiful animations and hover effects
- Consistent design system with reusable components

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios (configured for mock APIs)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button component with variants
│   ├── Card.tsx        # Card container component
│   ├── InputField.tsx  # Form input with validation
│   ├── Navbar.tsx      # Navigation header
│   ├── Sidebar.tsx     # Dashboard sidebar navigation
│   └── ProtectedRoute.tsx # Route protection HOC
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state management
├── data/              # Mock data and API simulation
│   └── mockData.ts    # Users, investors, entrepreneurs data
├── hooks/             # Custom React hooks
├── layouts/           # Layout components
│   └── DashboardLayout.tsx # Main dashboard layout
├── pages/             # Route components
│   ├── Login.tsx      # Authentication login
│   ├── Register.tsx   # User registration
│   ├── InvestorDashboard.tsx    # Investor main page
│   ├── EntrepreneurDashboard.tsx # Entrepreneur main page
│   ├── InvestorProfile.tsx      # Investor profile view
│   ├── EntrepreneurProfile.tsx  # Entrepreneur profile view
│   └── Chat.tsx       # Messaging interface
├── types/             # TypeScript type definitions
│   └── index.ts       # Application interfaces
├── utils/             # Utility functions
├── assets/            # Static assets
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone or download the project files
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 👥 Demo Accounts

The application includes pre-configured demo accounts for testing:

### Investor Account
- **Email**: sarah.johnson@email.com
- **Password**: any password (demo mode)
- **Features**: Browse entrepreneurs, view profiles, send messages

### Entrepreneur Account  
- **Email**: michael.chen@email.com
- **Password**: any password (demo mode)
- **Features**: View collaboration requests, manage profile, chat with investors

## 📱 Key Features Walkthrough

### 1. Registration & Login
- Choose your role (Investor or Entrepreneur)
- Fill in profile information
- Role-based dashboard redirection

### 2. Investor Experience
- Browse entrepreneur cards with filtering
- Filter by industry (CleanTech, Healthcare, EdTech)
- Filter by funding stage (Seed, Series A, Series B)
- Search by name, company, or description
- View detailed entrepreneur profiles
- Initiate conversations via chat

### 3. Entrepreneur Experience
- View incoming collaboration requests
- Track request status (Pending, Accepted, Rejected)
- Analytics dashboard with acceptance rates
- Profile optimization tips
- Direct messaging with interested investors

### 4. Chat System
- Real-time style messaging interface
- Auto-reply simulation for demo purposes
- Message timestamps and read status
- Responsive design with mobile support

## 🎨 Design System

### Color Palette
- **Primary**: Blue theme (#3B82F6)
- **Secondary**: Gray scale
- **Status Colors**: Green (success), Red (error), Yellow (warning)

### Components
- Consistent button variants (primary, secondary, outline, ghost)
- Form inputs with validation states
- Card containers with hover effects
- Responsive navigation with mobile support

### Typography
- Clear hierarchy with consistent font weights
- Readable text with proper contrast ratios
- Responsive text sizing

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Mock Data
The application uses mock data stored in `src/data/mockData.ts` including:
- User profiles (investors and entrepreneurs)
- Collaboration requests
- Chat messages
- Company information

### Adding New Features
1. Create components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.tsx`
4. Add mock data as needed in `src/data/mockData.ts`

## 📊 Performance & Optimization

- **Vite** for fast development and optimized builds
- **Code splitting** with React Router lazy loading
- **Image optimization** with responsive images
- **CSS optimization** with Tailwind CSS purging
- **TypeScript** for type safety and better DX

## 🔒 Security Considerations

- Client-side route protection
- Role-based access control
- Input validation and sanitization
- Secure data handling patterns

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with automatic builds

### Netlify
1. Build the project: `npm run build`
2. Upload `dist/` folder to Netlify
3. Configure SPA redirects

### Traditional Hosting
1. Run `npm run build`
2. Upload contents of `dist/` folder to web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with modern React patterns and best practices
- Utilizes Tailwind CSS for rapid UI development
- Includes Lucide React for beautiful icons
- Follows accessibility guidelines for inclusive design

---

**Business Nexus** - Connecting the future of business, one conversation at a time. 

# Contact:
For any inquiries or feedback, please contact the amazing dev behind this project: <br>
Haroon Salim [Github](https://github.com/HaroonSalim) <br>
