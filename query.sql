\c nc_news_test


SELECT articles.*, COUNT(comments.comments_id) AS comment_count FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id;