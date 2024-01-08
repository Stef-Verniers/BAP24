/*
  Warnings:

  - You are about to drop the column `instituteId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_instituteId_fkey`;

-- AlterTable
ALTER TABLE `Enquete` ADD COLUMN `instituteId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `instituteId`;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_instituteId_fkey` FOREIGN KEY (`instituteId`) REFERENCES `Institute`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
