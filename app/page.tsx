'use client';

import { FaruqScrollScene } from '@/components/FaruqScrollScene';
import { ProjectDeck } from '@/components/ProjectDeck';
import { LightBulb } from '@/components/LightBulb';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [lit, setLit] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28 });

  return (
    <div className={`studio${lit ? ' studio--lit' : ''}`}>
      <a href="#work" className="skip-link">Skip to the work</a>
      <motion.div className="studio-page-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="studio-nav"><div className="studio-container">
        <a href="#top" className="brand-link" aria-label="Faruq Etamesor, home"><Image src="/faruq-logo.png" width={64} height={64} alt="" priority /><span className="brand-word">FARUQ</span></a>
        <nav className="studio-links" aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Let’s talk <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
      </div></header>
      <main>
        <FaruqScrollScene />
        <ProjectDeck />
        <section id="about" className="studio-about" aria-labelledby="about-title"><div className="studio-container">
          <p className="section-kicker">02 / The builder</p>
          <div className="about-layout">
            <motion.figure className="about-photo" initial={false} whileInView={reduced ? undefined : { rotate: [-3, 0], scale: [.96, 1] }} viewport={{ once: true, amount: .2 }} transition={{ duration: 1, ease: [.16, 1, .3, 1] }}><Image src="/faruq-portrait.jpeg" width={960} height={1280} sizes="(max-width: 760px) 90vw, 40vw" alt="Faruq Etamesor, also known as Sebby" /></motion.figure>
            <div className="about-story"><h2 id="about-title">Curious mind.<br />Hands-on builder.</h2><p>I’m <strong>Faruq Etamesor</strong>. Call me Sebby.</p><p>I build across the interface, the backend, and everything in between. Currently bringing <a href="#masterspred">Masterspred</a> and <a href="#easygrab">EasyGrab</a> to life.</p><div className="skill-pills" aria-label="Technologies I work with">{['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Python'].map(name => <span key={name}>{name}</span>)}</div></div>
          </div>
        </div></section>
        <section className="light-chapter" aria-labelledby="bulb-title"><div className="studio-container light-grid"><div className="bulb-copy"><p className="section-kicker">03 / A little personality</p><h2 id="bulb-title">Bright ideas.<br />Real work.</h2><p>My mum still can’t see my career.</p><p id="bulb-help">Tap the bulb or pull the cord. Help her out.</p></div><LightBulb lit={lit} onToggle={() => setLit(value => !value)} /></div></section>
      </main>
      <footer id="contact" className="studio-footer"><div className="studio-container">
        <p className="section-kicker">Have something in mind?</p>
        <div className="footer-lead"><h2>Let’s make<br />something real.</h2><a className="contact-arrow" href="mailto:faruqfellatuni@gmail.com" aria-label="Email Faruq"><ArrowUpRight aria-hidden="true" /></a></div>
        <a className="footer-email" href="mailto:faruqfellatuni@gmail.com">faruqfellatuni@gmail.com</a>
        <div className="footer-links"><a href="https://github.com/faruq1231" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://x.com/FaruqEtam" target="_blank" rel="noreferrer">X ↗</a><a href="#top">Back to top ↑</a></div>
        <div className="footer-word" aria-hidden="true">FARUQ</div>
        <div className="footer-bottom"><span>© 2026 Faruq Etamesor</span><span>Made with a little personality.</span></div>
      </div></footer>
    </div>
  );
}
