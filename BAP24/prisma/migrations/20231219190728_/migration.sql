/*
  Warnings:

  - You are about to drop the column `age` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `Additional_Information` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Additional_Information` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Additional_Information` DROP COLUMN `age`,
    DROP COLUMN `department`,
    DROP COLUMN `occupation`,
    DROP COLUMN `sex`,
    ADD COLUMN `audienceId` INTEGER NULL,
    ADD COLUMN `departmentId` INTEGER NULL,
    ADD COLUMN `instituteId` INTEGER NULL,
    ADD COLUMN `occupationId` INTEGER NULL,
    ADD COLUMN `sexId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `AgeCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_instituteId_fkey` FOREIGN KEY (`instituteId`) REFERENCES `Institute`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Information` ADD CONSTRAINT `Additional_Information_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
