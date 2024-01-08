/*
  Warnings:

  - You are about to drop the column `description` on the `Sponsor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_code_key` ON `Product`;

-- AlterTable
ALTER TABLE `Sponsor` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `sponsor` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `exchangedReward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exchangedReward` ADD CONSTRAINT `exchangedReward_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exchangedReward` ADD CONSTRAINT `exchangedReward_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
