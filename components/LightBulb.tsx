'use client';

import { animate, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Lightbulb } from 'lucide-react';
import { PointerEvent, useRef, useState } from 'react';

type LightBulbProps = { lit: boolean; onToggle: () => void };

export function LightBulb({ lit, onToggle }: LightBulbProps) {
  const pull = useMotionValue(0);
  const springPull = useSpring(pull, { stiffness: 330, damping: 22, mass: 0.65 });
  const start = useRef(0);
  const dragged = useRef(false);
  const [active, setActive] = useState(false);

  const begin = (event: PointerEvent<HTMLButtonElement>) => {
    dragged.current = false;
    // Phones keep native scrolling; the bulb toggles with a normal tap.
    if (event.pointerType !== 'mouse') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = event.clientY;
    dragged.current = false;
    setActive(true);
  };

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (!active) return;
    const distance = Math.max(0, Math.min(112, event.clientY - start.current));
    if (distance > 7) dragged.current = true;
    pull.set(distance);
  };

  const release = () => {
    if (!active) return;
    const shouldToggle = pull.get() > 54;
    if (shouldToggle) onToggle();
    setActive(false);
    animate(pull, 0, { type: 'spring', stiffness: 280, damping: 14 });
  };

  const cancel = () => {
    setActive(false);
    animate(pull, 0, { type: 'spring', stiffness: 280, damping: 14 });
  };

  return (
    <div className="bulb-stage">
      <button
        type="button"
        className={active ? 'bulb-control dragging' : 'bulb-control'}
        onPointerDown={begin}
        onPointerMove={move}
        onPointerUp={release}
        onPointerCancel={cancel}
        onClick={(event) => { if (event.detail === 0 || !dragged.current) onToggle(); dragged.current = false; }}
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
        <motion.span className="cord-wrap" style={{ y: springPull }} aria-hidden="true">
          <span className="cord" />
          <span className="cord-end" />
        </motion.span>
        <span className="pull-label">{active ? 'keep going…' : lit ? 'again?' : 'pull me'}</span>
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
