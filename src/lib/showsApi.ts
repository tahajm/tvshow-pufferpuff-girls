import { TVShow, Episode } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://api.tvmaze.com";

const API_ENDPOINTS = {
  show: (showId: number | string) => `${API_BASE_URL}/shows/${showId}`,
  showEpisodes: (showId: number | string) =>
    `${API_BASE_URL}/shows/${showId}/episodes`,
  episode: (episodeId: number | string) =>
    `${API_BASE_URL}/episodes/${episodeId}`,
} as const;

const REVALIDATION_TIME = {
  show: 86400, // 24 hours
  episodes: 604800, // 7 days
  episode: 2592000, // 30 days
} as const;

export async function getShow(showId: number | string): Promise<TVShow> {
  const response = await fetch(API_ENDPOINTS.show(showId), {
    next: { revalidate: REVALIDATION_TIME.show },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch show: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getShowEpisodes(
  showId: number | string
): Promise<Episode[]> {
  const response = await fetch(API_ENDPOINTS.showEpisodes(showId), {
    next: { revalidate: REVALIDATION_TIME.episodes },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch episodes: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getEpisodeById(
  episodeId: number | string
): Promise<Episode> {
  const response = await fetch(API_ENDPOINTS.episode(episodeId), {
    next: { revalidate: REVALIDATION_TIME.episode },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch episode: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
