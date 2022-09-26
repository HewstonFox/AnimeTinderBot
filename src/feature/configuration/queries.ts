import { gql } from "graphql-request";

export const getInitialConfigurationQuery = gql`
    {
        Page(page: 1, perPage: 1) {
            pageInfo {
                total
            }
            media {
                id
            }
        }
        GenreCollection
        MediaTagCollection {
            name
        }
    }
`;
