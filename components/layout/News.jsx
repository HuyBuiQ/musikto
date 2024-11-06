'use client';

import { useState, useEffect } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);
  const keywords = [
    "EDM","music","album","guitar","drum","Hardwell","DJ",
  ];

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=EDM&apiKey=c9c890398e5f410787e4d1bdb05eaf3c`)
      .then((res) => res.json())
      .then((data) => {
        // Filter articles based on keywords in content, title, or description
        const filteredArticles = data.articles.filter(article => {
          const content = (article.content || "").toLowerCase();
          const title = (article.title || "").toLowerCase();
          const description = (article.description || "").toLowerCase();

          // Check if any keyword appears in content, title, or description
          return keywords.some(keyword => 
            content.includes(keyword) || title.includes(keyword) || description.includes(keyword)
          );
        });
        setNews(filteredArticles);
      });
  }, []);

  return (
    <div className='text-gray-700 space-y-3 rounded-xl pt-2'>
      
      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target='_blank'>
            <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200'>
              <div className='space-y-0.5'>
                <h6 className='text-sm font-bold'>{article.title}</h6>
              </div>
              <img src={article.urlToImage} width={70} className='rounded-xl' alt='News thumbnail' />
            </div>
          </a>
        </div>
      ))}
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className=' pl-4 pb-3 text-gray-500 hover:text-black text-sm'
      >
        Load more
      </button>
    </div>
  );
}
