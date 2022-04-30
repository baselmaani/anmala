/*
  Warnings:

  - Added the required column `img` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` INTEGER NOT NULL,
    ADD COLUMN `longitude` INTEGER NOT NULL;
