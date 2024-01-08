/*
  Warnings:

  - You are about to drop the column `sponsorId` on the `exchangedReward` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `exchangedReward` DROP FOREIGN KEY `exchangedReward_sponsorId_fkey`;

-- AlterTable
ALTER TABLE `exchangedReward` DROP COLUMN `sponsorId`;
