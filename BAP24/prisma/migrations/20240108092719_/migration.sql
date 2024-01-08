/*
  Warnings:

  - You are about to drop the column `exhanged` on the `exchangedReward` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `exchangedReward` DROP COLUMN `exhanged`,
    ADD COLUMN `exchanged` BOOLEAN NOT NULL DEFAULT false;
