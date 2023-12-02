-- DropIndex
DROP INDEX `Additional_Information_id_key` ON `Additional_Information`;

-- AlterTable
ALTER TABLE `Additional_Information` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
