/*
  Warnings:

  - You are about to drop the column `age` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `birthplace` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `domestic` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `study` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `wizard` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Additional_Information` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nationality` to the `Additional_Information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Additional_Information` DROP COLUMN `age`,
    DROP COLUMN `birthplace`,
    DROP COLUMN `domestic`,
    DROP COLUMN `religion`,
    DROP COLUMN `sex`,
    DROP COLUMN `study`,
    ADD COLUMN `audienceId` INTEGER NULL,
    ADD COLUMN `departmentId` INTEGER NULL,
    ADD COLUMN `nationality` VARCHAR(191) NOT NULL,
    ADD COLUMN `occupationId` INTEGER NULL,
    ADD COLUMN `sexId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `wizard`,
    ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `credits` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sponsor` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Sponsor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Sponsor_ownerId_key`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `sponsorId` INTEGER NOT NULL,
    `rewardCategoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

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

-- CreateTable
CREATE TABLE `Institute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RewardCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enquete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `explanation` LONGTEXT NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `quota` INTEGER NOT NULL,
    `respondents` INTEGER NOT NULL DEFAULT 0,
    `audienceId` INTEGER NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `sexId` INTEGER NULL,
    `occupationId` INTEGER NULL,
    `instituteId` INTEGER NULL,
    `departmentId` INTEGER NULL,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `isCreated` BOOLEAN NOT NULL DEFAULT false,
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Enquete_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnqueteQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enqueteId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnqueteOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnqueteAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enqueteId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `response` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnqueteResponse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enqueteId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `time` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exchangedReward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `exhanged` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Additional_Information_userId_key` ON `Additional_Information`(`userId`);

-- AddForeignKey
ALTER TABLE `Sponsor` ADD CONSTRAINT `Sponsor_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sponsorId_fkey` FOREIGN KEY (`sponsorId`) REFERENCES `Sponsor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_rewardCategoryId_fkey` FOREIGN KEY (`rewardCategoryId`) REFERENCES `RewardCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `AgeCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `AgeCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_instituteId_fkey` FOREIGN KEY (`instituteId`) REFERENCES `Institute`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquete` ADD CONSTRAINT `Enquete_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteQuestion` ADD CONSTRAINT `EnqueteQuestion_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteOption` ADD CONSTRAINT `EnqueteOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `EnqueteQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `EnqueteQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteResponse` ADD CONSTRAINT `EnqueteResponse_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteResponse` ADD CONSTRAINT `EnqueteResponse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exchangedReward` ADD CONSTRAINT `exchangedReward_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exchangedReward` ADD CONSTRAINT `exchangedReward_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
