"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUpIcon, PlayIcon, TrashIcon, DocumentIcon, EyeIcon } from '@heroicons/react/24/outline';

interface ScormPackage {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  launchUrl: string;
  uploadedAt: string;
  size: number;
  status: 'processing' | 'ready' | 'error';
}

export default function AdminScorm() {
  const [packages, setPackages] = useState<ScormPackage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${baseUrl}/api/scorm/packages`);
      if (response.ok) {
        const data = await response.json();
        setPackages(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      alert('Please select a valid ZIP file');
      return;
    }
    setSelectedFile(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${baseUrl}/api/scorm/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSelectedFile(null);
        fetchPackages();
        
        // Show success message
        alert('SCORM package uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deletePackage = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this SCORM package?')) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${baseUrl}/api/scorm/packages/${packageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SCORM Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Upload and manage SCORM packages</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Upload SCORM Package</h2>
        
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
          }`}
        >
          {selectedFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <DocumentIcon className="w-8 h-8 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium text-slate-900 dark:text-white">{selectedFile.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={uploadFile}
                  disabled={isUploading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload Package'}
                </motion.button>
              </div>

              {isUploading && (
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <CloudArrowUpIcon className="w-16 h-16 text-slate-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Drop your SCORM package here
                </p>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer transition-colors duration-200"
                >
                  Choose File
                </label>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Supports ZIP files containing SCORM 1.2 or 2004 packages
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Packages List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Uploaded Packages</h2>
        
        {packages.length === 0 ? (
          <div className="text-center py-12">
            <DocumentIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No packages uploaded</h3>
            <p className="text-slate-600 dark:text-slate-400">Upload your first SCORM package to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <DocumentIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">{pkg.originalName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatFileSize(pkg.size)} • Uploaded {new Date(pkg.uploadedAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pkg.status === 'ready' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : pkg.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {pkg.status === 'ready' ? 'Ready' : pkg.status === 'processing' ? 'Processing' : 'Error'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {pkg.status === 'ready' && (
                    <a
                      href={pkg.launchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      title="Preview package"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={pkg.launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                    title="Launch package"
                  >
                    <PlayIcon className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    title="Delete package"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">SCORM Package Requirements</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Package must be a valid ZIP file containing SCORM 1.2 or 2004 content</li>
          <li>• Must include an imsmanifest.xml file at the root level</li>
          <li>• Launch file (usually index.html) should be referenced in the manifest</li>
          <li>• Maximum file size: 100MB</li>
          <li>• Supported browsers: Chrome, Firefox, Safari, Edge</li>
        </ul>
      </div>
    </div>
  );
}
