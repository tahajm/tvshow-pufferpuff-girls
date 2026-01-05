import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShowEpisodes } from "./ShowEpisodes";
import { Episode } from "@/types";
import "@testing-library/jest-dom/vitest";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

import { useQuery } from "@tanstack/react-query";

const mockUseQuery = useQuery as ReturnType<typeof vi.fn>;

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: "Pilot Episode",
    season: 1,
    number: 1,
    airdate: "2024-01-01",
    runtime: 45,
    image: {
      medium: "https://example.com/episode1.jpg",
      original: "https://example.com/episode1-large.jpg",
    },
    summary: "<p>The first episode of the series.</p>",
  },
  {
    id: 2,
    name: "Second Episode",
    season: 1,
    number: 2,
    airdate: "2024-01-08",
    runtime: 42,
    image: {
      medium: "https://example.com/episode2.jpg",
      original: "https://example.com/episode2-large.jpg",
    },
    summary: "<p>The second episode continues the story.</p>",
  },
];

describe("ShowEpisodes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays loading skeleton while fetching episodes", async () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    render(<ShowEpisodes showId={1} />);

    expect(screen.getByText("Loading episodes...")).toBeInTheDocument();

    expect(screen.getByLabelText("Episode cards loading")).toBeInTheDocument();
  });

  test("displays error message when episode fetching fails", async () => {
    const errorMessage = "Failed to fetch episodes: 404 Not Found";
    mockUseQuery.mockReturnValue({
      data: undefined,
      error: new Error(errorMessage),
      isLoading: false,
      isError: true,
      isSuccess: false,
    });

    render(<ShowEpisodes showId={1} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();

    expect(screen.getByText("Failed to load episodes")).toBeInTheDocument();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("displays empty state message when no episodes are available", async () => {
    mockUseQuery.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(<ShowEpisodes showId={1} />);

    expect(screen.getByText("Episodes")).toBeInTheDocument();

    expect(
      screen.getByText("No episodes available for this show.")
    ).toBeInTheDocument();
  });

  test("displays episodes successfully when data is loaded", async () => {
    mockUseQuery.mockReturnValue({
      data: mockEpisodes,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(<ShowEpisodes showId={1} />);

    expect(screen.getByText("Episodes")).toBeInTheDocument();

    expect(screen.getByLabelText("2 episodes available")).toBeInTheDocument();

    expect(screen.getByText("Pilot Episode")).toBeInTheDocument();

    expect(screen.getByText("Second Episode")).toBeInTheDocument();

    expect(screen.getByText("S1 E1")).toBeInTheDocument();
    expect(screen.getByText("S1 E2")).toBeInTheDocument();
  });
});
