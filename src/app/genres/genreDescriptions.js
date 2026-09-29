export const genreDescriptions = {
  Action: "High energy, intense stories, and unforgettable adventures.",
  "Action & Adventure":
    "High energy, intense stories, and unforgettable adventures.",
  Adventure: "Epic journeys and thrilling exploration.",
  Comedy: "Lighthearted stories made for a good time.",
  Drama: "Emotional stories filled with powerful characters.",
  Horror: "Spine-chilling scares and dark suspense.",
  Romance: "Heartfelt connections and love stories.",
  "Science Fiction": "Bold ideas, future worlds, and imaginative concepts.",
  "Sci-Fi & Fantasy": "Bold ideas, future worlds, and imaginative concepts.",
  Thriller: "Edge-of-your-seat tension and suspense.",
  Mystery: "Puzzles, secrets, and stories that keep you guessing.",
  Fantasy: "Magical worlds and imaginative escapes.",
  Animation: "Vivid stories brought to life through animation.",
  Crime: "Gripping stories of crime, justice, and consequence.",
  Documentary: "Real stories exploring the world around us.",
  Family: "Stories the whole family can enjoy together.",
};

export function getGenreDescription(name) {
  return (
    genreDescriptions[name] || "Discover stories from this genre on Youflix."
  );
}
