//--------------------------------------------------
// Step 08 — CONTRAST_CHECK
//--------------------------------------------------
import { ParsedEntry } from '../types';

/**
 * Returns true if the entry’s leading vibe differs
 * from the profile’s dominant vibe.
 *
 * Logs: [CONTRAST_CHECK] output=<bool> | note=dominant=<x>
 */
export function step08_contrastCheck(
  parsed:   ParsedEntry,
  profile:  { dominant_vibe?: string } | null
): boolean {
  const newVibe      = parsed.vibe[0] ?? 'neutral';         // fallback if none
  const dominant     = profile?.dominant_vibe ?? 'neutral';

  const flip = newVibe !== dominant;

  console.log(
    `[CONTRAST_CHECK] output=${flip} | note=dominant=${dominant}`
  );

  return flip;
}
