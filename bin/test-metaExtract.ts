import { metaExtract } from '../src/pipeline/step05_metaExtract';

const sample =
  "I keep checking Slack even when I’m exhausted! I know I need rest, but I’m scared I’ll miss something important!";

const meta = metaExtract(sample);

console.log('\nReturned meta_data object:\n', meta);