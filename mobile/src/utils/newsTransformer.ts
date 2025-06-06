import type { NewsArticle } from '../api/services';
import type { News } from '../types';

export const transformNewsArticle = (article: NewsArticle): News => ({
  id: article.id,
  title: article.title,
  description: article.description,
  content: article.content,
  url: article.url,
  urlToImage: article.urlToImage,
  publishedAt: article.publishedAt,
  source: {
    id: article.source?.id,
    name: article.source?.name || 'Unknown'
  },
  author: article.author
});

export const transformNewsArticles = (articles: NewsArticle[]): News[] => 
  articles.map(transformNewsArticle); 