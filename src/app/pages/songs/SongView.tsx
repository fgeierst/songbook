import { RequestInfo } from "rwsdk/worker";
import { getSong } from "./functions";

interface Song {
  id: string;
  title: string;
  artist: string | null;
  album: string | null;
  year: number | null;
  key: string | null;
  content: string | null;
  createdAt: Date;
}

export async function SongView({ ctx, request }: RequestInfo) {
  let song: Song | null = null;
  let error = "";

  // Get song ID from context (set by interruptor)
  const songId = ctx.songId;

  if (!songId) {
    error = "Song ID is required";
  } else {
    try {
      song = await getSong(songId);
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load song";
    }
  }

  // Debug: Log the context to verify it's available
  console.log("SongView - Context received:", {
    isSongView: ctx.isSongView,
    songId: ctx.songId,
    songTitle: ctx.songTitle,
  });

  if (error) {
    return (
      <div className="song-view-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="song-view-container">
        <div className="loading">Loading song...</div>
      </div>
    );
  }

  // Build the complete content with metadata at the top
  let fullContent = "";

  if (song.artist) fullContent += `Artist: ${song.artist}\n`;
  if (song.album) fullContent += `Album: ${song.album}\n`;
  if (song.year) fullContent += `Year: ${song.year}\n`;
  if (song.key) fullContent += `Key: ${song.key}\n`;

  if (fullContent) fullContent += "\n";
  fullContent += song.content || "";

  return (
    <div className="song-view-container">
      {fullContent ? (
        <pre className="song-view-text">{fullContent}</pre>
      ) : (
        <div className="empty-content">
          <p>No content added yet.</p>
        </div>
      )}
    </div>
  );
}
