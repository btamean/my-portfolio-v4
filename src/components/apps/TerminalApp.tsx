'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TerminalApp({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  const terminalCommands = [
    { text: '$ whoami', delay: 0 },
    { text: '> 허대범 (Daebeom Heo)', delay: 500 },
    { text: '> Full Stack Developer', delay: 800 },
    { text: '', delay: 1200 },
    { text: '$ cat ~/.profile', delay: 1400 },
    { text: '> "나는 뼛속까지 개발자다"', delay: 1800 },
    { text: '> 문제를 코드로 해결하고, 아이디어를 현실로 만듭니다.', delay: 2200 },
    { text: '', delay: 2600 },
    { text: '$ echo $TECH_STACK', delay: 2800 },
    { text: '> Frontend: React, Next.js, TypeScript', delay: 3200 },
    { text: '> Backend: Node.js, Express, NestJS', delay: 3500 },
    { text: '> Database: MongoDB, PostgreSQL, Redis', delay: 3800 },
    { text: '> DevOps: Docker, AWS, Vercel', delay: 4100 },
    { text: '', delay: 4500 },
    { text: '$ ls -la ~/achievements', delay: 4700 },
    { text: '> 💼 3+ years of professional experience', delay: 5100 },
    { text: '> 🚀 10+ production-ready projects', delay: 5400 },
    { text: '> ⭐ 1000+ GitHub contributions', delay: 5700 },
    { text: '', delay: 6100 },
    { text: '$ █', delay: 6300 },
  ];

  useEffect(() => {
    terminalCommands.forEach((cmd, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, cmd.text]);
      }, cmd.delay);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-8 bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden z-[100] flex flex-col"
    >
      {/* Terminal Header */}
      <div className="h-11 bg-[#323233] border-b border-[#2d2d2d] flex items-center px-4 gap-3 flex-shrink-0">
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-gray-400 ml-2">zsh — ~/portfolio</span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 overflow-auto font-mono text-sm">
        <div className="max-w-4xl">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-1.5 ${
                line.startsWith('$') 
                  ? 'text-[#4ec9b0] font-semibold' 
                  : line.startsWith('>') 
                  ? 'text-[#d4d4d4] ml-2' 
                  : 'text-gray-500'
              }`}
            >
              {line === '$ █' ? (
                <span className="inline-flex items-center gap-1">
                  <span className="text-[#4ec9b0]">$</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-[#4ec9b0] ml-1"
                  />
                </span>
              ) : (
                line
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="h-6 bg-[#007acc] flex items-center px-4 text-xs text-white flex-shrink-0">
        <span>▶️ Portfolio Terminal</span>
        <span className="ml-auto">Press ESC to exit</span>
      </div>
    </motion.div>
  );
}
