'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectShelf } from './ProjectShelf';

interface Project {
  id: string;
  name: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageHeight?: number;
  successImage?: string;
  href: string;
  action: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 'masterspred',
    name: 'Masterspred',
    number: '01',
    category: 'Full stack / Community',
    title: 'For the love of the game.',
    description: 'A sports prediction community, built from the interface to the wallet.',
    image: '/masterspred-tour.png',
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
    image: '/easygrab-tour.png',
    imageAlt: 'The EasyGrab campus marketplace website, currently in development',
    href: 'https://easygrab-opal.vercel.app/',
    action: 'See the work in progress',
    status: 'In development',
  },
  {
    id: 'valentine',
    name: 'Valentine web card',
    number: '03',
    category: 'Creative coding / Microsite',
    title: 'A little love, in code.',
    description: 'A playful Valentine card with a cheeky question and a celebratory reveal.',
    image: '/valentine-preview.png',
    imageAlt: 'The Valentine web card asking Will you be my Valentine',
    imageHeight: 567,
    successImage: '/valentine-success.png',
    href: 'https://faruq1231.github.io/valentine-web-card/',
    action: 'Open the card',
    status: 'Live experiment',
  },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function ProjectCard({ project, index, count, progress, pinned, active }: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
  pinned: boolean;
  active: number;
}) {
  const local = useTransform(progress, value => value * (count - 1) - index);
  const approach = useTransform(local, value => clamp(value + 1));
  const exit = useTransform(local, value => clamp((value - .12) / .74));
  const x = useTransform(exit, value => `${-120 * value}%`);
  const rotate = useTransform(local, value => 3 * (1 - clamp(value + 1)) - 13 * clamp((value - .12) / .74));
  const rotateY = useTransform(exit, value => -12 * value);
  const opacity = useTransform(local, value => 1 - clamp((value - .64) / .24));
  const scale = useTransform(approach, value => .93 + value * .07);
  const y = useTransform(approach, value => 28 * (1 - value));
  const hidden = pinned && active !== index;

  return (
    <motion.article
      id={project.id}
      className={`project-deck-card project-deck-card--${project.id}`}
      aria-labelledby={`${project.id}-title`}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      style={{ zIndex: count - index, ...(pinned ? { x, rotate, rotateY, opacity, scale, y } : {}) }}
    >
      <div className="project-deck-media">
        <ProjectShelf
          id={project.id}
          name={project.name}
          image={project.image}
          imageAlt={project.imageAlt}
          imageHeight={project.imageHeight}
          successImage={project.successImage}
          active={!hidden}
        />
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
}

export function ProjectDeck() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const pinned = desktop && !reduced;
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: .001 });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 761px) and (min-height: 620px)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useMotionValueEvent(progress, 'change', value => {
    if (!pinned) return;
    const next = Math.max(0, Math.min(projects.length - 1, Math.floor(value * (projects.length - 1) + .48)));
    setActive(current => current === next ? current : next);
  });

  const selectProject = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const element = section.current;
    if (!element || !pinned) return;
    const top = window.scrollY + element.getBoundingClientRect().top;
    const travel = Math.max(0, element.offsetHeight - window.innerHeight);
    const destination = Math.max(.03, Math.min(.97, index / Math.max(1, projects.length - 1)));
    window.scrollTo({ top: top + travel * destination, behavior });
  }, [pinned]);

  useEffect(() => {
    if (!pinned) return;
    let disposed = false;
    let frame = 0;
    const followHash = () => {
      if (disposed) return;
      const index = projects.findIndex(project => `#${project.id}` === window.location.hash);
      if (index >= 0) selectProject(index, 'instant');
    };
    const scheduleRestore = () => {
      // Native fragment restoration and font layout can finish after hydration.
      void document.fonts.ready.then(() => {
        if (disposed) return;
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => {
          frame = window.requestAnimationFrame(followHash);
        });
      });
    };
    if (document.readyState === 'complete') scheduleRestore();
    else window.addEventListener('load', scheduleRestore, { once: true });
    window.addEventListener('pageshow', scheduleRestore);
    window.addEventListener('hashchange', scheduleRestore);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('load', scheduleRestore);
      window.removeEventListener('pageshow', scheduleRestore);
      window.removeEventListener('hashchange', scheduleRestore);
    };
  }, [pinned, selectProject]);

  return (
    <section
      id="work"
      ref={section}
      className={`project-deck${pinned ? ' project-deck--pinned' : ''}`}
      aria-labelledby="project-deck-title"
      style={pinned ? { height: `${100 + 120 * (projects.length - 1)}svh` } : undefined}
    >
      <div className="project-deck-stage">
        <div className="project-deck-heading">
          <p className="project-deck-kicker">01 / Selected work</p>
          <h2 id="project-deck-title">Built to be used.</h2>
          <p className="project-deck-note">A few ideas that made it out of my head.</p>
        </div>

        <div className="project-deck-cards">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} count={projects.length} progress={progress} pinned={pinned} active={active} />
          ))}
        </div>

        {pinned && (
          <div className="project-deck-navigation">
            <fieldset className="project-deck-tabs" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button key={project.id} type="button" aria-pressed={active === index} aria-controls={project.id} onClick={() => selectProject(index)}>
                  <span>{project.number}</span>{project.name}
                </button>
              ))}
            </fieldset>
            <span className="project-deck-counter" aria-live="polite">{String(active + 1).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span></span>
          </div>
        )}
      </div>
    </section>
  );
}
