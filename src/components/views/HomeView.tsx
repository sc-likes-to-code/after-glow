'use client';

import React, { useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';
import { WashiTape, PostmarkBadge, TinySparkle, TinyFlower } from '@/components/scrapbook/Decorations';
import { FlowerIllustration } from '@/components/scrapbook/FlowerIllustration';
import { MOODS, GENTLE_REMINDERS } from '@/lib/constants';
import { MoodType } from '@/types/memory';
import { format } from 'date-fns';
import { Plus, ChevronRight, Calendar, BookOpen } from 'lucide-react';

export function HomeView() {
  const {
    memories,
    collections,
    openCaptureModal,
    setSelectedMemoryId,
    setActiveTab,
    previewConfig,
  } = useMemoryStore();

  const [reminderIndex, setReminderIndex] = useState(0);
  const hp = previewConfig.homepage;

  // Time-contextual greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning, sunshine ☀';
    if (hour >= 12 && hour < 17) return 'Good afternoon, lovely 🌿';
    if (hour >= 17 && hour < 21) return 'Good evening, gentle soul ✨';
    return 'Peaceful night, starry sky 🌙';
  };

  const activeGreeting = hp.customGreeting || getGreeting();
  const activeSubtitle = hp.customSubtitle || 'Every little moment deserves a place.';
  const activeIntroQuote = hp.customIntroQuote || "take a breath. you're doing just fine.";

  const todayStr = new Date().toISOString().split('T')[0];
  const editorialDate = format(new Date(), 'EEEE, MMMM d, yyyy');

  // Today's moments
  const todayMemories = memories.filter((m) => m.date === todayStr);

  // Recently remembered (limit 6)
  const recentMemories = memories.slice(0, 6);

  // A little while ago (older memories, horizontal strip)
  const olderMemories = memories.filter((m) => m.date !== todayStr).slice(0, 8);

  // On this day in previous years
  const todayMonthDay = todayStr.substring(5); // MM-DD
  const todayYear = todayStr.substring(0, 4);
  const onThisDayMemories = memories.filter((m) => {
    return m.date.substring(5) === todayMonthDay && m.date.substring(0, 4) !== todayYear;
  });

  // This month's story stats
  const currentMonthPrefix = todayStr.substring(0, 7);
  const currentMonthMemories = memories.filter((m) => m.date.startsWith(currentMonthPrefix));

  // Compute most common mood this month
  const moodCounts: Record<string, number> = {};
  currentMonthMemories.forEach((m) => {
    moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
  });
  let topMoodKey: MoodType = 'peaceful';
  let maxCount = 0;
  for (const [key, count] of Object.entries(moodCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topMoodKey = key as MoodType;
    }
  }
  const topMoodMeta = MOODS[topMoodKey] || MOODS.peaceful;

  // Rotate gentle reminders
  const nextReminder = () => {
    setReminderIndex((prev) => (prev + 1) % GENTLE_REMINDERS.length);
  };

  return (
    <div className="space-y-12 pb-16 max-w-6xl mx-auto">
      {/* HERO SECTION / EDITORIAL HEADER */}
      <section className="relative pt-4 pb-8 border-b border-[var(--ag-border)]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ag-accent-secondary)] border border-[var(--ag-border)] text-xs font-serif text-[var(--ag-secondary-text)]">
              <TinyFlower className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
              <span>{editorialDate}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--ag-primary-text)] tracking-tight">
              {activeGreeting}
            </h1>

            <p className="font-heading text-lg sm:text-xl text-[var(--ag-muted-text)] italic">
              &ldquo;{activeSubtitle}&rdquo;
            </p>

            <div className="pt-1">
              <span className="font-caveat text-xl sm:text-2xl text-[var(--ag-accent-primary)] font-medium tracking-wide">
                {activeIntroQuote}
              </span>
            </div>
          </div>

          {/* Quick Capture Card */}
          <div className="relative p-5 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)] shadow-2xs max-w-xs w-full transition-colors">
            <div className="absolute -top-3 right-4">
              <WashiTape color="butter" width="w-20" angle={3} />
            </div>
            <p className="font-caveat text-lg text-[var(--ag-secondary-text)] mb-3">
              Did something lovely catch your eye today?
            </p>
            <button
              type="button"
              onClick={() => openCaptureModal()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[var(--ag-accent-primary)] hover:bg-[var(--ag-accent-hover)] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Capture today&apos;s moment</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION A: TODAY'S MOMENTS */}
      {hp.visibleSections.todaysMoments && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TinySparkle className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ag-primary-text)]">
                Today&apos;s Moments
              </h2>
            </div>
            {todayMemories.length > 0 && (
              <span className="text-xs font-mono text-[var(--ag-muted-text)]">
                {todayMemories.length} recorded
              </span>
            )}
          </div>

          {todayMemories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayMemories.map((m, idx) => (
                <PolaroidCard
                  key={m.id}
                  memory={m}
                  rotation={idx % 2 === 0 ? -1.5 : 1}
                  hasTape={true}
                  tapeColor="blush"
                />
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-10 rounded-lg bg-[var(--ag-card-bg)] border border-dashed border-[var(--ag-accent-primary)]/60 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[var(--ag-muted-text)]">
                <BookOpen className="w-6 h-6 text-[var(--ag-accent-primary)]" />
              </div>
              <h3 className="font-heading text-lg text-[var(--ag-primary-text)] font-semibold">
                Today is a blank diary page waiting for your story
              </h3>
              <p className="font-caveat text-lg text-[var(--ag-muted-text)] max-w-md">
                A warm cup of coffee, the slant of sunlight on a wall, or a quiet breath. No moment is too small.
              </p>
              <button
                type="button"
                onClick={() => openCaptureModal()}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] border border-[var(--ag-accent-primary)] text-[var(--ag-secondary-text)] text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                <span>Record your first moment today</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* SECTION B: RECENTLY REMEMBERED (PINTEREST SCRAPBOOK GRID) */}
      {hp.visibleSections.recentlyRemembered && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TinyFlower className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ag-primary-text)]">
                Recently Remembered
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--ag-accent-primary)] hover:underline cursor-pointer"
            >
              <span>View all in Timeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Asymmetric Scrapbook Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {recentMemories.map((m, idx) => {
              const rotations = [-2, 1.5, -1, 2, -1.5, 0.5];
              const tapes: ('blush' | 'sage' | 'butter' | 'lavender')[] = [
                'blush',
                'sage',
                'butter',
                'lavender',
              ];
              const hasTape = idx % 2 === 0;
              const hasPaperclip = idx % 3 === 1;

              return (
                <div key={m.id} className="transition-transform duration-300">
                  <PolaroidCard
                    memory={m}
                    rotation={rotations[idx % rotations.length]}
                    hasTape={hasTape}
                    tapeColor={tapes[idx % tapes.length]}
                    hasPaperclip={hasPaperclip}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION C: A LITTLE WHILE AGO (HORIZONTAL VISUAL STRIP) */}
      {hp.visibleSections.aLittleWhileAgo && olderMemories.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <TinySparkle className="w-4 h-4 text-[var(--ag-accent-primary)]" />
            <h2 className="font-heading text-xl font-bold text-[var(--ag-primary-text)]">
              A little while ago...
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar">
            {olderMemories.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMemoryId(m.id)}
                className="shrink-0 w-64 bg-[var(--ag-card-bg)] p-3 rounded-sm border border-[var(--ag-border)] shadow-2xs hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 snap-start"
              >
                <div className="aspect-video w-full rounded-xs overflow-hidden bg-[var(--ag-surface)] mb-2.5">
                  {m.photos?.[0]?.dataUrl ? (
                    <img
                      src={m.photos[0].dataUrl}
                      alt={m.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-caveat text-sm text-[var(--ag-muted-text)]">
                      peaceful moment
                    </div>
                  )}
                </div>
                <h4 className="font-heading text-sm font-semibold text-[var(--ag-primary-text)] truncate">
                  {m.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-[var(--ag-muted-text)] mt-1">
                  <span>{m.date}</span>
                  <span className="font-serif italic text-[10px]">{m.mood}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION D: THIS MONTH'S LITTLE STORY & ON THIS DAY */}
      {(hp.visibleSections.monthlyStory || hp.visibleSections.onThisDay) && (
        <section className={`grid grid-cols-1 ${hp.visibleSections.monthlyStory && hp.visibleSections.onThisDay ? 'lg:grid-cols-2' : ''} gap-8 pt-4`}>
          {/* D. This month's story */}
          {hp.visibleSections.monthlyStory && (
            <div className="p-6 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)] shadow-xs relative flex flex-col justify-between transition-colors">
              <div className="absolute -top-3 left-6 pointer-events-none">
                <WashiTape color="sage" width="w-24" angle={-1} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[var(--ag-primary-text)]">
                      This Month&apos;s Little Story
                    </h3>
                    <p className="text-xs text-[var(--ag-muted-text)] font-serif">
                      {format(new Date(), 'MMMM yyyy')} overview
                    </p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center">
                    <FlowerIllustration mood={topMoodKey} size={48} animate={true} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                  <div className="p-3 bg-[var(--ag-card-bg)] rounded-md border border-[var(--ag-border)]">
                    <span className="block font-heading text-2xl font-bold text-[var(--ag-primary-text)]">
                      {currentMonthMemories.length}
                    </span>
                    <span className="text-[11px] font-sans text-[var(--ag-muted-text)]">Moments kept</span>
                  </div>

                  <div className="p-3 bg-[var(--ag-card-bg)] rounded-md border border-[var(--ag-border)]">
                    <span className="block font-heading text-2xl font-bold text-[var(--ag-accent-primary)]">
                      {topMoodMeta.emoji}
                    </span>
                    <span className="text-[11px] font-sans text-[var(--ag-muted-text)] truncate">
                      {topMoodMeta.label}
                    </span>
                  </div>

                  <div className="p-3 bg-[var(--ag-card-bg)] rounded-md border border-[var(--ag-border)]">
                    <span className="block font-heading text-2xl font-bold text-[var(--ag-primary-text)]">
                      {collections.length}
                    </span>
                    <span className="text-[11px] font-sans text-[var(--ag-muted-text)]">Collections</span>
                  </div>
                </div>
              </div>

              {/* Mini Monthly Photo Collage */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[var(--ag-secondary-text)] uppercase tracking-wider block">
                  Snapshot Collage
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {currentMonthMemories
                    .filter((m) => m.photos?.length > 0)
                    .slice(0, 4)
                    .map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMemoryId(m.id)}
                        className="aspect-square rounded-xs overflow-hidden border border-[var(--ag-border)] cursor-pointer hover:scale-105 transition-transform"
                      >
                        <img
                          src={m.photos[0].dataUrl}
                          alt={m.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* E. On This Day... (Resurfaced past year memories) */}
          {hp.visibleSections.onThisDay && (
            onThisDayMemories.length > 0 ? (
              <div className="p-6 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-xs relative flex flex-col justify-between transition-colors">
                <div className="absolute -top-3 right-6 pointer-events-none">
                  <WashiTape color="lavender" width="w-24" angle={2} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[var(--ag-accent-primary)]" />
                    <h3 className="font-heading text-xl font-bold text-[var(--ag-primary-text)]">
                      On this day...
                    </h3>
                  </div>
                  <p className="font-caveat text-base text-[var(--ag-muted-text)] mb-4">
                    Memories recorded on this very date in previous years:
                  </p>

                  <div className="space-y-3">
                    {onThisDayMemories.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMemoryId(m.id)}
                        className="p-3 bg-[var(--ag-surface)] rounded-md border border-[var(--ag-border)] cursor-pointer hover:bg-[var(--ag-card-bg)] transition-colors flex items-center gap-3"
                      >
                        {m.photos?.[0] && (
                          <div className="w-14 h-14 rounded-xs overflow-hidden shrink-0 border border-[var(--ag-border)]">
                            <img
                              src={m.photos[0].dataUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading text-sm font-semibold text-[var(--ag-primary-text)] truncate">
                            {m.title}
                          </h4>
                          <p className="font-caveat text-sm text-[var(--ag-secondary-text)] truncate">
                            {m.handwrittenNote || m.journal}
                          </p>
                          <span className="text-[10px] font-mono text-[var(--ag-muted-text)]">
                            {m.date} ({new Date().getFullYear() - parseInt(m.date.substring(0, 4))} year
                            {new Date().getFullYear() - parseInt(m.date.substring(0, 4)) > 1 ? 's' : ''} ago)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Sanctuary Quote card if no past year memories */
              <div className="p-6 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-xs flex flex-col items-center justify-center text-center space-y-4 transition-colors">
                <PostmarkBadge dateText="SANCTUARY" city="AFTERGLOW" />
                <h3 className="font-heading text-xl text-[var(--ag-primary-text)] font-bold">
                  A peaceful digital sanctuary
                </h3>
                <p className="font-caveat text-xl text-[var(--ag-secondary-text)] max-w-sm">
                  &ldquo;One day, you will look back on today and realize how gently life was holding you.&rdquo;
                </p>
              </div>
            )
          )}
        </section>
      )}

      {/* SECTION F: A GENTLE REMINDER */}
      {hp.visibleSections.gentleReminder && (
        <section className="pt-2">
          <div
            onClick={nextReminder}
            className="p-6 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] text-center cursor-pointer hover:bg-[var(--ag-surface)] transition-colors shadow-2xs relative group select-none"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TinyFlower className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ag-muted-text)]">
                A gentle reminder (click for another)
              </span>
            </div>
            <p className="font-caveat text-2xl sm:text-3xl text-[var(--ag-primary-text)] leading-relaxed transition-all">
              &ldquo;{GENTLE_REMINDERS[reminderIndex]}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* HOMEPAGE FOOTER WHISPER */}
      {hp.customFooterMessage && (
        <div className="pt-4 pb-2 text-center border-t border-[var(--ag-border)]/60">
          <p className="font-caveat text-lg text-[var(--ag-muted-text)]">
            {hp.customFooterMessage}
          </p>
        </div>
      )}
    </div>
  );
}
