export interface IFilters {
  genreIn: string[];
  genreNotIn: string[];
  tagIn: string[];
  tagNotIn: string[];
}

export interface IUser {
  _id: number;
  username: string;
  fullName: string;
  activeCard: number;
  list: number[];
  filters: IFilters;
  addAnime: (id: number, name: string) => Promise<unknown>;
}
