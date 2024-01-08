/*
  Warnings:

  - You are about to drop the column `instituteId` on the `Additional_Information` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Additional_Information` DROP FOREIGN KEY `Additional_Information_instituteId_fkey`;

-- AlterTable
ALTER TABLE `Additional_Information` DROP COLUMN `instituteId`;
