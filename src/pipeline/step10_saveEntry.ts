import { saveEntry } from '../db/index';

export async function step10_saveEntry(row: Record<string, any>) {
  const { data, error } = await saveEntry(row);

  console.log(
    `[SAVE_ENTRY] output=${data?.id ?? 'null'} | note=${error ? error.message : 'insert ok'}`
  );

  return data?.id ?? null;
}