/*
  Warnings:

  - You are about to drop the column `birthplace` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `domestic` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `study` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Enquete` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Enquete` table. All the data in the column will be lost.
  - Added the required column `department` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Additional_Information` DROP COLUMN `birthplace`,
    DROP COLUMN `domestic`,
    DROP COLUMN `religion`,
    DROP COLUMN `study`,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `nationality` VARCHAR(191) NOT NULL,
    ADD COLUMN `occupation` VARCHAR(191) NOT NULL,
    MODIFY `age` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Enquete` DROP COLUMN `categories`,
    DROP COLUMN `url`,
    ADD COLUMN `audienceId` INTEGER NULL,
    ADD COLUMN `departmentId` INTEGER NULL,
    ADD COLUMN `isCreated` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `nationalityId` INTEGER NULL,
    ADD COLUMN `occupationId` INTEGER NULL,
    ADD COLUMN `sexId` INTEGER NULL;

-- CreateTable
CREATE TABLE `AgeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nationality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nationality` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sex` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Occupation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `occupation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `AgeCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_nationalityId_fkey` FOREIGN KEY (`nationalityId`) REFERENCES `Nationality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
