'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SafariApp({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState('https://daebeom.heo/about');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-8 bg-white rounded-xl shadow-2xl overflow-hidden z-[100] flex flex-col"
    >
      {/* Safari Header */}
      <div className="h-14 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0">
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 ml-2">
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600">
            ←
          </button>
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600">
            →
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 mx-4">
          <div className="h-9 bg-gray-100 rounded-lg px-4 flex items-center gap-2">
            <span className="text-gray-400">🔒</span>
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium">
          Share
        </button>
      </div>

      {/* Safari Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-4xl mx-auto p-12">
          {/* Wiki-style About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-2">허대범 (Heo Daebeom)</h1>
            <p className="text-gray-500 mb-8">Full Stack Developer</p>

            <div className="border-l-4 border-blue-500 pl-4 mb-8 bg-blue-50 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                <strong>"나라는 사람을 검색해 보세요."</strong><br />
                사용자 경험을 최우선으로 생각하는 풀스택 개발자입니다. 
                문제를 발견하고, 해결책을 설계하며, 코드로 구현하는 전 과정을 사랑합니다.
              </p>
            </div>

            {/* Timeline */}
            <h2 className="text-2xl font-bold mb-4 mt-8">성장 과정</h2>
            <div className="space-y-6 mb-8">
              <TimelineItem 
                year="2024"
                title="프리랜서 풀스택 개발자"
                desc="다양한 클라이언트 프로젝트 진행 중"
              />
              <TimelineItem 
                year="2022-2024"
                title="스타트업 개발팀 리드"
                desc="5명 규모 개발팀 리딩 및 서비스 런칭"
              />
              <TimelineItem 
                year="2021"
                title="웹 개발 시작"
                desc="첫 프로젝트로 React 기반 포트폴리오 사이트 제작"
              />
            </div>

            {/* Skills Summary */}
            <h2 className="text-2xl font-bold mb-4 mt-8">핵심 역량</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <SkillCard 
                title="Frontend Development"
                skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']}
              />
              <SkillCard 
                title="Backend Development"
                skills={['Node.js', 'Express', 'NestJS', 'REST API']}
              />
              <SkillCard 
                title="Database & DevOps"
                skills={['MongoDB', 'PostgreSQL', 'Docker', 'AWS']}
              />
              <SkillCard 
                title="Soft Skills"
                skills={['팀 리더십', '문제 해결', '커뮤니케이션', '빠른 학습']}
              />
            </div>

            {/* Contact CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">함께 일하고 싶으신가요?</h3>
              <p className="mb-4 opacity-90">언제든지 연락주세요. 좋은 프로젝트는 언제나 환영입니다!</p>
              <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Me →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-20 flex-shrink-0">
        <span className="text-sm font-bold text-blue-600">{year}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function SkillCard({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold mb-3 text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
