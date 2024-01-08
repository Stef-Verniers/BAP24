/*
  Warnings:

  - You are about to drop the column `code` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isUsed` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Sponsor` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Sponsor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `code`,
    DROP COLUMN `isUsed`;

-- AlterTable
ALTER TABLE `Sponsor` DROP COLUMN `owner`,
    DROP COLUMN `url`,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Sponsor` ADD CONSTRAINT `Sponsor_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
