'use client';

import { MagneticButton } from '@/components/MagneticButton';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Coffee, Mail } from 'lucide-react';
import { SiGithub, SiX } from 'react-icons/si';
import { useState } from 'react';
import Image from 'next/image';

export const BUY_ME_A_COFFEE_URL = '#';

export function PortfolioOutro() {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [reaction, setReaction] = useState('');

  const askForMoney = () => {
    const next = clicks + 1;
    setClicks(next);
    setReaction(next === 2 ? "You're serious?" : next >= 3 ? 'You know what... I respect it.' : '');
  };

  return (
    <footer id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
      <p className="eyebrow">04 / A new conversation</p>
      <h2 id="contact-title">Got a good idea?</h2>

      <div className="outro-sequence">
        <p>You made it this far. Might as well say hello.</p>
      </div>

      <div className="contact-actions">
        <MagneticButton href="mailto:faruqfellatuni@gmail.com"><span className="button-label"><Mail aria-hidden="true" />Email</span></MagneticButton>
        <MagneticButton href="https://github.com/faruq1231"><span className="button-label"><SiGithub aria-hidden="true" />GitHub</span></MagneticButton>
        <MagneticButton href="https://x.com/FaruqEtam?s=20"><span className="button-label"><SiX aria-hidden="true" />X</span></MagneticButton>
      </div>
      <a className="contact-email" href="mailto:faruqfellatuni@gmail.com">faruqfellatuni@gmail.com</a>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="money-ask">
          <p>And if you&apos;re feeling generous, there&apos;s always the coffee fund.</p>
          <DialogTrigger type="button" className="money-button" onClick={askForMoney}>
            <span className="money-icon"><Coffee size={20} aria-hidden="true" /></span>
            <span className="money-label">Buy me a coffee</span>
            <span aria-hidden="true">↗</span>
          </DialogTrigger>
        </div>
        <DialogContent className="support-dialog" showCloseButton>
          <div>
            <p className="dialog-kicker">A surprising development</p>
            <DialogTitle className="support-title">WAIT, YOU ACTUALLY CLICKED IT?</DialogTitle>
            <DialogDescription className="support-copy">I was joking...</DialogDescription>
            <p className="unless">Unless? 👀</p>
            {reaction && <p className="repeat-reaction" aria-live="polite">{reaction}</p>}
            <MagneticButton className="coffee-link" href={BUY_ME_A_COFFEE_URL} onClick={(event) => { if (BUY_ME_A_COFFEE_URL === '#') event.preventDefault(); }}>
              <span className="button-label"><Coffee aria-hidden="true" />Buy Sebby a coffee</span>
            </MagneticButton>
            <p className="money-disclaimer">Financial decisions made on this website may not be reversible.</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="footer-bottom"><span className="footer-signature"><Image className="footer-logo" src="/faruq-logo.png" width={128} height={128} alt="Faruq" />Faruq Etamesor © 2026</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
