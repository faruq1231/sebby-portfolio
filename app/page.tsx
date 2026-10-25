'use client';

import { CodeWindow } from '@/components/CodeWindow';
import { LightBulb } from '@/components/LightBulb';
import { HeroStamp } from '@/components/HeroStamp';
import { AnimatedName } from '@/components/AnimatedName';
import { NameIntro } from '@/components/NameIntro';
import { ImageReveal } from '@/components/ImageReveal';
import { RevealText } from '@/components/RevealText';
import { PortfolioOutro } from '@/components/PortfolioOutro';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Database, Gauge, Landmark, ServerCog, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { SiJavascript, SiNextdotjs, SiPostgresql, SiPython, SiReact, SiSupabase, SiTypescript, SiUpstash, SiVercel } from 'react-icons/si';

const languages = [
  { name: 'TypeScript', level: 'Fluent', icon: SiTypescript },
  { name: 'JavaScript', level: 'It’s complicated', icon: SiJavascript },
  { name: 'SQL', level: 'Conversational', icon: SiPostgresql },
  { name: 'Python', level: 'Enough to get myself in trouble', icon: SiPython },
];

const stack = [
  { name: 'Next.js', icon: SiNextdotjs }, { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript }, { name: 'Supabase', icon: SiSupabase },
  { name: 'PostgreSQL', icon: SiPostgresql }, { name: 'Vercel', icon: SiVercel },
  { name: 'Upstash', icon: SiUpstash }, { name: 'Paystack', icon: WalletCards },
];

const engineering = [
  { icon: Database, title: 'Data', description: 'PostgreSQL, transactions, RPC functions, and concurrency-safe operations.' },
  { icon: Gauge, title: 'Performance', description: 'CDN caching, community feeds, and load testing.' },
  { icon: Landmark, title: 'Payments', description: 'Paystack, wallet balances, premium unlocks, and creator withdrawals.' },
  { icon: ServerCog, title: 'Infrastructure', description: 'Next.js, Supabase, Vercel, and Upstash.' },
];

const evidence = [
  { value: '100', label: 'Concurrent readers', detail: '0 errors · p95 371ms' },
  { value: '250', label: 'Concurrent readers', detail: '0 errors · p95 892ms' },
  { value: '500', label: 'Ramped readers', detail: '0 errors · p95 96ms' },
  { value: '1,000', label: 'Distributed readers', detail: '10,527 requests · 0 failures', extra: '98.23% CDN hit rate · worst-worker p95 22ms' },
];

function GithubGraph() {
  const active: Record<number, string> = {
    5: 'fixed one typo', 28: 'changed margin-left to gap', 47: 'committed at 3:47 AM',
    62: 'read the docs (eventually)', 79: 'npm run build — it worked', 88: 'reverted a very confident idea',
  };
  return (
    <div className="contribution-card">
      <div className="contribution-top"><span>My very unofficial GitHub graph</span><span>6 heroic moments</span></div>
      <div className="contribution-grid" aria-label="A deliberately unimpressive fake contribution graph">
        {Array.from({ length: 91 }, (_, index) => active[index]
          ? <button type="button" key={index} className="contribution active" data-tip={active[index]} aria-label={active[index]} />
          : <span key={index} className="contribution" aria-hidden="true" />)}
      </div>
      <p>No streaks were harmed in the making of this portfolio.</p>
    </div>
  );
}

export default function Home() {
  const [lit, setLit] = useState(false);
  const [introVersion, setIntroVersion] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, restDelta: 0.001 });
  const enter = { opacity: 1, y: 0 };
  const from = reduced ? false : { opacity: 0, y: 28 };

  return (
    <div className={lit ? 'journal is-lit' : 'journal'}>
      <NameIntro key={introVersion} />
      <a className="skip-link" href="#masterspred">Skip to the work</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="journal-header journal-container">
        <a href="#top" className="monogram" aria-label="Faruq Etamesor, home"><Image className="brand-logo" src="/faruq-logo.png" width={128} height={128} alt="Faruq" priority /></a>
        <p>Faruq Etamesor <span>/ Developer & builder</span></p>
        <nav className="journal-nav" aria-label="Main navigation"><a href="#masterspred">The work</a><a href="#about">The person</a><a href="#contact">Say hello <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
      </header>

      <main>

      <section id="top" className="journal-hero journal-container" aria-labelledby="hero-title">
        <motion.div className="hero-eyebrow" initial={from} animate={enter} transition={{ duration: .65, delay: reduced ? 0 : 2.25 }}><span>The Build Journal</span><span>Lagos, NG</span></motion.div>
        <div className="hero-main">
          <div className="hero-portrait-column">
            <motion.figure className="hero-portrait-card" initial={reduced ? false : { opacity: 0, y: 45, rotate: -7, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, y: 0, rotate: -3, clipPath: 'inset(-10% -10% -10% -10%)' }} transition={{ duration: 1.15, delay: reduced ? 0 : 2.25, ease: [.16, 1, .3, 1] }}>
              <Image className="hero-portrait" src="/faruq-portrait.jpeg" width={960} height={1280} sizes="(max-width: 760px) 75vw, 36vw" alt="Faruq Etamesor taking a mirror portrait" priority />
              <figcaption><span>Faruq Etamesor</span><span>Builder, apparently.</span></figcaption>
            </motion.figure>
          </div>
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title" aria-label="Good ideas deserve great code."><RevealText intro delay={2.35}>Good ideas</RevealText><RevealText intro delay={2.47}>deserve</RevealText><RevealText intro delay={2.59}><em>great code.</em></RevealText></h1>
            <motion.div className="hero-support" initial={from} animate={enter} transition={{ duration: .75, delay: reduced ? 0 : 2.85 }}><p className="hero-description">A developer turning ideas into useful products. Serious work, a little personality.</p><a className="hero-scroll" href="#masterspred" aria-label="Explore selected work"><ArrowDown size={22} strokeWidth={1.3} aria-hidden="true" /></a></motion.div>
          </div>
        </div>
        <div className="hero-lower">
          <div className="hero-identity"><p className="hero-name">I&apos;m <AnimatedName onReplay={() => setIntroVersion(value => value + 1)} /></p><p className="hero-alias">Call me <em>Sebby.</em></p></div>
          <p className="hero-edition">From idea to something real.</p>
          <div className="hero-sticker"><HeroStamp /></div>
        </div>
      </section>

      <section id="masterspred" className="work-chapter journal-container" aria-labelledby="master-title">
        <div className="chapter-heading work-heading"><p className="chapter-index">01 / The work</p><h2 id="master-title" className="chapter-title work-title"><RevealText>A few things</RevealText><RevealText delay={.1}><em>I&apos;ve been building.</em></RevealText></h2></div>
        <motion.article className="project-feature" aria-labelledby="project-title" initial={from} whileInView={enter} viewport={{ once: true, amount: .12 }} transition={{ duration: .75 }}>
          <div className="project-copy">
            <p className="project-number">01 / Masterspred</p>
            <h3 id="project-title" className="project-heading"><RevealText>Building a place</RevealText><RevealText delay={.1}><em>for the game.</em></RevealText></h3>
            <p className="project-description">A sports prediction community. Built from the frontend to the wallet.</p>
            <p className="project-role">Product & full-stack development</p>
            <a className="project-link" href="https://masterspred.vercel.app" target="_blank" rel="noreferrer">Visit the live product <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <ImageReveal className="project-preview" delay={.1}>
            <div className="device-float"><a className="project-device" href="https://masterspred.vercel.app" target="_blank" rel="noreferrer" aria-label="Open the live Masterspred website"><Image src="/masterspred-showcase.webp" width={910} height={1455} sizes="(max-width: 760px) 65vw, 28vw" alt="Masterspred community home screen showing a football prediction card" /></a></div>
          </ImageReveal>
        </motion.article>
        <details className="project-details engineering-details"><summary>Under the hood</summary><div className="stack-strip" aria-label="Masterspred technology stack">{stack.map(({ name, icon: Icon }) => <span key={name}><Icon size={16} aria-hidden="true" />{name}</span>)}</div><div className="engineering-grid">{engineering.map(({ icon: Icon, title, description }, index) => <article className="engineering-item" key={title}><div><span>0{index + 1}</span><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}</div><div className="evidence-heading"><p className="chapter-index">Notes from the stress test</p></div><div className="evidence-grid">{evidence.map(test => <article className="evidence-item" key={test.value}><span className="evidence-value">{test.value}</span><h3>{test.label}</h3><p>{test.detail}</p>{test.extra && <p>{test.extra}</p>}</article>)}</div><p className="footnote">Cached community endpoint tests; results don&apos;t represent the entire application.</p></details>
        <motion.article id="easygrab" className="project-feature project-in-progress" aria-labelledby="easygrab-title" initial={from} whileInView={enter} viewport={{ once: true, amount: .12 }} transition={{ duration: .75 }}>
          <div className="project-copy">
            <p className="project-number">02 / EasyGrab</p>
            <span className="project-status">In development</span>
            <h3 id="easygrab-title" className="project-heading"><RevealText>Your campus,</RevealText><RevealText delay={.1}><em>within reach.</em></RevealText></h3>
            <p className="project-description">A marketplace bringing Edo State University students and local sellers together.</p>
            <p className="project-role">Currently building · Product & full-stack</p>
            <a className="project-link" href="https://easygrab-opal.vercel.app/" target="_blank" rel="noreferrer">Explore the work in progress <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <ImageReveal className="project-preview" delay={.1}>
            <div className="project-placeholder"><Image src="/easygrab-mark.svg" width={64} height={64} alt="" aria-hidden="true" /><Image src="/easygrab-logo.svg" width={236} height={64} alt="EasyGrab" /><p>Your campus,<br /><em>within reach.</em></p></div>
          </ImageReveal>
        </motion.article>
      </section>

      <section id="about" className="about-chapter journal-container" aria-labelledby="about-title">
        <div className="chapter-heading"><p className="chapter-index">02 / The person</p><h2 id="about-title" className="chapter-title"><RevealText>Behind</RevealText><RevealText delay={.1}><em>the build.</em></RevealText></h2></div>
        <motion.div className="about-grid" initial={from} whileInView={enter} viewport={{ once: true, amount: .1 }} transition={{ duration: .7 }}>
          <figure className="portrait-frame"><ImageReveal className="portrait-image-wrap"><Image className="portrait-image" src="/faruq-portrait.jpeg" width={960} height={1280} sizes="(max-width: 760px) 85vw, 32vw" alt="Faruq Etamesor taking a mirror portrait" /></ImageReveal><figcaption><span>Faruq Etamesor</span><span>Builder, apparently.</span></figcaption></figure>
          <div className="about-copy"><p className="about-lead">Sports, technology, and turning “what if” into something real.</p><p>I&apos;m the builder behind Masterspred and, currently, <a href="#easygrab">EasyGrab</a>. I work across the interface, the backend, and everything in between.</p><p className="identity-note">What do I do?<br /><em>Honestly? Nothing.</em><br /><span>Apart from all this.</span></p><div className="language-chips" aria-label="Languages I work with">{languages.map(({ name, icon: Icon }) => <span key={name}><Icon size={15} aria-hidden="true" />{name}</span>)}</div></div>
        </motion.div>
      </section>

      <section className="personality-chapter journal-container" aria-labelledby="personality-title">
        <div className="personality-grid"><div className="personality-copy"><p className="chapter-index">A small confession</p><h2 id="personality-title">Not exactly a<br /><em>green forest.</em></h2><p>I code with Codex. My GitHub graph is doing its best.</p></div><GithubGraph /></div>
      </section>

      <section className="light-chapter" aria-labelledby="bulb-title"><div className="light-grid journal-container"><div className="bulb-copy"><p className="chapter-index">03 / A little interlude</p><h2 id="bulb-title">Let there<br />be <em>proof.</em></h2><p>My mum still can&apos;t see my career.</p><p id="bulb-help">Tap the switch or pull the cord. Plssss. 💡</p></div><LightBulb lit={lit} onToggle={() => setLit(value => !value)} /></div></section>

      <section id="after-light" className="notes-chapter journal-container" aria-labelledby="notes-title"><details><summary><span className="chapter-index">For the technically curious</span><span id="notes-title">The nerdy stuff, <em>in its natural habitat.</em></span><span className="notes-toggle" aria-hidden="true">+</span></summary><CodeWindow /></details></section>
      </main>
      <PortfolioOutro />
    </div>
  );
}
