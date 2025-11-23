-- =================================================================
-- 1. CRÉATION DE LA BASE DE DONNÉES
-- =================================================================
CREATE DATABASE IF NOT EXISTS f1_experience;
USE f1_experience;

-- =================================================================
-- 2. TABLE UTILISATEURS (Avec préférences et score)
-- =================================================================
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    points INT DEFAULT 0, -- Score du championnat
    ecurie_favorite VARCHAR(50),
    pilote_favori VARCHAR(50),
    circuit_favori VARCHAR(50),
    est_public BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =================================================================
-- 3. TABLE PILOTES (Avec Bio, Stats et Historique formaté)
-- =================================================================
CREATE TABLE IF NOT EXISTS pilotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    numero INT,
    ecurie VARCHAR(50),
    pays VARCHAR(3),
    photo_url VARCHAR(255),
    bio TEXT,
    historique_ecuries VARCHAR(255), -- Format: "Ecurie|Année, Ecurie2|Année"
    titres_mondiaux INT DEFAULT 0,
    podiums INT DEFAULT 0,
    saisons VARCHAR(50) DEFAULT '2024'
);

-- Insertion des données Pilotes
INSERT INTO pilotes (nom, prenom, numero, ecurie, pays, photo_url, bio, historique_ecuries, titres_mondiaux, podiums, saisons) VALUES 
('Verstappen', 'Max', 1, 'Red Bull Racing', 'NED', 'verstappen.png', 'Fils de Jos Verstappen, Max est connu pour son style agressif et sa domination totale sous l''ère à effet de sol. Il brise record sur record.', 'Toro Rosso|2015-2016, Red Bull Racing|2016-Actuel', 3, 98, '2015-Actuel'),
('Hamilton', 'Lewis', 44, 'Mercedes', 'GBR', 'hamilton.png', 'Le détenteur de tous les records (Victoires, Poles). Lewis a marqué l''histoire par sa longévité et ses combats épiques contre Massa, Rosberg et Verstappen.', 'McLaren|2007-2012, Mercedes|2013-2024, Ferrari|2025', 7, 197, '2007-Actuel'),
('Leclerc', 'Charles', 16, 'Ferrari', 'MON', 'leclerc.png', 'Le prédestiné. Charles cherche toujours à ramener le titre à Maranello. Connu pour sa vitesse pure en qualification.', 'Sauber|2018, Ferrari|2019-Actuel', 0, 30, '2018-Actuel'),
('Norris', 'Lando', 4, 'McLaren', 'GBR', 'norris.png', 'Jeune prodige britannique, fidèle à McLaren, il incarne le renouveau de l''écurie de Woking.', 'McLaren|2019-Actuel', 0, 13, '2019-Actuel');

-- =================================================================
-- 4. TABLE HISTORIQUE (Avec Catégories pour les filtres)
-- =================================================================
CREATE TABLE IF NOT EXISTS historique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    annee INT NOT NULL,
    titre VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_event VARCHAR(255),
    categorie VARCHAR(50) DEFAULT 'General' -- Championnat, Légende, Course, Tech
);

-- Insertion des données Historiques
INSERT INTO historique (annee, titre, description, categorie) VALUES 
(1950, 'La Naissance', 'Le tout premier championnat du monde de Formule 1 débute à Silverstone. Giuseppe Farina devient le premier champion sur Alfa Romeo.', 'Course'),
(1976, 'Lauda vs Hunt', 'Le duel psychologique et physique intense entre Niki Lauda et James Hunt, immortalisé par le film Rush.', 'Légende'),
(1988, 'La Rivalité Légendaire', 'Ayrton Senna et Alain Prost dominent la saison chez McLaren-Honda, remportant 15 des 16 courses.', 'Légende'),
(2004, 'L''Ère Schumacher', 'Michael Schumacher et Ferrari écrasent la concurrence. Schumi remporte 13 courses sur 18 et s''adjuge son 7ème titre.', 'Championnat'),
(2009, 'Le Miracle Brawn GP', 'Ross Brawn rachète Honda pour 1£ et remporte le titre constructeur et pilote dès sa première et unique année.', 'Championnat'),
(2014, 'L''Ère Hybride', 'Introduction des moteurs V6 Turbo Hybrides. Mercedes commence sa domination sans partage sur la F1.', 'Tech'),
(2021, 'Le Dernier Tour', 'Une fin de saison controversée et palpitante à Abu Dhabi voit Max Verstappen doubler Lewis Hamilton dans le dernier tour.', 'Course');

-- =================================================================
-- 5. TABLE CIRCUITS (Calendrier)
-- =================================================================
CREATE TABLE IF NOT EXISTS circuits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    lieu VARCHAR(100) NOT NULL,
    pays VARCHAR(50) NOT NULL,
    longueur_km FLOAT NOT NULL,
    tours INT NOT NULL,
    image_url VARCHAR(255) DEFAULT 'circuit_default.jpg'
);

-- Insertion des données Circuits
INSERT INTO circuits (nom, lieu, pays, longueur_km, tours, image_url) VALUES 
('Circuit de Monaco', 'Monte-Carlo', 'Monaco', 3.337, 78, 'monaco.png'),
('Silverstone Circuit', 'Silverstone', 'Royaume-Uni', 5.891, 52, 'silverstone.png'),
('Circuit de Spa-Francorchamps', 'Stavelot', 'Belgique', 7.004, 44, 'spa.png'),
('Autodromo Nazionale Monza', 'Monza', 'Italie', 5.793, 53, 'monza.png'),
('Suzuka International Racing Course', 'Suzuka', 'Japon', 5.807, 53, 'suzuka.png'),
('Circuit Gilles-Villeneuve', 'Montréal', 'Canada', 4.361, 70, 'canada.png');

-- =================================================================
-- 6. TABLE QUESTIONS (Quiz Interactif)
-- =================================================================
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    choix_1 VARCHAR(255) NOT NULL,
    choix_2 VARCHAR(255) NOT NULL,
    choix_3 VARCHAR(255) NOT NULL,
    choix_4 VARCHAR(255) NOT NULL,
    bonne_reponse INT NOT NULL, -- 1, 2, 3 ou 4
    difficulte VARCHAR(20) DEFAULT 'facile'
);

-- Insertion d'un échantillon de questions
INSERT INTO questions (question, choix_1, choix_2, choix_3, choix_4, bonne_reponse, difficulte) VALUES 
('Quelle écurie a remporté le plus de championnats constructeurs ?', 'McLaren', 'Williams', 'Ferrari', 'Mercedes', 3, 'moyen'),
('Que signifie le drapeau jaune en course ?', 'Disqualification', 'Danger, ralentir', 'Piste glissante', 'Fin de course', 2, 'facile'),
('Quel pilote détient le record du tour le plus rapide de l''histoire ?', 'Lewis Hamilton', 'Juan Pablo Montoya', 'Michael Schumacher', 'Rubens Barrichello', 1, 'difficile'),
('Sur quel circuit se trouve le célèbre virage de "L''Eau Rouge" ?', 'Monaco', 'Silverstone