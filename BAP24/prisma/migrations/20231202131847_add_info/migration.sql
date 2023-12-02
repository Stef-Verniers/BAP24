/*
  Warnings:

  - Added the required column `age` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthplace` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domestic` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Additional_Information` ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `birthplace` VARCHAR(191) NOT NULL,
    ADD COLUMN `domestic` VARCHAR(191) NOT NULL,
    ADD COLUMN `religion` VARCHAR(191) NOT NULL,
    ADD COLUMN `sex` VARCHAR(191) NOT NULL,
    ADD COLUMN `study` VARCHAR(191) NOT NULL;
