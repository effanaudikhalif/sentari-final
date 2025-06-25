export type RawText   = string;       // Step 01 output
export type Embedding = number[];     // Step 02 (length 384)

export interface MetaData {           // Step 05
  length: number;
  topWords: string[];
  puncFlags: string[];
}

export interface ParsedEntry {        // Step 06
  theme: string[];
  vibe: string[];
  intent: string;
  subtext: string;
  persona_trait: string[];
  bucket: string[];
}
