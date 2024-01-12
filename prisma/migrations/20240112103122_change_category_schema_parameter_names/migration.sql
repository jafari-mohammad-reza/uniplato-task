/*
  Warnings:

  - You are about to drop the column `category` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `category`,
    ADD COLUMN `title` VARCHAR(255) NULL;
