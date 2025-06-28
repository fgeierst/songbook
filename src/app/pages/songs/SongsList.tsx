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
            <a
              key={song.id}
              href={`/songs/${song.id}`}
              className="song-card song-card-link"
            >
              <div className="song-header">
                <div className="song-title">
                  {song.title}

                  {song.artist && (
                    <>
                      &nbsp;<span>({song.artist})</span>
                    </>
                  )}
                </div>
              </div>

              {(song.artist || song.album || song.year) && (
                <div className="song-meta"></div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
