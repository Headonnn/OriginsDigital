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

INSERT INTO video (id, title, url, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES (1, 'Vidéo de wingsuit', 'https://www.youtube.com/watch?v=-C_jPcUkVrM&ab_channel=GoPro', 'Go-pro de zinzin en wingsuit', 'https://www.skydivecoastalcarolinas.com/wp-content/uploads/wingsuit-flying-what-you-need-to-know-1.jpg', '2023-03-09', 0, 0);

INSERT INTO video (id, url, title, description, `date`, is_freemium, is_in_hero, thumbnail)
VALUES (2, 'https://www.youtube.com/watch?v=TKEbws4QhEk&ab_channel=StuntsAmazing', 'Video de Taekwondo', 'Un sport de bagar', '2023-06-07', 0, 0, 'https://medias.paris2024.org/uploads/2020/11/GettyImages-150142201-Taekwondo-scaled.jpg?x-oss-process=image/resize,w_2560,h_1853,m_lfit/format,jpeg');

INSERT INTO video (id, url, title, description, `date`, is_freemium, is_in_hero, thumbnail)
VALUES (3, 'https://www.youtube.com/watch?v=IS-5tBlSAoA&ab_channel=WorldChaseTag', 'Vidéo de WCT', 'Sport compétitif de zinzin', '2023-04-26', 0, 0, 'https://global-uploads.webflow.com/60dfb7bd2f950755e96a7caf/640f675be1cfcf91e87717e4_WCT6USA_11_Group%20A_Empire%20vs%20Apex%20Moon_Thumbnail.jpg');

INSERT INTO video (id, title, thumbnail, url, is_freemium, is_in_hero, `date`, description)
VALUES (4, 'Vidéo de voltige', 'https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2018.2F04.2F20.2Fa1f391ad-9cd9-415c-ae72-0bd6e28373d2.2Ejpeg/1200x630/background-color/ffffff/quality/70/red-bull-air-race-limpressionnante-course-davions-sinstalle-a-cannes-ce-weekend-1284117.jpg', 'https://www.youtube.com/watch?v=19fQAxys9q8&ab_channel=RedBull', 0, 0, '2023-03-28', 'Voltige de haut-niveau');

INSERT INTO video (id, url, title, `date`, is_freemium, is_in_hero, description, thumbnail)
VALUES (5, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', 'Vidéo de Sport', '2023-04-23', 0, 0, 'Vidéo légendaire de sport sportif', 'https://cdn.pixabay.com/photo/2016/11/20/17/29/parachute-1843350_1280.jpg');

INSERT INTO video (id, title, thumbnail, url, is_freemium, is_in_hero, `date`, description)
VALUES (6, 'Video de surf', 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti', 'https://www.youtube.com/watch?v=HF05SHKi55g&t=5s&ab_channel=OliverRaatz', 0, 0, '2023-06-09', 'Vidéo de surf');

INSERT INTO video (id, title, url, description, thumbnail, `date`)
VALUES (7, 'Vidéo de skate', 'https://www.youtube.com/watch?v=vSBcrmx4aFw&ab_channel=JoshNeuman', 'Vidéo de skate', 'https://media.sudouest.fr/4233793/1000x500/thumbnail-img-7165.jpg?v=1627294930', '2023-05-25');

INSERT INTO video (id, url, title, description, thumbnail, `date`, is_freemium, is_in_hero)
VALUES (8, 'https://www.youtube.com/watch?v=uQITWbAaDx0&t=170s&ab_channel=GuillaumeN%C3%A9ry', 'Vidéo de free diving', 'Guillaume Néry fait de l''apnée', 'https://img.redbull.com/images/c_crop,x_0,y_125,h_1249,w_999/c_fill,w_400,h_540/q_auto:low,f_auto/redbullcom/2015/03/11/399ba4bb545e3ffdd188528081a12a32/freediving-cave', '2023-05-26', 0, 0);

