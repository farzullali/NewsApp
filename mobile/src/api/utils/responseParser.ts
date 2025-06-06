import { NewsArticle, NewsResponse } from 'api/services';
import { AxiosResponse } from 'axios';

export const parseNewsResponse = (response: AxiosResponse<NewsResponse>): NewsResponse => {
  const { data } = response;
  
  // Ensure all articles have required fields
  const validArticles = data.articles.filter((article: any): article is NewsArticle => {
    return Boolean(
      article.article_id &&
      article.title &&
      article.link
    );
  });

  return {
    ...data,
    articles: validArticles,
  };
};

export const formatArticleDate = (article: NewsArticle): NewsArticle => {
  return {
    ...article,
    publishedAt: new Date(article.publishedAt).toISOString(),
  };
};

export const enrichArticleData = (articles: NewsArticle[]): NewsArticle[] => {
  return articles.map(article => ({
    ...article,
    // Add any additional formatting or enrichment here
    description: article.description || 'No description available',
    urlToImage: article.urlToImage || null,
    author: article.author || undefined,
  }));
};
