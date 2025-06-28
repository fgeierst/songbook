"use server";
import { requestInfo } from "rwsdk/worker";
import { db } from "@/db";

export interface CreateSongInput {
  title: string;
  artist?: string;
  album?: string;
  year?: number;
  key?: string;
  content?: string;
}

export async function createSong(input: CreateSongInput) {
  const { ctx } = requestInfo;

  // Verify user is authenticated
  if (!ctx.user) {
    throw new Error("Authentication required");
  }

  // Validate title is not empty after trimming whitespace
  const title = input.title?.trim();
  if (!title) {
    throw new Error("Title is required");
  }

  // Validate year is valid number if provided
  if (input.year !== undefined && input.year !== null) {
    if (!Number.isInteger(input.year) || input.year < 0) {
      throw new Error("Year must be a valid positive integer");
    }
  }

  try {
    // Create song with userId set to current authenticated user
    const song = await db.song.create({
      data: {
        title,
        artist: input.artist?.trim() || null,
        album: input.album?.trim() || null,
        year: input.year || null,
        key: input.key?.trim() || null,
        content: input.content?.trim() || null,
        userId: ctx.user.id,
      },
    });

    return song;
  } catch (error) {
    // Handle database constraint violations
    if (error instanceof Error) {
      throw new Error(`Failed to create song: ${error.message}`);
    }
    throw new Error("Failed to create song");
  }
}

export async function getSongs() {
  const { ctx } = requestInfo;

  // Verify user is authenticated
  if (!ctx.user) {
    throw new Error("Authentication required");
  }

  try {
    // Get songs for current user, ordered by creation date (newest first)
    const songs = await db.song.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return songs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch songs: ${error.message}`);
    }
    throw new Error("Failed to fetch songs");
  }
}