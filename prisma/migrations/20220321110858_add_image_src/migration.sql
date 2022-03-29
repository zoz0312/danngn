/*
  Warnings:

  - Added the required column `imageSrc` to the `TradeCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TradeCategory` ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL;
