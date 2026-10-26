'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: 'masterspred',
    name: 'Masterspred',
    number: '01',
    category: 'Full stack / Community',
    title: 'For the love of the game.',
    description: 'A sports prediction community, built from the interface to the wallet.',
    image: '/masterspred-desktop.png',
    imageAlt: 'The Masterspred website showing public prediction results',
    href: 'https://masterspred.vercel.app',
    action: 'Explore Masterspred',
    status: 'Live product',
  },
  {
    id: 'easygrab',
    name: 'EasyGrab',
    number: '02',
    category: 'Marketplace / In progress',
    title: 'Your campus, within reach.',
    description: 'A marketplace I’m building for Edo State University students and local sellers.',
    image: '/easygrab-desktop.png',
    imageAlt: 'The EasyGrab campus marketplace website, currently in development',
    href: 'https://easygrab-opal.vercel.app/',
    action: 'See the work in progress',
    status: 'In development',
  },
];

export function ProjectDeck() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const pinned = desktop && !reduced;
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: .001 });

  const frontX = useTransform(progress, [0, .2, .83, 1], ['0%', '0%', '-112%', '-120%']);
  const frontRotate = useTransform(progress, [0, .2, .85, 1], [0, 0, -11, -13]);
  const frontTilt = useTransform(progress, [0, .2, .85, 1], [0, 0, -12, -12]);
  const frontOpacity = useTransform(progress, [0, .63, .88, 1], [1, 1, 0, 0]);
  const backScale = useTransform(progress, [0, .2, .83, 1], [.93, .93, 1, 1]);
  const backY = useTransform(progress, [0, .2, .83, 1], [28, 28, 0, 0]);
  const backRotate = useTransform(progress, [0, .2, .83, 1], [3, 3, 0, 0]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 761px) and (min-height: 620px)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (!pinned) return;
    const next = value >= .52 ? 1 : 0;
    setActive(current => current === next ? current : next);
  });

  const selectProject = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const element = section.current;
    if (!element || !pinned) return;
    const top = window.scrollY + element.getBoundingClientRect().top;
    const travel = Math.max(0, element.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + travel * (index === 0 ? .08 : .94), behavior });
  }, [pinned]);

  useEffect(() => {
    if (!pinned) return;
    const followHash = () => {
      const index = projects.findIndex(project => `#${project.id}` === window.location.hash);
      if (index >= 0) selectProject(index, 'auto');
    };
    const frame = window.requestAnimationFrame(followHash);
    window.addEventListener('hashchange', followHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', followHash);
    };
  }, [pinned, selectProject]);

  return (
    <section
      id="work"
      ref={section}
      className={`project-deck${pinned ? ' project-deck--pinned' : ''}`}
      aria-labelledby="project-deck-title"
    >
      <div className="project-deck-stage">
        <div className="project-deck-heading">
          <p className="project-deck-kicker">01 / Selected work</p>
          <h2 id="project-deck-title">Built to be used.</h2>
          <p className="project-deck-note">A few ideas that made it out of my head.</p>
        </div>

        <div className="project-deck-cards">
          {projects.map((project, index) => {
            const hidden = pinned && active !== index;
            return (
              <motion.article
                key={project.id}
                id={project.id}
                className={`project-deck-card project-deck-card--${project.id}`}
                aria-labelledby={`${project.id}-title`}
                aria-hidden={hidden || undefined}
                inert={hidden || undefined}
                style={pinned ? index === 0
                  ? { x: frontX, rotate: frontRotate, rotateY: frontTilt, opacity: frontOpacity }
                  : { scale: backScale, y: backY, rotate: backRotate }
                  : undefined}
              >
                <div className="project-deck-media">
                  <div className="project-deck-preview-bar" aria-hidden="true">
                    <span><i /><i /><i /></span>
                    <span>{project.name}</span>
                    <span>↗</span>
                  </div>
                  <Image
                    className="project-deck-image"
                    src={project.image}
                    width={1210}
                    height={560}
                    sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1180px) 60vw, 767px"
                    alt={project.imageAlt}
                  />
                  {project.id === 'masterspred' && (
                    <div className="project-deck-phone" aria-hidden="true">
                      <Image src="/masterspred-showcase.webp" width={910} height={1455} sizes="190px" alt="" className="project-deck-phone-image" />
                    </div>
                  )}
                </div>
                <div className="project-deck-copy">
                  <div className="project-deck-meta"><span>{project.number}</span><span>{project.category}</span></div>
                  <p className="project-deck-name">{project.name}</p>
                  <h3 id={`${project.id}-title`}>{project.title}</h3>
                  <p className="project-deck-description">{project.description}</p>
                  <div className="project-deck-card-bottom">
                    <span className="project-deck-status"><i aria-hidden="true" />{project.status}</span>
                    <a href={project.href} target="_blank" rel="noreferrer" className="project-deck-link" tabIndex={hidden ? -1 : undefined}>
                      {project.action}<ArrowUpRight size={20} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {pinned && (
          <div className="project-deck-navigation">
            <div className="project-deck-tabs" role="group" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button key={project.id} type="button" aria-pressed={active === index} aria-controls={project.id} onClick={() => selectProject(index)}>
                  <span>{project.number}</span>{project.name}
                </button>
              ))}
            </div>
            <span className="project-deck-counter" aria-live="polite">0{active + 1} <span>/ 02</span></span>
          </div>
        )}
      </div>
    </section>
  );
}
