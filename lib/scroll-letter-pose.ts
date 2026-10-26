export type LetterPose = {
  x: number; y: number; scale: number; rotate: number;
  rotateX: number; rotateY: number; opacity: number; fill: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

// A readable name opens, breaks into an orbit, then gathers above the work.
export function getLetterPose(value: number, index: number, mobile: boolean): LetterPose {
  const p = clamp(value);
  const open = smooth((p - .12) / .23);
  const gather = smooth((p - .68) / .24);
  const phase = clamp((p - .22) / .55);
  const angle = index / 5 * Math.PI * 2 - Math.PI / 2 + phase * Math.PI * 1.25;
  const orbit = open * (1 - gather);
  const startX = (index - 2) * (mobile ? 17.2 : 17);
  const endX = (index - 2) * (mobile ? 13 : 11);
  return {
    x: mix(mix(startX, Math.cos(angle) * (mobile ? 31 : 26), open), endX, gather),
    y: mix(mix(-2, Math.sin(angle) * (mobile ? 22 : 29), open), -17, gather),
    scale: mix(mix(1, mobile ? .63 : .47, open), mobile ? .72 : .55, gather),
    rotate: Math.sin(angle) * 15 * orbit,
    rotateX: Math.cos(angle) * 20 * orbit,
    rotateY: Math.sin(angle + index * .5) * 35 * orbit,
    opacity: 1 - smooth((p - .94) / .06) * .78,
    fill: 1 - orbit * .78,
  };
}
