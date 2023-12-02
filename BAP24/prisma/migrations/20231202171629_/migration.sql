/*
  Warnings:

  - You are about to drop the column `user_id` on the `Additional_Information` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Additional_Information` DROP FOREIGN KEY `Additional_Information_user_id_fkey`;

-- AlterTable
ALTER TABLE `Additional_Information` DROP COLUMN `user_id`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
