-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_propertyId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
