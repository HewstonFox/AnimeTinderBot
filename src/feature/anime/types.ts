export interface ITitles {
  romaji: string;
  english: string;
  native: string;
}

export interface IAnimeDB {
  _id: number;
  name: string;
  isWatched: boolean;
}

export interface IAnime {
  id: number;
  titles: ITitles;
  description: string;
  genres: string[];
  tags: string[];
  preview: string;
  siteUrl: string;
  seasonYear: number;
}
