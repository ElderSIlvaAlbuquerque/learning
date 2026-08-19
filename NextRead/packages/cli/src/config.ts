import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONFIG_FILE_NAME = 'nextread.config.json';
const DEFAULT_NOTES_DIR = 'samples/notes';

interface NextReadConfig {
  notesDir?: string;
}

function readConfigFile(cwd: string): NextReadConfig {
  const configPath = join(cwd, CONFIG_FILE_NAME);

  if (!existsSync(configPath)) {
    return {};
  }

  try {
    return JSON.parse(readFileSync(configPath, 'utf-8')) as NextReadConfig;
  } catch (error) {
    throw new Error(`Could not parse ${CONFIG_FILE_NAME}: ${(error as Error).message}`);
  }
}

export function resolveNotesDir(cliDir?: string, cwd: string = process.cwd()): string {
  if (cliDir) {
    return cliDir;
  }

  const config = readConfigFile(cwd);
  return config.notesDir ?? DEFAULT_NOTES_DIR;
}
