export interface TVShow {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  ended: string;
  summary: string;
  image: {
    medium: string;
    original: string;
  };
  rating: {
    average: number | null;
  };
}

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
