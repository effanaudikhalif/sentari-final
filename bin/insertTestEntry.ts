import { saveEntry } from '../src/db/index';

(async () => {
  const testRow = {
    transcript_raw: "Just testing this entry!",
    created_at: new Date().toISOString(),
    embedding: Array(384).fill(0.01),  // mock vector
    meta_data: { length: 26, topWords: ["testing", "entry"] },
    parsed: {
      theme: ["testing"],
      vibe: ["curious"],
      intent: "See if the system saves.",
      subtext: "Wants to confirm DB works.",
      persona_trait: ["methodical"],
      bucket: ["Thought"]
    },
    carry_in: false,
    emotion_flip: false
  };

  const { data, error } = await saveEntry(testRow);

  if (error) {
    console.error("❌ Insert failed:", error.message);
  } else {
    console.log("✅ Inserted entry ID:", data.id);
  }
})();