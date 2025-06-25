import { runPipeline } from '../src/runPipeline';
import { supa }        from '../src/db/index';
import { embed }       from '../src/pipeline/step02_embedding';

// ---- preload 99 dummy rows without manual id ----
async function seed99() {
  const baseText = 'Daily log number ';
  for (let i = 1; i <= 99; i++) {
    const text = baseText + i;
    const emb  = await embed(text);

    await supa.from('entries').insert({
      raw_text:   text,
      embedding:  emb,
      meta_data:  {},
      parsed:     { theme: [], vibe: [], bucket: ['Thought'] },
      carry_in:   false,
      created_at: new Date(Date.now() - (100 - i) * 60_000).toISOString()
      // id is omitted → DB autogenerates UUID
    });
  }
}

(async () => {
  await supa.from('entries').delete().neq('id', '');  // clear table
  await seed99();                                     // preload 99
  await runPipeline(
    'Entry one-hundred: Still driven but feeling tired!'
  );
})();