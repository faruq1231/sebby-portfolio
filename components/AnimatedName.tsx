'use client';

import { useState, type CSSProperties } from 'react';

const letters = ['F', 'A', 'R', 'U', 'Q'];

export function AnimatedName() {
  const [replay, setReplay] = useState(0);

  return (
    <button
      type="button"
      className="animated-name"
      aria-label="Animate Faruq’s name"
      onClick={() => setReplay((value) => value + 1)}
    >
      <span className="animated-name-letters" key={replay} aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={letter}
            className="animated-name-letter"
            aria-hidden="true"
            style={{ '--letter-index': index } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </span>
    </button>
  );
}
