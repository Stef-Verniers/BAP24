/*
  Warnings:

  - A unique constraint covering the columns `[sponsorId]` on the table `exchangedReward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sponsorId` to the `exchangedReward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exchangedReward` ADD COLUMN `sponsorId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `exchangedReward_sponsorId_key` ON `exchangedReward`(`sponsorId`);

-- AddForeignKey
ALTER TABLE `exchangedReward` ADD CONSTRAINT `exchangedReward_sponsorId_fkey` FOREIGN KEY (`sponsorId`) REFERENCES `Sponsor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
