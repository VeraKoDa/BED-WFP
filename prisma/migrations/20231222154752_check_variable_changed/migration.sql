/*
  Warnings:

  - You are about to drop the column `checkInDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutDate` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `checkinDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `checkInDate`,
    DROP COLUMN `checkOutDate`,
    ADD COLUMN `checkinDate` DATETIME(3) NOT NULL,
    ADD COLUMN `checkoutDate` DATETIME(3) NOT NULL;
