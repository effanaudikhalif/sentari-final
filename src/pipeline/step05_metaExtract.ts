import { RawText, MetaData } from '../types';

const STOP = new Set([
  'the','a','an','and','but','or','i','to','of','in',
  'm','s','t','re','ve'  
]);
export function metaExtract(text: RawText): MetaData {
  const len = text.length;

  // word freq
  const words = text.toLowerCase().match(/\b\w+\b/g) ?? [];
  const freq: Record<string, number> = {};
  for (const w of words) {
    if (STOP.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }
  const topWords = Object.keys(freq)
    .sort((a,b) => freq[b]-freq[a])
    .slice(0,3);

  // punctuation flags
  const puncFlags = [...new Set(text.match(/[!?]/g) || [])];

  const meta = { length: len, topWords, puncFlags };

  console.log(
    `[META_EXTRACT] inputLen=${len} | output=${JSON.stringify(meta)} | note=done`
  );

  return meta;
}
