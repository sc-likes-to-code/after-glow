'use client';

import React, { useEffect } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { AppNavigation } from '@/components/layout/AppNavigation';
import { HomeView } from '@/components/views/HomeView';
import { TimelineView } from '@/components/views/TimelineView';
import { MoodGardenView } from '@/components/views/MoodGardenView';
import { CollectionsView } from '@/components/views/CollectionsView';
import { SearchView } from '@/components/views/SearchView';
import { SettingsView } from '@/components/views/SettingsView';
import { AtelierView } from '@/components/atelier/AtelierView';
import { CaptureMemoryModal } from '@/components/scrapbook/CaptureMemoryModal';
import { MemoryDetailModal } from '@/components/scrapbook/MemoryDetailModal';
import { TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import { motion, AnimatePresence } from 'framer-motion';

export default function AfterglowApp() {
  const { activeTab, loadInitialData, isLoading, previewConfig } = useMemoryStore();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Scroll to top when changing sections
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const isSidebarRight = previewConfig?.layout?.sidebarPosition === 'right';

  return (
    <div
      className={`flex min-h-screen bg-[var(--ag-bg)] text-[var(--ag-primary-text)] antialiased transition-colors duration-250 ${
        isSidebarRight ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'
      }`}
    >
      {/* Side Navigation (Desktop) & Top/Bottom Bar (Mobile) */}
      <AppNavigation />

      {/* Main Sanctuary Stage */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen px-4 sm:px-8 md:px-12 py-6 sm:py-8 overflow-x-hidden">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EBCFD3]/60 flex items-center justify-center animate-pulse">
              <TinyFlower className="w-6 h-6 text-[#B8707E]" />
            </div>
            <p className="font-fraunces text-lg text-[#75665A]">Opening your memory book...</p>
            <p className="font-caveat text-sm text-[#998A7F]">some moments are too beautiful to let them fade</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="flex-1"
            >
              {activeTab === 'home' && <HomeView />}
              {activeTab === 'timeline' && <TimelineView />}
              {activeTab === 'garden' && <MoodGardenView />}
              {activeTab === 'collections' && <CollectionsView />}
              {activeTab === 'search' && <SearchView />}
              {activeTab === 'atelier' && <AtelierView />}
              {activeTab === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Global Modals */}
      <MemoryDetailModal />
      <CaptureMemoryModal />
    </div>
  );
}
