'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react'; 
import TerminalApp from '@/components/apps/TerminalApp';
import SafariApp from '@/components/apps/SafariApp';
import FinderApp from '@/components/apps/FinderApp';
import SettingsApp from '@/components/apps/SettingsApp';
import ContactsApp from '@/components/apps/ContactsApp';
import MacBootScreen from './MacBootScreen';

type AppState = 'boot' | 'desktop';
type AppType = 'terminal' | 'safari' | 'finder' | 'settings' | 'contacts' | null;

const APPS = [
  { id: 'terminal', name: 'Home', icon: '/icons/terminal.png'},
  { id: 'safari', name: 'About', icon: '/icons/safari.png' },
  { id: 'finder', name: 'Projects', icon: '/icons/finder.png'},
  { id: 'settings', name: 'Skills', icon: '/icons/settings.png'},
  { id: 'contacts', name: 'Contacts', icon: '/icons/contacts.png'},
];

export default function MacOSPortfolio() {
  const [appState, setAppState] = useState<AppState>('boot');
  const [openApp, setOpenApp] = useState<AppType>(null);
  const [time, setTime] = useState(new Date());

  // 3. 부팅 시퀀스 useEffect
  useEffect(() => {
    if (appState === 'boot') {
      const bootTimer = setTimeout(() => {
        setAppState('desktop');
      }, 10); // 4초 후 데스크탑으로 전환
      return () => clearTimeout(bootTimer);
    }
  }, [appState]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden">
      
      {/* 4. AnimatePresence를 사용하여 부팅화면과 데스크탑 간의 전환 처리 */}
      <AnimatePresence mode="wait">
        {appState === 'boot' ? (
          <MacBootScreen key="boot" onComplete={() => setAppState('desktop')} />
        ) : (
          <motion.div 
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            {/* --- 기존 macOS UI 내용 시작 --- */}
            {/* macOS Menu Bar */}
            <div className="absolute top-0 left-0 right-0 h-7 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center px-4 text-xs font-medium z-50">
              <div className="flex items-center gap-4">
                <AppleIcon />
                <span className="font-semibold">Portfolio OS</span>
                {/* ... 메뉴 항목들 */}
              </div>
              <div className="ml-auto flex items-center gap-4 text-gray-700">
                <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                <span>{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Desktop Background & Content */}
            <div className="absolute inset-0 flex items-center justify-center pt-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  허대범
                </h1>
                <p className="text-2xl text-gray-700 font-medium">Full Stack Developer</p>
              </motion.div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl px-4 py-3 shadow-2xl"
              >
                <div className="flex items-end gap-3">
                  {APPS.map((app, index) => (
                    <DockIcon
                      key={app.id}
                      app={app}
                      index={index}
                      onClick={() => setOpenApp(app.id as AppType)}
                      isOpen={openApp === app.id}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* App Windows */}
            <AnimatePresence mode="wait">
              {openApp === 'terminal' && <TerminalApp onClose={() => setOpenApp(null)} />}
              {openApp === 'safari' && <SafariApp onClose={() => setOpenApp(null)} />}
              {openApp === 'finder' && <FinderApp onClose={() => setOpenApp(null)} />}
              {openApp === 'settings' && <SettingsApp onClose={() => setOpenApp(null)} />}
              {openApp === 'contacts' && <ContactsApp onClose={() => setOpenApp(null)} />}
            </AnimatePresence>
            {/* --- 기존 macOS UI 내용 끝 --- */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DockIcon({ 
  app, 
  index, 
  onClick, 
  isOpen 
}: { 
  app: typeof APPS[0]; 
  index: number; 
  onClick: () => void;
  isOpen: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isImageContainer = app.icon.includes('.png') || app.icon.includes('/');

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      //transition={{ delay: 0.6 + index * 0.1 }}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <div className="w-16 h-16 flex items-center justify-center text-4xl bg-white/30 rounded-2xl hover:bg-white/50 transition-all shadow-lg relative overflow-hidden">
        {/* 이미지면 img 태그를, 아니면 기존처럼 텍스트(이모지)를 렌더링 */}
        {isImageContainer ? (
          <img 
            src={app.icon} 
            alt={app.name} 
            className="w-10 h-10 object-contain" // 이미지 크기 조절
          />
        ) : (
          app.icon
        )}
        {/* Active Indicator */}
        {isOpen && (
          <motion.div
            layoutId="activeApp"
            className="absolute bottom-1.5 w-1 h-1 bg-gray-800 rounded-full"
          />
        )}
      </div>
      
      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
        >
          {app.name}
        </motion.div>
      )}
    </motion.div>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
  );
}
