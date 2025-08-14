// scripts/fetchCategories.js
import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  const authString = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const base64Auth = Buffer.from(authString).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64Auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function fetchCategories() {
  const token = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/browse/categories?country=US&limit=50",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const spotifyCategories = data.categories.items.map((item) => ({
    id: item.id,
    label: item.name.toLowerCase(), // lowercase for easier matching
    image: item.icons[0]?.url || "",
  }));

  // Load your existing moods.js
  const moodsPath = "src/data/moods.js";
  const moodsFile = fs.readFileSync(moodsPath, "utf-8");

  // Extract moods array from the file (removing "export default")
  const moods = eval(moodsFile.replace("export default", "").trim());

  // Map moods to Spotify category IDs
  const updatedMoods = moods.map((mood) => {
    const match = spotifyCategories.find((cat) =>
      cat.label.includes(mood.label.toLowerCase())
    );
    return {
      ...mood,
      categoryId: match ? match.id : mood.categoryId, // keep original if no match
    };
  });

  // Save back to moods.js
  fs.writeFileSync(
    moodsPath,
    `const moods = ${JSON.stringify(updatedMoods, null, 2)};\n\nexport default moods;`
  );

  console.log("✅ Moods updated with Spotify category IDs!");
}

fetchCategories().catch((err) => console.error("❌ Error:", err.message));
