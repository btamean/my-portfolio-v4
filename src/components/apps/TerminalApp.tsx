'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// 명령어 데이터 (컴포넌트 외부로 이동하여 불필요한 재생성 방지)
const terminalCommands = [
  { text: '$ whoami', delay: 0 },
  { text: '> 허대범 (Daebeom Heo)', delay: 500 },
  { text: '> Full Stack Developer', delay: 800 },
  { text: '', delay: 1200 },
  { text: '$ cat ~/.profile', delay: 1400 },
  { text: '> "나는 개발자다"', delay: 1800 },
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

export default function TerminalApp({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState(""); 
  const hasExecuted = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null); // 자동 스크롤용

  // 자동 스크롤 로직
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentTyping]);

  useEffect(() => {
    let isCancelled = false;
    
    // 초기화: 앱을 열 때마다 기존 라인과 타이핑 상태를 비움
    setLines([]);
    setCurrentTyping("");

    const processLine = async (index: number) => {
      if (index >= terminalCommands.length || isCancelled) return;

      const cmd = terminalCommands[index];
      const prevDelay = index === 0 ? 0 : terminalCommands[index - 1].delay;
      const waitTime = cmd.delay - prevDelay;

      // 대기
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      if (isCancelled) return;

      if (cmd.text.startsWith('$') && cmd.text !== '$ █') {
        let typed = "";
        for (const char of cmd.text) {
          if (isCancelled) return; // 중간에 꺼지면 중단
          typed += char;
          setCurrentTyping(typed);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        setLines((prev) => [...prev, typed]);
        setCurrentTyping("");
      } else {
        setLines((prev) => [...prev, cmd.text]);
      }

      processLine(index + 1);
    };

    processLine(0);

    // Cleanup: 컴포넌트가 사라지면(앱을 닫으면) 진행 중인 모든 프로세스 중단
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-8 bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden z-[100] flex flex-col"
    >
      {/* Header */}
      <div className="h-11 bg-[#323233] border-b border-[#2d2d2d] flex items-center px-4 gap-3 flex-shrink-0">
        <div className="flex gap-2">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-gray-400 ml-2">zsh — ~/portfolio</span>
      </div>

      {/* Terminal Content (수정된 핵심 부분) */}
      <div ref={scrollRef} className="flex-1 p-6 overflow-auto font-mono text-sm">
        <div className="max-w-4xl">
          {/* 1. 완료된 줄들 */}
          {lines.map((line, index) => (
            <div key={index} className={`mb-1.5 ${getLineStyle(line)}`}>
              {renderLine(line)}
            </div>
          ))}

          {/* 2. 현재 타이핑 중인 효과 */}
          {currentTyping && (
            <div className="mb-1.5 text-[#4ec9b0] font-semibold flex items-center">
              {currentTyping}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#4ec9b0] ml-1"
              />
            </div>
          )}

          {/* 3. 대기 중인 빈 커서 (타이핑 중이 아닐 때만) */}
          {!currentTyping && lines[lines.length - 1] !== '$ █' && (
             <div className="text-[#4ec9b0] font-semibold flex items-center">
               <span className="mr-1">$</span>
               <motion.span
                 animate={{ opacity: [1, 0] }}
                 transition={{ duration: 0.8, repeat: Infinity }}
                 className="inline-block w-2 h-4 bg-[#4ec9b0]"
               />
             </div>
          )}
        </div>
      </div>

      <div className="h-6 bg-[#007acc] flex items-center px-4 text-xs text-white flex-shrink-0">
        <span>▶️ Portfolio Terminal</span>
        <span className="ml-auto">Press ESC to exit</span>
      </div>
    </motion.div>
  );
}

// 헬퍼 함수들
function getLineStyle(line: string) {
  if (line.startsWith('$')) return 'text-[#4ec9b0] font-semibold';
  if (line.startsWith('>')) return 'text-[#d4d4d4] ml-2';
  return 'text-gray-500';
}

function renderLine(line: string) {
  if (line === '$ █') {
    return (
      <span className="inline-flex items-center">
        <span className="text-[#4ec9b0]">$</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-[#4ec9b0] ml-1"
        />
      </span>
    );
  }
  return line;
}