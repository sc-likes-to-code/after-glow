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
import { FloatingInstallPrompt } from '@/components/pwa/FloatingInstallPrompt';
import { AfterglowLogo } from '@/components/brand/AfterglowLogo';
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
      suppressHydrationWarning
      className={`flex min-h-screen bg-[var(--ag-bg)] text-[var(--ag-primary-text)] antialiased transition-colors duration-250 ${
        isSidebarRight ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'
      }`}
    >
      {/* Side Navigation (Desktop) & Top/Bottom Bar (Mobile) */}
      <AppNavigation />

      {/* Main Sanctuary Stage */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen px-4 sm:px-8 md:px-12 pt-6 pb-24 sm:py-8 overflow-x-hidden">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-300">
            <div className="animate-pulse">
              <AfterglowLogo variant="full" size="md" showTagline={true} />
            </div>
            <p className="font-fraunces text-sm text-[var(--ag-secondary-text)]">Opening your memory sanctuary...</p>
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

      {/* Global Modals & Floating Install Prompt */}
      <MemoryDetailModal />
      <CaptureMemoryModal />
      <FloatingInstallPrompt />
    </div>
  );
}
