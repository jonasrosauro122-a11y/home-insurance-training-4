// leaderboard.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR-ANON-PUBLIC-KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadLeaderboard() {
  const { data, error } = await supabase
    .from("scores")
    .select("name, score")
    .order("score", { ascending: false })
    .limit(5); // 🏆 Only top 5

  if (error) {
    console.error("Error loading leaderboard:", error);
    return;
  }

  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = "";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${index + 1}</td><td>${row.name}</td><td>${row.score}</td>`;
    tbody.appendChild(tr);
  });
}

loadLeaderboard();
