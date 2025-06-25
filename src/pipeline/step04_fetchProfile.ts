import { fetchProfile } from '../db';

export async function step04_fetchProfile() {
  const { data, error } = await fetchProfile();
  console.log(
    `[FETCH_PROFILE] output=${error ? 'null' : 'ok'} | note=${error?.message ?? 'loaded'}`
  );
  return data;
}