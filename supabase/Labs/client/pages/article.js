import React from 'react';
import DefLayout from '/components/DefLayout';
import Link from 'next/link';

function Articles({ articles }) {
  return (
    <DefLayout>
      <div className="h-full bg-orange-200 justify-center items-center">
        <div className="text-center ">
          <h1 className="font-bold text-9xl">Articles</h1>
        </div>
        <div className="flex flex-col items-center justify-center ">
          {articles.map((article, index) => (
            <div key={index}>
              <Link href={`/articles/${article.id}`}>{article.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </DefLayout>
  );
}

export async function getStaticProps() {
  const articles = [
    { id: 1, title: "1ER Article" },
    { id: 2, title: "2EME Article" }
  ];

  return {
    props: {
      articles,
    },
  };
}

export default Articles;
