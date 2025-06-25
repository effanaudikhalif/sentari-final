import { fetchRecent } from '../src/db/index';

(async () => {
  const { data, error } = await fetchRecent(5);

  if (error) {
    console.error("❌ fetchRecent failed:", error.message);
  } else {
    console.log("✅ fetchRecent data:");
    console.dir(data, { depth: null });
  }
})();
