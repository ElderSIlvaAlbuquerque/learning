#!/usr/bin/env node
import { createServer } from 'node:http';
import {
  BookRecommendationsService,
  NextStepService,
  SimilarNotesService,
  sampleBooks,
  sampleNotes
} from '@nextread/core';

type Source = 'zenelf' | 'obsidian' | 'other';
type Flow = 'similar' | 'next' | 'books';

const DEFAULT_NOTE = sampleNotes[0];
const PORT = Number(process.env.PORT ?? 4173);

function parseCsv(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

function toSource(value: unknown): Source {
  if (value === 'obsidian' || value === 'other') {
    return value;
  }
  return 'zenelf';
}

function toFlow(value: unknown): Flow {
  if (value === 'next' || value === 'books') {
    return value;
  }
  return 'similar';
}

function toNote(input: Record<string, unknown>) {
  const tags = Array.isArray(input.tags)
    ? input.tags.filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
    : parseCsv(String(input.tags ?? ''));

  const links = Array.isArray(input.links)
    ? input.links.filter((link): link is string => typeof link === 'string' && link.length > 0)
    : parseCsv(String(input.links ?? ''));

  return {
    id: String(input.id ?? DEFAULT_NOTE.id).trim() || DEFAULT_NOTE.id,
    title: String(input.title ?? DEFAULT_NOTE.title).trim() || DEFAULT_NOTE.title,
    content: String(input.content ?? DEFAULT_NOTE.content).trim() || DEFAULT_NOTE.content,
    tags: tags.length > 0 ? tags : DEFAULT_NOTE.tags,
    links,
    source: toSource(input.source),
    updatedAt: new Date().toISOString()
  };
}

function jsonResponse(res: import('node:http').ServerResponse, code: number, payload: unknown): void {
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

function htmlResponse(res: import('node:http').ServerResponse, code: number, html: string): void {
  res.writeHead(code, { 'content-type': 'text/html; charset=utf-8' });
  res.end(html);
}

function buildHtml(): string {
  const defaults = JSON.stringify(DEFAULT_NOTE);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NextRead Manual Web Form</title>
  <style>
    :root {
      --bg: #f3f6f4;
      --panel: #fcfff8;
      --ink: #1f2a24;
      --muted: #4f5f56;
      --accent: #14532d;
      --accent-soft: #d7f6e4;
      --border: #bcd8c9;
      --danger: #7f1d1d;
      --radius: 14px;
      --shadow: 0 14px 34px rgba(20, 83, 45, 0.12);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
      background:
        radial-gradient(circle at 10% 0%, #d8efe1 0, rgba(216, 239, 225, 0) 55%),
        radial-gradient(circle at 100% 100%, #cfe7f6 0, rgba(207, 231, 246, 0) 45%),
        var(--bg);
      color: var(--ink);
      display: grid;
      place-items: center;
      padding: 24px;
    }

    .card {
      width: min(900px, 100%);
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .hero {
      padding: 24px;
      background: linear-gradient(125deg, #fef9c3 0%, #dcfce7 54%, #dbeafe 100%);
      border-bottom: 1px solid var(--border);
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(1.4rem, 1.9vw + 1rem, 2rem);
      letter-spacing: 0.02em;
    }

    .hero p {
      margin: 10px 0 0;
      color: var(--muted);
      max-width: 65ch;
    }

    form {
      padding: 24px;
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr;
    }

    .full { grid-column: 1 / -1; }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.95rem;
      color: var(--muted);
    }

    input, textarea, select, button {
      font: inherit;
    }

    input, textarea, select {
      width: 100%;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 12px;
      background: #fff;
      color: var(--ink);
      transition: border-color 120ms ease, box-shadow 120ms ease;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }

    textarea { min-height: 110px; resize: vertical; }

    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      border: 0;
      border-radius: 999px;
      padding: 10px 18px;
      cursor: pointer;
      font-weight: 600;
    }

    button[type="submit"] {
      background: var(--accent);
      color: #fff;
    }

    button[type="button"] {
      background: #eef3ef;
      color: var(--ink);
    }

    .result {
      padding: 0 24px 24px;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: #f8fffb;
      padding: 14px;
      min-height: 64px;
      max-height: 320px;
      overflow: auto;
    }

    .error {
      color: var(--danger);
      font-weight: 600;
    }

    @media (max-width: 740px) {
      form { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="card">
    <section class="hero">
      <h1>NextRead Manual Web Form</h1>
      <p>Pick a recommendation flow, edit note data, and run it instantly to see JSON output.</p>
    </section>

    <form id="manual-form">
      <label>
        Flow
        <select id="flow" name="flow">
          <option value="similar">similar notes</option>
          <option value="next">next step note</option>
          <option value="books">book recommendations</option>
        </select>
      </label>

      <label>
        Source
        <select id="source" name="source">
          <option value="zenelf">zenelf</option>
          <option value="obsidian">obsidian</option>
          <option value="other">other</option>
        </select>
      </label>

      <label>
        Note ID
        <input id="id" name="id" />
      </label>

      <label>
        Title
        <input id="title" name="title" />
      </label>

      <label class="full">
        Content
        <textarea id="content" name="content"></textarea>
      </label>

      <label>
        Tags (comma separated)
        <input id="tags" name="tags" />
      </label>

      <label>
        Links (comma separated)
        <input id="links" name="links" />
      </label>

      <div class="full actions">
        <button type="submit">Run</button>
        <button type="button" id="reset">Reset Defaults</button>
      </div>
    </form>

    <section class="result">
      <pre id="output">Submit the form to see results.</pre>
    </section>
  </main>

  <script>
    const defaults = ${defaults};
    const form = document.getElementById('manual-form');
    const output = document.getElementById('output');
    const resetButton = document.getElementById('reset');

    function applyDefaults() {
      document.getElementById('id').value = defaults.id;
      document.getElementById('title').value = defaults.title;
      document.getElementById('content').value = defaults.content;
      document.getElementById('tags').value = defaults.tags.join(', ');
      document.getElementById('links').value = defaults.links.join(', ');
      document.getElementById('source').value = defaults.source;
      document.getElementById('flow').value = 'similar';
      output.textContent = 'Submit the form to see results.';
      output.classList.remove('error');
    }

    async function submitForm(event) {
      event.preventDefault();
      output.textContent = 'Running...';
      output.classList.remove('error');

      const payload = {
        flow: document.getElementById('flow').value,
        note: {
          id: document.getElementById('id').value,
          title: document.getElementById('title').value,
          content: document.getElementById('content').value,
          tags: document.getElementById('tags').value,
          links: document.getElementById('links').value,
          source: document.getElementById('source').value
        }
      };

      try {
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Request failed');
        }

        output.textContent = JSON.stringify(result, null, 2);
      } catch (error) {
        output.textContent = error instanceof Error ? error.message : String(error);
        output.classList.add('error');
      }
    }

    form.addEventListener('submit', submitForm);
    resetButton.addEventListener('click', applyDefaults);
    applyDefaults();
  </script>
</body>
</html>`;
}

const server = createServer((req, res) => {
  if (!req.url || !req.method) {
    jsonResponse(res, 400, { error: 'Missing request metadata.' });
    return;
  }

  if (req.method === 'GET' && req.url === '/') {
    htmlResponse(res, 200, buildHtml());
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    jsonResponse(res, 200, { status: 'ok' });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/recommend') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
      }
    });

    req.on('end', () => {
      void (async () => {
        try {
          const parsed = JSON.parse(body) as {
            flow?: unknown;
            note?: Record<string, unknown>;
          };

          const flow = toFlow(parsed.flow);
          const note = toNote(parsed.note ?? {});

          if (flow === 'similar') {
            const service = new SimilarNotesService();
            const results = await service.findSimilar(note, sampleNotes);
            jsonResponse(res, 200, { flow, note, results });
            return;
          }

          if (flow === 'next') {
            const service = new NextStepService();
            const result = service.recommend(note, sampleNotes);
            jsonResponse(res, 200, { flow, note, result });
            return;
          }

          const service = new BookRecommendationsService();
          const results = service.recommend(note, sampleBooks);
          jsonResponse(res, 200, { flow, note, results });
        } catch (error) {
          jsonResponse(res, 400, {
            error: error instanceof Error ? error.message : String(error)
          });
        }
      })();
    });

    return;
  }

  jsonResponse(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`NextRead manual web form is running on http://localhost:${PORT}`);
});
