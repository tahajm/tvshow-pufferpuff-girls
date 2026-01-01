
export interface ShowData {
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
    network: {
      name: string;
      country: {
        name: string;
      };
    } | null;
  }
  
  export interface ShowCardProps {
    show: ShowData;
  }