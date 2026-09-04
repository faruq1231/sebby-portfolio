'use client';

import { MagneticButton } from '@/components/MagneticButton';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatePresence, motion, stagger } from 'framer-motion';
import { Coffee, Mail } from 'lucide-react';
import { SiGithub, SiX } from 'react-icons/si';
import { useEffect, useState } from 'react';

export const BUY_ME_A_COFFEE_URL = '#';

const moneyLabels = [
  'SEND ME MONEY',
  'Fund my next bug',
  'Support a struggling developer',
  "₦1 won't kill you",
  'My mum said thanks',
];

const lineMotion = {
  hidden: { opacity: 0, y: 24, filter: 'blur(7px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function PortfolioOutro() {
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [labelIndex, setLabelIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [reaction, setReaction] = useState('');

  useEffect(() => {
    if (!hovering || reduced) return;
    const timer = window.setInterval(() => setLabelIndex((index) => (index + 1) % moneyLabels.length), 1800);
    return () => window.clearInterval(timer);
  }, [hovering, reduced]);

  const stopCycling = () => {
    setHovering(false);
    setLabelIndex(0);
  };

  const askForMoney = () => {
    const next = clicks + 1;
    setClicks(next);
    setReaction(next === 2 ? "You're serious?" : next >= 3 ? 'You know what... I respect it.' : '');
    setOpen(true);
  };

  const transition = reduced ? { duration: 0.01 } : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <footer className="contact-section section-pad">
      <p className="eyebrow">End of transmission.</p>
      <motion.h2
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 80, clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={transition}
      >YOU MADE IT<br />THIS FAR?</motion.h2>

      <motion.div
        className="outro-sequence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { delayChildren: reduced ? 0 : stagger(0.46, { startDelay: 0.2 }) } } }}
      >
        <motion.p variants={lineMotion}>You&apos;re probably here because you&apos;re trying to figure out if I&apos;m good enough to work with you.</motion.p>
        <motion.p className="outro-pause" variants={lineMotion}>Well...</motion.p>
        <motion.p className="outro-pause" variants={lineMotion}>Oh boy.</motion.p>
        <motion.p variants={lineMotion}>This may come as a surprise.</motion.p>
        <motion.strong
          className="outro-not"
          variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : { hidden: { opacity: 0, scale: .88 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 170, damping: 15 } } }}
        >I&apos;M NOT.</motion.strong>
        <motion.p className="outro-return" variants={lineMotion}>But since you&apos;ve already wasted this much time on my portfolio, you might as well reach out anyway.</motion.p>
      </motion.div>

      <div className="contact-actions">
        <MagneticButton href="mailto:faruqfellatuni@gmail.com"><span className="button-label"><Mail aria-hidden="true" />Email</span></MagneticButton>
        <MagneticButton href="https://github.com/faruq1231"><span className="button-label"><SiGithub aria-hidden="true" />GitHub</span></MagneticButton>
        <MagneticButton href="https://x.com/FaruqEtam?s=20"><span className="button-label"><SiX aria-hidden="true" />X</span></MagneticButton>
      </div>
      <a className="contact-email" href="mailto:faruqfellatuni@gmail.com">faruqfellatuni@gmail.com</a>

      <div className="money-ask">
        <p>And hey...</p>
        <p>It wouldn&apos;t hurt to send me some money too.</p>
        <motion.button
          type="button"
          className="money-button"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={stopCycling}
          onFocus={() => setHovering(true)}
          onBlur={stopCycling}
          onClick={askForMoney}
          whileTap={reduced ? undefined : { scale: .975 }}
          aria-haspopup="dialog"
        >
          <span className="money-icon"><Coffee size={20} aria-hidden="true" /></span>
          <span className="money-label">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={moneyLabels[labelIndex]} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: .24 }}>{moneyLabels[labelIndex]}</motion.span>
            </AnimatePresence>
          </span>
          <span aria-hidden="true">↗</span>
        </motion.button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="support-dialog" showCloseButton>
          <motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, scale: .92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={reduced ? { duration: .01 } : { type: 'spring', stiffness: 240, damping: 22 }}>
            <p className="dialog-kicker">A surprising development</p>
            <DialogTitle className="support-title">WAIT, YOU ACTUALLY CLICKED IT?</DialogTitle>
            <DialogDescription className="support-copy">I was joking...</DialogDescription>
            <motion.p className="unless" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .45 }}>Unless? 👀</motion.p>
            {reaction && <p className="repeat-reaction" aria-live="polite">{reaction}</p>}
            <MagneticButton className="coffee-link" href={BUY_ME_A_COFFEE_URL} onClick={(event) => { if (BUY_ME_A_COFFEE_URL === '#') event.preventDefault(); }}>
              <span className="button-label"><Coffee aria-hidden="true" />Buy Sebby a coffee</span>
            </MagneticButton>
            <p className="money-disclaimer">Financial decisions made on this website may not be reversible.</p>
          </motion.div>
        </DialogContent>
      </Dialog>

      <div className="footer-bottom"><span>Faruq Etamesor © 2026</span><a href="#top">Back to chaos ↑</a></div>
    </footer>
  );
}
