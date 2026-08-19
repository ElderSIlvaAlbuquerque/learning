import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { BookSchema } from '@nextread/shared';
import type { BookRecord } from '@nextread/core';

const BooksFileSchema = z.array(BookSchema);

export function loadBooksFromFile(filePath: string): BookRecord[] {
  let raw: string;

  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch (error) {
    throw new Error(`Could not read books file "${filePath}": ${(error as Error).message}`);
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse books file "${filePath}" as JSON: ${(error as Error).message}`);
  }

  const result = BooksFileSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(`Books file "${filePath}" does not match the expected book contract: ${result.error.message}`);
  }

  return result.data;
}
