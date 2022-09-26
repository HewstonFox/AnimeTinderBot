import { client } from '../../api';
import { IAnime } from './types';
import { normalizeAnime } from './utils';
import { getAnimeByIdMinQuery, getRandomAnimeQuery } from './queries';
import { searchConfig } from '../../configuration';
import { prepareFilters, randomInt } from '../../helpers/utils';
import { IFilters } from '../user/types';

export const getRandomAnimeRequest = async (
  filters: IFilters,
  animeId: number = null
): Promise<IAnime> =>
  normalizeAnime(
    (
      await client.request(getRandomAnimeQuery, {
        page: animeId != null ? 1 : randomInt(1, searchConfig.maxNumber),
        ...prepareFilters({ ...filters, id: animeId }),
      })
    ).Page.media[0]
  );

export const getAnimeByIdMinRequest = async (id: number) => {
  const {
    Media: { id: _id, title },
  } = await client.request(getAnimeByIdMinQuery, { id });
  return {
    _id,
    name: title.english || title.romaji || title.native,
  };
};
