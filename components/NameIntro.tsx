'use client';

import { useState, type CSSProperties } from 'react';

const letters = ['F', 'A', 'R', 'U', 'Q'];

export function NameIntro() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="name-intro"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'name-intro-leave') {
          setVisible(false);
        }
      }}
    >
      <div className="name-intro-mark">
        {letters.map((letter, index) => (
          <span
            key={letter}
            className="name-intro-word"
            style={{ '--letter-index': index } as CSSProperties}
          >
            <span className="name-intro-letter">{letter}</span>
          </span>
        ))}
      <svg
        className="name-intro-underline"
        viewBox="0 0 520 80"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M18 51C140 15 344 13 501 35C384 24 230 33 103 62"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
      </div>
    </div>
  );
}
