'use client';

import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { PointerEvent, useRef, useState } from 'react';

type SpinGesture = {
  pointer: number;
  centerX: number;
  centerY: number;
  angle: number;
  x: number;
  y: number;
  time: number;
  startedAt: number;
  velocity: number;
  distance: number;
  useAngle: boolean;
};

const degrees = (x: number, y: number, centerX: number, centerY: number) => Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
const shortestTurn = (angle: number) => ((angle + 540) % 360) - 180;

export function HeroStamp() {
  const rotation = useMotionValue(0);
  const reduced = useReducedMotion();
  const gesture = useRef<SpinGesture | null>(null);
  const dragged = useRef(false);
  const tapAllowed = useRef(false);
  const [dragging, setDragging] = useState(false);

  const begin = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    rotation.stop();
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    gesture.current = {
      pointer: event.pointerId, centerX, centerY,
      angle: degrees(event.clientX, event.clientY, centerX, centerY),
      x: event.clientX, y: event.clientY, time: event.timeStamp,
      startedAt: event.timeStamp,
      velocity: 0, distance: 0,
      useAngle: Math.hypot(event.clientX - centerX, event.clientY - centerY) > bounds.width * .18,
    };
    dragged.current = false;
    tapAllowed.current = false;
    setDragging(true);
  };

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const current = gesture.current;
    if (!current || event.pointerId !== current.pointer) return;
    const angle = degrees(event.clientX, event.clientY, current.centerX, current.centerY);
    const delta = current.useAngle ? shortestTurn(angle - current.angle) : (event.clientX - current.x) * .8 - (event.clientY - current.y) * .3;
    const elapsed = Math.max(8, event.timeStamp - current.time);
    current.distance += Math.hypot(event.clientX - current.x, event.clientY - current.y);
    if (current.distance > 5) dragged.current = true;
    current.velocity = current.velocity * .5 + (delta / elapsed) * .5;
    current.angle = angle;
    current.x = event.clientX;
    current.y = event.clientY;
    current.time = event.timeStamp;
    rotation.set(rotation.get() + delta);
  };

  const release = (event: PointerEvent<HTMLButtonElement>) => {
    const current = gesture.current;
    if (!current || current.pointer !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    tapAllowed.current = !dragged.current && event.timeStamp - current.startedAt < 300;
    if (dragged.current && !reduced) {
      const releaseVelocity = current.velocity * Math.exp(-(event.timeStamp - current.time) / 120);
      const momentum = Math.max(-720, Math.min(720, releaseVelocity * 260));
      animate(rotation, rotation.get() + momentum, { duration: 1.4, ease: [.16, 1, .3, 1] });
    }
  };

  const cancel = () => {
    gesture.current = null;
    dragged.current = true;
    tapAllowed.current = false;
    setDragging(false);
  };

  const spin = () => {
    rotation.stop();
    animate(rotation, rotation.get() + (reduced ? 90 : 360), { duration: reduced ? .15 : 1.8, ease: [.16, 1, .3, 1] });
  };

  return (
    <motion.div className="hero-stamp" initial={reduced ? false : { opacity: 0, scale: .85, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, delay: .2, type: 'spring', bounce: .2 }}>
      <motion.button
        type="button"
        className={dragging ? 'stamp-turntable is-held' : 'stamp-turntable'}
        style={{ rotate: rotation }}
        onPointerDown={begin}
        onPointerMove={move}
        onPointerUp={release}
        onPointerCancel={cancel}
        onLostPointerCapture={() => { if (gesture.current) cancel(); }}
        onClick={event => { if (event.detail === 0 || tapAllowed.current) spin(); tapAllowed.current = false; }}
        onContextMenu={event => event.preventDefault()}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          rotation.stop();
          animate(rotation, rotation.get() + (event.key === 'ArrowRight' ? 45 : -45), { duration: reduced ? 0 : .2 });
        }}
        aria-label="Spin the Faruq logo"
        aria-describedby="stamp-hint"
      >
        <div className="stamp-ring" aria-hidden="true"><span>Build</span><span>Learn</span><span>Repeat</span></div>
        <Image className="brand-stamp" src="/faruq-logo.png" width={300} height={300} alt="" aria-hidden="true" priority draggable={false} />
      </motion.button>
      <span id="stamp-hint" className="stamp-caption">Drag or tap to spin. Hold to pause.</span>
    </motion.div>
  );
}
