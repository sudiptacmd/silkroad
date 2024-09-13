DROP DATABASE silkroad;
CREATE DATABASE silkroad;
USE silkroad;
CREATE TABLE `User` (
  `user_id` integer(10) NOT NULL AUTO_INCREMENT,
    `lastName` varchar(255) DEFAULT NULL,
    `photo` varchar(255),
    `firstName` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `address` varchar(255) DEFAULT NULL,
    `phone` varchar(255) DEFAULT NULL,
    `vendor` tinyint(1) DEFAULT '0',
    `shop_id` integer(10) DEFAULT NULL,
    `verified` tinyint(1) DEFAULT '0',
    `NID` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`)
);


CREATE TABLE `Shop` (
  `shop_id` integer(10) NOT NULL AUTO_INCREMENT,
  `shop_logo` varchar(255),
  `shop_name` varchar(255),
  PRIMARY KEY (`shop_id`)
);

CREATE TABLE `Product` (
  `product_id` integer(10) NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` varchar(3) NOT NULL DEFAULT 'WFA',
    `name` varchar(255) DEFAULT NULL,
    `user_id` integer(10) NOT NULL,
    `photo` varchar(255) DEFAULT NULL,
    `description` text,
    `category` varchar(255) DEFAULT NULL,
    `post_type` tinyint(1) DEFAULT NULL,
    `buy_price` int DEFAULT NULL,
    `bid_starting_price` int DEFAULT NULL,
    `bid_end_time` timestamp DEFAULT NULL,
    PRIMARY KEY (`product_id`)
);

CREATE TABLE `Bids` (
  `bid_id` integer(10) NOT NULL AUTO_INCREMENT,
    `bid_on` integer(10),
    `bid_by` integer(10),
  `amount` integer,
  `posted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bid_id`)
);

CREATE TABLE `Review` (
  `review_id` integer(10) NOT NULL AUTO_INCREMENT,
    `user_id` integer(10),
  `product_id` integer(10),
  `rating` integer,
  `content` text,
  `posted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`)
);

CREATE TABLE `QnA` (
  `qna_id` integer(10) NOT NULL AUTO_INCREMENT,
  `question` text,
  `user_id` integer(10),
  `product_id` integer(10),
  `posted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `answer` text,
  PRIMARY KEY (`qna_id`)
);

CREATE TABLE `Cart` (
  `cart_id` integer(10) NOT NULL AUTO_INCREMENT,
  `user_id` integer(10),
  `status` varchar(3) NOT NULL DEFAULT 'UNP',
  PRIMARY KEY (`cart_id`)
);

CREATE TABLE `Cart_item` (
  `cart_id` integer(10),
  `prod_id` integer(10),
  `quantity` int
);


ALTER TABLE `User` ADD FOREIGN KEY (`shop_id`) REFERENCES `Shop` (`shop_id`);


ALTER TABLE `Product` ADD FOREIGN KEY (`user_id`) REFERENCES `Shop` (`shop_id`);

ALTER TABLE `Review` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`);

ALTER TABLE `QnA` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`);

ALTER TABLE `QnA` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `Review` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `Bids` ADD FOREIGN KEY (`bid_on`) REFERENCES `Product` (`product_id`);

ALTER TABLE `Bids` ADD FOREIGN KEY (`bid_by`) REFERENCES `User` (`user_id`);

ALTER TABLE `Cart` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `Cart_item` ADD FOREIGN KEY (`prod_id`) REFERENCES `Product` (`product_id`);

ALTER TABLE `Cart_item` ADD FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`cart_id`);