import React, { useState, useEffect } from 'react';
import CosmicCanvas from './components/CosmicCanvas';
import CosmicPillNav from './components/CosmicPillNav';
import CosmicOrbitRail from './components/CosmicOrbitRail';
import SiteMenu from './components/SiteMenu';
import ChapterStory from './components/ChapterStory';
import WorkDetailModal from './components/WorkDetailModal';
import SiteView from './components/SiteView';
import GooeyDock from './components/GooeyDock';
import { chapters } from './data/storyData';
import { cosmicAudio } from './utils/CosmicAudio';
import { initSmoothScroll, scrollToSection } from './utils/smoothScroll';

function getInitialViewMode() {
  if (typeof window === 'undefined') return 'site';
  const params = new URLSearchParams(window.location.search);
  return params.get('v') === '3d' ? '3d' : 'site';
}

export default function App() {
  const [viewMode, setViewMode] = useState(getInitialViewMode);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState('ground');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Initialize Lenis smooth scrolling (respecting prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = initSmoothScroll();
    return () => {
      if (lenis) lenis.destroy();
    };
  }, [viewMode]);

  // Track scroll position for 3D Story WebGL state & active chapter
  useEffect(() => {
    if (viewMode !== '3d') return undefined;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const normalizedProgress = maxScroll > 0 ? (scrollY / maxScroll) * 26.0 : 0;
      setScrollProgress(normalizedProgress);

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapterId(chapters[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleChangeViewMode = (nextMode) => {
    setViewMode(nextMode);
    setIsMenuOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set('v', nextMode);
    window.history.replaceState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectChapter = (chapterId) => {
    scrollToSection(`#${chapterId}`);
  };

  const handleScrollToSiteSection = (sectionId) => {
    scrollToSection(`#${sectionId}`);
  };

  const handleToggleSound = () => {
    const active = cosmicAudio.toggleSound();
    setIsSoundActive(active);
  };

  const activeChapterObj = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#e9e7e1] selection:bg-[#ff9d42] selection:text-black">
      {/* Subtle Noise Grain Overlay */}
      <div className="noise-overlay" />

      {viewMode === 'site' ? (
        <SiteView
          onSelectWork={(work) => setSelectedWork(work)}
          onEnter3D={() => handleChangeViewMode('3d')}
          onScrollTo={handleScrollToSiteSection}
        />
      ) : (
        <>
          {/* Fixed Fullscreen WebGL2 / Three.js Canvas */}
          <CosmicCanvas scrollProgress={scrollProgress} />

          {/* Top Floating Pill Header */}
          <CosmicPillNav
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            isSoundActive={isSoundActive}
            onToggleSound={handleToggleSound}
            onJumpToWork={() => handleSelectChapter('pieces')}
            activeChapterTitle={`${activeChapterObj.number} ${activeChapterObj.title}`}
          />

          {/* Right Edge Orbit HUD Rail */}
          <CosmicOrbitRail
            activeChapterId={activeChapterId}
            onSelectChapter={handleSelectChapter}
          />

          {/* Full-Screen Chapter Menu Dialog */}
          <SiteMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onSelectChapter={handleSelectChapter}
            activeChapterId={activeChapterId}
          />

          {/* Main 9-Chapter Narrative Scroll Story */}
          <main className="pb-24">
            <ChapterStory onSelectWork={(work) => setSelectedWork(work)} />
          </main>
        </>
      )}

      {/* Floating SVG Gooey Dock (Mode Switcher + Quick Nav + Audio) */}
      <GooeyDock
        viewMode={viewMode}
        onChangeViewMode={handleChangeViewMode}
        isSoundActive={isSoundActive}
        onToggleSound={handleToggleSound}
        onScrollTo={handleScrollToSiteSection}
      />

      {/* Deep-dive Case Study Blueprint Modal */}
      {selectedWork && (
        <WorkDetailModal
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
        />
      )}
    </div>
  );
}
