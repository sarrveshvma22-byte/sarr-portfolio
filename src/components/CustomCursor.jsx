import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check for hover state and custom cursor label
      const target = e.target.closest('[data-cursor], a, button, input, [role="button"]');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const render = () => {
      // Smooth lerp for outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference">
      {/* Inner precise dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-[#FE3303] transition-transform duration-75 ease-out"
      />

      {/* Outer fluid aura ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-6 -mt-6 rounded-full border border-[#F5E7DF]/80 flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ease-out ${
          isHovered
            ? cursorText
              ? 'w-24 h-24 -ml-12 -mt-12 bg-[#FE3303] border-transparent text-[#121111]'
              : 'w-14 h-14 -ml-7 -mt-7 bg-[#F5E7DF]/20 border-[#FF7B00]'
            : 'w-10 h-10 -ml-5 -mt-5 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-black select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

