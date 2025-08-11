"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    activeUsers: number;
    completionRate: number;
    averageScore: number;
  };
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
  }[];
  topCourses: {
    id: string;
    title: string;
    enrollments: number;
    completions: number;
    averageScore: number;
    rating: number;
  }[];
  userGrowth: {
    month: string;
    newUsers: number;
    activeUsers: number;
  }[];
  coursePerformance: {
    category: string;
    enrollments: number;
    completions: number;
    averageScore: number;
  }[];
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        setAnalyticsData(mockAnalyticsData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalyticsData(mockAnalyticsData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No analytics data available</h3>
      </div>
    );
  }

  const { overview, recentActivity, topCourses, userGrowth, coursePerformance } = analyticsData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive insights into your learning platform performance
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{overview.totalUsers.toLocaleString()}</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUpIcon className="h-4 w-4 mr-1" />
                  +12.5%
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <BookOpenIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{overview.totalCourses}</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUpIcon className="h-4 w-4 mr-1" />
                  +8.2%
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <PlayIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{overview.totalEnrollments.toLocaleString()}</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUpIcon className="h-4 w-4 mr-1" />
                  +15.3%
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{overview.completionRate}%</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUpIcon className="h-4 w-4 mr-1" />
                  +5.7%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts and Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
            <div className="space-y-4">
              {userGrowth.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">New:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.newUsers}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.activeUsers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Course Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Performance by Category</h3>
            <div className="space-y-4">
              {coursePerformance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.enrollments} enrollments</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(item.completions / item.enrollments) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Completion: {item.completions}</span>
                    <span>Avg Score: {item.averageScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Courses and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Courses</h3>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{course.enrollments} enrollments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{course.averageScore}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Avg Score</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Average Session Duration</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">24m 32s</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+8% from last month</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quiz Pass Rate</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">87.3%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+2.1% from last month</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUpIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Engagement Score</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">8.7/10</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+0.3 from last month</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Mock data for development
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalUsers: 1247,
    totalCourses: 23,
    totalEnrollments: 3456,
    activeUsers: 892,
    completionRate: 73.2,
    averageScore: 81.5
  },
  recentActivity: [
    {
      id: '1',
      type: 'enrollment',
      description: 'John Doe enrolled in React Fundamentals',
      timestamp: '2024-01-20T10:30:00Z',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'completion',
      description: 'Sarah Wilson completed JavaScript Basics',
      timestamp: '2024-01-20T09:15:00Z',
      user: 'Sarah Wilson'
    },
    {
      id: '3',
      type: 'quiz',
      description: 'Mike Johnson scored 95% on Web Development Quiz',
      timestamp: '2024-01-20T08:45:00Z',
      user: 'Mike Johnson'
    },
    {
      id: '4',
      type: 'upload',
      description: 'New SCORM package uploaded: Advanced CSS Techniques',
      timestamp: '2024-01-20T08:00:00Z',
      user: 'Admin'
    }
  ],
  topCourses: [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      enrollments: 156,
      completions: 134,
      averageScore: 87,
      rating: 4.8
    },
    {
      id: '2',
      title: 'React for Beginners',
      enrollments: 142,
      completions: 118,
      averageScore: 82,
      rating: 4.6
    },
    {
      id: '3',
      title: 'Web Development Basics',
      enrollments: 98,
      completions: 89,
      averageScore: 91,
      rating: 4.9
    }
  ],
  userGrowth: [
    { month: 'Oct 2023', newUsers: 45, activeUsers: 156 },
    { month: 'Nov 2023', newUsers: 52, activeUsers: 189 },
    { month: 'Dec 2023', newUsers: 38, activeUsers: 201 },
    { month: 'Jan 2024', newUsers: 67, activeUsers: 234 }
  ],
  coursePerformance: [
    { category: 'Programming', enrollments: 234, completions: 198, averageScore: 85 },
    { category: 'Design', enrollments: 156, completions: 134, averageScore: 78 },
    { category: 'Business', enrollments: 89, completions: 67, averageScore: 82 },
    { category: 'Marketing', enrollments: 67, completions: 45, averageScore: 76 }
  ]
};
