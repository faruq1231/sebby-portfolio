'use client';

export function AnimatedName({ onReplay }: { onReplay: () => void }) {
  return (
    <button
      type="button"
      className="animated-name"
      aria-label="Replay the Faruq intro"
      title="Replay opening animation"
      onClick={onReplay}
    >
      FARUQ
    </button>
  );
}
