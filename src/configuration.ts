import { getInitialConfiguration } from './feature/configuration/requests';

export const searchConfig = {
  genres: [],
  tags: [],
  maxNumber: 0,
};

export const configure = async () => {
  const initialConfig = await getInitialConfiguration();
  searchConfig.genres = initialConfig.GenreCollection;
  searchConfig.tags = initialConfig.MediaTagCollection.map(tag => tag.name);
  searchConfig.maxNumber = initialConfig.Page.pageInfo.total;
  return searchConfig;
};
