import { client } from '../../api';
import { getInitialConfigurationQuery } from './queries';

export const getInitialConfiguration = () =>
  client.request(getInitialConfigurationQuery);
