/*
  Warnings:

  - Added the required column `lsmdAdmSectUmdId` to the `tradePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tradePost` ADD COLUMN `lsmdAdmSectUmdId` VARCHAR(8) NOT NULL;

-- CreateTable
CREATE TABLE `lsmdAdmSectUmd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emdCd` VARCHAR(8) NOT NULL,
    `emdNm` VARCHAR(60) NOT NULL,
    `ssgOid` INTEGER NOT NULL,
    `colAdmSe` VARCHAR(5) NOT NULL,
    `gid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tradePost` ADD CONSTRAINT `tradePost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tradePost` ADD CONSTRAINT `tradePost_lsmdAdmSectUmdId_fkey` FOREIGN KEY (`lsmdAdmSectUmdId`) REFERENCES `lsmdAdmSectUmd`(`emdCd`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tradePost` ADD CONSTRAINT `tradePost_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `tradeCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tradeInterest` ADD CONSTRAINT `tradeInterest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tradeInterest` ADD CONSTRAINT `tradeInterest_tradePostId_fkey` FOREIGN KEY (`tradePostId`) REFERENCES `tradePost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
