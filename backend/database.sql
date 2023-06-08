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

INSERT INTO user (username, email, firstname, lastname, password)
VALUES 
("Camille", "camille@camille.com", "Camille", "Le Floch", "1234"),
("Thomas", "thomas@thomas.com", "Thomas", "Couraud", "1234"),
("Emilie", "emilie@emilie.com", "Emilie", "Nathan", "1234"),
("Chloe", "chloe@chloe.com", "Chloe", "Peltier", "1234"),
("Jeremy", "jeremy@jeremy.com", "Jeremy", "Herpe", "1234");

INSERT INTO category (name) 
VALUES 
("Surf"),
("Petanque"),
("Escalade"),
("Ski");

INSERT INTO video (title, url, description, thumbnail,date)
VALUES
("Video de skate", "https://www.youtube.com/watch?v=t_9i6vCOwtE&ab_channel=Lucas-WCS", "uUn mec qui fait du ski", "https://cdn.pixabay.com/photo/2014/10/22/08/38/skateboard-497706_1280.jpg","2023-06-06"),
("Video de surf", "https://www.youtube.com/watch?v=gfxAZIX8hC4&list=PLDzslQtErjzjJs4Y5Te7kVoA3OwXGT2Td&ab_channel=BlitzstreamFacile/", "Un mec qui fait du surf", "https://cdn.pixabay.com/photo/2020/08/04/13/28/man-5462849_1280.jpg","2023-04-06"),
("Video d'escalade", "https://www.youtube.com/watch?v=JgWU5Ou6SPU&ab_channel=EurosportFrance", "Un mec qui fait de la grimpette", "https://cdn.pixabay.com/photo/2013/02/10/00/02/bear-79838_1280.jpg","2015-08-06"),
("Video de pétanque", "https://www.youtube.com/watch?v=v9ft_84aOjw&ab_channel=MeilleursMomentsdeP%C3%A9tanque", "des gens qui jouent à la pétanque", "https://cdn.pixabay.com/photo/2015/09/13/05/05/bmx-937725_1280.jpg","2005-08-06");

--   ENGINE=InnoDB DEFAULT CHARSET=latin1;




