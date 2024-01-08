/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Sponsor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Sponsor_ownerId_key` ON `Sponsor`(`ownerId`);
