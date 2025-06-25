import { metaExtract } from '../src/pipeline/step05_metaExtract';
import { parseEntry }  from '../src/pipeline/step06_parseEntry';

(async () => {
  const txt = "I know I should sleep earlier, but I always end up scrolling late into the night.";
  const meta = metaExtract(txt);
  const parsed = await parseEntry(txt, meta);
  console.log(parsed);
})();