# Make Me Green
Repo for makemegreen webapp


## Pour déployer l'application front:

Télécharger nodejs
Télécharger yarn: https://yarnpkg.com/fr/

Installer la cli pour déployer sur Netlify :
```bash
npm install -g netlify-cli@1.2.3
```

Exécuter les commandes suivantes pour déployer l'application front :

```bash
export API_URL=https://api.makemegreen.fr
export THUMBS_URL=https://api.makemegreen.fr/storage/assets/
rm -rf node_modules/ build/
yarn install && yarn build && ./build-webapp.sh && netlify -e testing deploy
yarn build && ./build-webapp.sh && netlify -e production deploy
```



