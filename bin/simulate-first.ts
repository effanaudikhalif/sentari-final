// bin/simulate-first.ts
import { runPipeline } from '../src/runPipeline';
import { supa } from '../src/db/index';

(async () => {
  // wipe table so it's the “first ever” entry
  await supa.from('entries').delete().neq('id', ''); // empty table

  await runPipeline(
    "I keep checking Slack even when I’m exhausted! I know I need rest, but I’m scared I’ll miss something important!"
  );
})();
