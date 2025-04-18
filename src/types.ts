export interface LyricsResponse {
    lyrics: string;
    error?: string;
}

export interface SearchParams {
    artist: string;
    song: string;

}