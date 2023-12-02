-- AlterTable
ALTER TABLE `User` MODIFY `wizard` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `additional` BOOLEAN NOT NULL DEFAULT false;
