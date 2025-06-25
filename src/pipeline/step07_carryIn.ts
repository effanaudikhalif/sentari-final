import { cosine } from '../utils/cosine';
import { fetchRecent } from '../db/index';
import { RawText, Embedding, ParsedEntry } from '../types';

/**
 * Logic:
 *   carry_in = true  if   (theme∩recentTheme OR vibe∩recentVibe)
 *                       OR cosine(embedding, recentEmbedding) > 0.86
 */
export async function step07_carryIn(
  parsed: ParsedEntry,
  embedding: Embedding,
  limit = 5
): Promise<boolean> {
  const { data: recentRows, error } = await fetchRecent(limit);
  if (error) {
    console.error('[CARRY_IN] fetchRecent error:', error.message);
    return false;
  }

  let carry = false;

  outer: for (const row of recentRows ?? []) {
    // recent rows store parsed JSON and embedding
    const prevParsed: ParsedEntry = row.parsed;
    const prevEmb: Embedding      = row.embedding;

    // --- (a) theme / vibe overlap -----------------
    const themeOverlap = parsed.theme.some(t => prevParsed.theme.includes(t));
    const vibeOverlap  = parsed.vibe .some(v => prevParsed.vibe .includes(v));

    if (themeOverlap || vibeOverlap) { carry = true; break outer; }

    // --- (b) cosine similarity --------------------
    if (cosine(embedding, prevEmb) > 0.86) { carry = true; break outer; }
  }

  console.log(`[CARRY_IN] output=${carry} | note=checked ${recentRows?.length ?? 0} recents`);
  return carry;
}