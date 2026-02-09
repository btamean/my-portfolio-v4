'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Web', 'App', 'Game'];

const PROJECTS = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    category: 'Web',
    type: 'folder',
    tech: ['Next.js', 'Node.js', 'MongoDB'],
    preview: 'https://via.placeholder.com/400x300?text=E-Commerce',
    github: 'https://github.com/...',
    desc: 'Full-stack 온라인 쇼핑몰 플랫폼. 실시간 재고 관리 및 결제 시스템 구현.',
  },
  {
    id: 2,
    name: 'AI Chat Application',
    category: 'App',
    type: 'folder',
    tech: ['React', 'OpenAI', 'Socket.io'],
    preview: 'https://via.placeholder.com/400x300?text=AI+Chat',
    github: 'https://github.com/...',
    desc: 'AI 기반 실시간 채팅 앱. GPT API를 활용한 스마트 응답 기능.',
  },
  {
    id: 3,
    name: 'Task Management',
    category: 'Web',
    type: 'folder',
    tech: ['TypeScript', 'Express', 'PostgreSQL'],
    preview: 'https://via.placeholder.com/400x300?text=Task+Manager',
    github: 'https://github.com/...',
    desc: '협업형 프로젝트 관리 도구. Kanban 보드와 실시간 동기화.',
  },
  {
    id: 4,
    name: 'Weather Dashboard',
    category: 'App',
    type: 'folder',
    tech: ['React', 'Weather API', 'Chart.js'],
    preview: 'https://via.placeholder.com/400x300?text=Weather',
    github: 'https://github.com/...',
    desc: '날씨 예보 대시보드. 인터랙티브 지도와 시각화 차트.',
  },
  {
    id: 5,
    name: 'Architecture.pdf',
    category: 'All',
    type: 'pdf',
    tech: [],
    preview: '',
    github: '',
    desc: '전체 시스템 아키텍처 설계 문서',
  },
];

export default function FinderApp({ onClose }: { onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-8 bg-white rounded-xl shadow-2xl overflow-hidden z-[100] flex"
    >
      {/* Finder Sidebar */}
      <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col">
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

        {/* Favorites */}
        <div className="flex-1 p-3">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-2">CATEGORIES</div>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full px-3 py-1.5 rounded-lg text-left text-sm transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              📁 {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 border-b border-gray-200 flex items-center px-6 gap-3">
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg text-sm">
            ← Back
          </button>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">
              {selectedCategory === 'All' ? 'All Projects' : selectedCategory}
            </div>
          </div>
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg text-sm">
            ⚙️
          </button>
        </div>

        {/* Files Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-2 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                  <span className="text-6xl">
                    {project.type === 'folder' ? '📁' : '📄'}
                  </span>
                </div>
                <p className="text-sm text-center text-gray-700 font-medium truncate">
                  {project.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-96 bg-white border-l border-gray-200 flex flex-col"
          >
            <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
              <span className="font-semibold text-sm">Quick Look</span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {selectedProject.type === 'folder' && (
                <>
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🖼️</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{selectedProject.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedProject.desc}</p>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 mb-2">TECH STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      View Live Demo
                    </button>
                    <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      View on GitHub
                    </button>
                  </div>
                </>
              )}

              {selectedProject.type === 'pdf' && (
                <div className="text-center">
                  <div className="text-8xl mb-4">📄</div>
                  <h3 className="text-lg font-bold mb-2">{selectedProject.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedProject.desc}</p>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                    Open Document
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
