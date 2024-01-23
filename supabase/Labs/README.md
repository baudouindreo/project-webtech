ECE WebTech 503 - Serveur

Ce serveur est une application Next.js qui propose plusieurs pages et fonctionnalités basiques pour illustrer des concepts de développement web. Voici une liste détaillée des pages, composants et fonctionnalités disponibles :


Pages Disponibles

/article

Une page affichant une liste d'articles avec des liens vers des pages d'articles individuels. Ces données sont simulées dans la fonction getStaticProps en utilisant une liste d'articles statique.

/about

Une page décrivant brièvement l'application. Elle présente des informations générales sur l'application et peut être étendue pour inclure plus de détails sur son fonctionnement ou son objectif.

/login-native

Une page simulant un formulaire de connexion. Elle utilise des références (useRef) pour récupérer les données saisies dans les champs de formulaire et les affiche à l'écran.

/contacts

Une page affichant une liste de contacts fictifs. Ces données sont simulées à l'aide d'une liste statique.

/use-state

Une page utilisant le hook useState pour un compteur simple. Elle présente le fonctionnement basique du hook useState pour gérer l'état local dans une fonction de composant.

/articles/[id]

Une page affichant un article spécifique selon l'ID fourni dans l'URL. Elle simule la récupération des données de l'article en fonction de l'ID et affiche les détails de l'article ou un message si l'article est introuvable.

/api/profile

Une API fictive pour simuler la récupération de données de profil utilisateur. Cette API est utilisée dans les composants LoggedIn et LoggedOut pour simuler le processus de connexion utilisateur.


Composants

DefLayout.js

Un composant de mise en page standard utilisé pour envelopper le contenu des pages. Il contient des éléments tels que l'en-tête, le pied de page et le contenu principal de chaque page.

Header.js

Un composant d'en-tête qui change dynamiquement entre LoggedIn et LoggedOut selon l'état de connexion de l'utilisateur. Il utilise le contexte utilisateur pour gérer le changement d'état de connexion.

LoggedIn.js

Un composant affichant des informations utilisateur une fois connecté. Il utilise le contexte utilisateur pour obtenir les informations de l'utilisateur connecté et affiche ces informations à l'écran.

LoggedOut.js

Un composant gérant le processus de connexion utilisateur. Il utilise le contexte utilisateur pour déclencher la connexion de l'utilisateur via une API simulée.

UserContext.js

Un contexte utilisateur pour gérer l'état de connexion et de déconnexion. Il fournit un contexte global contenant les informations de l'utilisateur et les fonctions de connexion et de déconnexion.


Styles

global.css

Le fichier de styles globaux utilisant Tailwind CSS pour la mise en forme. Il contient des styles de base utilisés dans toute l'application.


Scripts

package.json

Le fichier de configuration de npm contenant les dépendances et les scripts pour le développement, la construction et le lancement de l'application.


Images

/public/images/image.png


Supabase

maintenant nous avons accès a une base de donnéés en utilisant supabase. la prochaine étape et de construire les pages js tout en utilisant la relation avec la bdd


Admin

contac.js

elle sert a affcher une liste de d'id pour ensuite renvoyer dans l'url l'id

contacts/[id].js 

elle récupère en paramètre l'id de de l'utilisateur et ensuite s'en sert pour afficher ses données.


Supabase

la table contacte est accésible a l'insertion mais pas a la lecture avec les différente polici qui ont été mises en place 