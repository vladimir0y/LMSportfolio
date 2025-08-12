# OpenLMS - Modern Learning Management System

A fully functional Learning Management System (LMS) with comprehensive admin capabilities, modern Apple-inspired design, and full SCORM suppor.

## 🚀 Features

### Public Side (No Authentication Required)
- **Course Catalog**: Browse all available courses without login
- **SCORM Playback**: Launch SCORM packages directly in the browser
- **Responsive Design**: Mobile-first design with smooth animations
- **Modern UI**: Apple-inspired design language with Framer Motion animations
- **Dark/Light Theme**: Automatic theme switching with system preference detection

### Admin Panel (Full LMS Management)
- **Authentication**: Secure JWT-based admin login
- **Course Management**: Create, edit, and organize courses with categories
- **Module System**: Hierarchical structure: Courses → Modules → Topics → Activities
- **SCORM Management**: Upload, extract, and manage SCORM packages
- **User Management**: Student and instructor role management
- **Quiz System**: Create and manage assessments with multiple question types
- **Analytics Dashboard**: Comprehensive overview of system usage
- **Content Versioning**: Track changes and manage content lifecycle

### Technical Features
- **SCORM Support**: Full SCORM 1.2 and 2004 compatibility
- **File Management**: Drag-and-drop uploads with automatic extraction
- **API-First**: RESTful API with comprehensive endpoints
- **Database**: PostgreSQL with TypeORM for robust data management
- **Security**: JWT authentication, role-based access control
- **Performance**: Optimized caching and static asset serving

## 🏗️ Architecture

```
├── frontend/                 # Next.js 14 Admin Panel + Public Site
│   ├── src/app/             # App Router structure
│   ├── src/components/      # Reusable UI components
│   └── src/app/admin/       # Admin panel routes
├── backend/                  # NestJS API Server
│   ├── src/modules/         # Feature modules
│   ├── src/modules/auth/    # Authentication system
│   ├── src/modules/curriculum/ # Course management
│   ├── src/modules/scorm/   # SCORM handling
│   ├── src/modules/user/    # User management
│   └── src/modules/quiz/    # Quiz system
└── uploads/                  # SCORM packages and media files
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Heroicons** for beautiful icons
- **next-themes** for theme management

### Backend
- **NestJS 10** framework
- **TypeORM** for database management
- **PostgreSQL** database
- **JWT** authentication
- **Multer** for file uploads
- **Adm-zip** for SCORM extraction
- **Fast XML Parser** for manifest parsing

## 📋 Prerequisites

- **Node.js** 22.0.0+ 
- **PostgreSQL** 12+
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd LMSportfolio
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp ormconfig.sample.env .env

# Edit .env with your database credentials
# DATABASE_URL=postgres://username:password@localhost:5432/openlms
# JWT_SECRET=your-secret-key
# ADMIN_USER=admin
# ADMIN_PASS=your-admin-password

# Start development server
npm run start:dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local

# Start development server
npm run dev
```

### 4. Access the System

- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Server**: http://localhost:4000

## 🔐 Admin Access

Default credentials (change in `.env`):
- **Username**: `admin`
- **Password**: `admin123`

## 📚 SCORM Package Requirements

- **Format**: ZIP files containing SCORM 1.2 or 2004 content
- **Manifest**: Must include `imsmanifest.xml` at root level
- **Launch File**: Should reference main HTML file in manifest
- **Size Limit**: 100MB maximum
- **Browser Support**: Chrome, Firefox, Safari, Edge

## 🎯 Admin Panel Features

### Dashboard
- Real-time statistics and metrics
- Recent activity feed
- Quick action buttons
- Content structure overview

### Course Management
- Create and edit courses
- Category organization
- Module and topic structure
- Activity management
- Publishing controls

### SCORM Management
- Drag-and-drop package uploads
- Automatic ZIP extraction
- Manifest parsing
- Launch URL generation
- Package status tracking

### User Management
- Student and instructor roles
- Enrollment tracking
- Profile management
- Activity monitoring

### Quiz System
- Multiple question types
- Scoring and feedback
- Attempt tracking
- Performance analytics

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository
2. Set Root Directory to `frontend`
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
4. Deploy

### Backend (Render/Railway/Fly)
1. Set Root Directory to `backend`
2. Build Command: `npm run build`
3. Start Command: `node dist/main.js`
4. Environment Variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Secure random string
   - `ADMIN_USER`: Admin username
   - `ADMIN_PASS`: Admin password
   - `PORT`: 4000

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL=postgres://user:pass@host:5432/openlms

# Security
JWT_SECRET=your-secret-key
ADMIN_USER=admin
ADMIN_PASS=secure-password

# Server
PORT=4000

# File Uploads
MAX_FILE_SIZE=104857600
UPLOAD_DIR=uploads
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📱 Responsive Design

- **Mobile First**: Optimized for 320px+ screens
- **Tablet**: Responsive layouts for 768px+ screens
- **Desktop**: Full-featured experience for 1024px+ screens
- **4K**: Optimized for high-resolution displays

## 🎨 Design System

- **Colors**: Modern slate palette with blue/purple accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 6px grid system
- **Animations**: Smooth micro-interactions and transitions
- **Icons**: Heroicons for consistent iconography

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Secure file uploads
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📊 Analytics & Monitoring

- User activity tracking
- Course completion rates
- SCORM package usage
- Performance metrics
- Error logging and monitoring

## 🚀 Performance Optimizations

- Static asset optimization
- Image compression and lazy loading
- Code splitting and tree shaking
- Database query optimization
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information

## 🔄 Updates

Stay updated with the latest features and improvements by:
- Following the repository
- Checking release notes
- Reviewing the changelog

---

**OpenLMS** - Empowering modern education with cutting-edge technology and beautiful design.


