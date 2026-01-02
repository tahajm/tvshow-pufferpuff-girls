export interface EpisodeDetail {
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

export interface EpisodeDetailProps {
  episode: EpisodeDetail;
}
