/*
  Warnings:

  - You are about to drop the column `nationalityId` on the `Enquete` table. All the data in the column will be lost.
  - You are about to drop the `Nationality` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nationality` to the `Enquete` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Enquete` DROP FOREIGN KEY `Enquete_nationalityId_fkey`;

-- AlterTable
ALTER TABLE `Enquete` DROP COLUMN `nationalityId`,
    ADD COLUMN `nationality` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Nationality`;
