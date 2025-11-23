const mysql = require('mysql2');
require('dotenv').config();

// Configuration de la connexion XAMPP par défaut
// User: 'root', Pas de mot de passe, Port 3306
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sur XAMPP Mac par défaut c'est vide
    database: 'f1_experience',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la BDD :', err.message);
        return;
    }
    console.log('✅ Connecté à la base de données MySQL (XAMPP) !');
});

module.exports = db;