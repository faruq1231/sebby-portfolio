'use client';

import { CodeWindow } from '@/components/CodeWindow';
import { LightBulb } from '@/components/LightBulb';
import { PortfolioOutro } from '@/components/PortfolioOutro';
import { motion, useScroll, useSpring } from 'framer-motion';
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
  { icon: Database, title: 'Data that holds together.', description: 'PostgreSQL, RPC functions, transactions, and concurrency-safe operations. The less glamorous work that keeps the product working.' },
  { icon: Gauge, title: 'Speed with some evidence.', description: 'CDN caching, cached community feeds, API performance, and load testing. A fast-looking interface should have a fast system behind it.' },
  { icon: Landmark, title: 'The money has to add up.', description: 'Paystack top-ups, a wallet and coin ledger, premium unlocks, subscriptions, and creator withdrawals.' },
  { icon: ServerCog, title: 'The pieces, connected.', description: 'Next.js and React on the frontend. Supabase, PostgreSQL, Vercel, and Upstash underneath. One product across the whole stack.' },
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
      <div className="contribution-top"><span>A very unofficial contribution graph</span><span>6 heroic moments</span></div>
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, restDelta: 0.001 });

  return (
    <div className={lit ? 'journal is-lit' : 'journal'}>
      <a className="skip-link" href="#masterspred">Skip to the work</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="journal-header journal-container">
        <a href="#top" className="monogram" aria-label="Faruq Etamesor, home"><Image className="brand-logo" src="/faruq-logo.png" width={128} height={128} alt="Faruq" priority /></a>
        <p>Faruq Etamesor <span>/ Developer & builder</span></p>
        <nav className="journal-nav" aria-label="Main navigation"><a href="#masterspred">The work</a><a href="#about">The person</a><a href="#contact">Say hello <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
      </header>

      <main>

      <section id="top" className="journal-hero journal-container" aria-labelledby="hero-title">
        <div className="hero-eyebrow"><span>The Build Journal</span><span>An independent practice · Lagos, NG</span></div>
        <h1 id="hero-title" className="hero-title">Good ideas<br />deserve <em>great code.</em></h1>
        <div className="hero-lower">
          <div className="hero-identity"><span className="hero-edition">A little introduction</span><p>Oh hey, a human.<br />I&apos;m Faruq. Call me <em>Sebby.</em></p></div>
          <p className="hero-description">I turn ideas about sports, technology, and community into things people can actually use. Serious work, with a little personality.</p>
          <a className="hero-scroll" href="#masterspred" aria-label="Explore selected work"><ArrowDown size={22} strokeWidth={1.3} aria-hidden="true" /></a>
        </div>
      </section>

      <section id="masterspred" className="work-chapter journal-container" aria-labelledby="master-title">
        <div className="chapter-heading work-heading"><p className="chapter-index">01 / The work</p><h2 id="master-title" className="chapter-title work-title">From “what if”<br /><em>to out in the world.</em></h2><p className="chapter-note">Ideas, in different stages of becoming.<br />A lot of figuring it out along the way.</p></div>
        <article className="project-feature" aria-labelledby="project-title">
          <div className="project-copy">
            <p className="project-number">Selected project / Masterspred</p>
            <h3 id="project-title" className="project-heading">Building a place<br /><em>for the game.</em></h3>
            <p className="project-description">A sports prediction community I somehow decided would be reasonable to build from scratch.</p>
            <dl className="work-meta"><div><dt>My role</dt><dd>Product & full-stack development</dd></div><div><dt>The idea</dt><dd>Sports, creators, and community</dd></div></dl>
            <a className="project-link" href="https://masterspred.vercel.app" target="_blank" rel="noreferrer">Visit the live product <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="project-preview">
            <span className="project-caption">A closer look / The community</span>
            <a className="project-device" href="https://masterspred.vercel.app" target="_blank" rel="noreferrer" aria-label="Open the live Masterspred website"><Image src="/masterspred-showcase.webp" width={910} height={1455} sizes="(max-width: 760px) 65vw, 28vw" alt="Masterspred community home screen showing a football prediction card" /></a>
            <span className="project-caption">Built to be used. Still being made better.</span>
          </div>
        </article>
        <div className="project-summary">
          <div className="summary-item"><span>01</span><h3>A community around the game.</h3><p>Sports predictions, football fixtures, cached feeds, follows, bookmarks, rankings, and performance statistics.</p></div>
          <div className="summary-item"><span>02</span><h3>A place for creators.</h3><p>Tipster profiles, premium prediction unlocks, subscriptions, and creator earnings.</p></div>
          <div className="summary-item"><span>03</span><h3>A system behind the screen.</h3><p>Wallets, an internal coin economy, withdrawals, and real-time database operations.</p></div>
        </div>
        <div className="stack-strip" aria-label="Masterspred technology stack">{stack.map(({ name, icon: Icon }) => <span key={name}><Icon size={16} aria-hidden="true" />{name}</span>)}</div>
        <article id="easygrab" className="project-feature project-in-progress" aria-labelledby="easygrab-title">
          <div className="project-copy">
            <p className="project-number">On the workbench / EasyGrab</p>
            <span className="project-status">In development</span>
            <h3 id="easygrab-title" className="project-heading">Your campus,<br /><em>within reach.</em></h3>
            <p className="project-description">EasyGrab is a campus marketplace I&apos;m currently building for Edo State University. A place to bring student buyers and local sellers together.</p>
            <dl className="work-meta"><div><dt>My role</dt><dd>Product & full-stack development</dd></div><div><dt>Currently building</dt><dd>Accounts, seller onboarding, and admin review</dd></div><div><dt>The stack</dt><dd>Next.js · React · TypeScript · Supabase</dd></div></dl>
            <a className="project-link" href="https://easygrab-opal.vercel.app/" target="_blank" rel="noreferrer">Explore the work in progress <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="project-preview">
            <span className="project-caption">A campus idea / Taking shape</span>
            <div className="project-placeholder"><Image src="/easygrab-mark.svg" width={64} height={64} alt="" aria-hidden="true" /><Image src="/easygrab-logo.svg" width={236} height={64} alt="EasyGrab" /><p>For the things<br /><em>closer to home.</em></p></div>
            <span className="project-caption">Currently on the workbench.</span>
          </div>
        </article>
      </section>

      <section id="thinking" className="engineering-chapter journal-container" aria-labelledby="thinking-title">
        <div className="chapter-heading"><p className="chapter-index">02 / The thinking</p><h2 id="thinking-title" className="chapter-title">Considered<br /><em>underneath.</em></h2><p className="chapter-note">Me: “This shouldn&apos;t be too difficult.”<br />Also me: learning why race conditions exist.</p></div>
        <p className="engineering-intro">A good interface is the beginning. The data, payments, performance, and infrastructure need just as much care.</p>
        <div className="engineering-grid">{engineering.map(({ icon: Icon, title, description }, index) => <article className="engineering-item" key={title}><div><span>0{index + 1}</span><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
        <div className="evidence-heading"><p className="chapter-index">Notes from the stress test</p><p>Professionally curious, apparently.</p></div>
        <div className="evidence-grid">{evidence.map(test => <article className="evidence-item" key={test.value}><span className="evidence-value">{test.value}</span><h3>{test.label}</h3><p>{test.detail}</p>{test.extra && <p>{test.extra}</p>}</article>)}</div>
        <p className="footnote">These are cached community endpoint tests, rather than tests of the entire application.</p>
      </section>

      <section id="about" className="about-chapter journal-container" aria-labelledby="about-title">
        <div className="chapter-heading"><p className="chapter-index">03 / The person</p><h2 id="about-title" className="chapter-title">Behind<br /><em>the build.</em></h2><p className="chapter-note">Developer. Builder.<br />Occasional bug creator.</p></div>
        <div className="about-grid">
          <figure className="portrait-frame"><div className="portrait-image-wrap"><Image className="portrait-image" src="/faruq-portrait.jpeg" width={960} height={1280} sizes="(max-width: 760px) 85vw, 32vw" alt="Faruq Etamesor taking a mirror portrait" /></div><figcaption><span>Faruq Etamesor</span><span>Builder, apparently.</span></figcaption></figure>
          <div className="about-copy"><p className="about-lead">I&apos;m Faruq Etamesor, a developer and builder with a particular obsession with sports, technology, and entertainment.</p><p>I&apos;ve always wanted to be part of the sports and entertainment world in some way. I didn&apos;t know exactly what that would look like. I just knew I wanted to build something that belonged there.</p><p>So I started building <strong>Masterspred.</strong> What began as an idea became a real community, and taught me far more than how to build a website.</p><p>These days, I&apos;m also building <a href="#easygrab">EasyGrab</a>, a campus marketplace. I work across the frontend, backend, databases, infrastructure, and the product itself.</p><p className="identity-note">What do I do?<br /><em>Honestly? Nothing.</em><br /><span>Apart from all this, apparently.</span></p><div className="interests-list" aria-label="Interests"><span>Football</span><span>Product ideas</span><span>Technology</span><span>Entertainment</span></div></div>
        </div>
      </section>

      <section className="personality-chapter journal-container" aria-labelledby="personality-title">
        <div className="personality-grid"><div className="personality-copy"><p className="chapter-index">A small confession</p><h2 id="personality-title">Not exactly a<br /><em>green forest.</em></h2><p>My GitHub graph isn&apos;t one of those nerdy 3,000-contribution masterpieces you see online. I code with Codex. We&apos;re making things happen.</p></div><GithubGraph /></div>
        <div className="language-heading"><p className="chapter-index">Apparently, I&apos;m multilingual.</p><p>Unfortunately, my mum still isn&apos;t impressed.</p></div>
        <div className="language-list">{languages.map(({ name, level, icon: Icon }, index) => <div className="language-row" key={name}><span>{String(index + 1).padStart(2, '0')}</span><Icon className="language-icon" aria-hidden="true" /><h3>{name}</h3><p>{level}</p></div>)}</div>
        <p className="joke-note">They told me tech guys bag bitches. <em>They lied.</em></p>
      </section>

      <section className="light-chapter" aria-labelledby="bulb-title"><div className="light-grid journal-container"><div className="bulb-copy"><p className="chapter-index">04 / A little interlude</p><h2 id="bulb-title">Let there<br />be <em>proof.</em></h2><p>Can you do me a favour? My mum still can&apos;t see my career.</p><p id="bulb-help">Tap the button or pull the cord to switch the light. Plssss. 💡</p></div><LightBulb lit={lit} onToggle={() => setLit(value => !value)} /></div></section>

      <section id="after-light" className="notes-chapter journal-container" aria-labelledby="notes-title"><details><summary><span className="chapter-index">For the technically curious</span><span id="notes-title">The nerdy stuff, <em>in its natural habitat.</em></span><span className="notes-toggle" aria-hidden="true">+</span></summary><CodeWindow /></details></section>
      </main>
      <PortfolioOutro />
    </div>
  );
}
