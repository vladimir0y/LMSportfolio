"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon, VideoCameraIcon, DocumentTextIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  title: string;
  type: 'scorm' | 'quiz' | 'video' | 'pdf' | 'survey' | 'forum' | 'html5';
  topic: { id: string; title: string; module: { title: string; course: { title: string } } };
  isVisible: boolean;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface Topic {
  id: string;
  title: string;
  module: { id: string; title: string; course: { id: string; title: string } };
}

export default function AdminActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedType, setSelectedType] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    type: 'scorm' as Activity['type'],
    topicId: '',
    isVisible: true,
    settings: {},
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const [activitiesRes, topicsRes] = await Promise.all([
        fetch(`${baseUrl}/api/curriculum/activities`),
        fetch(`${baseUrl}/api/curriculum/topics`),
      ]);

      if (activitiesRes.ok) {
        const activitiesData = await activitiesRes.json();
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      }

      if (topicsRes.ok) {
        const topicsData = await topicsRes.json();
        setTopics(Array.isArray(topicsData) ? topicsData : []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const url = editingActivity 
        ? `${baseUrl}/api/curriculum/activities/${editingActivity.id}`
        : `${baseUrl}/api/curriculum/topics/${formData.topicId}/activities`;
      
      const response = await fetch(url, {
        method: editingActivity ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setEditingActivity(null);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleDelete = async (activityId: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    
    const token = localStorage.getItem('admin_token');
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${baseUrl}/api/curriculum/activities/${activityId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      type: activity.type,
      topicId: activity.topic.id,
      isVisible: activity.isVisible,
      settings: activity.settings,
    });
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'scorm',
      topicId: '',
      isVisible: true,
      settings: {},
    });
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'scorm':
        return <DocumentTextIcon className="w-6 h-6" />;
      case 'quiz':
        return <QuestionMarkCircleIcon className="w-6 h-6" />;
      case 'video':
        return <VideoCameraIcon className="w-6 h-6" />;
      default:
        return <CheckCircleIcon className="w-6 h-6" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'scorm':
        return 'from-blue-500 to-cyan-600';
      case 'quiz':
        return 'from-purple-500 to-pink-600';
      case 'video':
        return 'from-red-500 to-orange-600';
      case 'pdf':
        return 'from-green-500 to-emerald-600';
      case 'survey':
        return 'from-yellow-500 to-amber-600';
      case 'forum':
        return 'from-indigo-500 to-blue-600';
      case 'html5':
        return 'from-gray-500 to-slate-600';
      default:
        return 'from-slate-500 to-gray-600';
    }
  };

  const filteredActivities = activities.filter(activity => 
    selectedType === 'all' || activity.type === selectedType
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Create and manage learning activities</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingActivity(null);
            resetForm();
            setShowCreateModal(true);
          }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Activity</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Filter by Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Types</option>
          <option value="scorm">SCORM</option>
          <option value="quiz">Quiz</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="survey">Survey</option>
          <option value="forum">Forum</option>
          <option value="html5">HTML5</option>
        </select>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-200 group"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-2xl flex items-center justify-center`}>
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {activity.title}
                    </h3>
                    <div className="space-y-1">
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getActivityColor(activity.type)} text-white text-xs font-medium rounded-full`}>
                        {activity.type.toUpperCase()}
                      </span>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        <div>Course: {activity.topic.module.course.title}</div>
                        <div>Module: {activity.topic.module.title}</div>
                        <div>Topic: {activity.topic.title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Created {new Date(activity.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-2">
                    {activity.isVisible ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-slate-300 rounded-full"></div>
                    )}
                    <span className={activity.isVisible ? 'text-green-600' : 'text-slate-500'}>
                      {activity.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredActivities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircleIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No activities found</h3>
          <p className="text-slate-600 dark:text-slate-400">Create your first activity to engage learners</p>
        </motion.div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {editingActivity ? 'Edit Activity' : 'Create Activity'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter activity title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Activity Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Activity['type'] })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="scorm">SCORM Package</option>
                    <option value="quiz">Quiz</option>
                    <option value="video">Video</option>
                    <option value="pdf">PDF Document</option>
                    <option value="survey">Survey</option>
                    <option value="forum">Forum Discussion</option>
                    <option value="html5">HTML5 Interactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Topic
                  </label>
                  <select
                    value={formData.topicId}
                    onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.module.course.title} → {topic.module.title} → {topic.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isVisible"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="isVisible" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Make visible to learners
                  </label>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    {editingActivity ? 'Update Activity' : 'Create Activity'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
