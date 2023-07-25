CREATE TABLE
    `user` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        email VARCHAR(100) NOT NULL,
        hashedPassword varchar(255) NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        is_admin TINYINT DEFAULT 0
    );

CREATE TABLE
    `video` (
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

CREATE TABLE
    video_hero (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        video_id INT NOT NULL,
        FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
    );

CREATE TABLE
    `favorite` (
        user_id INT NOT NULL,
        video_id INT NOT NULL,
        PRIMARY KEY (user_id, video_id),
        FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE,
        FOREIGN KEY (video_id) REFERENCES `video` (id) ON DELETE CASCADE
    );

CREATE TABLE
    `carousel_custom` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(100)
    );

CREATE TABLE
    `video_carousel` (
        video_id INT NOT NULL,
        carousel_id INT NOT NULL,
        PRIMARY KEY (video_id, carousel_id),
        FOREIGN KEY (video_id) REFERENCES `video` (id) ON DELETE CASCADE,
        FOREIGN KEY (carousel_id) REFERENCES `carousel_custom` (id) ON DELETE CASCADE
    );

CREATE TABLE
    `category` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(100)
    );

CREATE TABLE
    `video_category` (
        video_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (video_id, category_id),
        FOREIGN KEY (video_id) REFERENCES `video` (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES `category` (id) ON DELETE CASCADE
    );

CREATE TABLE
    `carousel_category` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        max_number INT NOT NULL,
        category_id INT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES `category` (id) ON DELETE CASCADE
    );

CREATE TABLE
    `advert` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(500) NOT NULL,
        image VARCHAR(100) NOT NULL
    );

CREATE TABLE
    `section` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `ordre` INT NOT NULL,
        title VARCHAR (100) NOT NULL,
        visibility VARCHAR(50),
        carousel_category_id INT DEFAULT NULL,
        carousel_custom_id INT DEFAULT NULL,
        advert_id INT DEFAULT NULL,
        Foreign Key (carousel_custom_id) REFERENCES carousel_custom (id) ON DELETE CASCADE,
        Foreign Key (carousel_category_id) REFERENCES carousel_category (id) ON DELETE CASCADE,
        Foreign Key (advert_id) REFERENCES advert (id) ON DELETE CASCADE
    );

INSERT INTO
    user (
        email,
        hashedPassword,
        firstname,
        lastname,
        is_admin
    )
VALUES (
        'camille@camille.com',
        '$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ',
        'Camille',
        'Kamizuchi',
        '1'
    ), (
        'chloe@chloe.com',
        '$argon2id$v=19$m=65536,t=5,p=1$UH4Y1+YIyIlkx2WQrM6jxw$I/l1LS1wVEeqnApwzc6fPdYh/hwfpPP1eHwgCxMFsDA',
        'Chloé',
        'Peltier',
        '1'
    ), (
        'tomtom@nana.com',
        '$argon2id$v=19$m=65536,t=5,p=1$F539F2S78zvEKMGU0CnTOg$vcIUNLgUZcCOAInNsakrdOWvRlUbNpKl8hU9TPngbwA',
        'Thomas',
        'Thomasovich',
        '1'
    ), (
        'emilie@emilie.com',
        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA',
        'Emilie',
        'Nathan',
        '1'
    ), (
        'jeremy@jeremy.com',
        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$VCzq45PL9t8khtc44Kk5iw',
        'Jeremy',
        'Herpanovski',
        '1'
    );

INSERT INTO
    video (
        title,
        url,
        description,
        thumbnail,
        date,
        is_freemium,
        is_in_hero
    )
VALUES (
        'Wingsuit skills',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689235370/sq8uqy1avzg94npua5lj.mp4',
        'Après 3 années de préparation intensive, Uli Emanuele pilote ce qui est probablement le saut le plus technique et difficile jamais accompli.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689235053/piwqu7vizrodkj1vnzvw.jpg',
        '2023-03-09',
        1,
        1
    ), (
        'Tae Kwon Do démonstration',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689235658/ykljf7yxechxpewxrf5i.mp4',
        'Démonstration de la palette technique du Tae Kwon Do.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689235690/dphnioqmkh5zscpz9yip.jpg',
        '2023-06-20',
        0,
        0
    ), (
        'Judo démonstration',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689236294/iy12onzarln3stkefmdw.mp4',
        'Démonstration des techniques de judo.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689236357/tsuccr9lbabmirwflyen.jpg',
        '2023-04-26',
        0,
        0
    ), (
        'The tunnel effect',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689236875/rbffbghpbqy2ga6ecwsp.mp4',
        'Dario Costa se révèle comme une figure mondiale de la voltige aérienne en accomplissant un passage de tunnel.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689236907/n7ytzisypraxbhdml55m.jpg',
        '2023-06-21',
        0,
        0
    ), (
        'World record at Nazare',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689237623/z5v24rzxce2blsvc2tew.mp4',
        'Sebastian Steudtner établit un nouveau record du monde sur le spot de Nazare au Portugal.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689237650/vooa0h6dziebmwribcsy.jpg',
        '2023-06-22',
        1,
        0
    ), (
        'Breaking 70 mph on a skate',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689237844/xjqykqb9jkksj9ydf930.mp4',
        'Josh Neumann dévale les pentes des routes montagnardes, au coeur des Alpes suisses.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689237867/mxvvhbga5dnld09x7dp2.jpg',
        '2023-05-25',
        1,
        0
    ), (
        'Free diving at Dean Blue Hole',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689238227/z8rkbfpg3dgidy1fm2l8.mp4',
        'Guillaume Néry et Julie Gautier plongent en apnée sur le spot de Dean Blue Hole.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689238257/eepmau2wsbwo4fyonp56.jpg',
        '2023-05-26',
        0,
        0
    ), (
        'Compétition Escrime',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689238521/r9daozpaxlvzukjsfwro.mp4',
        'En escrime, il existe trois armes différentes : le fleuret, l’épée et le sabre. Chacune de ces armes a sa propre histoire, règle et manière d’utilisation. Pour toutes les armes, un système électrique détecte les touches.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689238550/fuj6betcr1kh8zttsdly.jpg',
        '2023-06-13',
        0,
        0
    ), (
        'Alex Honnold en Free Solo',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689253780/zoiu11a9ckgnnijr6ckc.mp4',
        'Alex Honnold affonte El Capitan en free solo',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689253799/ae5e6tqmcotqz82sahwu.jpg',
        '2023-06-14',
        0,
        0
    ), (
        'Warehouse & skateboard',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689254295/xq4bdmx5svdkkdcofjza.mp4',
        'Un skateboarder investi une usine desaffectée.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689254349/j637z2nfyrg9ys6bxovm.jpg',
        '2023-06-23',
        1,
        0
    ), (
        'Faire du skateboard dans un aéroport désert',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689258350/qf7bk2olbn3ifxl6t8ep.mp4',
        'Competition de skateboard au Louis Armstrong International Airport à New Orleans',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689258431/ouebx6i0lcmhcw3rugz5.jpg',
        '2023-06-22',
        1,
        0
    ), (
        'Le Go Skateboarding Day à Santiago, au Chili',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689258643/zdqpk2i5ouqwgmcjqnl6.mp4',
        'Douze-mille skateboarders se rassemblent à Santiago pour une manif en faveur de leur sport',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689258800/bgnkiuossvmwvhwzoxtr.jpg',
        '2023-06-23',
        1,
        0
    ), (
        'Petite session de wingsuit en montagne',
        'https://www.youtube.com/watch?v=YL9sNrOlK-I&ab_channel=RedBull',
        'Fred Fugen etVince Reffet, AKA les Soul Flyers, ont decidé  de tenter en wingsuit de prendre un avion.',
        'https://img.redbull.com/images/c_crop,w_3840,h_1920,x_0,y_61,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/2/12/p4tnkcwg0h9vmjigqnw9/fred-fugen-vince-reffet',
        '2023-06-23',
        1,
        0
    ), (
        'Record du monde de rase-motte en wingsuit à Chamonix',
        'https://www.youtube.com/watch?v=kooYQ0IOnoM&ab_channel=GoPro',
        ' Fred Fugen, Vincent "Veush" Cotte, et Aurélien "Bras Noir Chatard fracassent le record du monde de proximity-flight en wingsuit, depuis les cimes du Mont-Blanc',
        'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/11/4/mocmtryyx7uzwfrzmli1/soul-flyers-wingsuit-mont-blanc',
        '2023-06-22',
        1,
        0
    ), (
        'A la découverte des pyramides',
        'https://www.youtube.com/watch?v=wj_ZEDISBnA&ab_channel=RedBull',
        ' Fred Fugen, Vincent Cotte et Mike Swanson testent leur nouvelle wingsuit en Egypte',
        'https://laughingsquid.com/wp-content/uploads/2022/01/Wingsuit-Flying-Super-Close-To-The-Pyramids-Of-Giza.jpg?w=1024',
        '2023-06-20',
        1,
        0
    ), (
        'Petite rencontre entre la Patrouille de France et deux jetmens',
        'https://www.youtube.com/watch?v=pNaZCDhvh88&ab_channel=AIRBORNE-FILMS',
        'La Patrouille de France et les trois Jetman Yves Rossy, Vincent Reffet et Fred Fugen volent ensemble dans une chorégraphie aérienne encore jamais vue.',
        'https://i.gzn.jp/img/2016/12/01/alpha-jetman/00.jpg',
        '2023-06-23',
        1,
        0
    ), (
        'Surf sur les vagues massives de Tahiti',
        'https://www.youtube.com/watch?v=PRPxTztXoOo&ab_channel=RedBullSurfing',
        ' Teahupoo accueille des surfeurs du monde entier pour profiter de la saison des vagues.',
        'https://img.redbull.com/images/c_crop,w_2000,h_1000,x_0,y_333,f_auto,q_auto/c_scale,w_1200/redbullcom/2015/05/23/1331724747726_8/jerome-sahyoun-at-teahupo-o',
        '2023-06-20',
        0,
        0
    ), (
        'Le spot le plus léthal au monde, Forgiving Pipeline sur Oahu',
        'https://www.youtube.com/watch?v=vtHUFwXnV2E&ab_channel=RedBullSurfing',
        'Amber Mozo suit les traces de son père photographe, disparu dans le tube de Forgiving Pipeline, légendaire spot sur la côte nord à Oahu.',
        'https://gathsports.com/wp-content/uploads/2020/05/Schermata-2020-05-06-alle-5.29.39-PM-1400x757.jpeg',
        '2023-06-23',
        1,
        0
    ), (
        'En apnée sous la banquise',
        'https://www.youtube.com/watch?v=aCkt-WI0n3g&ab_channel=TheAtlantic',
        ' Johanna Nordblad, plongeuse finlandaise, explore les paysages arctiques en apnée',
        'https://canadiangeographic.ca/wp-content/uploads/2022/02/coombs_freediving_under_ice-1024x671.jpg',
        '2023-06-20',
        1,
        0
    ), (
        'Le run de ski le plus dangereux',
        'https://www.youtube.com/watch?v=fbqHK8i-HdA&ab_channel=RedBullSnow',
        ' Markus Eder présente son court-métrage perso, filmé et monté par ses soins, narrant sa descente en ski dans les Alpes',
        'https://www.skieur.com/media/2021/novembre/Markus%20Eder.jpg',
        '2023-06-21',
        1,
        0
    );

INSERT INTO category (name)
VALUES ('Skate'), ('Voltige'), ('Surf'), ('Wingsuit'), ('Apnée'), ('Arts martiaux'), ("Nouveautés"), ("Escalade"), ("Vidéos gratuites");

INSERT INTO
    video_category (video_id, category_id)
VALUES (1, 4), (3, 6), (9, 8), (5, 3), (7, 5), (2, 6), (8, 6), (6, 1), (10, 1), (11, 1), (12, 1), (13, 4), (14, 4), (15, 4), (16, 3), (17, 3), (18, 5);

INSERT INTO
    carousel_custom (name)
VALUES ("Videos mises en avant"), ("Selection custom");

INSERT INTO
    carousel_category (max_number, category_id)
VALUES (100, 1);

INSERT INTO
    `section` (
        ordre,
        visibility,
        title,
        carousel_category_id,
        carousel_custom_id
    )
VALUES (
        1,
        "all",
        "carouselNouv",
        NULL,
        1
    ), (2, "all", "carouselAll", 1, NULL), (
        3,
        "all",
        "carouselCustom",
        NULL,
        2
    );

INSERT INTO
    video_carousel (video_id, carousel_id)
VALUES (1, 1), (5, 1), (6, 1), (3, 2), (5, 2), (8, 2);