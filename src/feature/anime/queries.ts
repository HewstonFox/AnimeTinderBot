import { gql } from 'graphql-request';

export const getRandomAnimeQuery = gql`
  query getRandomAnime(
    $page: Int
    $id: Int
    $genreIn: [String]
    $genreNotIn: [String]
    $tagIn: [String]
    $tagNotIn: [String]
  ) {
    Page(page: $page, perPage: 1) {
      media(
        id: $id
        type: ANIME
        genre_in: $genreIn
        genre_not_in: $genreNotIn
        tag_in: $tagIn
        tag_not_in: $tagNotIn
      ) {
        id
        description
        siteUrl
        seasonYear
        title {
          romaji
          english
          native
        }
        genres
        tags {
          name
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export const getAnimeByIdMinQuery = gql`
  query getAnimeByIdMin($id: Int) {
    Media(id: $id) {
      id
      title {
        english
        native
        romaji
      }
    }
  }
`;

export const getAnimeByIdQuery = gql`
  query getAnimeById($id: Int) {
    Media(id: $id) {
      id
      description
      siteUrl
      seasonYear
      title {
        romaji
        english
        native
      }
      genres
      tags {
        name
      }
      coverImage {
        extraLarge
      }
    }
  }
`;
