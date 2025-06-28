import { route } from "rwsdk/router";
import { AddSong } from "./AddSong";
import { SongsList } from "./SongsList";
import { SongView } from "./SongView";

// Middleware to require authentication for all song routes
const requireAuth = ({ ctx }: any) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
};

export const songRoutes = [
  route("/new", [requireAuth, AddSong]),
  route("/songs/:id", [requireAuth, SongView]),
  route("/songs/:id/edit", [requireAuth, AddSong]), // Reuse AddSong for editing for now
];