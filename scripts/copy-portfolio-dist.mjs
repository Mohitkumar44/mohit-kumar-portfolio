import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(
  repositoryRoot,
  'artifacts',
  'portfolio',
  'dist',
  'public',
);
const outputDirectory = path.join(repositoryRoot, 'public');

if (!existsSync(sourceDirectory)) {
  throw new Error(`Portfolio build output not found: ${sourceDirectory}`);
}

rmSync(outputDirectory, { recursive: true, force: true });
cpSync(sourceDirectory, outputDirectory, { recursive: true });
