import { NextResponse } from 'next/server';

export async function GET() {
  // Sample courses data for the portfolio
  return NextResponse.json([
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Master React with advanced patterns, hooks, and state management. Learn to build scalable applications with modern React best practices.',
      category: 'Programming',
      imageUrl: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=React',
      duration: '8 hours',
      level: 'Advanced',
      isPublished: true
    },
    {
      id: '2',
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamentals of user interface and experience design. Create beautiful, functional, and user-centered digital products.',
      category: 'Design',
      imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Design',
      duration: '6 hours',
      level: 'Intermediate',
      isPublished: true
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      description: 'Develop comprehensive digital marketing strategies that drive results. Learn SEO, social media, content marketing, and analytics.',
      category: 'Marketing',
      imageUrl: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Marketing',
      duration: '10 hours',
      level: 'Beginner',
      isPublished: true
    },
    {
      id: '4',
      title: 'Business Analytics Fundamentals',
      description: 'Understand data-driven decision making. Learn to analyze business metrics and create actionable insights from data.',
      category: 'Business',
      imageUrl: 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Analytics',
      duration: '12 hours',
      level: 'Intermediate',
      isPublished: true
    },
    {
      id: '5',
      title: 'Cloud Computing Essentials',
      description: 'Master cloud computing concepts and technologies. Learn AWS, Azure, and Google Cloud Platform fundamentals.',
      category: 'Technology',
      imageUrl: 'https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Cloud',
      duration: '15 hours',
      level: 'Advanced',
      isPublished: true
    },
    {
      id: '6',
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications. Learn React Native, Flutter, and mobile development best practices.',
      category: 'Programming',
      imageUrl: 'https://via.placeholder.com/400x250/06B6D4/FFFFFF?text=Mobile',
      duration: '14 hours',
      level: 'Intermediate',
      isPublished: true
    }
  ]);
}

export async function POST() {
  return new NextResponse('Not implemented in frontend mock', { status: 405 });
}


