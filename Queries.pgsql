DROP TABLE IF EXISTS Bus CASCADE ;
DROP TABLE IF EXISTS Employee CASCADE ;
DROP TABLE IF EXISTS Chauffeur CASCADE ;
DROP TABLE IF EXISTS Controleur CASCADE ;
DROP TABLE IF EXISTS Ville CASCADE ;
DROP TABLE IF EXISTS Trajet CASCADE ;
DROP TABLE IF EXISTS TT CASCADE ;
DROP TABLE IF EXISTS Troncon CASCADE ;
DROP TABLE IF EXISTS Route CASCADE ;


CREATE TABLE BUS(
    Id INTEGER PRIMARY KEY,
    Capacité INT NOT NULL,
    dateA DATE,
    Etat VARCHAR(50) NOT NULL
);


CREATE TABLE Employee(
    Matricule SERIAL PRIMARY KEY,
    Nom VARCHAR(255),
    Prénom VARCHAR(255),
    Date_de_naissance DATE,
    date_enmbauche DATE
);

CREATE TABLE Chauffeur(
    id SERIAL PRIMARY KEY,
    Emp_Matricule INTEGER unique,
    DOP timestamp, -- date d'obtention du permis
    CONSTRAINT fk_Emp_Chauffeur FOREIGN KEY(Emp_Matricule) REFERENCES Employee(Matricule) ON DELETE CASCADE
);

CREATE TABLE Controleur(
    id SERIAL PRIMARY KEY,
    Emp_Matricule INTEGER unique,
    Niveau_Scolaire VARCHAR,
    CONSTRAINT fk_Emp_Controleur FOREIGN KEY(Emp_Matricule) REFERENCES Employee(Matricule) ON DELETE CASCADE
);
CREATE TABLE Ville(
    Code SERIAL PRIMARY KEY,
    Nom VARCHAR(255) not null
);

CREATE TABLE Trajet(
    Code SERIAL PRIMARY KEY,
    Bus_id INTEGER,
    hd timestamp not null,
    ha timestamp not null,
    Id_dep INTEGER,
    Id_arr INTEGER,
    FOREIGN KEY(Id_dep) REFERENCES Ville(Code) ON DELETE CASCADE,
    FOREIGN KEY(Id_arr) REFERENCES Ville(Code) ON DELETE CASCADE,
    FOREIGN KEY(Bus_id) REFERENCES Bus(Id) ON DELETE CASCADE
);

CREATE TABLE Route(
    id SERIAL PRIMARY KEY,
    TypeR VARCHAR(50) not null,
    distance INTEGER
);

CREATE TABLE Troncon(
    Id SERIAL PRIMARY KEY,
    Prix float not null,
    Ville_dep INTEGER ,
    Ville_arr INTEGER , 
    Code_route INTEGER, 
    FOREIGN KEY(Ville_dep) REFERENCES Ville(Code) ON DELETE CASCADE,
    FOREIGN KEY(Ville_arr) REFERENCES Ville(Code) ON DELETE CASCADE,
    FOREIGN KEY(Code_route) REFERENCES route(id) ON DELETE CASCADE
);

CREATE TABLE TT(
    Id SERIAL PRIMARY KEY,
    Temp_P timestamp not null,
    Code_Trajet INTEGER ,
    Code_Troncon INTEGER ,
    FOREIGN KEY(Code_Trajet) REFERENCES Trajet(Code) ON DELETE CASCADE,
    FOREIGN KEY(Code_Troncon) REFERENCES Troncon(Id) ON DELETE CASCADE
);


INSERT INTO bus VALUES(13542,50,'2010-07-14','en utilisation')
,(548232,40,'2007-11-15','en utilisation')
,(14532,40,'2008-01-01','panne')
,(2448632,45,'2013-04-07','en utilisation')
,(181735,45,'2014-05-25','disponible');

INSERT INTO ville(Nom) VALUES('Tunis'),('Sousse'),('Sfax'),('Gabes'),('Medenine');

INSERT INTO Trajet(hd,ha,Id_dep,Id_arr,Bus_id) 
VALUES('2021-06-10 10:00:00','2021-06-10 14:00:00',1,4,548232);

INSERT INTO Route(TypeR,distance) VALUES('route nationale',200),
('route nationale',150),
('route nationale',75),
('autoroute',170),
('autoroute',170),
('autoroute',50),
('route nationale',50);


INSERT INTO troncon(Ville_dep,Ville_arr,code_route,Prix) VALUES(1,2,1,5),
(1,2,4,6),
(2,3,2,6),
(2,3,5,7),
(3,4,3,4),
(3,4,6,5);

INSERT INTO TT(Temp_P,Code_Trajet,Code_Troncon) Values('2021-06-10 11:00:00',1,1),
('2021-06-10 12:00:00',1,3),
('2021-06-10 14:00:00',1,5);