CREATE TABLE `jobCategory` (
  `jobCategory_id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(55)
);

CREATE TABLE `state` (
  `state_id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(55)
);

CREATE TABLE `roles` (
  `roles_id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(55)
);

CREATE TABLE `user` (
  `user_id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(30),
  `email` varchar(55),
  `password` varchar(255),
  `roles_id` int,
  FOREIGN KEY (`roles_id`) REFERENCES `roles` (`roles_id`)
);

CREATE TABLE `professionals` (
  `professionals_id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` int,
  `photo` varchar(255),
  `identificationDocument` varchar(255),
  `certificates` varchar(255),
  `state_id` int,
  `jobCategory_id` int,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`jobCategory_id`) REFERENCES `jobCategory` (`jobCategory_id`),
  FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
);



CREATE TABLE `hiringApplications` (
  `request_id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` int,
  `professionals_id` int,
  `date` date,
  `state_id` int,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`professionals_id`) REFERENCES `professionals` (`professionals_id`),
  FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
);

CREATE TABLE `ratingsAndComments` (
  `rating_id` int AUTO_INCREMENT PRIMARY KEY,
  `professionals_id` int,
  `user_id` int,
  `qualification` int,
  `comment` varchar(255),
  `qualificationDate` date,
  FOREIGN KEY (`professionals_id`) REFERENCES `professionals` (`professionals_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);


INSERT INTO `state` (name) VALUES ("PENDIENTE"), ("APROBADO"), ("DESAPROBADO");

INSERT INTO `roles` (name) VALUES ("USUARIO"), ("PROFESIONAL"), ("SOPORTE"), ("ADMINISTRADOR");

INSERT INTO `jobCategory` (name) VALUES ("Electricista"), ("Fontanero"), ("Camionero"), ("Carnicero"), ("Diseñador");
