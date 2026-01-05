import { describe, it, expect, vi } from "vitest";
import { getShow, getShowEpisodes, getEpisodeById } from "./showsApi";

describe("showsApi", () => {
  describe("getShow", () => {
    it("should fetch show data successfully", async () => {
      const mockShow = {
        id: 6771,
        name: "The Powerpuff Girls",
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockShow,
      });

      const result = await getShow(6771);

      expect(result).toEqual(mockShow);
    });

    it("should throw error when API returns error", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(getShow(99999)).rejects.toThrow(
        "Failed to fetch show: 404 Not Found"
      );
    });
  });

  describe("getShowEpisodes", () => {
    it("should fetch episodes successfully", async () => {
      const mockEpisodes = [
        { id: 1, name: "Episode 1", season: 1, number: 1 },
        { id: 2, name: "Episode 2", season: 1, number: 2 },
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockEpisodes,
      });

      const result = await getShowEpisodes(6771);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Episode 1");
    });

    it("should throw error on failure", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(getShowEpisodes(6771)).rejects.toThrow(
        "Failed to fetch episodes"
      );
    });
  });

  describe("getEpisodeById", () => {
    it("should fetch single episode successfully", async () => {
      const mockEpisode = {
        id: 123,
        name: "Meat Fuzzy Lumpkins",
        season: 1,
        number: 2,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockEpisode,
      });

      const result = await getEpisodeById(123);

      expect(result.name).toBe("Meat Fuzzy Lumpkins");
    });
  });
});

