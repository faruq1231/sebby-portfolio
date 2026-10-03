'use client';

import { animate, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Lightbulb, Power } from 'lucide-react';
import { PointerEvent, useRef, useState } from 'react';

type LightBulbProps = { lit: boolean; onToggle: () => void };

export function LightBulb({ lit, onToggle }: LightBulbProps) {
  const pull = useMotionValue(0);
  const springPull = useSpring(pull, { stiffness: 330, damping: 22, mass: 0.65 });
  const start = useRef(0);
  const dragged = useRef(false);
  const activePointer = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  const begin = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    pull.stop();
    pull.set(0);
    dragged.current = false;
    // Capture only the cord so swiping elsewhere keeps normal page scrolling.
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = event.clientY;
    setActive(true);
  };

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerId !== activePointer.current) return;
    const distance = Math.max(0, Math.min(80, event.clientY - start.current));
    if (distance > 7) dragged.current = true;
    pull.set(distance);
  };

  const release = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerId !== activePointer.current) return;
    const shouldToggle = pull.get() >= 32;
    activePointer.current = null;
    if (shouldToggle) onToggle();
    setActive(false);
    animate(pull, 0, { type: 'spring', stiffness: 280, damping: 14 });
  };

  const cancel = () => {
    activePointer.current = null;
    dragged.current = true;
    setActive(false);
    animate(pull, 0, { type: 'spring', stiffness: 280, damping: 14 });
  };

  return (
    <div className="bulb-stage">
      <div className="bulb-illustration">
        <button
          type="button"
          className="bulb-control"
          onClick={onToggle}
          aria-pressed={lit}
          aria-label={lit ? 'Turn the portfolio light off' : 'Turn the portfolio light on'}
        >
          <span className="cable" aria-hidden="true" />
          <motion.span
            className="bulb-icon"
            animate={{ rotate: lit ? [0, -5, 3, 0] : 0, scale: active ? 1.03 : 1 }}
            transition={{ duration: 0.55 }}
          >
            <Lightbulb size={62} strokeWidth={1.15} />
          </motion.span>
        </button>
        <motion.button
          type="button"
          className={active ? 'cord-wrap dragging' : 'cord-wrap'}
          style={{ y: springPull }}
          onPointerDown={begin}
          onPointerMove={move}
          onPointerUp={release}
          onPointerCancel={cancel}
          onLostPointerCapture={() => { if (activePointer.current !== null) cancel(); }}
          onClick={(event) => { if (event.detail === 0 || !dragged.current) onToggle(); dragged.current = false; }}
          aria-label="Pull cord to switch the light"
          aria-pressed={lit}
        >
          <span className="cord" aria-hidden="true" />
          <span className="cord-end" aria-hidden="true" />
        </motion.button>
        <span className="pull-label" aria-hidden="true">{active ? 'keep going…' : 'pull cord'}</span>
      </div>
      <button
        type="button"
        className="bulb-toggle"
        onClick={onToggle}
        aria-pressed={lit}
        aria-describedby="bulb-help"
      >
        <Power size={22} aria-hidden="true" />
        <span>{lit ? 'Turn light off' : 'Turn light on'}</span>
      </button>
      <motion.p
        className="thanks"
        initial={false}
        animate={{ opacity: lit ? 1 : 0, y: lit ? 0 : 12 }}
        aria-live="polite"
      >Thanks. My mum can see my career now.</motion.p>
      <motion.a
        className="continue-after-light"
        href="#after-light"
        initial={false}
        animate={{ opacity: lit ? 1 : 0, y: lit ? 0 : 10 }}
        tabIndex={lit ? 0 : -1}
        aria-hidden={!lit}
        style={{ pointerEvents: lit ? 'auto' : 'none' }}
      >Continue <ArrowDown size={15} aria-hidden="true" /></motion.a>
    </div>
  );
}
