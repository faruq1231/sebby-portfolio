'use client';

import { motion, useMotionValue, useMotionValueEvent, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getLetterPose } from '@/lib/scroll-letter-pose';
import { HeroStamp } from '@/components/HeroStamp';

function Letter({ letter, index, progress, mobile }: { letter: string; index: number; progress: MotionValue<number>; mobile: boolean }) {
  const pose = useTransform(progress, value => getLetterPose(value, index, mobile));
  const x = useTransform(pose, value => `${value.x}vw`);
  const y = useTransform(pose, value => `${value.y}vh`);
  const scale = useTransform(pose, value => value.scale);
  const rotate = useTransform(pose, value => value.rotate);
  const rotateX = useTransform(pose, value => value.rotateX);
  const rotateY = useTransform(pose, value => value.rotateY);
  const opacity = useTransform(pose, value => value.opacity);
  const color = useTransform(pose, value => `rgba(244,241,232,${value.fill})`);
  return <div className="scene-letter-anchor"><motion.span className="scene-letter" style={{ x, y, scale, rotate, rotateX, rotateY, opacity, color }}>{letter}</motion.span></div>;
}

export function FaruqScrollScene() {
  const frame = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: .0001 });
  const still = useMotionValue(0);
  const progress = reduced ? still : smoothProgress;
  const pointerX = useMotionValue(600);
  const pointerY = useMotionValue(350);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${pointerX}px ${pointerY}px, rgba(244,241,232,.055), transparent 70%)`;
  const introOpacity = useTransform(progress, [0, .1, .24], [1, 1, 0]);
  const introY = useTransform(progress, [0, .24], [0, 40]);
  const orbitOpacity = useTransform(progress, [0, .14, .28, .72, .9], [0, 0, 1, 1, 0]);
  const ringRotate = useTransform(progress, [0, 1], [-30, 210]);
  const ringScale = useTransform(progress, [0, .25, .8, 1], [.65, 1, 1.1, .8]);
  const emblemScale = useTransform(progress, [0, .25, .45, .8], [.5, .85, 1, .7]);
  const emblemEvents = useTransform(progress, value => value > .22 && value < .86 ? 'auto' as const : 'none' as const);
  const outroOpacity = useTransform(progress, [.68, .86, 1], [0, 1, 1]);
  const outroY = useTransform(progress, [.68, 1], [45, 0]);
  const fieldY = useTransform(progress, [0, 1], [0, -100]);

  useMotionValueEvent(progress, 'change', value => {
    const next = value > .85 ? 2 : value > .22 ? 1 : 0;
    setPhase(current => current === next ? current : next);
  });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section id="top" ref={frame} className={`name-scene${reduced ? ' name-scene--reduced' : ''}`} aria-labelledby="hero-title">
      <motion.div className="name-scene-stage" style={{ backgroundImage: glow }} onPointerMove={event => {
        if (event.pointerType === 'touch') return;
        const box = event.currentTarget.getBoundingClientRect();
        pointerX.set(event.clientX - box.left); pointerY.set(event.clientY - box.top);
      }}>
        <h1 id="hero-title" className="sr-only">Faruq Etamesor. Developer and product builder.</h1>
        <motion.svg className="scene-field" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ y: fieldY }}>
          {Array.from({ length: 84 }, (_, i) => <circle key={i} cx={(i * 173 + 41) % 1200} cy={(i * 97 + 23) % 800} r={i % 7 === 0 ? 1.7 : .8} fill="currentColor" opacity={i % 3 === 0 ? .4 : .15} />)}
          <path d="M0 600H1200M0 200H1200M300 0V800M900 0V800" stroke="currentColor" strokeWidth=".5" opacity=".035" />
        </motion.svg>
        <motion.div className="scene-topline studio-container" style={{ opacity: introOpacity }}><p>Faruq Etamesor <span>Developer & product builder</span></p><span className="scene-location">Based in Nigeria <i /></span></motion.div>

        <motion.svg className="scene-orbits" viewBox="0 0 700 700" aria-hidden="true" style={{ opacity: orbitOpacity, rotate: ringRotate, scale: ringScale }}>
          <circle cx="350" cy="350" r="230" fill="none" stroke="currentColor" strokeWidth=".6" />
          <ellipse cx="350" cy="350" rx="290" ry="125" fill="none" stroke="currentColor" strokeWidth=".7" transform="rotate(-35 350 350)" />
          <ellipse cx="350" cy="350" rx="290" ry="125" fill="none" stroke="currentColor" strokeWidth=".7" transform="rotate(35 350 350)" />
          {Array.from({ length: 40 }, (_, i) => <path key={i} d="M350 110V116" stroke="currentColor" strokeWidth={i % 5 === 0 ? 2 : 1} transform={`rotate(${i * 9} 350 350)`} />)}
          <circle cx="120" cy="350" r="4" fill="currentColor" /><circle cx="580" cy="350" r="4" fill="currentColor" />
        </motion.svg>

        <div className="scene-name-layer" aria-hidden="true">{'FARUQ'.split('').map((letter, index) => <Letter key={letter} letter={letter} index={index} progress={progress} mobile={mobile} />)}</div>
        <motion.div className="scene-emblem" inert={phase !== 1 || undefined} aria-hidden={phase !== 1 || undefined} style={{ opacity: orbitOpacity, scale: emblemScale, pointerEvents: emblemEvents }}><HeroStamp /></motion.div>

        <motion.div className="scene-intro studio-container" inert={phase !== 0 || undefined} aria-hidden={phase !== 0 || undefined} style={{ opacity: introOpacity, y: introY }}>
          <div className="scene-intro-copy"><p>Interfaces. Systems.<br />A little personality.</p><a className="scene-work-link" href="#work">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          <div className="scene-scroll-hint"><span>Scroll to explore</span><ArrowDown size={18} aria-hidden="true" /></div>
          <figure className="scene-portrait"><Image src="/faruq-portrait.jpeg" width={180} height={225} sizes="180px" alt="Faruq Etamesor" priority /><figcaption>Faruq. Or Sebby.</figcaption></figure>
        </motion.div>
        <motion.div className="scene-outro" inert={phase !== 2 || undefined} aria-hidden={phase !== 2 || undefined} style={{ opacity: outroOpacity, y: outroY }}><span>Less talk.</span><p>More making.</p><a href="#work" aria-label="Explore selected projects"><ArrowDown size={24} aria-hidden="true" /></a></motion.div>
        <div className="scene-rail" aria-hidden="true"><span>01</span><div><motion.i style={{ scaleY: progress }} /></div><span>02</span></div>
      </motion.div>
    </section>
  );
}
