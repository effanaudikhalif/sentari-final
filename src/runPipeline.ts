//--------------------------------------------------
// Orchestrator – runs all 13 steps in order
//--------------------------------------------------
import { rawTextIn }        from './pipeline/step01_rawTextIn';
import { embed }            from './pipeline/step02_embedding';
import { metaExtract }      from './pipeline/step05_metaExtract';
import { parseEntry }       from './pipeline/step06_parseEntry';
import { step07_carryIn }   from './pipeline/step07_carryIn';
import { step10_saveEntry } from './pipeline/step10_saveEntry';

// ---- MOCK placeholders for unfinished steps ----
const contrastCheck = () => { console.log('[CONTRAST_CHECK] output=false | note=mock'); return false; };
const profileUpdate = () => { console.log('[PROFILE_UPDATE] note=mock'); };
const gptReply      = () => { const r = "Sounds like you're drained—rest up!"; console.log(`[GPT_REPLY] output="${r}"`); return r; };
const publish       = (id: string | null, reply: string, carry: boolean) =>
  console.log('[PUBLISH]', { id, reply, carry });
const costLog       = (ms: number) =>
  console.log(`[COST_LATENCY_LOG] mock_cost=$0.00 | latency_ms=${ms.toFixed(0)}`);

export async function runPipeline(transcript: string) {
  const t0 = Date.now();

  // 01 raw text
  const raw = rawTextIn(transcript);

  // 02 embedding
  const embedding = await embed(raw);

  // 05 meta
  const meta = metaExtract(raw);

  // 06 parse
  const parsed = await parseEntry(raw, meta);

  // 07 carry-in
  const carry = await step07_carryIn(parsed, embedding);

  // 08 contrast (mock)
  const flip = contrastCheck();

  // 09 profile update (mock)
  profileUpdate();

  // 10 save entry
  const id = await step10_saveEntry({
    raw_text: raw,
    embedding,
    meta_data: meta,
    parsed,
    carry_in: carry,
    emotion_flip: flip
  });

  // 11 reply (mock)
  const reply = gptReply();

  // 12 publish (mock)
  publish(id, reply, carry);

  // 13 cost / latency
  costLog(Date.now() - t0);
}
