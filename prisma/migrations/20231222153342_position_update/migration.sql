/*
  Warnings:

  - Made the column `location` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Property` DROP FOREIGN KEY `Property_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_propertyId_fkey`;

-- AlterTable
ALTER TABLE `Property` MODIFY `location` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
