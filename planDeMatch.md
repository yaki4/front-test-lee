On va partir sur un app nuxt avec mongodb et se servir des server middleware proposé par le framework.

Avantage: 
  - Tout dans une seul app
  - Plus simple à déployer
  - Mongodb => moins de doc que mysql pas la même philosophie je connais pas

Inconvénients:
  - L'app peut être lourde
  - S'assurer que l'init de l'app ne charge pas trop de stock
  - Vérifier le css de vuetify pour le chargement ssr.