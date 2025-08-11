"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalModules: number;
  totalActivities: number;
  activeUsers: number;
  completedCourses: number;
  pendingTasks: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    status: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalModules: 0,
    totalActivities: 0,
    activeUsers: 0,
    completedCourses: 0,
    pendingTasks: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const [usersRes, coursesRes, modulesRes, activitiesRes] = await Promise.all([
        fetch(`${baseUrl}/api/users`),
        fetch(`${baseUrl}/api/curriculum/courses`),
        fetch(`${baseUrl}/api/curriculum/modules`),
        fetch(`${baseUrl}/api/curriculum/activities`),
      ]);

      const users = usersRes.ok ? await usersRes.json() : [];
      const courses = coursesRes.ok ? await coursesRes.json() : [];
      const modules = modulesRes.ok ? await modulesRes.json() : [];
      const activities = activitiesRes.ok ? await activitiesRes.json() : [];

      setStats({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalCourses: Array.isArray(courses) ? courses.length : 0,
        totalModules: Array.isArray(modules) ? modules.length : 0,
        totalActivities: Array.isArray(activities) ? activities.length : 0,
        activeUsers: Math.floor(Math.random() * 50) + 20, // Mock data
        completedCourses: Math.floor(Math.random() * 30) + 10, // Mock data
        pendingTasks: Math.floor(Math.random() * 15) + 5, // Mock data
        recentActivity: [
          {
            id: '1',
            type: 'course_created',
            title: 'New course "Advanced React Development" created',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
          },
          {
            id: '2',
            type: 'user_registered',
            title: 'New user "john.doe@example.com" registered',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
          },
          {
            id: '3',
            type: 'scorm_uploaded',
            title: 'SCORM package "JavaScript Basics" uploaded',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            status: 'processing',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    change, 
    changeType = 'neutral' 
  }: {
    title: string;
    value: number;
    icon: any;
    change?: number;
    changeType?: 'positive' | 'negative' | 'neutral';
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {changeType === 'positive' ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
              ) : changeType === 'negative' ? (
                <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
              ) : null}
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 
                'text-slate-600 dark:text-slate-400'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome to your LMS administration panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={UsersIcon}
          change={12}
          changeType="positive"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpenIcon}
          change={8}
          changeType="positive"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={AcademicCapIcon}
          change={-3}
          changeType="negative"
        />
        <StatCard
          title="Completed Courses"
          value={stats.completedCourses}
          icon={CheckCircleIcon}
          change={15}
          changeType="positive"
        />
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Content Structure</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium text-slate-900 dark:text-white">Courses</span>
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalCourses}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <AcademicCapIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-medium text-slate-900 dark:text-white">Modules</span>
              </div>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalModules}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-medium text-slate-900 dark:text-white">Activities</span>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.totalActivities}</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-200"
          >
            <BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Create Course</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-200"
          >
            <AcademicCapIcon className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">Add Module</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-200"
          >
            <CheckCircleIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Create Activity</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200"
          >
            <ChartBarIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-orange-900 dark:text-orange-100">View Analytics</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}


