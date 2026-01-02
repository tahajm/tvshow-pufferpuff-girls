export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
}

export interface ShowEpisodesProps {
  showId: number;
}
