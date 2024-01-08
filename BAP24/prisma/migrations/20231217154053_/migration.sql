/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - Added the required column `rewardCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `category`,
    ADD COLUMN `rewardCategoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `RewardCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_rewardCategoryId_fkey` FOREIGN KEY (`rewardCategoryId`) REFERENCES `RewardCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
