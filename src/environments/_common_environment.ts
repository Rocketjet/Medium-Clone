import { SLUG, ID } from './constants/api-params.const';
const API_HOST_URL = 'https://api.realworld.io/api';

export const environment = {
  limit: 10,
};

export const _commonEnvironment = {
  apiAuth: {
    API_HOST_URL,
    USER: 'user',
    USERS: 'users',
    LOGIN: 'users/login',
  },
  apiFeed: {
    API_HOST_URL,
    ARTICLES: 'articles',
    FEED: 'articles/feed',
  },
  apiTags: {
    API_HOST_URL,
    TAGS: 'tags',
  },
  apiArticle: {
    API_HOST_URL,
    ARTICLES: 'articles',
  },
  apiFavorites: {
    API_HOST_URL,
    FAVORITES: `articles/${SLUG}/favorite`,
  },
  apiUserProfile: {
    API_HOST_URL,
    USER_PROFILE: `profiles/${SLUG}`,
  },
  apiComment: {
    API_HOST_URL,
    GET_COMMENT: `articles/${SLUG}/comments`,
    CREATE_COMMENT: `articles/${SLUG}/comments`,
    DELETE_COMMENT: `articles/${SLUG}/comments/${ID}`,
  },
};
