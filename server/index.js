const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ROUTE TEST
app.get("/", (req, res) => {
  res.send("🏁 F1 API is running smoothly via XAMPP!");
});

// ================= PILOTES =================
app.get("/api/pilotes", (req, res) => {
  const sql = "SELECT * FROM pilotes";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get("/api/pilotes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM pilotes WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "Pilote non trouvé" });
    return res.json(data[0]);
  });
});

// ================= ÉCURIES (NOUVEAU) =================
app.get("/api/teams", (req, res) => {
  const sql = "SELECT * FROM ecuries ORDER BY nom ASC";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ================= CIRCUITS =================
app.get("/api/circuits", (req, res) => {
  const sql = "SELECT * FROM circuits";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ================= HISTORIQUE =================
app.get("/api/history", (req, res) => {
  const sql = "SELECT * FROM historique ORDER BY annee ASC";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ================= AUTHENTIFICATION =================
app.post("/api/auth/register", async (req, res) => {
  const { pseudo, email, password } = req.body;
  if (!pseudo || !email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  const checkSql = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(checkSql, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0)
      return res.status(409).json({ message: "Email déjà utilisé" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertSql =
      "INSERT INTO utilisateurs (pseudo, email, password) VALUES (?, ?, ?)";
    db.query(insertSql, [pseudo, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Inscription réussie !" });
    });
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    const user = data[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    const { password: hashedPassword, ...otherInfos } = user;
    res.status(200).json({ message: "Connexion réussie !", user: otherInfos });
  });
});

app.put("/api/user/update", (req, res) => {
  const { id, ecurie_favorite, pilote_favori, circuit_favori, est_public } =
    req.body;
  const sql =
    "UPDATE utilisateurs SET ecurie_favorite = ?, pilote_favori = ?, circuit_favori = ?, est_public = ? WHERE id = ?";
  db.query(
    sql,
    [ecurie_favorite, pilote_favori, circuit_favori, est_public, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Profil mis à jour !" });
    }
  );
});

// ================= QUIZ & SCORE =================
app.get("/api/quiz", (req, res) => {
  const sql = "SELECT * FROM questions ORDER BY RAND() LIMIT 5";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.put("/api/user/score", (req, res) => {
  const { id, points } = req.body;
  const sql = "UPDATE utilisateurs SET points = points + ? WHERE id = ?";
  db.query(sql, [points, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Points ajoutés !" });
  });
});

app.get("/api/leaderboard", (req, res) => {
  const sql =
    "SELECT pseudo, points, ecurie_favorite, pilote_favori FROM utilisateurs ORDER BY points DESC LIMIT 10";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`🏎️  Serveur démarré sur http://localhost:${PORT}`);
});
