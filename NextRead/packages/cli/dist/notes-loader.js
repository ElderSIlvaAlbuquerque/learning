import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
        return { data: {}, content: raw.trim() };
    }
    const [, frontmatter, body] = match;
    const data = {};
    for (const line of frontmatter.split(/\r?\n/)) {
        const separator = line.indexOf(':');
        if (separator === -1)
            continue;
        const key = line.slice(0, separator).trim();
        const rawValue = line.slice(separator + 1).trim();
        if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            const inner = rawValue.slice(1, -1).trim();
            data[key] = inner ? inner.split(',').map((item) => item.trim()) : [];
        }
        else {
            data[key] = rawValue;
        }
    }
    return { data, content: body.trim() };
}
function toStringArray(value) {
    if (!value)
        return [];
    return Array.isArray(value) ? value : [value];
}
function toNoteRecord(fileName, raw) {
    const { data, content } = parseFrontmatter(raw);
    const id = data.id;
    const title = data.title;
    if (typeof id !== 'string' || !id) {
        throw new Error(`Sample note "${fileName}" is missing a required "id" field in its frontmatter.`);
    }
    if (typeof title !== 'string' || !title) {
        throw new Error(`Sample note "${fileName}" is missing a required "title" field in its frontmatter.`);
    }
    return {
        id,
        title,
        content,
        tags: toStringArray(data.tags),
        links: toStringArray(data.links),
        source: typeof data.source === 'string' ? data.source : 'other',
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString()
    };
}
export function loadNotesFromDir(dir) {
    let fileNames;
    try {
        fileNames = readdirSync(dir).filter((name) => name.endsWith('.md'));
    }
    catch (error) {
        throw new Error(`Could not read notes directory "${dir}": ${error.message}`);
    }
    if (fileNames.length === 0) {
        throw new Error(`No Markdown notes found in "${dir}".`);
    }
    return fileNames
        .sort()
        .map((fileName) => toNoteRecord(fileName, readFileSync(join(dir, fileName), 'utf-8')));
}
//# sourceMappingURL=notes-loader.js.map