-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 24 nov. 2025 à 07:21
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `f1_experience`
--

-- --------------------------------------------------------

--
-- Structure de la table `circuits`
--

CREATE TABLE `circuits` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `lieu` varchar(100) NOT NULL,
  `pays` varchar(50) NOT NULL,
  `longueur_km` float NOT NULL,
  `tours` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT 'circuit_default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `circuits`
--

INSERT INTO `circuits` (`id`, `nom`, `lieu`, `pays`, `longueur_km`, `tours`, `image_url`) VALUES
(1, 'Circuit de Monaco', 'Monte-Carlo', 'Monaco', 3.337, 78, 'monaco.png'),
(2, 'Silverstone Circuit', 'Silverstone', 'Royaume-Uni', 5.891, 52, 'silverstone.png'),
(3, 'Circuit de Spa-Francorchamps', 'Stavelot', 'Belgique', 7.004, 44, 'spa.png'),
(4, 'Autodromo Nazionale Monza', 'Monza', 'Italie', 5.793, 53, 'monza.png'),
(5, 'Suzuka International Racing Course', 'Suzuka', 'Japon', 5.807, 53, 'suzuka.png'),
(6, 'Circuit Gilles-Villeneuve', 'Montréal', 'Canada', 4.361, 70, 'canada.png'),
(7, 'Circuit de Monaco', 'Monte-Carlo', 'Monaco', 3.337, 78, 'monaco.png'),
(8, 'Silverstone Circuit', 'Silverstone', 'Royaume-Uni', 5.891, 52, 'silverstone.png'),
(9, 'Circuit de Spa-Francorchamps', 'Stavelot', 'Belgique', 7.004, 44, 'spa.png'),
(10, 'Autodromo Nazionale Monza', 'Monza', 'Italie', 5.793, 53, 'monza.png'),
(11, 'Suzuka International Racing Course', 'Suzuka', 'Japon', 5.807, 53, 'suzuka.png'),
(12, 'Circuit Gilles-Villeneuve', 'Montréal', 'Canada', 4.361, 70, 'canada.png');

-- --------------------------------------------------------

--
-- Structure de la table `ecuries`
--

CREATE TABLE `ecuries` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `pays` varchar(50) DEFAULT NULL,
  `base` varchar(100) DEFAULT NULL,
  `directeur` varchar(100) DEFAULT NULL,
  `annee_debut` int(11) DEFAULT NULL,
  `championnats_gagnes` int(11) DEFAULT 0,
  `logo_url` varchar(255) DEFAULT 'team_default.png',
  `bio` text DEFAULT NULL,
  `top_pilotes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ecuries`
--

INSERT INTO `ecuries` (`id`, `nom`, `pays`, `base`, `directeur`, `annee_debut`, `championnats_gagnes`, `logo_url`, `bio`, `top_pilotes`) VALUES
(1, 'Scuderia Ferrari', 'Italie', 'Maranello', 'Fred Vasseur', 1950, 16, 'ferrari_logo.png', 'La seule écurie présente depuis le début. Le mythe rouge.', 'Schumacher, Lauda, Ascari'),
(2, 'McLaren F1 Team', 'Royaume-Uni', 'Woking', 'Andrea Stella', 1966, 8, 'mclaren_logo.png', 'Fondée par Bruce McLaren, l\'équipe est synonyme d\'innovation.', 'Senna, Prost, Hakkinen, Hamilton'),
(3, 'Williams Racing', 'Royaume-Uni', 'Grove', 'James Vowles', 1977, 9, 'williams_logo.png', 'L\'écurie privée par excellence, géant des années 90.', 'Mansell, Prost, Villeneuve'),
(4, 'Mercedes-AMG Petronas', 'Allemagne', 'Brackley (UK)', 'Toto Wolff', 2010, 8, 'mercedes_logo.png', 'L\'équipe de la domination hybride.', 'Hamilton, Rosberg, Fangio'),
(5, 'Red Bull Racing', 'Autriche', 'Milton Keynes (UK)', 'Christian Horner', 2005, 6, 'redbull_logo.png', 'L\'équipe qui a bousculé les codes avec l\'aéro de Newey.', 'Vettel, Verstappen'),
(6, 'Lotus (Historic)', 'Royaume-Uni', 'Hethel', 'Colin Chapman', 1958, 7, 'lotus_logo.png', 'Légende du passé, inventeurs de l\'effet de sol.', 'Clark, Senna, Fittipaldi');

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id` int(11) NOT NULL,
  `annee` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_event` varchar(255) DEFAULT NULL,
  `categorie` varchar(50) DEFAULT 'General'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`id`, `annee`, `titre`, `description`, `image_event`, `categorie`) VALUES
(1, 1950, 'La Naissance', 'Le tout premier championnat du monde de Formule 1 débute à Silverstone. Giuseppe Farina devient le premier champion sur Alfa Romeo.', NULL, 'Course'),
(2, 1988, 'La Rivalité Légendaire', 'Ayrton Senna et Alain Prost dominent la saison chez McLaren-Honda, remportant 15 des 16 courses. Le début d\'une guerre psychologique.', NULL, 'General'),
(3, 2004, 'L\'Ère Schumacher', 'Michael Schumacher et Ferrari écrasent la concurrence. Schumi remporte 13 courses sur 18 et s\'adjuge son 7ème et dernier titre.', NULL, 'Légende'),
(4, 2021, 'Le Dernier Tour', 'Une fin de saison controversée et palpitante à Abu Dhabi voit Max Verstappen doubler Lewis Hamilton dans le dernier tour pour son premier titre.', NULL, 'Course'),
(5, 1976, 'Lauda vs Hunt', 'Le duel psychologique et physique intense entre Niki Lauda et James Hunt, immortalisé par le film Rush.', NULL, 'Légende'),
(6, 2009, 'Le Miracle Brawn GP', 'Ross Brawn rachète Honda pour 1£ et remporte le titre constructeur et pilote dès sa première et unique année.', NULL, 'Championnat'),
(7, 2014, 'L\'Ère Hybride', 'Introduction des moteurs V6 Turbo Hybrides. Mercedes commence sa domination sans partage.', NULL, 'Tech'),
(8, 2020, 'Records Égalés', 'Lewis Hamilton égale les 7 titres de Schumacher lors du GP de Turquie sous la pluie.', NULL, 'Championnat'),
(9, 1950, 'La Naissance', 'Le tout premier championnat du monde de Formule 1 débute à Silverstone. Giuseppe Farina devient le premier champion sur Alfa Romeo.', NULL, 'Course'),
(10, 1976, 'Lauda vs Hunt', 'Le duel psychologique et physique intense entre Niki Lauda et James Hunt, immortalisé par le film Rush.', NULL, 'Légende'),
(11, 1988, 'La Rivalité Légendaire', 'Ayrton Senna et Alain Prost dominent la saison chez McLaren-Honda, remportant 15 des 16 courses.', NULL, 'Légende'),
(12, 2004, 'L\'Ère Schumacher', 'Michael Schumacher et Ferrari écrasent la concurrence. Schumi remporte 13 courses sur 18 et s\'adjuge son 7ème titre.', NULL, 'Championnat'),
(13, 2009, 'Le Miracle Brawn GP', 'Ross Brawn rachète Honda pour 1£ et remporte le titre constructeur et pilote dès sa première et unique année.', NULL, 'Championnat'),
(14, 2014, 'L\'Ère Hybride', 'Introduction des moteurs V6 Turbo Hybrides. Mercedes commence sa domination sans partage sur la F1.', NULL, 'Tech'),
(15, 2021, 'Le Dernier Tour', 'Une fin de saison controversée et palpitante à Abu Dhabi voit Max Verstappen doubler Lewis Hamilton dans le dernier tour.', NULL, 'Course');

-- --------------------------------------------------------

--
-- Structure de la table `pilotes`
--

CREATE TABLE `pilotes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `ecurie` varchar(50) DEFAULT NULL,
  `pays` varchar(3) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `historique_ecuries` varchar(255) DEFAULT NULL,
  `titres_mondiaux` int(11) DEFAULT 0,
  `podiums` int(11) DEFAULT 0,
  `saisons` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pilotes`
--

INSERT INTO `pilotes` (`id`, `nom`, `prenom`, `numero`, `ecurie`, `pays`, `photo_url`, `bio`, `historique_ecuries`, `titres_mondiaux`, `podiums`, `saisons`) VALUES
(1, 'Verstappen', 'Max', 1, 'Red Bull Racing', 'NED', 'verstappen.png', 'Fils de Jos Verstappen, Max est connu pour son style agressif et sa domination totale sous l\'ère à effet de sol.', 'Toro Rosso|2015-2016, Red Bull Racing|2016-Actuel', 3, 0, NULL),
(2, 'Hamilton', 'Lewis', 44, 'Mercedes', 'GBR', 'hamilton.png', 'Le détenteur de tous les records. Lewis a marqué l\'histoire par sa longévité et ses combats épiques.', 'McLaren|2007-2012, Mercedes|2013-2024, Ferrari|2025', 7, 0, NULL),
(3, 'Leclerc', 'Charles', 16, 'Ferrari', 'MON', 'leclerc.png', 'Le prédestiné. Charles cherche toujours à ramener le titre à Maranello.', 'Sauber|2018, Ferrari|2019-Actuel', 0, 0, NULL),
(4, 'Norris', 'Lando', 4, 'McLaren', 'GBR', 'norris.png', NULL, 'McLaren|2019-Actuel', 0, 0, NULL),
(5, 'Verstappen', 'Max', 1, 'Red Bull Racing', 'NED', 'verstappen.png', 'Fils de Jos Verstappen, Max est connu pour son style agressif et sa domination totale sous l\'ère à effet de sol. Il brise record sur record.', 'Toro Rosso|2015-2016, Red Bull Racing|2016-Actuel', 3, 98, '2015-Actuel'),
(6, 'Hamilton', 'Lewis', 44, 'Mercedes', 'GBR', 'hamilton.png', 'Le détenteur de tous les records (Victoires, Poles). Lewis a marqué l\'histoire par sa longévité et ses combats épiques contre Massa, Rosberg et Verstappen.', 'McLaren|2007-2012, Mercedes|2013-2024, Ferrari|2025', 7, 197, '2007-Actuel'),
(7, 'Leclerc', 'Charles', 16, 'Ferrari', 'MON', 'leclerc.png', 'Le prédestiné. Charles cherche toujours à ramener le titre à Maranello. Connu pour sa vitesse pure en qualification.', 'Sauber|2018, Ferrari|2019-Actuel', 0, 30, '2018-Actuel'),
(8, 'Norris', 'Lando', 4, 'McLaren', 'GBR', 'norris.png', 'Jeune prodige britannique, fidèle à McLaren, il incarne le renouveau de l\'écurie de Woking.', 'McLaren|2019-Actuel', 0, 13, '2019-Actuel');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `choix_1` varchar(255) NOT NULL,
  `choix_2` varchar(255) NOT NULL,
  `choix_3` varchar(255) NOT NULL,
  `choix_4` varchar(255) NOT NULL,
  `bonne_reponse` int(11) NOT NULL,
  `difficulte` varchar(20) DEFAULT 'facile'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `question`, `choix_1`, `choix_2`, `choix_3`, `choix_4`, `bonne_reponse`, `difficulte`) VALUES
(1, 'Quelle écurie a remporté le plus de championnats constructeurs ?', 'McLaren', 'Williams', 'Ferrari', 'Mercedes', 3, 'moyen'),
(2, 'Quel pilote détient le record du tour le plus rapide de l\'histoire ?', 'Lewis Hamilton', 'Juan Pablo Montoya', 'Michael Schumacher', 'Rubens Barrichello', 1, 'difficile'),
(3, 'Que signifie le drapeau jaune en course ?', 'Disqualification', 'Danger, ralentir', 'Piste glissante', 'Fin de course', 2, 'facile'),
(4, 'En quelle année a eu lieu le premier Grand Prix de F1 moderne ?', '1948', '1950', '1955', '1960', 2, 'moyen'),
(5, 'Quel circuit est surnommé \"Le Temple de la Vitesse\" ?', 'Monaco', 'Silverstone', 'Spa-Francorchamps', 'Monza', 4, 'facile'),
(6, 'Quelle est la signification d\'un drapeau rouge en qualification ?', 'Fin de la séance', 'Danger, ralentir', 'Interruption de séance', 'Piste glissante', 3, 'facile'),
(7, 'Combien de zones DRS y a-t-il généralement sur un circuit ?', 'Une seule', 'Entre 1 et 3', 'Toujours 4', 'Aucune', 2, 'moyen'),
(8, 'Quelle pièce de la F1 permet de réduire la trainée en ligne droite ?', 'Le Diffuseur', 'Le DRS', 'Le MGU-K', 'Les Flasques', 2, 'facile'),
(9, 'Quel est le poids minimum d\'une F1 (pilote compris) en 2024 ?', '700 kg', '752 kg', '798 kg', '850 kg', 3, 'difficile'),
(10, 'Que signifie l\'acronyme SC ?', 'Safety Car', 'Super Car', 'Soft Compound', 'Start Control', 1, 'facile'),
(11, 'Qui est le seul pilote à avoir remporté le championnat à titre posthume ?', 'Ayrton Senna', 'Jochen Rindt', 'Gilles Villeneuve', 'Jim Clark', 2, 'difficile'),
(12, 'Combien de titres mondiaux Michael Schumacher a-t-il remportés ?', '5', '6', '7', '8', 3, 'facile'),
(13, 'Quelle écurie est la plus ancienne encore en activité ?', 'McLaren', 'Williams', 'Ferrari', 'Mercedes', 3, 'facile'),
(14, 'En quelle année Lewis Hamilton a-t-il remporté son premier titre ?', '2007', '2008', '2014', '2010', 2, 'moyen'),
(15, 'Quel pilote français est surnommé \"Le Professeur\" ?', 'Jean Alesi', 'Alain Prost', 'Pierre Gasly', 'Romain Grosjean', 2, 'moyen'),
(16, 'Sur quel circuit se trouve le célèbre virage de \"L\'Eau Rouge\" ?', 'Monaco', 'Silverstone', 'Spa-Francorchamps', 'Suzuka', 3, 'facile'),
(17, 'Quel circuit urbain se court de nuit à Singapour ?', 'Marina Bay', 'Yas Marina', 'Jeddah Corniche', 'Baku City', 1, 'moyen'),
(18, 'Dans quel pays se trouve le circuit de Interlagos ?', 'Espagne', 'Mexique', 'Brésil', 'Portugal', 3, 'moyen'),
(19, 'Quel est le circuit le plus court du calendrier actuel ?', 'Monaco', 'Zandvoort', 'Red Bull Ring', 'Mexico', 1, 'facile'),
(20, 'Quel circuit possède la plus longue ligne droite du championnat ?', 'Monza', 'Bakou', 'Las Vegas', 'Spa', 2, 'difficile'),
(21, 'Qui détient le record du plus grand nombre de victoires en F1 (à ce jour) ?', 'Michael Schumacher', 'Max Verstappen', 'Lewis Hamilton', 'Sebastian Vettel', 3, 'facile'),
(22, 'Quel pilote a remporté 10 Grands Prix consécutifs en 2023 ?', 'Lewis Hamilton', 'Max Verstappen', 'Sebastian Vettel', 'Nico Rosberg', 2, 'moyen'),
(23, 'Quelle est la vitesse maximale approximative atteinte par une F1 moderne ?', '320 km/h', '350 km/h', '370 km/h', '400 km/h', 3, 'moyen'),
(24, 'Qui est le plus jeune champion du monde de l\'histoire ?', 'Max Verstappen', 'Lewis Hamilton', 'Fernando Alonso', 'Sebastian Vettel', 4, 'difficile'),
(25, 'Combien de points marque le vainqueur d\'une course (sans meilleur tour) ?', '20', '25', '10', '15', 2, 'facile'),
(26, 'Quelle est la couleur traditionnelle des voitures de course britanniques ?', 'Rouge', 'Bleu', 'Vert', 'Argent', 3, 'moyen'),
(27, 'Pour quelle écurie Ayrton Senna a-t-il remporté ses 3 titres ?', 'Lotus', 'Williams', 'McLaren', 'Toleman', 3, 'moyen'),
(28, 'Quel constructeur motorise l\'écurie Red Bull Racing (avant 2026) ?', 'Renault', 'Honda (RBPT)', 'Ferrari', 'Mercedes', 2, 'moyen'),
(29, 'Quelle équipe est basée à Silverstone ?', 'Ferrari', 'Aston Martin', 'Alpine', 'Sauber', 2, 'difficile'),
(30, 'Comment s\'appelait l\'écurie Alpine avant 2021 ?', 'Lotus', 'Renault', 'Benetton', 'Force India', 2, 'moyen');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `created_at` datetime DEFAULT current_timestamp(),
  `ecurie_favorite` varchar(50) DEFAULT NULL,
  `pilote_favori` varchar(50) DEFAULT NULL,
  `circuit_favori` varchar(50) DEFAULT NULL,
  `est_public` tinyint(1) DEFAULT 1,
  `points` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `pseudo`, `email`, `password`, `role`, `created_at`, `ecurie_favorite`, `pilote_favori`, `circuit_favori`, `est_public`, `points`) VALUES
(1, 'SuperMax', 'max@redbull.com', '$2b$10$CZMnqhvd/wwleLF2Hy/A2.5JVzT030izP8oyfLzsNwiznMnLzW/he', 'user', '2025-11-23 15:29:53', NULL, NULL, NULL, 1, 15);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `circuits`
--
ALTER TABLE `circuits`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ecuries`
--
ALTER TABLE `ecuries`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pilotes`
--
ALTER TABLE `pilotes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `circuits`
--
ALTER TABLE `circuits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `ecuries`
--
ALTER TABLE `ecuries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `pilotes`
--
ALTER TABLE `pilotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
