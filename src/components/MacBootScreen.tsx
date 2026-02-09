'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MacBootScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'logo' | 'loading' | 'done'>('logo');

  useEffect(() => {
    const logoTimer = setTimeout(() => setStage('loading'), 1500);
    const loadingTimer = setTimeout(() => setStage('done'), 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black flex flex-col items-center justify-center"
    >
      {/* Apple Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: stage === 'done' ? 0 : 1,
          scale: stage === 'done' ? 1.2 : 1 
        }}
        transition={{ duration: 0.8 }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="white"
          className="mb-8"
        >
          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
        </svg>
      </motion.div>

      {/* Loading Bar */}
      <AnimatePresence>
        {stage !== 'logo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
