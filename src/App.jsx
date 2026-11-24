import React, { useState, useEffect } from 'react';
import CosmicCanvas from './components/CosmicCanvas';
import CosmicPillNav from './components/CosmicPillNav';
import CosmicOrbitRail from './components/CosmicOrbitRail';
import SiteMenu from './components/SiteMenu';
import ChapterStory from './components/ChapterStory';
import WorkDetailModal from './components/WorkDetailModal';
import { chapters } from './data/storyData';
import { cosmicAudio } from './utils/CosmicAudio';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState('ground');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Track scroll position to update WebGL state & active chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const normalizedProgress = maxScroll > 0 ? (scrollY / maxScroll) * 26.0 : 0;
      setScrollProgress(normalizedProgress);

      // Determine active chapter based on section positions
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
  }, []);

  const handleSelectChapter = (chapterId) => {
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const active = cosmicAudio.toggleSound();
    setIsSoundActive(active);
  };

  const activeChapterObj = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#e9e7e1] selection:bg-[#ff9d42] selection:text-black">
      {/* Subtle Noise Grain Overlay */}
      <div className="noise-overlay" />

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
      <main>
        <ChapterStory onSelectWork={(work) => setSelectedWork(work)} />
      </main>

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
