import { IAnime } from './types';

export const normalizeAnime = ({
  id,
  title,
  genres,
  tags,
  description,
  siteUrl,
  seasonYear,
  coverImage: { extraLarge },
}): IAnime => ({
  id,
  titles: title,
  description,
  genres,
  tags: tags.map(t => t.name),
  preview: extraLarge,
  siteUrl,
  seasonYear,
});
