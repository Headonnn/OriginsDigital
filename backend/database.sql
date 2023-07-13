CREATE TABLE
    `user` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        username VARCHAR(100) NOT NULL,
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
        date DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
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
        section_id INT NOT NULL,
        description VARCHAR(500) NOT NULL,
        image VARCHAR(100) NOT NULL
    );

CREATE TABLE
    `section` (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `ordre` INT NOT NULL,
        title VARCHAR (100) NOT NULL,
        size VARCHAR(50),
        carousel_category_id INT DEFAULT NULL,
        carousel_custom_id INT DEFAULT NULL,
        advert_id INT DEFAULT NULL,
        Foreign Key (carousel_custom_id) REFERENCES carousel_custom (id) ON DELETE CASCADE,
        Foreign Key (carousel_category_id) REFERENCES carousel_category (id) ON DELETE CASCADE,
        Foreign Key (advert_id) REFERENCES advert (id) ON DELETE CASCADE
    );

INSERT INTO
    user (
        username,
        email,
        hashedPassword,
        firstname,
        lastname,
        is_admin
    )
VALUES (
        'Camille',
        'camille@camille.com',
        '$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ',
        'Camille',
        'Kamizuchi',
        '1'
    ), (
        'Chloé',
        'chloe@chloe.com',
        '$argon2id$v=19$m=65536,t=5,p=1$UH4Y1+YIyIlkx2WQrM6jxw$I/l1LS1wVEeqnApwzc6fPdYh/hwfpPP1eHwgCxMFsDA',
        'Chloé',
        'Peltier',
        '1'
    ), (
        'Thomas',
        'tomtom@nana.com',
        '$argon2id$v=19$m=65536,t=5,p=1$F539F2S78zvEKMGU0CnTOg$vcIUNLgUZcCOAInNsakrdOWvRlUbNpKl8hU9TPngbwA',
        'Thomas',
        'Thomasovich',
        '1'
    ), (
        'Emilie',
        'emilie@emilie.com',
        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA',
        'Emilie',
        'Nathan',
        '1'
    ), (
        'Jeremy',
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
        'https://www.youtube.com/watch?v=-C_jPcUkVrM&ab_channel=GoPro',
        'Après 3 années de préparation intensive, Uli Emanuele pilote ce qui est probablement le saut le plus technique et difficile jamais accompli.',
        'https://www.skydivecoastalcarolinas.com/wp-content/uploads/wingsuit-flying-what-you-need-to-know-1.jpg',
        '2023-03-09',
        1,
        0
    ), (
        'Tae Kwon Do demonstration',
        'https://www.youtube.com/watch?v=TKEbws4QhEk&ab_channel=StuntsAmazing',
        'Démonstration de la palette technique du Tae Kwon Do.',
        'https://medias.paris2024.org/uploads/2020/11/GettyImages-150142201-Taekwondo-scaled.jpg?x-oss-process=image/resize,w_2560,h_1853,m_lfit/format,jpeg',
        '2023-06-20',
        0,
        0
    ), (
        'World Chase Tag finals',
        'https://www.youtube.com/watch?v=IS-5tBlSAoA&ab_channel=WorldChaseTag',
        'Les GNF affrontent les United dans la finale mondiale 2019 de World Chase Tag.',
        'https://global-uploads.webflow.com/60dfb7bd2f950755e96a7caf/640f675be1cfcf91e87717e4_WCT6USA_11_Group%20A_Empire%20vs%20Apex%20Moon_Thumbnail.jpg',
        '2023-04-26',
        0,
        0
    ), (
        'The tunnel effect',
        'https://www.youtube.com/watch?v=19fQAxys9q8&ab_channel=RedBull',
        'Dario Costa se révèle comme une figure mondiale de la voltige aérienne en accomplissant un passage de tunnel.',
        'https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2018.2F04.2F20.2Fa1f391ad-9cd9-415c-ae72-0bd6e28373d2.2Ejpeg/1200x630/background-color/ffffff/quality/70/red-bull-air-race-limpressionnante-course-davions-sinstalle-a-cannes-ce-weekend-1284117.jpg',
        '2023-06-21',
        0,
        0
    ), (
        'World record at Nazare',
        'https://www.youtube.com/watch?v=HF05SHKi55g&t=5s&ab_channel=OliverRaatz',
        'Sebastian Steudtner établit un nouveau record du monde sur le spot de Nazare au Portugal.',
        'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti',
        '2023-06-22',
        1,
        0
    ), (
        'Breaking 70 mph on a skate',
        'https://www.youtube.com/watch?v=vSBcrmx4aFw&ab_channel=JoshNeuman',
        'Josh Neumann dévale les pentes des routes montagnardes, au coeur des Alpes suisses.',
        'https://media.sudouest.fr/4233793/1000x500/thumbnail-img-7165.jpg?v=1627294930',
        '2023-05-25',
        1,
        0
    ), (
        'Free diving at Dean Blue Hole',
        'https://www.youtube.com/watch?v=uQITWbAaDx0&t=170s&ab_channel=GuillaumeN%C3%A9ry',
        'Guillaume Néry et Julie Gautier plongent en apnée sur le spot de Dean Blue Hole.',
        'https://apneatotalmalta.com/wp-content/uploads/2023/02/Apnea-Total-Malta-Freediving-School-Freediving-Explained-Featured.jpg',
        '2023-05-26',
        0,
        0
    ), (
        'Les AMHE',
        'https://www.youtube.com/watch?v=HdEkVKzuptA&ab_channel=Bj%C3%B6rnR%C3%BCther',
        'A la découverte des Arts Martiaux Historiques Européens, un ensemble de pratiques martiales basées sur les sources historiques.',
        'https://pbs.twimg.com/media/CNfMDCUUAAAASjk.jpg:large',
        '2023-06-13',
        0,
        0
    ), (
        'Alex Honnold en Free Solo',
        'https://www.youtube.com/watch?v=AqLAaDJFuiM&ab_channel=NatGeoFrance',
        'Alex Honnold affonte El Capitan en free solo',
        'https://img.lemde.fr/2021/07/16/732/0/3648/2427/664/0/75/0/8d68ba4_554117786-freesolo-13-jpg.jpg',
        '2023-06-14',
        0,
        0
    ), (
        'La nuit en skate au musée',
        'https://www.youtube.com/watch?v=WrHGINpaiXc&ab_channel=RedBullSkateboarding',
        'Quatre parmi les meilleures skateuses explorent le British Museum en skateboard, de nuit',
        'https://s2.dmcdn.net/v/V1UoF1aa5_nMGiohd/x1080',
        '2023-06-23',
        1,
        0
    ), (
        'Faire du skateboard dans un aéroport désert',
        'https://www.youtube.com/watch?v=I-unDEoXnN4&ab_channel=RedBull',
        'Competition de skateboard au Louis Armstrong International Airport à New Orleans',
        'https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/assets/v3/editorial/2/8f/28fd1dfe-685f-5c7b-a95d-8df1fe1202ca/608ef5859325f.image.jpg?resize=1024%2C682',
        '2023-06-22',
        1,
        0
    ), (
        'Le Go Skateboarding Day à Santiago, au Chili',
        'https://www.youtube.com/watch?v=Dcj7aPmRxvI&ab_channel=RedBullSkateboarding',
        'Douze-mille skateboarders se rassemblent à Santiago pour une manif en faveur de leur sport',
        'https://img.redbull.com/images/c_crop,w_800,h_400,x_0,y_50,f_auto,q_auto/c_scale,w_1200/redbullcom/2019/06/21/47da659e-1b52-4fe6-8f6b-ea56619acd0e/skateday-santiago',
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
VALUES ('skate'), ('voltige'), ('surf'), ('wingsuit'), ('apnée'), ('arts martiaux'), ("Nouveautés");

INSERT INTO
    video_category (video_id, category_id)
VALUES (1, 4), (5, 3), (7, 5), (2, 6), (8, 6), (6, 1), (10, 1), (11, 1), (12, 1), (13, 4), (14, 4), (15, 4), (16, 3), (17, 3), (18, 5);

INSERT INTO
    carousel_custom (name)
VALUES ("Videos mises en avant"), ("Selection custom");

INSERT INTO
    carousel_category (max_number, category_id)
VALUES (100, 1);

INSERT INTO
    `section` (
        ordre,
        size,
        title,
        carousel_category_id,
        carousel_custom_id
    )
VALUES (
        1,
        "moyen",
        "carouselNouv",
        NULL,
        1
    ), (
        2,
        "moyen",
        "carouselAll",
        1,
        NULL
    ), (
        3,
        "moyen",
        "carouselCustom",
        NULL,
        2
    );

INSERT INTO
    video_carousel (video_id, carousel_id)
VALUES (1, 1), (5, 1), (6, 1), (3, 2), (5, 2), (8, 2);