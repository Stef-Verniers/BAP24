/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Additional_Information` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Additional_Information_userId_key` ON `Additional_Information`(`userId`);
