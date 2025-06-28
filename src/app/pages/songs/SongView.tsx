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

  // Extract song ID from URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const songId = pathParts[pathParts.length - 1];

  if (!songId) {
    error = "Song ID is required";
  } else {
    try {
      song = await getSong(songId);
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load song";
    }
  }

  // Set context properties for Document component
  ctx.isSongView = true;
  ctx.songId = songId;
  ctx.songTitle = song?.title || "Song";

  if (error) {
    return (
      <div className="song-view-container">
        <div className="error-message">
          {error}
        </div>
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
  let fullContent = '';
  
  if (song.artist) fullContent += `Artist: ${song.artist}\n`;
  if (song.album) fullContent += `Album: ${song.album}\n`;
  if (song.year) fullContent += `Year: ${song.year}\n`;
  if (song.key) fullContent += `Key: ${song.key}\n`;
  
  if (fullContent) fullContent += '\n';
  fullContent += song.content || '';

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