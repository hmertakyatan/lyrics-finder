import axios from "axios";
import { LyricsResponse } from "../types";

const lyricsapi = axios.create({
  baseURL: "https://api.lyrics.ovh/v1",
});

export const getLyrics = async (artist: string, title: string): Promise<string> => {
  try {
    const response = await lyricsapi.get<LyricsResponse>(`${artist}/${title}`);
    return response.data.lyrics;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "An error occurred when getting lyrics."
    );
  }
};
