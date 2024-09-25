export async function GET({ url }) {
    const page = parseInt(url.searchParams.get('page')) || 1;
    const title = url.searchParams.get('title') || '';
    const author = url.searchParams.get('author') || '';
    const startDate = url.searchParams.get('startDate') || '';
    const endDate = url.searchParams.get('endDate') || '';
  
    const articlesPerPage = 10;
    let articles = await fetchArticlesFromDatabase({ title, author, startDate, endDate });
  
    // Pagination
    const paginatedArticles = articles.slice((page - 1) * articlesPerPage, page * articlesPerPage);
  
    return new Response(JSON.stringify({ articles: paginatedArticles }));
  }
  
  async function fetchArticlesFromDatabase({ title, author, startDate, endDate }) {
    // Simuler une requête en base de données avec des filtres
    let articles = [
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-08', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-02', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2028-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-09', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2030-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-05-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-01-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-04-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      { title: 'Article 1', author: 'Author 1', publishedDate: '2024-09-01', content: 'Contenu de l\'article 1' },
      // Ajouter plus d'articles ici
    ];
  
    // Filtrer les articles
    if (title) {
      articles = articles.filter(article => article.title.includes(title));
    }
    if (author) {
      articles = articles.filter(article => article.author.includes(author));
    }
    if (startDate) {
      articles = articles.filter(article => article.publishedDate >= startDate);
    }
    if (endDate) {
      articles = articles.filter(article => article.publishedDate <= endDate);
    }
  
    return articles;
  }
  