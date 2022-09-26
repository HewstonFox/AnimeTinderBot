import { ACTIONS } from './constants';
import { IAnimeDB } from '../anime/types';

export const buildCardReactionMarkup = animeId => [
  [
    {
      text: '❤️',
      callback_data: `${ACTIONS.ACTION} ${animeId} ${ACTIONS.LIKE}`,
    },
    {
      text: '👎',
      callback_data: `${ACTIONS.ACTION} ${animeId} ${ACTIONS.DISLIKE}`,
    },
  ],
];

export const buildPaginationMarkup = (prevPageData, nextPageData) => [
  [
    ...(Number.isInteger(prevPageData)
      ? [{ text: '👈', callback_data: `${ACTIONS.PREV_PAGE} ${prevPageData}` }]
      : []),
    ...(Number.isInteger(nextPageData)
      ? [{ text: '👉', callback_data: `${ACTIONS.NEXT_PAGE} ${nextPageData}` }]
      : []),
  ],
];

export const buildAnimeControlsMarkup = (
  anime: IAnimeDB,
  currentOffset = 0
) => [
  [{ text: anime.name, callback_data: `${ACTIONS.PREVIEW} ${anime._id}` }],
  [
    {
      text: anime.isWatched ? 'watched' : 'not watched',
      callback_data: `${anime.isWatched ? ACTIONS.UNWATCH : ACTIONS.WATCH} ${
        anime._id
      } ${currentOffset}`,
    },
    {
      text: '🗑',
      callback_data: `${ACTIONS.DELETE} ${anime._id} ${currentOffset}`,
    },
  ],
];

export const buildAnimeListControlsMarkup = (
  animeList: IAnimeDB[],
  currentOffset = 0
) =>
  animeList.reduce(
    (acc, anime) => [...acc, ...buildAnimeControlsMarkup(anime, currentOffset)],
    []
  );

export const filtersButtonMarkup = [
  [
    {
      text: 'Filters',
      callback_data: ACTIONS.FILTERS,
    },
  ],
];

export const listButtonMarkup = [
  [
    {
      text: 'List',
      callback_data: ACTIONS.LIST,
    },
  ],
];

export const cardAdditionalButtonsMarkup = [
  ...filtersButtonMarkup,
  ...listButtonMarkup,
];

export const continueButtonMarkup = [
  [{ text: 'Continue', callback_data: ACTIONS.CONTINUE }],
];
