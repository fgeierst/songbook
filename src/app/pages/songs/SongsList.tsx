import { getSongs } from "./functions";
import { RequestInfo } from "rwsdk/worker";

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

export async function SongsList({ ctx }: RequestInfo) {
  let songs: Song[] = [];
  let error = "";

  try {
    songs = await getSongs();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load songs";
  }

  if (error) {
    return (
      <div className="songs-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="songs-container">
      {songs.length === 0 ? (
        <div className="empty-state">
          <p>No songs yet.</p>
        </div>
      ) : (
        <div className="songs-list">
          {songs.map((song) => (
            <a key={song.id} href={`/songs/${song.id}`} className="song-card song-card-link">
              <div className="song-header">
                <div className="song-title">{song.title}</div>
                {song.key && <div className="song-key">{song.key}</div>}
              </div>
              
              {(song.artist || song.album || song.year) && (
                <div className="song-meta">
                  {song.artist && <span>{song.artist}</span>}
                  {song.album && <span>{song.album}</span>}
                  {song.year && <span>{song.year}</span>}
                </div>
              )}
              
              {song.content && (
                <div className="song-preview">
                  {song.content.split('\n').slice(0, 3).map((line, index) => (
                    <div key={index}>{line || '\u00A0'}</div>
                  ))}
                  {song.content.split('\n').length > 3 && <div>...</div>}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}