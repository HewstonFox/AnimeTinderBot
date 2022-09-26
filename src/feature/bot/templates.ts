import { IAnime } from '../anime/types';
import { MAX_DESCRIPTION_LENGTH } from "./constants";

export const buildAnimeCardTemplate = (anime: IAnime) => {
  let description = anime.description
    .replaceAll('<br>', '\n')
    .replace(/\n\n[\s\S]*$/, '');

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    description = description.slice(0, MAX_DESCRIPTION_LENGTH);
    description = description.slice(0, description.lastIndexOf(' '));
    description += ` <a href="${anime.siteUrl}">...</a>`;
  }

  return `
Name: <a href="${anime.siteUrl}">${anime.titles.english ?? ''}</a>
Original: <a href="${anime.siteUrl}">${anime.titles.native ?? ''}</a>
Romaji: <a href="${anime.siteUrl}">${anime.titles.romaji ?? ''}</a>
Year: ${anime.seasonYear}

Genres: <i>${anime.genres.join(', ')}</i>
Tags: <i>${anime.genres.join(', ')}</i>

${description}
`.trim();
};

export const listTextTemplate = 'Here is your anime list';

export const startTextTemplate = `
Hi, I am Anime Tinder Bot. 
You can start right now or send /filters to apply some filters.
`;
