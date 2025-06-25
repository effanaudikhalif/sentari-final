import { metaExtract }  from '../src/pipeline/step05_metaExtract';
import { parseEntry }   from '../src/pipeline/step06_parseEntry';
import { embed }        from '../src/pipeline/step02_embedding';
import { step07_carryIn } from '../src/pipeline/step07_carryIn';

(async () => {
  // ✏️  Change this text to whatever you want to test
  const txt = "Still exhausted, still glued to Slack. Wish I could log off without guilt.";

  // Build the components your Step-07 function expects
  const meta   = metaExtract(txt);
  const parsed = await parseEntry(txt, meta);
  const vect   = await embed(txt);

  // ---- Run Step 07 exactly as in production -----------------
  const carry = await step07_carryIn(parsed, vect);

  console.log('\ncarry_in =', carry);
})();