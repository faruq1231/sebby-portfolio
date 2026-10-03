'use client';

import { CodeWindow } from '@/components/CodeWindow';
import { LightBulb } from '@/components/LightBulb';
import { PortfolioOutro } from '@/components/PortfolioOutro';
import { SmoothScroll } from '@/components/SmoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowDown, Database, Gauge, Landmark, ServerCog, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SiJavascript, SiNextdotjs, SiPostgresql, SiPython, SiReact, SiSupabase, SiTypescript, SiUpstash, SiVercel } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const headline = ['OH', 'HEY,', 'A', 'HUMAN.'];
const languages = [
  { name: 'TypeScript', level: 'fluent', icon: SiTypescript },
  { name: 'JavaScript', level: "it's complicated", icon: SiJavascript },
  { name: 'SQL', level: 'conversational', icon: SiPostgresql },
  { name: 'Python', level: 'enough to get myself in trouble', icon: SiPython },
];

const stack = [
  { name: 'Next.js', icon: SiNextdotjs }, { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript }, { name: 'Supabase', icon: SiSupabase },
  { name: 'PostgreSQL', icon: SiPostgresql }, { name: 'Vercel', icon: SiVercel },
  { name: 'Upstash', icon: SiUpstash }, { name: 'Paystack', icon: WalletCards },
];

const features = [
  'Community sports predictions', 'Creator / tipster profiles', 'Premium prediction unlocking',
  'Internal coin economy', 'Wallet system', 'Creator earnings', 'Withdrawals', 'Subscriptions',
  'Follows & bookmarks', 'Rankings', 'Performance statistics', 'Football fixtures',
  'Cached community feeds', 'Real-time database operations',
];

const evidence = [
  { label: '100 concurrent readers', values: ['0 errors', 'p95 · 371ms'] },
  { label: '250 concurrent readers', values: ['0 errors', 'p95 · 892ms'] },
  { label: '500 ramped readers', values: ['0 errors', 'p95 · 96ms'] },
  { label: '1,000 distributed readers', values: ['10,527 requests', '0 failures', '98.23% CDN hit rate', 'worst-worker p95 · 22ms'] },
];

const fragments = ['{}', 'SELECT *', 'npm run build', 'git push', '<div>', 'const', 'async', 'await', 'POST', 'GET', '200', '404', '503', 'BEGIN;', 'COMMIT;', 'useEffect', 'Promise', 'JSON', 'API'];

function GithubGraph() {
  const active: Record<number, string> = {
    5: 'fixed one typo', 28: 'changed margin-left to gap', 47: 'committed at 3:47 AM',
    62: 'read the docs (eventually)', 79: 'npm run build — it worked', 88: 'reverted a very confident idea',
  };
  return (
    <div className="contribution-card reveal">
      <div className="contribution-top"><span>Contributions in the last year</span><span>6 heroic moments</span></div>
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
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    let split: SplitType | undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 46, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });
      split = new SplitType('.serious-heading', { types: 'words' });
      gsap.from(split.words ?? [], {
        yPercent: 115, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: '.serious-heading', start: 'top 78%', once: true },
      });
      gsap.fromTo('.code-line', { opacity: 0, x: -18 }, {
        opacity: 1, x: 0, stagger: 0.055, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: '.code-window', start: 'top 72%', once: true },
      });
      gsap.utils.toArray<HTMLElement>('.proof-card').forEach((card, index) => {
        gsap.from(card, {
          y: 65, rotate: index % 2 ? 1.4 : -1.4, opacity: 0, duration: 0.8,
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        });
      });
    });
    return () => { split?.revert(); context.revert(); };
  }, [reduced]);

  return (
    <main className={lit ? 'site-shell is-lit' : 'site-shell'}>
      <SmoothScroll />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className="topline">
        <a href="#top" className="monogram" aria-label="Faruq Etamesor, home"><Image className="brand-logo" src="/faruq-logo.png" width={128} height={128} alt="Faruq" priority /></a>
        <p>Developer / builder / occasional bug creator</p>
        <a href="#masterspred">Selected work ↘</a>
      </header>

      <section id="top" className="hero-section" aria-labelledby="hero-title">
        <p className="eyebrow">Hello from Lagos · 03:47 AM-ish</p>
        <h1 id="hero-title" className="hero-title" aria-label="Oh hey, a human.">
          {headline.map((word) => (
            <span className="hero-word" key={word} aria-hidden="true">{word.split('').map((letter, index) => (
              <span className="letter-mask" key={`${word}-${index}`}><span>{letter}</span></span>
            ))}</span>
          ))}
        </h1>
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.7 }}>
          <p>I&apos;m guessing this is the part where you get to know me...</p>
          <p className="dim">Yeah, you&apos;re not seeing that.</p>
          <p className="aside-note">Just kidding 😂</p>
        </motion.div>
        <div className="identity-line">
          <span>I&apos;m <strong>Faruq</strong></span><span className="strike">Sebastian</span><span>Call me <strong>Sebby.</strong></span>
        </div>
        <div className="hero-footer">
          <p>What do I do?</p>
          <motion.p className="nothing" initial={reduced ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.65, type: 'spring', stiffness: 120 }}>Honestly? Nothing.</motion.p>
        </div>
        <a className="down-cue" href="#receipts" aria-label="Continue to the contribution graph"><ArrowDown size={18} /></a>
      </section>

      <section id="receipts" className="joke-section section-pad">
        <div className="section-index">01 / Receipts</div>
        <div className="joke-grid">
          <div className="joke-copy reveal">
            <p>I mean, my GitHub contribution graph isn&apos;t one of those nerdy 3,000-contribution green forests you see online.</p>
            <p className="codex-line">I code with Codex.</p>
          </div>
          <GithubGraph />
        </div>
        <div className="lie-sequence reveal">
          <p>They told me tech guys bag bitches.</p>
          <strong>They lied.</strong>
        </div>
      </section>

      <section className="languages-section section-pad">
        <p className="big-statement reveal">One good thing I&apos;ve learned since becoming a developer is that apparently I&apos;m <em>multilingual.</em></p>
        <p className="eyebrow">I speak</p>
        <div className="language-list">
          {languages.map(({ name, level, icon: Icon }, index) => (
            <motion.div className="language-row reveal" key={name} whileHover={reduced ? undefined : { x: 10 }}>
              <span className="language-number">{String(index + 1).padStart(2, '0')}</span><Icon className="language-icon" aria-hidden="true" /><h3>{name}</h3><p>{level}</p>
            </motion.div>
          ))}
        </div>
        <div className="mum-line reveal"><span>Unfortunately, my mum still isn&apos;t impressed.</span><strong>Can you do me a favour?</strong><span>Tap the switch or pull the cord below. Plssss. 💡</span></div>
      </section>

      <section className="bulb-section" aria-labelledby="bulb-title">
        <div className="bulb-copy reveal">
          <p className="eyebrow">Career visibility controls</p>
          <h2 id="bulb-title">Let there be <span>proof.</span></h2>
          <p id="bulb-help">Tap the button or pull the cord to switch the light. Keep scrolling whenever you&apos;re ready.</p>
        </div>
        <LightBulb lit={lit} onToggle={() => setLit((value) => !value)} />
      </section>

      <section id="after-light" className="serious-transition section-pad">
        <h2 className="serious-heading">ALRIGHT, ENOUGH OF THE JOKES.</h2>
        <p className="reveal">I&apos;m serious now.</p>
      </section>

      <section className="story-section section-pad" aria-labelledby="story-title">
        <div className="story-rail">
          <div className="section-index">02 / Origin story</div>
          <figure className="portrait-frame reveal">
            <div className="portrait-image-wrap">
              <Image
                className="portrait-image"
                src="/faruq-portrait.jpeg"
                width={960}
                height={1280}
                sizes="(max-width: 760px) calc(100vw - 2.5rem), 28vw"
                alt="Faruq Etamesor taking a mirror portrait"
              />
            </div>
            <figcaption>
              <span>Faruq Etamesor</span>
              <span>Builder, apparently.</span>
            </figcaption>
          </figure>
        </div>
        <h2 id="story-title" className="sr-only">Faruq&apos;s story</h2>
        <div className="story-copy">
          <p className="reveal lead">I&apos;m Faruq Etamesor, a developer and builder with a particular obsession with sports, technology and entertainment.</p>
          <p className="reveal">I&apos;ve always wanted to be part of the sports and entertainment world in some way. I didn&apos;t necessarily know what that would look like — I just knew I wanted to build something that belonged there.</p>
          <p className="reveal master-line">So I started building <strong>Masterspred.</strong></p>
          <p className="reveal">What began as an idea turned into a real sports prediction community — and somewhere along the way, I found myself learning far more than just how to build a website.</p>
          <p className="reveal">I work across the frontend, backend, databases, infrastructure and product itself.</p>
          <p className="reveal closer">In other words:<br /><strong>I like turning ideas into things people can actually use.</strong></p>
        </div>
      </section>

      <section className="nerdy-section section-pad" aria-labelledby="nerdy-title">
        <div className="floating-code" aria-hidden="true">
          {fragments.map((fragment, index) => <span key={`${fragment}-${index}`} style={{ '--i': index } as React.CSSProperties}>{fragment}</span>)}
        </div>
        <div className="section-index">03 / Under the hood</div>
        <h2 id="nerdy-title" className="section-title reveal">THE NERDY STUFF.</h2>
        <CodeWindow />
      </section>

      <section id="masterspred" className="master-section section-pad" aria-labelledby="master-title">
        <div className="section-index">04 / Selected work</div>
        <p className="kicker reveal">THE THING THAT GOT OUT OF HAND.</p>
        <h2 id="master-title" className="master-title reveal">MASTER<span>SPRED</span></h2>
        <div className="master-intro reveal">
          <p className="master-subtitle">A sports prediction community I somehow decided would be reasonable to build from scratch.</p>
          <a className="project-link" href="https://masterspred.vercel.app" target="_blank" rel="noreferrer">Visit live product ↗</a>
        </div>
        <div className="master-layout">
          <div className="project-visual reveal">
            <div className="project-visual-bar"><span>masterspred / community</span><span>Live product</span></div>
            <a className="project-image-frame" href="https://masterspred.vercel.app" target="_blank" rel="noreferrer" aria-label="Open the live Masterspred website">
              <Image className="project-image" src="/masterspred-showcase.webp" width={910} height={1455} sizes="(max-width: 980px) 92vw, 52vw" alt="Masterspred community home screen showing a football prediction card" priority={false} />
            </a>
            <p>Masterspred in the wild · tap the image to visit.</p>
          </div>
          <div className="feature-list">
            {features.map((feature, index) => <div className="feature-item reveal" key={feature}><span>{String(index + 1).padStart(2, '0')}</span><p>{feature}</p></div>)}
          </div>
        </div>
        <div className="stack-strip reveal">{stack.map(({ name, icon: Icon }) => <span key={name}><Icon size={17} aria-hidden="true" />{name}</span>)}</div>
        <div className="decision-reveal reveal"><p><span>Me:</span> This shouldn&apos;t be too difficult.</p><p><span>Also me:</span> learning database concurrency, payment flows, CDN caching, load testing and why race conditions exist.</p></div>
      </section>

      <section className="technical-section section-pad" aria-labelledby="technical-title">
        <div className="section-index">05 / Technical depth</div>
        <h2 id="technical-title" className="section-title reveal">BUILT BEYOND<br />THE UI.</h2>
        <div className="technical-grid">
          {[
            { icon: Database, title: 'Database', items: ['PostgreSQL', 'RPC functions', 'Transactions', 'Indexes', 'Concurrency-safe operations'] },
            { icon: Gauge, title: 'Performance', items: ['CDN caching', 'API performance', 'Load testing', 'p95 latency monitoring'] },
            { icon: Landmark, title: 'Payments', items: ['Paystack', 'Wallet top-ups', 'Coin ledger', 'Creator withdrawals'] },
            { icon: ServerCog, title: 'Infrastructure', items: ['Vercel', 'Supabase', 'Upstash'] },
          ].map(({ icon: Icon, title, items }, index) => (
            <article className="technical-card reveal" key={title}>
              <div><span>0{index + 1}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{title}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="load-section section-pad" aria-labelledby="load-title">
        <div className="load-heading"><div><p className="section-index">06 / Evidence</p><h2 id="load-title" className="section-title reveal">YES, I<br />STRESS-TESTED IT.</h2></div><p className="reveal">Not because I was worried.<br />Because I was <em>professionally curious.</em></p></div>
        <div className="proof-grid">
          {evidence.map((test, index) => (
            <article className={`proof-card proof-${index + 1}`} key={test.label}>
              <div className="proof-top"><span>TEST / 0{index + 1}</span><span>PASS</span></div><h3>{test.label}</h3>
              <div>{test.values.map((value) => <p key={value}>{value}</p>)}</div>
            </article>
          ))}
        </div>
        <p className="footnote">* Cached community endpoint tests — not the entire application.</p>
      </section>

      <section className="interests-section section-pad" aria-labelledby="interests-title">
        <div className="section-index">07 / Elsewhere</div>
        <h2 id="interests-title" className="section-title reveal">WHEN I&apos;M NOT<br />STARING AT A TERMINAL</h2>
        <div className="interest-copy reveal"><p>Most of my interests somehow lead back to sports, entertainment or technology.</p><p>Sometimes all three.</p><p>Which is probably how Masterspred happened in the first place.</p></div>
        <div className="interest-orbit" aria-label="Interests"><span>Football</span><span>Product ideas</span><span>Technology</span><span>Entertainment</span></div>
      </section>

      <PortfolioOutro />
    </main>
  );
}
