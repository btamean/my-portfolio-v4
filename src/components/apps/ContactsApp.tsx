'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactsApp({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-8 bg-white rounded-xl shadow-2xl overflow-hidden z-[100] flex"
    >
      {/* Contacts Sidebar */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col">
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

        {/* Profile Card */}
        <div className="p-6 border-b border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👨‍💻
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900">허대범</h3>
          <p className="text-sm text-center text-gray-500 mt-1">Full Stack Developer</p>
        </div>

        {/* Contact Info */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-3">
            <ContactInfoItem 
              icon="📧"
              label="Email"
              value="heo.daebeom@example.com"
              href="mailto:heo.daebeom@example.com"
            />
            <ContactInfoItem 
              icon="📱"
              label="Phone"
              value="+82 10-1234-5678"
              href="tel:+821012345678"
            />
            <ContactInfoItem 
              icon="💼"
              label="LinkedIn"
              value="linkedin.com/in/daebeom"
              href="https://linkedin.com"
            />
            <ContactInfoItem 
              icon="🐱"
              label="GitHub"
              value="github.com/daebeom"
              href="https://github.com"
            />
            <ContactInfoItem 
              icon="📍"
              label="Location"
              value="Seoul, South Korea"
              href=""
            />
          </div>
        </div>
      </div>

      {/* Main Content - Message Form */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-gray-200 flex items-center px-6">
          <h2 className="text-lg font-semibold text-gray-900">Send a Message</h2>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {isSent ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-8xl mb-6"
              >
                ✅
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">I&apos;ll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h3>
                <p className="text-gray-600">
                  Have a project in mind? Let&apos;s work together! Fill out the form below or reach out directly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Send Message 📨
                </motion.button>
              </form>

              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Or reach out directly:</p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="mailto:heo.daebeom@example.com"
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center font-medium text-gray-700"
                  >
                    📧 Email Me
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center font-medium text-gray-700"
                  >
                    💼 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ContactInfoItem({ 
  icon, 
  label, 
  value, 
  href 
}: { 
  icon: string; 
  label: string; 
  value: string; 
  href: string;
}) {
  const content = (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
