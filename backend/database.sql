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
        0
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
        1
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
        'Skateboard is fun',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689258350/qf7bk2olbn3ifxl6t8ep.mp4',
        'Competition de skateboard au Louis Armstrong International Airport à New Orleans',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689258431/ouebx6i0lcmhcw3rugz5.jpg',
        '2023-06-22',
        1,
        0
    ), (
        'Skateboarding à Santiago',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1689258643/zdqpk2i5ouqwgmcjqnl6.mp4',
        'Douze-mille skateboarders se rassemblent à Santiago pour une manif en faveur de leur sport',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1689258800/bgnkiuossvmwvhwzoxtr.jpg',
        '2023-06-23',
        1,
        0
    ), (
        'Wingsuit en montagne',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690289094/fmnbhiiydmwwzcopaqgx.mp4',
        'Fred Fugen etVince Reffet, AKA les Soul Flyers, ont decidé  de tenter en wingsuit de prendre un avion.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690289226/p4uvlcp9nx5psfhayihz.png',
        '2023-06-23',
        1,
        0
    ), (
        'Wingsuit à Chamonix',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690289616/reeytdyniipwoybl4lei.mp4',
        ' Fred Fugen, Vincent "Veush" Cotte, et Aurélien "Bras Noir Chatard fracassent le record du monde de proximity-flight en wingsuit, depuis les cimes du Mont-Blanc',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690289664/d7qt8ygggdqsebpbnxku.png',
        '2023-06-22',
        1,
        0
    ), (
        'Wingsuit & pyramides',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690289796/bzwugmm0mombj0ztomee.mp4',
        ' Fred Fugen, Vincent Cotte et Mike Swanson testent leur nouvelle wingsuit en Egypte',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690289802/a9nersh6zt7ayiktuffg.png',
        '2023-06-20',
        1,
        0
    ), (
        'Freediving is fun',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690290133/ibas1pra1foxixwv60i4.mp4',
        'Comment faire des bulles sans respirer.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690290145/pv3k0qyglubwfj2ygc1k.jpg',
        '2023-06-23',
        1,
        0
    ), (
        'Surf & Tahiti',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690290318/g5ztocrfeuwne5pfddkn.mp4',
        'Teahupoo accueille des surfeurs du monde entier pour profiter de la saison des vagues.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690290346/dtymec7dw0uhqs3feoi5.jpg',
        '2023-06-20',
        0,
        0
    ), (
        'Forgiving Pipeline sur Oahu',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690290479/yphbqvyhqaerrweefkf1.mp4',
        'Amber Mozo suit les traces de son père photographe, disparu dans le tube de Forgiving Pipeline, légendaire spot sur la côte nord à Oahu.',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690290532/os8qyiks9tsflzga1uoa.jpg',
        '2023-06-23',
        1,
        0
    ), (
        'En apnée sous la banquise',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690290772/ljbwnyevuhijqf2kwnf3.mp4',
        ' Johanna Nordblad, plongeuse finlandaise, explore les paysages arctiques en apnée',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690290780/vkyaaxfhpuyddrc8hhpp.jpg',
        '2023-06-20',
        1,
        0
    ), (
        'Run de ski le plus dangereux',
        'https://res.cloudinary.com/dgux3vxri/video/upload/v1690291016/qqgexewfahpyothgnjzb.mp4',
        ' Markus Eder présente son court-métrage perso, filmé et monté par ses soins, narrant sa descente en ski dans les Alpes',
        'https://res.cloudinary.com/dgux3vxri/image/upload/v1690291031/u5m7o8cve64esaoioxiw.jpg',
        '2023-06-21',
        1,
        0
    );

INSERT INTO category (name)
VALUES ('Skate'), ('Voltige'), ('Surf'), ('Wingsuit'), ('Apnée'), ('Arts martiaux'), ("Nouveautés"), ("Escalade"), ("Vidéos gratuites"), ("Ski");

INSERT INTO
    video_category (video_id, category_id)
VALUES (1, 4), (4, 1), (3, 6), (9, 8), (5, 3), (7, 5), (2, 6), (8, 6), (6, 1), (10, 1), (11, 1), (12, 1), (13, 4), (14, 4), (15, 4), (16, 5), (17, 3), (18, 3), (20, 10), (19, 5);

INSERT INTO
    carousel_custom (name)
VALUES ("Selection du moment"), ("Videos mises en avant");

INSERT INTO
    carousel_category (max_number, category_id)
VALUES (100, 1), (100, 9), (100, 6);

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
        "disconnected",
        "free",
        2,
        NULL
    ), (
        2,
        "connected",
        "Sélection du moment",
        NULL,
        1
    ), (
        3,
        "all",
        "Videos mises en avant",
        NULL,
        2
    ), (4, "all", "skate", 1, NULL), (
        5,
        "all",
        "Art martiaux",
        3,
        NULL
    );

INSERT INTO
    video_carousel (video_id, carousel_id)
VALUES (1, 1), (5, 1), (6, 1), (2, 1), (3, 1), (4, 1), (16, 2), (10, 2), (8, 2), (17, 2), (18, 2);