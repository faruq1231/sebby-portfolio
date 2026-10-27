'use client';

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { type CSSProperties, useEffect, useRef, useState } from 'react';

interface ProjectShelfProps {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  active: boolean;
  imageHeight?: number;
  successImage?: string;
}

export function ProjectShelf({ id, name, image, imageAlt, active, imageHeight = 1700, successImage }: ProjectShelfProps) {
  const root = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const capture = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();
  const visible = useInView(root, { amount: .18 });
  const [paused, setPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [distance, setDistance] = useState(0);
  const playing = visible && active && documentVisible && !paused && !reduced;
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const lift = useTransform(progress, [0, .28, .72, 1], [26, -18, -18, 8]);
  const tiltX = useTransform(progress, [0, .35, .75, 1], [12, 2, 0, 5]);
  const tiltY = useTransform(progress, [0, .35, .75, 1], [-14, -6, 5, 10]);

  useEffect(() => {
    const update = () => setDocumentVisible(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const viewport = screen.current;
    const imageElement = capture.current;
    if (!viewport || !imageElement) return;
    const measure = () => setDistance(Math.max(0, imageElement.offsetHeight - viewport.clientHeight));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(imageElement);
    imageElement.addEventListener('load', measure);
    measure();
    return () => {
      observer.disconnect();
      imageElement.removeEventListener('load', measure);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`project-shelf project-shelf--${id}`}
      data-playing={playing ? 'true' : 'false'}
      data-preview-kind={successImage ? 'card' : 'website'}
      style={{ '--preview-distance': `${distance}px` } as CSSProperties}
    >
      <div className="project-shelf-backdrop" aria-hidden="true" />
      <span className="project-shelf-label" aria-hidden="true">{name}</span>
      <div className="project-shelf-shadow" aria-hidden="true" />
      <div className="project-shelf-board" aria-hidden="true" />
      <motion.div
        className="project-shelf-object"
        style={reduced ? undefined : { y: lift, rotateX: tiltX, rotateY: tiltY }}
      >
        <motion.div
          className="project-shelf-pickup"
          initial={false}
          animate={reduced || (active && visible) ? { y: 0, rotateZ: 0, scale: 1 } : { y: 22, rotateZ: -3, scale: .98 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 130, damping: 22 }}
        >
          <div className="project-shelf-hover">
          <div className="project-shelf-browser">
            <div className="project-shelf-toolbar" aria-hidden="true">
              <span><i /><i /><i /></span>
              <span className="project-shelf-address">{id === 'easygrab' ? 'easygrab-opal.vercel.app' : id === 'valentine' ? 'valentine-web-card' : 'masterspred.vercel.app'}</span>
              <ArrowUpRight size={12} />
            </div>
            <div className="project-shelf-screen" ref={screen}>
              <Image
                ref={capture}
                className="project-shelf-capture"
                src={image}
                width={1225}
                height={imageHeight}
                sizes="(max-width: 760px) 75vw, (max-width: 1180px) 48vw, 620px"
                alt={imageAlt}
              />
              {successImage && <Image className="project-shelf-success" src={successImage} width={1225} height={567} sizes="(max-width: 760px) 75vw, 620px" alt="" aria-hidden="true" />}
              <div className="project-shelf-cursor" aria-hidden="true">
                <svg width="25" height="30" viewBox="0 0 25 30" fill="none"><path d="M3 2L22 17H13L9 26L3 2Z" fill="#f4f1e8" stroke="#161614" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                <span />
              </div>
            </div>
          </div>
          {id === 'masterspred' && (
            <div className="project-shelf-phone" aria-hidden="true">
              <Image src="/masterspred-showcase.webp" width={910} height={1455} sizes="(max-width: 760px) 70px, 115px" alt="" />
            </div>
          )}
          </div>
        </motion.div>
      </motion.div>
      {!reduced && (
        <button
          type="button"
          className="project-shelf-control"
          aria-label={`${paused ? 'Play' : 'Pause'} ${name} preview`}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          <span>{paused ? 'Play preview' : 'Pause preview'}</span>
        </button>
      )}
    </div>
  );
}
