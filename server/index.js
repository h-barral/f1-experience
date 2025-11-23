const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const db = require("./db"); // On importe notre connexion
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("🏁 F1 API is running smoothly via XAMPP!");
});

// --- NOS ROUTES F1 ---

// 1. Récupérer tous les pilotes
app.get("/api/pilotes", (req, res) => {
  const sql = "SELECT * FROM pilotes";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// 2. Récupérer UN SEUL pilote par son ID
app.get("/api/pilotes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM pilotes WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "Pilote non trouvé" });
    return res.json(data[0]); // On renvoie le premier (et seul) résultat
  });
});

// 3. Récupérer l'historique
app.get("/api/history", (req, res) => {
  // On trie par année croissante (ASC) pour avoir la chronologie
  const sql = "SELECT * FROM historique ORDER BY annee ASC";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ===========================================================================
// ROUTE : INSCRIPTION (REGISTER)
// ===========================================================================
app.post("/api/auth/register", async (req, res) => {
  // 1. On récupère les infos envoyées par le formulaire
  const { pseudo, email, password } = req.body;

  // 2. On vérifie que tout est là
  if (!pseudo || !email || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires !" });
  }

  // 3. On vérifie si l'email existe déjà
  const checkSql = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(checkSql, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0)
      return res.status(409).json({ message: "Cet email est déjà utilisé !" });

    // 4. On crypte le mot de passe (Le "Salage")
    // Le '10' est la complexité du cryptage (standard actuel)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. On crée l'utilisateur
    const insertSql =
      "INSERT INTO utilisateurs (pseudo, email, password) VALUES (?, ?, ?)";
    db.query(insertSql, [pseudo, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json(err);

      res
        .status(201)
        .json({ message: "Inscription réussie ! Bienvenue dans le Paddock." });
    });
  });
});

// ===========================================================================
// ROUTE : CONNEXION (LOGIN)
// ===========================================================================
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // 1. On cherche l'utilisateur par son email
  const sql = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json(err);

    // Si aucun utilisateur trouvé
    if (data.length === 0)
      return res.status(404).json({ message: "Utilisateur introuvable !" });

    // 2. L'utilisateur existe, on vérifie le mot de passe
    const user = data[0]; // On prend le premier résultat

    // On compare le mot de passe en clair (password) avec le hash (user.password)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Mot de passe incorrect ou email invalide !" });
    }

    // 3. Tout est bon ! On renvoie les infos (sans le mot de passe évidemment)
    const { password: hashedPassword, ...otherInfos } = user;

    res.status(200).json({
      message: "Connexion réussie !",
      user: otherInfos,
    });
  });
});

app.listen(PORT, () => {
  console.log(`🏎️  Serveur démarré sur http://localhost:${PORT}`);
});
