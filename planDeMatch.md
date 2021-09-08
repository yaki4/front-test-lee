On va partir sur un app nuxt avec mongodb et se servir des server middleware proposé par le framework pour fournir les endpoints de l'api. On va héberger le tout sur vercel car ils fournissent un package pour builder le tout et on a de la doc.

Avantage: 
  - Tout dans une seul app
  - SSR donc tout est déjà là pour poussé l'app plus loin.
  - Plus simple à déployer
  - Mongodb 
    => moins de doc que mysql pas la même philosophie je connais pas encore. 
    => Semble plus laxiste (pas forcément de schéma, la bd peut se créer on fly)

Inconvénients:
  - L'app peut être lourde
  - Redéployer toute l'app si changement dans l'api, plutôt que juste redeployer l'api.
  - S'assurer que le premier load n'est pas trop loud.

Stack:
  - NUXT => Framework SSR avec base vue.
  - Vuetify => Library de composants material design (On gagne du temps)
  - Axios pour les appels à l'api
  - MongoDB: une base de données dans le cloud (Mongo marche en CRUD ça correspond parfaitement à ce qu'on a besoin)