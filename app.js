const express = require('express');
const app = express();

app.use(express.json());

// 📌 Stockage temporaire
let articles = [];
let id = 1;

// 🟢 ROUTE TEST
app.get('/', (req, res) => {
  res.send("API Blog fonctionne !");
});


// 🔍 🔥 RECHERCHE (IMPORTANT : AVANT :id)
app.get('/api/articles/search', (req, res) => {
  const query = req.query.query || "";

  const result = articles.filter(a =>
    a.titre?.toLowerCase().includes(query.toLowerCase()) ||
    a.contenu?.toLowerCase().includes(query.toLowerCase())
  );

  res.json(result);
});


// 📥 GET tous les articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});


// 📥 GET un article
app.get('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a.id == req.params.id);

  if (!article) {
    return res.status(404).send("Article non trouvé");
  }

  res.json(article);
});


// 📤 POST créer un article
app.post('/api/articles', (req, res) => {
  const { titre, contenu, auteur } = req.body;

  if (!titre || !contenu) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const article = {
    id: id++,
    titre,
    contenu,
    auteur
  };

  articles.push(article);

  res.status(201).json(article);
});


// ✏️ PUT modifier un article
app.put('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a.id == req.params.id);

  if (!article) {
    return res.status(404).send("Article non trouvé");
  }

  Object.assign(article, req.body);

  res.json(article);
});


// ❌ DELETE supprimer un article
app.delete('/api/articles/:id', (req, res) => {
  const index = articles.findIndex(a => a.id == req.params.id);

  if (index === -1) {
    return res.status(404).send("Article non trouvé");
  }

  articles.splice(index, 1);

  res.send("Article supprimé");
});


// 🚀 Lancement serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:3000`);
});