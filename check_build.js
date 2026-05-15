import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
try {
  execSync('npx vite build', { stdio: 'pipe' });
  console.log('BUILD OK');
} catch (e) {
  const stderr = e.stderr ? e.stderr.toString() : '';
  const stdout = e.stdout ? e.stdout.toString() : '';
  writeFileSync('build_errors.txt', stderr + '\n---STDOUT---\n' + stdout);
  console.log('Errors written');
  console.log(stderr.substring(0, 3000));
  console.log('---');
  console.log(stdout.substring(0, 3000));
}
