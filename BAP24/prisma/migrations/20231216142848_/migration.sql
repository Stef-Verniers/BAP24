-- AlterTable
ALTER TABLE `EnqueteResponse` ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `startTime` DATETIME(3) NULL;

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
    `questionId` INTEGER NOT NULL,
    `optionId` INTEGER NULL,
    `userId` VARCHAR(191) NOT NULL,
    `response` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EnqueteQuestion` ADD CONSTRAINT `EnqueteQuestion_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteOption` ADD CONSTRAINT `EnqueteOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `EnqueteQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `EnqueteQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `EnqueteOption`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnqueteAnswer` ADD CONSTRAINT `EnqueteAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
