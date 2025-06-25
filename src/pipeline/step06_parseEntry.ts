//--------------------------------------------------
// Step 06 — PARSE_ENTRY  (Local LLM via Ollama)
//--------------------------------------------------
import { RawText, MetaData, ParsedEntry } from '../types';
import fetch from 'node-fetch';           // npm i node-fetch@2

/**
 * Call the Ollama server at http://localhost:11434
 * Model: 'phi'   – swap to 'llama2:7b-q4' or similar if you prefer.
 */
async function ollamaParse(text: RawText): Promise<ParsedEntry> {
  const prompt = `
You are a JSON-only extraction engine.

Return *ONLY* valid JSON with this exact schema and nothing else:

{
  "theme": ["#topic"],
  "vibe": ["tone"],
  "intent": "goal sentence",
  "subtext": "hidden worry",
  "persona_trait": ["trait"],
  "bucket": ["Thought"]
}

Example:
{"theme":["work-life balance"],"vibe":["anxious","exhausted"],"intent":"Find rest without guilt.","subtext":"Fears being seen as less committed.","persona_trait":["conscientious","vigilant"],"bucket":["Thought"]}

Diary entry:
"""${text}"""
JSON:
`;

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'phi', prompt, stream: false })
  });

  if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);

  // Ollama wraps the answer in { response: "...", done: true }
  const { response } = await res.json() as { response: string };

  /* -----------------------------------------------------------
     Clean the output: keep only first '{' ... last '}' block
     so any ``` fences or chatter are removed.
  ----------------------------------------------------------- */
  const firstBrace = response.indexOf('{');
  const lastBrace  = response.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error('LLM did not return JSON');
  }
  const jsonStr = response.slice(firstBrace, lastBrace + 1);

  return JSON.parse(jsonStr) as ParsedEntry;
}

/* Exported step: meta isn’t used yet but we keep the signature */
export async function parseEntry(
  text: RawText,
  _meta: MetaData
): Promise<ParsedEntry> {
  const parsed = await ollamaParse(text);

  console.log(
    `[PARSE_ENTRY] output=${JSON.stringify(parsed)} | note=ollama`
  );
  return parsed;
}
