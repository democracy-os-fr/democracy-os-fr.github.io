## Usage

Après avoir fait un clone du projet, le site devrait être fonctionnel et accessible via la page ``index.html``.

Néamoins, pour *compiler* les éléments du site, vous aurez besoin de saisir la commande

```
$ make
```

ou dans le detail

### 1 - Installer les dépendences nécessaires

```
$ npm install
$ bower install
```

### 2 - Compiler les éléments du site

```
$ gulp
```

### 3 - Bonus

```
$ gulp watch
```

surveillera les fichiers less et js **ET** mettra à jour votre navigateur à l'adresse ``http://locahost:3000``

### 4 - Nettoyage

```
$ make clean
```
