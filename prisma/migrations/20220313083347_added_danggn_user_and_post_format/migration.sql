/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `avatar`,
    ADD COLUMN `deleted` DATETIME(3) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `TradeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TradePost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `salesType` ENUM('SALE', 'RESERVED', 'SOLD_OUT') NOT NULL DEFAULT 'SALE',
    `hitCount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `isHide` BOOLEAN NOT NULL DEFAULT false,
    `isPriceOffer` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TradeInterest` (
    `tradePostId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`tradePostId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
