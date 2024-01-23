// pages/articles/[id].js
import DefLayout from '/components/DefLayout';
import { useRouter } from 'next/router';

function ArticlePage() {
  const router = useRouter();
  const { id } = router.query; // Récupère l'identifiant de l'article depuis l'URL

  // Simulation de données d'articles
  const articles = [
    { id: '1', title: 'Premier Article', content: 'Contenu du premier article.' },
    { id: '2', title: 'Deuxième Article', content: 'Contenu du deuxième article.' },
  ];

  // Recherchez l'article correspondant à l'identifiant dans les données simulées
  const article = articles.find((item) => item.id === id);

  // Affichez l'article s'il existe, sinon affichez un message d'erreur
  return (
    <DefLayout>
        <div className="h-full bg-orange-200">
        {article ? (
            <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            </div>
        ) : (
            <p>Article introuvable</p>
        )}
        </div>
    </DefLayout>
    
  );
}

export default ArticlePage;
