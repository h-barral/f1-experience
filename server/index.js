const express = require('express');
const cors = require('cors');
const db = require('./db'); // On importe notre connexion
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('🏁 F1 API is running smoothly via XAMPP!');
});

// --- NOS ROUTES F1 ---

// 1. Récupérer tous les pilotes
app.get('/api/pilotes', (req, res) => {
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
app.get('/api/pilotes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM pilotes WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Pilote non trouvé" });
        return res.json(data[0]); // On renvoie le premier (et seul) résultat
    });
});

// 3. Récupérer l'historique
app.get('/api/history', (req, res) => {
    // On trie par année croissante (ASC) pour avoir la chronologie
    const sql = "SELECT * FROM historique ORDER BY annee ASC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});


app.listen(PORT, () => {
    console.log(`🏎️  Serveur démarré sur http://localhost:${PORT}`);
});