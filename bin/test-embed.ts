import { embed } from '../src/pipeline/step02_embedding';

(async () => {
  const s = "I’m exhausted but keep checking Slack.";
  const v = embed(s);
  console.log("Len =", v.length, "First 8 =", v.slice(0, 8));
})();
