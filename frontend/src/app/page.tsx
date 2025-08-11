"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenIcon, PlayIcon, ArrowRightIcon, MagnifyingGlassIcon, SunIcon, MoonIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  duration: string;
  level: string;
  isPublished: boolean;
}

interface Category {
  id: string;
  name: string;
}

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const [coursesResponse, categoriesResponse] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/categories')
      ]);

      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        setCourses(coursesData.filter((course: Course) => course.isPublished));
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data for development
      setCourses([
        {
          id: '1',
          title: 'Advanced React Development',
          description: 'Master React with advanced patterns, hooks, and state management',
          category: 'Programming',
          imageUrl: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=React',
          duration: '8 hours',
          level: 'Advanced',
          isPublished: true
        },
        {
          id: '2',
          title: 'UI/UX Design Principles',
          description: 'Learn the fundamentals of user interface and experience design',
          category: 'Design',
          imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Design',
          duration: '6 hours',
          level: 'Intermediate',
          isPublished: true
        }
      ]);
      setCategories([
        { id: '1', name: 'Programming' },
        { id: '2', name: 'Design' },
        { id: '3', name: 'Business' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header with Theme Toggle */}
      <header className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Learning Portfolio
              </h1>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <SunIcon className="w-5 h-5 text-amber-500 dark:text-amber-400 dark:hidden transition-all duration-300" />
              <MoonIcon className="w-5 h-5 text-blue-400 hidden dark:block transition-all duration-300" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Welcome to my{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                personal course portfolio
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
            >
              A curated collection of learning experiences I've created to share my expertise, creativity, and passion for innovative education. Each course is designed with engaging content, clear structure, and interactive elements to deliver real value and inspire learners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 shadow-2xl"
              >
                <div className="relative rounded-2xl bg-white dark:bg-slate-900 px-8 py-4 transition-all duration-300 group-hover:bg-transparent">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-lg group-hover:text-white transition-all duration-300">
                    Explore Courses
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        />
      </section>

      {/* Search and Filter Section */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-700 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300 text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50 animate-pulse"
                >
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </motion.div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1, 
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500"
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden h-48 rounded-t-3xl">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Play Button Overlay */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-16 h-16 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                          <PlayIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 ml-1" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Category Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 mb-3"
                      >
                        {course.category}
                      </motion.div>

                      {/* Course Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                      >
                        {course.title}
                      </motion.h3>

                      {/* Course Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3"
                      >
                        {course.description}
                      </motion.p>

                      {/* Course Meta */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4"
                      >
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs">
                          {course.level}
                        </span>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      >
                        <Link href={`/course/${course.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <div className="relative rounded-2xl bg-white dark:bg-slate-900 px-6 py-3 transition-all duration-300 group-hover/btn:bg-transparent">
                              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold group-hover/btn:text-white transition-all duration-300">
                                Start Learning
                              </span>
                            </div>
                          </motion.button>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              className="text-center py-20"
            >
              <BookOpenIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}


