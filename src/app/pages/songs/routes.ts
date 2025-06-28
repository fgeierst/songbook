import { route } from "rwsdk/router";
import { AddSong } from "./AddSong";
import { SongsList } from "./SongsList";
import { SongView } from "./SongView";
import { getSong } from "./functions";

// Middleware to require authentication for all song routes
const requireAuth = ({ ctx }: any) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
};

// Interruptor to set up song context for the Document component
const setupSongViewContext = async ({ ctx, request }: any) => {
  // Extract song ID from URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const songId = pathParts[pathParts.length - 1];

  if (songId) {
    try {
      const song = await getSong(songId);

      // Set context properties for Document component
      ctx.isSongView = true;
      ctx.songId = songId;
      ctx.songTitle = song?.title || "Song";

      console.log("setupSongViewContext - Setting ctx:", {
        isSongView: ctx.isSongView,
        songId: ctx.songId,
        songTitle: ctx.songTitle,
      });
    } catch (err) {
      // If song loading fails, still set basic context
      ctx.isSongView = true;
      ctx.songId = songId;
      ctx.songTitle = "Song";
    }
  }
};

export const songRoutes = [
  route("/new", [requireAuth, AddSong]),
  route("/songs/:id", [requireAuth, setupSongViewContext, SongView]),
  route("/songs/:id/edit", [requireAuth, AddSong]), // Reuse AddSong for editing for now
];
