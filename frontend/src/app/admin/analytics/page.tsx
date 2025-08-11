"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  completionRate: number;
  averageScore: number;
  monthlyGrowth: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    completionRate: 0,
    averageScore: 0,
    monthlyGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analytics data
    setTimeout(() => {
      setAnalytics({
        totalUsers: 1247,
        totalCourses: 23,
        totalEnrollments: 3456,
        completionRate: 78.5,
        averageScore: 84.2,
        monthlyGrowth: 12.3
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      name: 'Total Users',
      value: analytics.totalUsers,
      icon: UsersIcon,
      change: '+12%',
      changeType: 'positive',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Total Courses',
      value: analytics.totalCourses,
      icon: BookOpenIcon,
      change: '+3',
      changeType: 'positive',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Total Enrollments',
      value: analytics.totalEnrollments,
      icon: CheckCircleIcon,
      change: '+8%',
      changeType: 'positive',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Completion Rate',
      value: `${analytics.completionRate}%`,
      icon: ChartBarIcon,
      change: '+2.1%',
      changeType: 'positive',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Completed Course', course: 'Advanced React', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Enrolled in', course: 'Web Development', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Achieved Certificate', course: 'JavaScript Basics', time: '6 hours ago' },
    { id: 4, user: 'Sarah Wilson', action: 'Started Quiz', course: 'CSS Fundamentals', time: '8 hours ago' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
              <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor your LMS performance and user engagement
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                  from last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              User Growth Trend
            </h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">
                  Chart visualization coming soon
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {activity.course}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
