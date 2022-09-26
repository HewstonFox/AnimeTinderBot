import { GraphQLClient } from 'graphql-request';
import { API_URL } from './helpers/constants';

export const client = new GraphQLClient(API_URL, { headers: {} });
