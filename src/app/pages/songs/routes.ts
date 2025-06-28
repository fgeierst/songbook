import { route } from "rwsdk/router";
import { AddSong } from "./AddSong";
import { SongsList } from "./SongsList";

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
];