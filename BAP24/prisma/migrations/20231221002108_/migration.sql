/*
  Warnings:

  - You are about to drop the column `optionId` on the `EnqueteAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `submitted` on the `EnqueteResponse` table. All the data in the column will be lost.
  - Added the required column `respondents` to the `Enquete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enqueteId` to the `EnqueteAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `EnqueteResponse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EnqueteAnswer` DROP FOREIGN KEY `EnqueteAnswer_optionId_fkey`;

-- AlterTable
ALTER TABLE `Enquete` ADD COLUMN `respondents` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `EnqueteAnswer` DROP COLUMN `optionId`,
    ADD COLUMN `enqueteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `EnqueteResponse` DROP COLUMN `submitted`,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
