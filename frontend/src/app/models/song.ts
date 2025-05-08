// ? = optional
export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  albumCoverUrl?: string;
}
