import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const CONFIG_FILE_NAME = 'nextread.config.json';
const DEFAULT_NOTES_DIR = 'samples/notes';
const DEFAULT_BOOKS_FILE = 'samples/books/books.json';
function readConfigFile(cwd) {
    const configPath = join(cwd, CONFIG_FILE_NAME);
    if (!existsSync(configPath)) {
        return {};
    }
    try {
        return JSON.parse(readFileSync(configPath, 'utf-8'));
    }
    catch (error) {
        throw new Error(`Could not parse ${CONFIG_FILE_NAME}: ${error.message}`);
    }
}
export function resolveNotesDir(cliDir, cwd = process.cwd()) {
    if (cliDir) {
        return cliDir;
    }
    const config = readConfigFile(cwd);
    return config.notesDir ?? DEFAULT_NOTES_DIR;
}
export function resolveBooksFile(cliPath, cwd = process.cwd()) {
    if (cliPath) {
        return cliPath;
    }
    const config = readConfigFile(cwd);
    return config.booksFile ?? DEFAULT_BOOKS_FILE;
}
//# sourceMappingURL=config.js.map