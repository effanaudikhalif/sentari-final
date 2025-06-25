import { fetchRecent } from '../db/index';

export async function step03_fetchRecent(limit = 5) {
  const { data, error } = await fetchRecent(limit);

  console.log(
    `[FETCH_RECENT] output=${data?.length ?? 0} rows | note=${error ? error.message : 'ok'}`
  );

  return data ?? [];
}