import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const exportedHomepage = resolve('dist/client/index.html');
const vinextCli = resolve('node_modules/vinext/dist/cli.js');

rmSync(exportedHomepage, { force: true });

const result = spawnSync(process.execPath, [vinextCli, 'build'], {
  encoding: 'utf8',
  env: process.env,
});

process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');

const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
const completedExport = existsSync(exportedHomepage) && output.includes('Build complete.');
if (!completedExport) {
  console.error('\nBuild did not produce dist/client/index.html. Static export is required for Netlify.');
  process.exit(result.status || 1);
}
const knownWindowsShutdownBug =
  process.platform === 'win32' &&
  result.status !== 0 &&
  completedExport &&
  output.includes('UV_HANDLE_CLOSING');

if (knownWindowsShutdownBug) {
  console.warn('\nStatic export completed. Ignored Vinext\'s Windows shutdown assertion.');
  process.exit(0);
}

process.exit(result.status ?? 1);
