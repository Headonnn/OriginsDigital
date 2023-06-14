CREATE TABLE `user` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	is_admin TINYINT DEFAULT 0
);

CREATE TABLE `video` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	title VARCHAR(150) NOT NULL,
	url VARCHAR(500) NOT NULL,
	description VARCHAR(500) NOT NULL,
	thumbnail VARCHAR(500) NOT NULL,
	date DATE,
	length TIME,
	is_freemium TINYINT DEFAULT 0,
	is_in_hero TINYINT DEFAULT 0
);

CREATE TABLE `favorite` (
	user_id INT NOT NULL,
	video_id INT NOT NULL,
	PRIMARY KEY (user_id, video_id),
	FOREIGN KEY (user_id) REFERENCES `user` (id),
	FOREIGN KEY (video_id) REFERENCES `video` (id)
);

CREATE TABLE `carousel_custom` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100)
);

CREATE TABLE `video_carousel` (
	video_id INT NOT NULL,
	carousel_id INT NOT NULL,
	PRIMARY KEY (video_id, carousel_id),
	FOREIGN KEY (video_id) REFERENCES `video` (id),
	FOREIGN KEY (carousel_id) REFERENCES `carousel_custom` (id)
);

CREATE TABLE `category` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100)
);

CREATE TABLE `video_category` (
	video_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (video_id, category_id),
	FOREIGN KEY (video_id) REFERENCES `video` (id),
	FOREIGN KEY (category_id) REFERENCES `category` (id)
);

CREATE TABLE `carousel_category` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	max_number INT NOT NULL,
	category_id INT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES `category` (id)
);

CREATE TABLE `advert` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	title VARCHAR(150) NOT NULL,
	description VARCHAR(500) NOT NULL,
	image VARCHAR(100) NOT NULL
);

CREATE TABLE `section` (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`order` VARCHAR(100),
	size VARCHAR(50),
	carousel_custom INT NOT NULL,
	carousel_category INT NOT NULL,
	advert INT NOT NULL,
	FOREIGN KEY (carousel_custom) REFERENCES `carousel_custom` (id),
	FOREIGN KEY (carousel_category) REFERENCES `carousel_category` (id),
	FOREIGN KEY (advert) REFERENCES `advert` (id)
);

INSERT INTO user (username, email, password, firstname, lastname) VALUES ('Camille', 'camille@camille.com', 'camille', 'Camille', 'Kamizuchi');

INSERT INTO user (username, email, password, firstname, lastname) VALUES ('Chloé', 'chloe@chloe.com', 'chloé', 'Chloé', 'Peltier');

INSERT INTO user (username, email, password, firstname, lastname) VALUES ('Thomas', 'tomtom@nana.com', 'thomas', 'Thomas', 'Thomasovich');

INSERT INTO user (username, email, password, firstname, lastname) VALUES ('Emilie', 'emilie@emilie.com', 'emilie', 'Emilie', 'Nathan');

INSERT INTO user (username, email, password, firstname, lastname) VALUES ('Jeremy', 'jeremy@jeremy.com', 'pizza', 'Jeremy', 'Herpanovski');
INSERT INTO video (title, url, description, thumbnail, date, is_freemium, is_in_hero)
VALUES ('Wingsuit skills', 'https://www.youtube.com/watch?v=-C_jPcUkVrM&ab_channel=GoPro', 'Après 3 années de préparation intensive, Uli Emanuele pilote ce qui est probablement le saut le plus technique et difficile jamais accompli.', 'https://www.skydivecoastalcarolinas.com/wp-content/uploads/wingsuit-flying-what-you-need-to-know-1.jpg', '2023-03-09', 0, 0);

INSERT INTO video (title, url, description, thumbnail, date, is_freemium, is_in_hero)
VALUES ('Tae Kwon Do demonstration', 'https://www.youtube.com/watch?v=TKEbws4QhEk&ab_channel=StuntsAmazing', 'Démonstration de la palette technique du Tae Kwon Do.', 'https://medias.paris2024.org/uploads/2020/11/GettyImages-150142201-Taekwondo-scaled.jpg?x-oss-process=image/resize,w_2560,h_1853,m_lfit/format,jpeg', '2023-06-07', 0, 0);

INSERT INTO video (title, url, description, thumbnail, date, is_freemium, is_in_hero)
VALUES ('World Chase Tag finals', 'https://www.youtube.com/watch?v=IS-5tBlSAoA&ab_channel=WorldChaseTag', 'Les GNF affrontent les United dans la finale mondiale 2019 de World Chase Tag.', 'https://global-uploads.webflow.com/60dfb7bd2f950755e96a7caf/640f675be1cfcf91e87717e4_WCT6USA_11_Group%20A_Empire%20vs%20Apex%20Moon_Thumbnail.jpg', '2023-04-26', 0, 0);

INSERT INTO video (title, url, description, thumbnail, date, is_freemium, is_in_hero)
VALUES ('The tunnel effect', 'https://www.youtube.com/watch?v=19fQAxys9q8&ab_channel=RedBull', 'Dario Costa se révèle comme une figure mondiale de la voltige aérienne en accomplissant un passage de tunnel.', 'https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2018.2F04.2F20.2Fa1f391ad-9cd9-415c-ae72-0bd6e28373d2.2Ejpeg/1200x630/background-color/ffffff/quality/70/red-bull-air-race-limpressionnante-course-davions-sinstalle-a-cannes-ce-weekend-1284117.jpg','2023-03-28', 0, 0);


INSERT INTO video (title, url, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES ('World record at Nazare', 'https://www.youtube.com/watch?v=HF05SHKi55g&t=5s&ab_channel=OliverRaatz', 'Sebastian Steudtner établit un nouveau record du monde sur le spot de Nazare au Portugal.', 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti', '2023-06-14', 0, 0);

INSERT INTO video (title, url, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES ('Breaking 70 mph on a skate', 'https://www.youtube.com/watch?v=vSBcrmx4aFw&ab_channel=JoshNeuman', 'Josh Neumann dévale les pentes des routes montagnardes, au coeur des Alpes suisses.', 'https://media.sudouest.fr/4233793/1000x500/thumbnail-img-7165.jpg?v=1627294930', '2023-05-25', 0, 0);

INSERT INTO video (url, title, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES ('https://www.youtube.com/watch?v=uQITWbAaDx0&t=170s&ab_channel=GuillaumeN%C3%A9ry', 'Free diving at Dean Blue Hole', 'Guillaume Néry et Julie Gautier plongent en apnée sur le spot de Dean Blue Hole.', 'https://apneatotalmalta.com/wp-content/uploads/2023/02/Apnea-Total-Malta-Freediving-School-Freediving-Explained-Featured.jpg', '2023-05-26', 0, 0);

INSERT INTO video (title, url, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES ('Les AMHE', 'https://www.youtube.com/watch?v=HdEkVKzuptA&ab_channel=Bj%C3%B6rnR%C3%BCther', 'A la découverte des Arts Martiaux Historiques Européens, un ensemble de pratiques martiales basées sur les sources historiques.', 'https://pbs.twimg.com/media/CNfMDCUUAAAASjk.jpg:large', '2023-06-13', 0, 0);


INSERT INTO video (title, url, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES ('Alex Honnold en Free Solo', 'https://www.youtube.com/watch?v=AqLAaDJFuiM&ab_channel=NatGeoFrance', 'Alex Honnold affonte El Capitan en free solo', 'https://img.lemde.fr/2021/07/16/732/0/3648/2427/664/0/75/0/8d68ba4_554117786-freesolo-13-jpg.jpg', '2023-06-14', 0, 0);


INSERT INTO category (name) VALUES ('skate', 'voltige', 'surf', 'wingsuit', 'apnée', 'sport de combat');

INSERT INTO video_category (video_id, category_id) VALUES (1, 4), ()


