'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    id: 'processor',
    name: 'Processor',
    icon: '🔲',
    items: [
      { name: 'React', level: 95, desc: 'Core processing unit for UI' },
      { name: 'Next.js', level: 92, desc: 'Enhanced React with SSR' },
      { name: 'TypeScript', level: 90, desc: 'Type-safe development' },
    ]
  },
  {
    id: 'memory',
    name: 'Memory',
    icon: '💾',
    items: [
      { name: 'Node.js', level: 88, desc: 'Server-side runtime' },
      { name: 'Express', level: 85, desc: 'Web framework' },
      { name: 'NestJS', level: 82, desc: 'Enterprise framework' },
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: '💿',
    items: [
      { name: 'MongoDB', level: 87, desc: 'NoSQL database' },
      { name: 'PostgreSQL', level: 83, desc: 'Relational database' },
      { name: 'Redis', level: 80, desc: 'Cache system' },
    ]
  },
  {
    id: 'graphics',
    name: 'Graphics',
    icon: '🎨',
    items: [
      { name: 'TailwindCSS', level: 93, desc: 'Utility-first CSS' },
      { name: 'Framer Motion', level: 88, desc: 'Animation library' },
      { name: 'Three.js', level: 75, desc: '3D graphics' },
    ]
  },
];

export default function SettingsApp({ onClose }: { onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState('processor');

  const currentCategory = SKILL_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-8 bg-white rounded-xl shadow-2xl overflow-hidden z-[100] flex"
    >
      {/* Settings Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 flex items-center px-4">
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110"
            />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* Title */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">System</h2>
          <p className="text-sm text-gray-500 mt-1">Developer Specifications</p>
        </div>

        {/* Categories */}
        <div className="flex-1 px-3">
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-colors mb-1 ${
                selectedCategory === cat.id 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Overview Card */}
        <div className="p-8 border-b border-gray-200">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-5xl mb-4">{currentCategory?.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory?.name}</h3>
                <p className="text-gray-600">Technology Stack Overview</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-2xl font-bold text-green-600">● Active</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Expertise</div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(currentCategory?.items.reduce((sum, item) => sum + item.level, 0)! / currentCategory?.items.length!)}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Technologies</div>
                <div className="text-2xl font-bold text-purple-600">
                  {currentCategory?.items.length}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Experience</div>
                <div className="text-2xl font-bold text-green-600">3+ yrs</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills List */}
        <div className="p-8">
          <h4 className="text-xl font-bold mb-6 text-gray-900">Installed Technologies</h4>
          <div className="space-y-4">
            {currentCategory?.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">{skill.name}</h5>
                    <p className="text-sm text-gray-500">{skill.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{skill.level}%</div>
                    <div className="text-xs text-gray-500">Proficiency</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
