import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(root, 'lib/scroll-letter-pose.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { getLetterPose } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

for (const mobile of [false, true]) {
  for (let index = 0; index < 5; index++) {
    for (let step = 0; step <= 1000; step++) {
      const pose = getLetterPose(step / 1000, index, mobile);
      assert(Object.values(pose).every(Number.isFinite), 'Letter position must remain finite');
      assert(Math.abs(pose.x) <= 35 && Math.abs(pose.y) <= 30, 'Letter anchor escaped the scene');
      assert(pose.scale >= .45 && pose.scale <= 1, 'Letter became too small or too large');
      assert(pose.opacity >= 0 && pose.opacity <= 1 && pose.fill >= 0 && pose.fill <= 1);
    }
    assert.deepEqual(getLetterPose(-1, index, mobile), getLetterPose(0, index, mobile));
    assert.deepEqual(getLetterPose(2, index, mobile), getLetterPose(1, index, mobile));
    assert(Math.abs(getLetterPose(0, index, mobile).rotate) < .001, 'Opening name must be readable');
    assert(Math.abs(getLetterPose(.94, index, mobile).rotate) < .001, 'Name must gather upright again');
  }
  const start = Array.from({ length: 5 }, (_, i) => getLetterPose(0, i, mobile));
  const orbit = Array.from({ length: 5 }, (_, i) => getLetterPose(.5, i, mobile));
  const end = Array.from({ length: 5 }, (_, i) => getLetterPose(.94, i, mobile));
  assert(start.every((pose, i) => !i || pose.x > start[i - 1].x));
  assert(end.every((pose, i) => !i || pose.x > end[i - 1].x));
  assert(Math.max(...orbit.map(p => p.y)) - Math.min(...orbit.map(p => p.y)) > 30, 'Orbit must move through both vertical halves');
  assert(orbit.some((p, i) => Math.abs(p.x - start[i].x) > 15), 'Scrolling must visibly transform the name');
}

const build = path.join(root, 'dist/client');
const html = await readFile(path.join(build, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
for (const anchor of anchors) assert(ids.includes(anchor), `Missing anchor: ${anchor}`);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert(html.includes('Faruq') && html.includes('Masterspred') && html.includes('EasyGrab'));
const assets = new Set([...html.matchAll(/(?:src|href)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)].map(match => match[1]).filter(asset => asset !== '/'));
for (const asset of assets) assert((await stat(path.join(build, decodeURIComponent(asset)))).isFile(), `Missing build asset ${asset}`);
console.log(`Verified 10,010 scroll poses, readable opening/reassembly, ${anchors.length} fragment links, and ${assets.size} exported assets.`);
